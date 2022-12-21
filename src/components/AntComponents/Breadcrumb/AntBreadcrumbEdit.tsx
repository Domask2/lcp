import React, {useEffect, useState} from 'react';
import {useActions} from "../../../hooks/useActions";
import {Breadcrumb, Card, Col, Input, Row} from "antd";
import {mappedText} from "../../../services/myService";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {RootState} from "../../../redux/redux.store";
import ArrayObjectsEditor from "../Editor/Elements/ArrayObjectsEditor";
import {NavLink} from "react-router-dom";
import Text from "antd/es/typography/Text";
import ButtonBlock from "../Editor/ButtonBlock";
import EditBlock from "../Editor/Components/EditBlock";
import EditStyle from "../Editor/Components/EditStyle";
import Mapped from "../Mapped";
import EditAcl from "../Editor/Components/EditAcl";
import AddictionContainer from '../../addiction/AddictionContainer';

type AntTabsType = {
    cmp: any,
    setVisible?: (v: boolean) => void
}
const AntBreadcrumbEdit: React.FC<AntTabsType> = ({
    cmp, setVisible = () => {
    }
}) => {
    const rootState = useTypedSelector((state: RootState) => state)

    let model = {...cmp, props: {...cmp.props}}
    const [style, setStyle] = useState<React.CSSProperties>({...model.style})
    const [items, setItems] = useState<Array<any>>([...model.items])
    const [title, setTitle] = useState<string>(model.title)
    const [acl, setAcl] = useState<string>(model.acl)
    const [addiction, setAddiction] = useState<number | ''>(model.addiction)
    const [anchor, setAnchor] = useState<string>(model.anchor);

    const {cmpUpdate} = useActions()

    useEffect(() => {
        model.style = style
        model.items = items
        model.title = title
        model.acl = acl
        model.addiction = addiction
        model.anchor = anchor

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [style, items, title, acl, addiction, anchor])

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        cmpUpdate(model)
        setVisible(false)
    }

    const annotation = <code style={{fontSize: 11}}>
        В заголовке можно использовать значения из источника данных.
        Параметры для выбора значения в квадрантые скобки.<br />
        <b>[[ds:{`<ds_key>:`}<i><Text type="warning">selectedRow||first</Text></i>{`:<column>`}]]</b><br />
        ds - указатель на раздел.<br />
        selectedRow - указатель на выбранную строку.<br />
        first - указатель на первую строку.<br />
        column - название колонки из которой взять значение.
    </code>


    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>
        <br />
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Card size="small" className="cardEdit">
                    <Breadcrumb style={style}>
                        {items.map(item => <Breadcrumb.Item key={item.route}>
                            <NavLink
                                to={mappedText(rootState, item.route)}>
                                <Mapped text={mappedText(rootState, item.title)} /></NavLink>
                        </Breadcrumb.Item>)}
                        <Breadcrumb.Item key='this_page'><Mapped text={mappedText(rootState, title)} /></Breadcrumb.Item>
                    </Breadcrumb>
                </Card>
            </Col>

            <Col span={12}>
                <Card size="small" className="cardEdit">
                    <h4>Заголовок</h4>
                    <Input value={title} className="lcEditorInput"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)} />
                    <p style={{paddingLeft: 10, lineHeight: 1.25}}>{annotation}</p>
                </Card>

                <Card size="small" className="cardEdit">
                    <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction} />
                </Card>

                <Card size="small" className="cardEdit cardEditAcl">
                    <EditAcl item={acl} setItem={setAcl} />
                </Card>
            </Col>

            <Col span={12}>
                <EditBlock title="Путь">
                    <ArrayObjectsEditor list={items} setList={setItems} template={{route: '', title: ''}} />
                </EditBlock>

                <EditBlock title="Style">
                    <EditStyle style={style} setStyle={setStyle} />
                </EditBlock>

                <Card size="small" className="cardEdit">
                    <h3>Anchor</h3>
                    <Input value={anchor && anchor} className="lcEditorInput" onChange={(e) => {
                        setAnchor(e.currentTarget.value)
                    }} />
                </Card>
            </Col>

        </Row>

        <ButtonBlock onApply={onApply} onClose={onClose} />
    </>
};

export default AntBreadcrumbEdit;