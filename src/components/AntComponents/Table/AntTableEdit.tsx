import React, {useEffect, useState} from "react";
import {Card, Col, Input, Row, Tabs} from "antd";
import {useActions} from "../../../hooks/useActions";
import {ITable} from "../Page/templates";
import ButtonBlock from "../Editor/ButtonBlock";
import ObjectFixedEditor from "../Editor/Elements/ObjectFixedEditor";
import TableColumnsEdit from "./TableColumnsEdit";
import ItemEdit from "../Editor/Elements/ItemEdit";
import EditBlock from "../Editor/Components/EditBlock";
import EditStyle from "../Editor/Components/EditStyle";
import ArrayObjectsEditor from "../Editor/Elements/ArrayObjectsEditor";
import Text from "antd/es/typography/Text";
import EditAcl from "../Editor/Components/EditAcl";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {RootState} from "../../../redux/redux.store";
import {getDataSourcesAll} from "../../../redux/ds/ds.selector";
import AddictionContainer from "../../addiction/AddictionContainer";

const {TabPane} = Tabs;

type AndTableEdit = {
    cmp: ITable;
    setVisible?: (v: boolean) => void;
};
const AntTableEdit: React.FC<AndTableEdit> = ({
    cmp,
    setVisible = () => { },
}) => {
    const {cmpUpdate} = useActions();
    let model = {...cmp};
    let tit =
        model.title !== undefined && model.title !== null ? model.title : "";

    const [style, setStyle] = useState({...model.style});
    const [props, setProps] = useState({...model.props});
    const [pagination, setPagination] = useState({...model.props.pagination});
    const [scroll, setScroll] = useState({...model.props.scroll});
    const [actions, setActions] = useState({...model.actions});
    const [ds, setDs] = useState({...model.ds});
    const [title, setTitle] = useState(tit);
    const [columns, setColumns] = useState({...model.columns});
    const [menu, setMenu] = useState<any>(model.menu);
    const [acl, setAcl] = useState(model.acl);
    const [select, setSelect] = useState(model.select);
    const [addiction, setAddiction] = useState<number | ''>(model.addiction ? model.addiction : '')
    const [anchor, setAnchor] = useState<string>(model.anchor ? model.anchor : '');

    const dsArr = useTypedSelector((state: RootState) =>
        getDataSourcesAll(state)
    );

    useEffect(() => {
        model.style = style;
        props.scroll = scroll;
        props.pagination = pagination;
        model.props = props;
        model.actions = actions;
        model.ds = ds;
        model.title = title;
        model.columns = columns;
        model.menu = menu;
        model.acl = acl;
        model.select = select;
        model.addiction = addiction;
        model.anchor = anchor;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        style,
        actions,
        ds,
        title,
        props,
        columns,
        pagination,
        scroll,
        menu,
        acl,
        select,
        addiction,
        anchor
    ]);

    const onClose = () => {
        setVisible(false);
    };

    const onApply = () => {
        cmpUpdate(model);
        setVisible(false);
    };

    const annotationTitle = (
        <code style={{fontSize: 11}}>
            В заголовке можно использовать иконки.
            <br />
            {`<<icon:IdcardOutlined:15px>>`}
        </code>
    );

    const annotationActions = (
        <code style={{fontSize: 11}}>
            Формат Actions:
            <br />
            fnc/to:название функции/url:параметр
            <br />
            <Text type="warning">fnc:load_clones:id</Text>
            <br />
            <Text type="warning">to:/bulls/bull/:id</Text>
            <br />
        </code>
    );

    return (
        <>
            <h3>
                Редактирование: {cmp.type} - {cmp.key}
            </h3>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Внешний вид" key="1">
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <EditBlock title="Style">
                                <EditStyle style={style} setStyle={setStyle} />
                            </EditBlock>

                            <Card
                                size="small"
                                title="Actions"
                                className="cardEdit"
                            >
                                <ObjectFixedEditor
                                    object={actions}
                                    setObject={setActions}
                                    template={{
                                        add: {
                                            type: "boolean",
                                            title: "Добавить",
                                            widthLabel: "110px",
                                        },
                                        edit: {
                                            type: "boolean",
                                            title: "Редактировать",
                                            widthLabel: "110px",
                                        },
                                        delete: {
                                            type: "boolean",
                                            title: "Удалить",
                                            widthLabel: "110px",
                                        },
                                    }}
                                />
                            </Card>

                            <Card size="small" className="cardEdit">
                                <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction} />
                            </Card>

                            <Card size="small" className="cardEdit cardEditAcl">
                                <EditAcl item={acl} setItem={setAcl} />
                            </Card>
                        </Col>

                        <Col span={12}>
                            <Card
                                size="small"
                                title="Props"
                                className="cardEdit"
                            >
                                <ItemEdit
                                    label="title"
                                    item={title}
                                    setItem={setTitle}
                                    del={false}
                                />

                                <ObjectFixedEditor
                                    object={ds}
                                    setObject={setDs}
                                    template={{
                                        key: {
                                            type: "select",
                                            title: "Ключ DS",
                                            widthLabel: "120px",
                                            items: Object.keys(dsArr),
                                        },
                                    }}
                                />

                                <ObjectFixedEditor
                                    object={props}
                                    setObject={setProps}
                                    template={{
                                        size: {
                                            type: "string",
                                            title: "Размер",
                                            widthLabel: "120px",
                                        },
                                    }}
                                />
                                <br />

                                <Row>
                                    <Col flex="120px">pagination</Col>
                                    <Col flex="auto">
                                        <ObjectFixedEditor
                                            object={pagination}
                                            setObject={setPagination}
                                            template={{
                                                pageSize: {
                                                    type: "number",
                                                    title: "строк",
                                                    widthLabel: "60px",
                                                },
                                            }}
                                        />
                                    </Col>

                                    <Col flex="120px">scroll</Col>
                                    <Col flex="auto">
                                        <ObjectFixedEditor
                                            object={scroll}
                                            setObject={setScroll}
                                            template={{
                                                x: {
                                                    type: "number",
                                                    title: "max-x",
                                                    widthLabel: "60px",
                                                },
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={24}>
                                        <ObjectFixedEditor
                                            object={select}
                                            setObject={setSelect}
                                            template={{
                                                selectable: {
                                                    type: "boolean",
                                                    title: "selectable",
                                                    widthLabel: "120px",
                                                },
                                                type: {
                                                    type: "select",
                                                    title: "type",
                                                    widthLabel: "120px",
                                                    items: [
                                                        "checkbox",
                                                        "radio",
                                                    ],
                                                },
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                            <Card size="small" className="cardEdit">
                                <h3>Anchor</h3>
                                <Input value={anchor && anchor} className="lcEditorInput" onChange={(e) => {
                                    setAnchor(e.currentTarget.value)
                                }} />
                            </Card>

                        </Col>
                    </Row>
                </TabPane>

                <TabPane tab="Настройка колонок" key="3">
                    <TableColumnsEdit
                        tableColumns={columns}
                        setTableColumns={setColumns}
                        cmp={cmp}
                    />
                </TabPane>

                <TabPane tab="Настройка меню" key="4">
                    <Card size="small" className="cardEdit">
                        <ArrayObjectsEditor
                            cmp={cmp}
                            list={menu}
                            setList={setMenu}
                            template={{
                                title: "",
                                actions: "",
                                acl: [],
                                addiction: '',
                                visible: "",
                                confirm: false,
                                modal: false,
                            }}
                        />

                        <Row>
                            <Col span={12}>
                                <p
                                    style={{
                                        paddingLeft: 10,
                                        lineHeight: 1.25,
                                    }}
                                >
                                    {annotationTitle}
                                </p>
                            </Col>
                            <Col span={12}>
                                <p
                                    style={{
                                        paddingLeft: 10,
                                        lineHeight: 1.25,
                                    }}
                                >
                                    {annotationActions}
                                </p>
                            </Col>
                        </Row>
                    </Card>
                </TabPane>
            </Tabs>

            <ButtonBlock onApply={onApply} onClose={onClose} />
        </>
    );
};

export default AntTableEdit;
