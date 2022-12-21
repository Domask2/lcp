import React, {useEffect, useState} from 'react';
import {Card, Col, Divider, Input, Row} from "antd";
import {useActions} from "../../../hooks/useActions";
import ButtonBlock from "../Editor/ButtonBlock";
import ItemEdit from "../Editor/Elements/ItemEdit";
import EditBlock from "../Editor/Components/EditBlock";
import EditStyle from "../Editor/Components/EditStyle";
import EditAcl from "../Editor/Components/EditAcl";
import AddictionContainer from '../../addiction/AddictionContainer';

type AndDividerEditType = {
    cmp: any,
    setVisible?: (v: boolean) => void
}
const AntDividerEdit: React.FC<AndDividerEditType> = ({cmp, setVisible = () => { }}) => {
    const {cmpUpdate} = useActions()

    let model = {...cmp}
    const [style, setStyle] = useState({...model.style})
    const [text, setText] = useState(model.text)
    const [acl, setAcl] = useState(model.acl)
    const [addiction, setAddiction] = useState<number | ''>(model.addiction)
    const [anchor, setAnchor] = useState<string>(model.anchor);

    useEffect(() => {
        model.style = style
        model.text = text
        model.acl = acl
        model.addiction = addiction
        model.anchor = anchor

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [style, text, acl, addiction, anchor])

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        cmpUpdate(model)
        setVisible(false)
    }

    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>
        <br />
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Card className="cardEdit" size="small">
                    <h4>Пример</h4>
                    <Card size="small" bodyStyle={{padding: 0}}>
                        <Divider style={style} children={text} />
                    </Card>
                </Card>

                <Card className="cardEdit" size="small">
                    <ItemEdit label="текст"
                        item={text}
                        setItem={setText}
                        type="string"
                        nullable={true}
                        del={false}
                        labelWidth="60px" />
                </Card>

                <Card size="small" className="cardEdit">
                    <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction} />
                </Card>

                <Card size="small" className="cardEdit cardEditAcl">
                    <EditAcl item={acl} setItem={setAcl} />
                </Card>

            </Col>

            <Col span={12}>
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

export default AntDividerEdit;