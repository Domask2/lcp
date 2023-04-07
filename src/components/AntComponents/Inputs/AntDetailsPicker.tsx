import React, {FC, useEffect, useState} from 'react';
import {useTypedSelector, useActions, useAction} from "../../../hooks";
import {getCurrentProject} from "../../../redux/project/project.selector";
import {getAuth, getEditMode} from "../../../redux/app/app.selector";
import {getDataSource, getDataSourceLs, getDataSourcesAll} from "../../../redux/ds/ds.selector";

import Mapped from "../Mapped";
import Ext from '../Ext/Ext';
import Editor from '../Editor/Editor';

import {checkAddiction, checkRole, EnterClick, formationValue} from '../../../utils';
import serviceTable from "../../../services/serviceTable";

import {Button, Col, Divider, Dropdown, Input, Menu, Modal, Pagination, Popconfirm, Row, Table} from "antd";
import {SearchOutlined, ClearOutlined, EllipsisOutlined} from '@ant-design/icons';

import {RootState} from "../../../redux/redux.store";
import {IActionsType, IInputs} from '../Page/templates';
import ScrollableAnchor from 'react-scrollable-anchor';
import useDataSourceFiltred from '../../../hooks/useDataSourceFilter';

type AntDetailsPickerType = {
    cmp: IInputs
    props: any
}

const AntDetailsPicker: FC<AntDetailsPickerType> = ({cmp, props}) => {

    const dsKey = cmp.listDs ? `${cmp.key}-${cmp.listDs}` : "detailsPickerDs";

    const {loadDataSource, dataSourceAddKeyValue} = useActions();
    const {getDataSourceCount, addSearch, resetFilters, getCurPage, getPerPage, addCurPage} = useDataSourceFiltred(dsKey)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [row, setRow] = useState<any>("");

    const dataSource = useTypedSelector((state: RootState) => getDataSource(state, dsKey));
    const editMode = useTypedSelector((state: RootState) => getEditMode(state));
    const auth = useTypedSelector((state: RootState) => getAuth(state));
    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state));
    const ls = useTypedSelector((state: RootState) => getDataSourceLs(state))
    const allDs = useTypedSelector((state: RootState) => getDataSourcesAll(state))

    // поиск в ds-ке поля, по которым возможен поиск - search: true и приводим к массиву удобочитаемых значений
    const searchColumns: any = dataSource?.columns.filter((item) => item.search);
    const searchKeys: any = searchColumns?.map((item: any) => item.title.split("]")[1]);

    useEffect(() => {
        // создание новой ds с префиксом /detailsPickerDs/
        loadDataSource(dsKey, resetFilters(), false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // установка в поисковой строке значения по клику на строку таблицы
        cmp.listTextKeys && setSearchValue(formationValue(cmp.listTextKeys, row));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [row]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        cmp.listKey &&
            props.onChangeDetailsPicker(row, formationValue(cmp.listTextKeys, row));
        // добавление в форму значения по ключу инпута из выбранной строки
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSearch = () => {
        loadDataSource(dsKey, addSearch(searchValue), false);
    };

    const handleReset = () => {
        setSearchValue("");
        loadDataSource(dsKey, addSearch(''), false);
    };

    const hadleRowClick = (row: any) => {
        dataSourceAddKeyValue(dsKey, "selected", row);
        setRow(row);
    };

    // формирование данных для прередачи в таблицу
    let tableData = [];
    let tableColumns: any = [];
    if (dataSource) {
        tableData = dataSource.items?.map((i) => {
            if (i.children !== undefined && typeof i.children !== "object")
                i.children = JSON.parse(i.children);
            return i;
        });

        let column: any;
        if (dataSource.columns !== undefined)
            dataSource.columns.forEach(function (item: any) {
                if (!item.visible) return;

                column = {
                    title: serviceTable.withOutNumber(item.title),
                    dataIndex: item.dataIndex,
                    key: item.key,
                    render: (t: any, r: any) => {
                        let style = {};
                        if (r.key === row.key) style = {color: "#1890ff"};
                        return <div style={{...style, cursor: 'pointer', width: '100%'}}
                            onClick={(e) => {
                                hadleRowClick(r)
                            }}
                            onDoubleClick={(e) => {
                                handleOk()
                            }}
                        >
                            {t}
                        </div>;
                    },

                };
                tableColumns.push(column);
            });
    }

    /**
     * Если нужно показать меню
     */

    const TableMenuItemHoc = ({item, row}: {item: any; row: any}) => {
        const action = useAction(item.actions as Array<IActionsType>);

        return item.confirm ? (
            <Popconfirm
                placement="left"
                title={"Подтвердите действие"}
                onConfirm={() => {
                    action.onClick(false, false, row);
                    setSearchValue("");
                }}
                okText="Да"
                cancelText="Нет"
            >
                <Menu.Item>
                    <Mapped text={item.title} />
                </Menu.Item>
            </Popconfirm>
        ) : (
            <Menu.Item
                onClick={() => {
                    action.onClick(false, false, row);
                    setSearchValue("");
                }}
            >
                <Mapped text={item.title} />
            </Menu.Item>
        );
    };

    if (cmp.menu !== undefined && cmp.menu.length > 0) {
        tableColumns.push({
            title: "",
            dataIndex: "tbl_menu",
            key: "tbl_menu",
            render: (q: any, row: any) => {
                const visibleMenuItems = cmp.menu?.filter(
                    (item: any) => item.visible !== false
                );

                const menu = (
                    <Menu>
                        {visibleMenuItems?.map((item: any, index: number) => {
                            const addictionId = Array.isArray(item.addiction) ? item.addiction : [item.addiction]
                            const currentAddiction: any = [];
                            currentProject?.addictions && addictionId?.forEach((addictId: number) => {
                                let res = currentProject?.addictions.filter((item: any) => item.id === addictId)[0]
                                res && currentAddiction.push(res)
                            })

                            if (!editMode) {
                                if (item.addiction) {
                                    if (!row) {
                                        return null;
                                    }
                                    if (!checkAddiction(row, currentAddiction, allDs, ls)) {
                                        return null;
                                    }
                                }
                                if (
                                    !(auth.projects_roles
                                        ? checkRole(
                                            cmp?.acl,
                                            currentProject &&
                                            auth.projects_roles[currentProject?.key]
                                        )
                                        : checkRole(cmp?.acl, undefined))
                                ) {
                                    return null;
                                }
                            }
                            return <TableMenuItemHoc key={index} item={item} row={row} />;
                        })}
                    </Menu>
                );

                return (
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <Button type="text">
                            <EllipsisOutlined />
                        </Button>
                    </Dropdown>
                );
            },
        });
    }

    let onChange = (page: number) => {
        loadDataSource(dsKey, addCurPage(page), true, '')
    }

    return (
        <>
            {cmp.anchor && (
                <ScrollableAnchor id={`${cmp.anchor}`}>
                    <span></span>
                </ScrollableAnchor>
            )}

            <Editor cmp={cmp} inputType={cmp.inputsType} />
            <Row
                style={{alignItems: "center", marginBottom: "10px", ...cmp?.style}}
            >
                <Col span={cmp.inputWidth ? 24 - cmp.inputWidth : 10} style={{textAlign: "right", paddingRight: "10px", ...cmp.bodyStyle}}>
                    {(cmp.inputDescription || (cmp.helpMessage && !props.validate)) &&
                        <div style={{height: '20px', }}></div>}
                    {`${cmp.caption}: `}
                </Col>
                <Col span={cmp.inputWidth ? cmp.inputWidth : 14}>
                    <div style={{color: 'gray', fontSize: '12px', paddingLeft: '11px'}}>{cmp.inputDescription}</div>
                    <div style={{position: "relative"}}>
                        {props.renderHelpMessage()}

                        <Input
                            style={{...props.walidationBorderStyle, ...cmp.inputsStyle, paddingRight: '25px'}}
                            onClick={(e) => {
                                e.stopPropagation()
                                showModal()
                            }}
                            value={props.value ? props.value : props.initTextValue}
                        />
                        <Button
                            style={{position: 'absolute', right: '0', bottom: '5px', color: cmp.inputsStyle?.color}}
                            type="link"
                            size="small"
                            onClick={() => {
                                props.onClearDetailsPicker('');
                                console.log(props);
                            }}
                        >
                            <ClearOutlined />
                        </Button>
                    </div>
                </Col>
                {isModalVisible && (
                    <Modal
                        title={cmp.caption && `${cmp.caption}:`}
                        open={true}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        width={1000}
                        footer={[
                            <Button key="cancel" onClick={handleCancel}>
                                Отменить
                            </Button>,
                            <Button key="ok" type="primary" onClick={handleOk}>
                                Выбрать
                            </Button>,
                        ]}
                    >
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Input
                                autoFocus
                                onKeyDown={(evt) => {
                                    EnterClick(evt.code) && handleSearch();
                                }}
                                onChange={(e) => setSearchValue(e.currentTarget.value)}
                                value={searchValue}
                                placeholder={`Поиск по: ${searchKeys && searchKeys.join(", ")}`}
                            />
                            <Button
                                style={{margin: "0px 5px 0 -33px"}}
                                type="link"
                                size="small"
                                onClick={handleSearch}
                            >
                                <SearchOutlined />
                            </Button>
                            <Button type="link" size="small" onClick={handleReset}>
                                <ClearOutlined />
                            </Button>
                            {cmp.extComponent && (
                                <Ext
                                    cmp={{key: cmp.key, type: "Ext", cmp_key: cmp.extComponent}}
                                    props={{}}
                                />
                            )}
                        </div>
                        <div>
                            <span style={{fontSize: "12px"}}>
                                {+getDataSourceCount() ? `Всего записей: ${getDataSourceCount()}` : 'Ничего не найдено'}
                            </span>
                        </div>
                        <Divider />
                        <Pagination
                            size="small"
                            total={getDataSourceCount()}
                            showSizeChanger={false}
                            pageSize={getPerPage()}
                            current={getCurPage()}
                            onChange={onChange}
                        />
                        <Table
                            pagination={false}
                            dataSource={tableData}
                            columns={tableColumns}
                            loading={dataSource?.loading}
                            size={"small"}
                            onRow={(record, rowIndex) => {
                                return {
                                    //событие клика по строке - параметром передается объект строки
                                    // onClick: (event) => hadleRowClick(record), // click row
                                };
                            }}
                        />
                    </Modal>
                )}
            </Row>
        </>
    );
};

export default AntDetailsPicker;
