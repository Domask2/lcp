import React, {useEffect, useState} from 'react';
import {Card, Col, Image, Input, Row} from "antd";
import {useActions} from "../../../hooks/useActions";
import ObjectEditor from "../Editor/Elements/ObjectEditor";
import {AndEditType} from "../Page/templates";
import ButtonBlock from "../Editor/ButtonBlock";
import EditAcl from "../Editor/Components/EditAcl";
import AddictionContainer from '../../addiction/AddictionContainer';

const AntImageEdit: React.FC<AndEditType> = ({cmp, setVisible = () => { }}) => {
    const {cmpUpdate} = useActions()

    let model = {...cmp}

    const [style, setStyle] = useState({...model.style})
    const [props, setProps] = useState({...model.props})
    const [acl, setAcl] = useState(model.acl)
    const [addiction, setAddiction] = useState<number | ''>(model.addiction ? model.addiction : '')
    const [anchor, setAnchor] = useState<string>(model.anchor);

    useEffect(() => {
        model.style = style
        model.props = props
        model.acl = acl
        model.addiction = addiction
        model.anchor = anchor

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [style, props, acl, addiction, anchor])

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        cmpUpdate(model)
        setVisible(false)
    }

    return <>
        <Row gutter={[16, 16]}>
            <Col span={12} style={{minHeight: '280px'}}>

                <h3>Пример</h3>
                <Card size="small">
                    <Image {...props} width={props.width && +props.width} height={props.height && +props.height} style={style} />
                </Card>

                <Card size="small" className="cardEdit">
                    <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction} />
                </Card>

                <Card size="small" className="cardEdit cardEditAcl">
                    <EditAcl item={acl} setItem={setAcl} />
                </Card>

            </Col>

            <Col span={12}>
                <br />
                <Card size="small" className="cardEdit">
                    <h3>Style</h3>
                    <ObjectEditor object={style} setObject={setStyle} />
                </Card>

                <Card size="small" className="cardEdit">
                    <h3>Props</h3>
                    <ObjectEditor object={props} setObject={setProps} />
                </Card>
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

export default AntImageEdit;