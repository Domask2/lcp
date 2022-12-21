import React, {useEffect, useState} from "react";
import AddRecord from "./AddRecord";
import Editor from "../Editor/Editor";
import Mapped from "../Mapped";
import {useAction, useActions, useTypedSelector} from "../../../hooks";
import {useSearchParams} from "react-router-dom";

import {checkAddiction, checkRole, checkTableStyleAddiction} from "../../../utils";
import {getCurrentProject} from "../../../redux/project/project.selector";
import {
    getDataSource,
    getDataSourceLs,
    getDataSourcesAll,
    getDataSourceSelectedRowKeys,
    getMappedText,
    getMutators
} from "../../../redux/ds/ds.selector";
import {getAuth, getEditMode} from "../../../redux/app/app.selector";

import serviceTable from "../../../services/serviceTable";
import {Button, Dropdown, Menu, Popconfirm, Skeleton, Space, Table, Typography} from "antd";
import {DeleteOutlined, EllipsisOutlined} from "@ant-design/icons";

import {IDataSource} from "../../../redux/ds/ds.initial";
import {ColumnsType} from "antd/es/table";
import {IActionsType, ITable, ITableMenuItem, ITableRow} from "../Page/templates";
import {RootState} from "../../../redux/redux.store";
import ScrollableAnchor from "react-scrollable-anchor";
import AntModal from "../Modal/AntModal";
import {NavLink} from "react-router-dom";

const {Text} = Typography;

type AntTableType = {
    cmp: ITable;
    props: any;
};

const AntTable = ({cmp, props}: AntTableType) => {
    const [realDsKey, setRealDsKey] = useState<string>("");
    const {dataSourceSelectMulti} = useActions();

    const [searchParams] = useSearchParams();
    const mappedCaption = useTypedSelector((state: RootState) => getMappedText(state, cmp.caption ? cmp.caption : ''))
    const editMode = useTypedSelector((state: RootState) => getEditMode(state));
    const auth = useTypedSelector((state: RootState) => getAuth(state));
    const currentProject = useTypedSelector((state: RootState) =>
        getCurrentProject(state)
    );
    const ls = useTypedSelector((state: RootState) => getDataSourceLs(state))
    const allDs = useTypedSelector((state: RootState) => getDataSourcesAll(state))

    /** получим DS для этой таблицы */
    const dataSource = useTypedSelector((state: RootState) =>
        getDataSource(state, realDsKey)
    );

    /** Источник с данными для зависимости. SelectedRows */
    // const ds_master = useTypedSelector((state: RootState) =>
    //     getMaster(state, cmp.ds.dependency)
    // );

    /** Получим источники для мутаций */
    const ds_mutators = useTypedSelector((state: RootState) =>
        getMutators(state, cmp.columns)
    );

    /** Получим ключи выделенных строк таблицы, если они есть */
    const selectedRowKeys = useTypedSelector((state: RootState) =>
        getDataSourceSelectedRowKeys(state, realDsKey)
    );

    /**
     * ============= тут какая то магия ================
     * если у нашей таблицы ds указан с ":" значит мы хотим подставить туда параметр из url
     * этот параметр называется так же как и наш
     */
    useEffect(() => {
        let arr_key: Array<string> = cmp.ds?.key?.split(":");
        let new_key: string;
        if (arr_key && arr_key.length === 2)
            new_key = arr_key[0] + props.match.params[arr_key[1]];
        else new_key = cmp.ds.key;

        setRealDsKey(new_key); /** сэтим в localState ключ нашего ds */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cmp, searchParams]);
    /** ============= тут какая то магия ================ */

    const onChange = (selectedRowKeys: any, selectedRows: any[]) => {
        if (realDsKey !== undefined)
            dataSourceSelectMulti(realDsKey, selectedRowKeys, selectedRows);
    };

    /** добавим к свойствам таблицы rowSelection, если таблица позволяет выбирать данные */
    const rowSelection: any = {};
    if (cmp.select?.selectable) {
        rowSelection.rowSelection = {
            selectedRowKeys,
            type: cmp.select.type,
            onChange: onChange,
        };
    }

    if (dataSource === undefined)
        return (
            <>
                <Editor cmp={cmp} />
                <Skeleton active paragraph={{rows: 10}} />
            </>
        );

    const tableData = dataSource.items?.map((i) => {
        if (i.children !== undefined && typeof i.children !== "object")
            i.children = JSON.parse(i.children);

        i.tags = ["test"];
        return i;
    });


    let tableColumns: ColumnsType = [];
    let children: any = [];
    let groupColumn: any = {};

    let column: any;
    if (dataSource.columns !== undefined)
        dataSource.columns.forEach(function (item: any) {
            if (!item.visible) return;

            const cell = cmp.columns[item.key]

            let search_mutator: any = {};
            // if (cmp.columns === undefined || cmp.columns[item.key] === undefined || cmp.columns[item.key].mutate === undefined) {
            //     search_mutator = getColumnSearchProps(item.key)
            // }

            search_mutator.render = (text: any, row: any) => {
                if (text === "" && cmp.columns[item.key] !== undefined)
                    text =
                        cmp.columns[item.key].empty_value !== undefined
                            ? cmp.columns[item.key].empty_value
                            : "";

                /** мутации есть, не делаем поиск по этому полю */
                let ret;
                if (row !== undefined && dataSource.columns !== undefined)
                    ret = serviceTable.mutateValue(
                        text,
                        item.key,
                        cmp.columns,
                        ds_mutators,
                        {
                            row: row,
                            columns: dataSource.columns,
                        }
                    );

                // /** мутаций нет, добавим по этому полю подсветку поиска */
                // if (ret === text)
                //     ret = searchedColumn === item.key ? <Highlighter
                //             highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                //             searchWords={[searchText]}
                //             autoEscape
                //             textToHighlight={text ? text.toString() : ''}
                //         />
                //         : text

                return ret;
            };

            if (cmp.columns[item.key]?.groupColumn !== undefined && cmp.columns[item.key]?.groupColumn !== null) {
                let name = cmp.columns[item.key]?.groupColumn!.split(':')[1] ?
                    cmp.columns[item.key]?.groupColumn!.split(':')[1] : cmp.columns[item.key]?.groupColumn
                let placeArray = cmp.columns[item.key]?.groupColumn!.split(':')[1] ?
                    cmp.columns[item.key]?.groupColumn!.split(':')[0].replace(/[^0-9]/g, '') : undefined

                let childrenColumn = {
                    title: serviceTable.withOutNumber(item.title),
                    dataIndex: item.dataIndex,
                    key: item.key,
                    // sorter: getSorter(item),
                    ...search_mutator,
                    groupColumn: name
                }

                // собираем столбцы с groupColumn
                children.push(childrenColumn)

                // формируем объект для групп
                groupColumn[`${name}`] = {
                    title: name,
                    placeArray: Number(placeArray),
                    children: []
                }
            } else {
                column = {
                    title: serviceTable.withOutNumber(item.title),
                    dataIndex: item.dataIndex,
                    key: item.key,
                    // sorter: getSorter(item),
                    ...search_mutator,
                    // render: (t: any, r: any) => {
                    //     // проверяем условия для ячейки и применяем прописанные стили
                    //     let check = checkTableStyleAddiction(cell?.addictions, t)
                    //     let style = {}
                    //     if (check.res) {
                    //         style = check.style
                    //     }
                    //     if (cmp.columns[item.key]?.link) {
                    //         let arr_cmp_link = cmp.columns[item.key].link?.split(':')
                    //         if (arr_cmp_link !== undefined && arr_cmp_link.length > 1) {
                    //             let to = `${arr_cmp_link[0]}${[arr_cmp_link[1]]}`
                    //             return <span style={{padding: '10px', ...style}}>
                    //                 <NavLink to={to}>{t}</NavLink>
                    //             </span>
                    //         }

                    //     } else {
                    //         return <span style={{padding: '10px', ...style}}>{t}</span>
                    //     }

                    // }
                };
                tableColumns.push(column);
            }
        });

    // сортируем получившиеся группы по соответсвующим объектам
    if (children.length) {
        children.forEach((child: any) => {
            if (groupColumn[`${child.groupColumn}`].title === child.groupColumn) {
                groupColumn[`${child.groupColumn}`].children = [...groupColumn[`${child.groupColumn}`].children, child]
            }

        })
    }

    // добавляем группы в колонки
    if (Object.values(groupColumn).length) {
        Object.values(groupColumn).forEach((group: any) => {
            // если есть строка [1]:name  - позволяет втавить столбец в нужное место массива
            if (group.placeArray) {
                tableColumns.splice(group.placeArray, 0, group)
            } else if (group.placeArray === 0) {
                tableColumns.unshift(group)
            } else {
                tableColumns.push(group)
            }

        })
    }

    /**
     * ------------ функционал сортировки в таблице ------------- */

    const addActions = (): any => {
        return {
            title: "",
            dataIndex: "actions",
            key: "actions",
            align: "right",
            render: (text: any, row: any) => {
                let action_edit: any = "";
                let action_delete: any = "";
                if (cmp.actions.edit)
                    action_edit = (
                        <AddRecord
                            ds={dataSource}
                            action="edit"
                            item={row}
                            disable={!serviceTable.issetPk(dataSource.columns)}
                        />
                    );

                if (cmp.actions.delete)
                    action_delete = (
                        <DeleteAction
                            ds={dataSource}
                            item={row}
                            disable={!serviceTable.issetPk(dataSource.columns)}
                        />
                    );

                return (
                    <>
                        {action_edit} {action_delete}
                    </>
                );
            },
        };
    };
    /**
     * Если нужно показать экшены
     */
    if (cmp.actions !== undefined && (cmp.actions.delete || cmp.actions.edit))
        tableColumns.push(addActions());

    /**
     * Если нужно показать меню
     * TODO: вынести
     * FIXME: тест плагина
     */

    if (cmp.menu !== undefined && cmp.menu.length > 0)
        tableColumns.push({
            title: "",
            dataIndex: "tbl_menu",
            key: "tbl_menu",
            render: (q, row: any) => {

                const visibleMenuItems = cmp.menu?.filter(
                    (item: any) => item.visible !== false
                );

                const menu = (
                    <Menu>
                        {visibleMenuItems?.map((item, index) => {
                            const addictionId = Array.isArray(item.addiction) ? item.addiction : [item.addiction]
                            const currentAddiction: any = [];
                            currentProject?.addictions && addictionId?.forEach((addictId: number) => {
                                let res = currentProject?.addictions.filter((item: any) => item.id === addictId)[0]
                                res && currentAddiction.push(res)
                            })

                            if (!editMode) {
                                if (item.addiction) {
                                    if (!row) {
                                        return null
                                    }
                                    if (!checkAddiction(row, currentAddiction, allDs, ls)) {
                                        return null
                                    }
                                }
                                if (!(auth.projects_roles ? checkRole(cmp?.acl, currentProject && auth.projects_roles[currentProject?.key]) : checkRole(cmp?.acl, undefined))) {
                                    return null
                                }
                            }

                            return <TableMenuItemHoc
                                key={index}
                                index={index}
                                item={item}
                                row={row}
                            />

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

    /**
     * Если нужно показать меню
     */

    const TableMenuItemHoc = ({item, row, index}: {item: ITableMenuItem, row: ITableRow, index: number}) => {

        // добавим данные о ds внутрь action
        if (typeof item.actions === 'object' && item.actions) {
            item.actions[0]['ds_table'] = Object.values(cmp.ds);
        }
        const action = useAction(item.actions as Array<IActionsType>, undefined, row);

        return item.confirm ? (
            <Popconfirm key={item.title + index + 'popconfirm'} placement="left" title={'Подтвердите действие'}
                onConfirm={action.onClick} okText="Да" cancelText="Нет">
                <Menu.Item eventKey={item.title + index} key={item.title + index}>
                    <Mapped text={item.title} />
                </Menu.Item>
            </Popconfirm>
        ) : (
            item.modal && item.modal.isModal && item.modal.cmpModal ?
                <Menu.Item eventKey={item.modal.cmpModal.key + index} style={{padding: 0}}
                    key={item.modal.cmpModal.key + index}>
                    <span>
                        <AntModal key={item.modal.cmpModal.key + index} cmp={item.modal.cmpModal} props={{row: row}}
                            maskClosable={false} open={true} />
                    </span>
                </Menu.Item>
                :
                <Menu.Item key={item.title + index} onClick={action.onClick}>
                    <Mapped text={item.title} />
                </Menu.Item>
        )
    };

    const getFooter = () => {
        return cmp.actions && cmp.actions.add
            ? () => (
                <AddRecord
                    ds={dataSource}
                    action="add"
                    disable={!serviceTable.issetPk(dataSource.columns)}
                />
            )
            : false;
    };

    const getTitle = () => {
        let title: any = cmp.caption === undefined ? undefined : cmp.caption;

        title =
            title === "default" ? (
                <>
                    <Space>{dataSource.title}</Space>{" "}
                    <Text type="secondary">{dataSource.description}</Text>
                </>
            ) : (
                mappedCaption ? <Mapped text={mappedCaption} /> : null
            );

        return title;
    };

    // console.log(tableColumns);

    return (
        <div>
            {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
                <span></span>
            </ScrollableAnchor>}
            <Editor cmp={cmp} />
            <Table
                {...cmp.props}
                {...rowSelection}
                loading={
                    dataSource?.loading
                        ? {
                            size: "large",
                            tip: "Данные загружаются...",
                        }
                        : false
                }
                className={!cmp.title && 'disabledBorderTitle'}
                bordered
                style={cmp.style}
                pagination={false}
                dataSource={tableData}
                columns={tableColumns}
                title={getTitle() ? getTitle : null}
                footer={getFooter()}
            />
        </div>
    );
};

type deleteActionType = {
    ds: IDataSource;
    item: any;
    disable: boolean;
};
const DeleteAction = ({item, ds, disable}: deleteActionType) => {
    const {deleteRecord} = useActions();

    const handleDelete = (item: any) => {
        type pkType = {[key: string]: any};
        let primaries: Array<pkType> = [];
        ds.columns
            .filter((item) => item.pk)
            .forEach((pk) => {
                let pkElem: pkType = {};
                pkElem[pk.key] = item[pk.key];
                primaries.push(pkElem);
            });
        deleteRecord(ds.key, primaries, "force");
    };

    return (
        <Popconfirm
            title="Подтвердите удаление."
            onConfirm={() => handleDelete(item)}
        >
            <Button
                size="small"
                type="link"
                style={{padding: "0 3px"}}
                danger
                disabled={disable}
            >
                <DeleteOutlined />
            </Button>
        </Popconfirm>
    );
};

export default AntTable;
