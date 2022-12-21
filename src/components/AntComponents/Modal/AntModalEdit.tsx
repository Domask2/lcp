import React, {useEffect, useState} from 'react';
import {useActions} from "../../../hooks/useActions";
import {IModal} from "../Page/templates";
import {Card, Col, Input, Row} from "antd";
import ObjectFixedEditor from "../Editor/Elements/ObjectFixedEditor";
import ButtonBlock from "../Editor/ButtonBlock";
import ItemEdit from "../Editor/Elements/ItemEdit";
import EditBlock from "../Editor/Components/EditBlock";
import EditStyle from "../Editor/Components/EditStyle";
import EditAcl from "../Editor/Components/EditAcl";
import AddictionContainer from '../../addiction/AddictionContainer';

type AntModalEditType = {
    cmp: IModal,
    setVisible?: (v: boolean) => void
}
const AntModalEdit: React.FC<AntModalEditType> = ({cmp, setVisible = () => { }}) => {
    const {cmpUpdate, setLsVars} = useActions()
    let model = {...cmp}

    const [style, setStyle] = useState({...model.style})
    const [maskStyle, setMaskStyle] = useState({...model.maskStyle})
    const [bodyStyle, setBodyStyle] = useState({...model.bodyStyle})
    const [button, setButton] = useState({...model.button})
    const [caption, setCaption] = useState(model.caption)
    const [acl, setAcl] = useState(model.acl)
    const [addiction, setAddiction] = useState<number | ''>(model.addiction ? model.addiction : '')
    const [adKey, setAddKey] = useState<string>(model.adKey ? model.adKey : '');

    useEffect(() => {
        model.style = style
        model.maskStyle = maskStyle
        model.bodyStyle = bodyStyle
        model.caption = caption
        model.button = button
        model.acl = acl
        model.addiction = addiction
        model.adKey = adKey

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [caption, button, style, maskStyle, bodyStyle, acl, addiction, adKey])

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        adKey && setLsVars(adKey, false);
        cmpUpdate(model)
        setVisible(false)
    }

    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>
        <br />
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Card size="small" title="Окно" className="cardEdit">
                    <ItemEdit label="caption"
                        item={caption}
                        setItem={setCaption}
                        nullable={true}
                        del={false}
                        type="string"
                        labelWidth="60px" />
                </Card>

                <Card size="small" title="Button" className="cardEdit">
                    <ObjectFixedEditor object={button}
                        setObject={setButton}
                        template={
                            {
                                title: {
                                    type: 'string',
                                    title: 'Title',
                                    widthLabel: '110px',
                                },
                                className: {
                                    type: 'string',
                                    title: 'className',
                                    widthLabel: '110px',
                                },
                                type: {
                                    type: 'select',
                                    title: 'Type',
                                    widthLabel: '110px',
                                    items: ['primary', 'ghost', 'dashed', 'link', 'text', 'default']
                                },

                            }
                        } />
                </Card>


                <Card size="small" className="cardEdit">
                    <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction} />
                </Card>

                <Card size="small" className="cardEdit cardEditAcl">
                    <EditAcl item={acl} setItem={setAcl} />
                </Card>
                <Card size="small" className="cardEdit">
                    <h3>Addiction Name</h3>
                    <Input value={adKey} className="lcEditorInput" onChange={(e) => {
                        setAddKey(e.currentTarget.value)
                    }} />
                </Card>

            </Col>

            <Col span={12}>
                <EditBlock title="Style">
                    <EditStyle style={style} setStyle={setStyle} />
                </EditBlock>

                <EditBlock title="Body Style">
                    <EditStyle style={bodyStyle} setStyle={setBodyStyle} />
                </EditBlock>

                <EditBlock title="Mask Style">
                    <EditStyle style={maskStyle} setStyle={setMaskStyle} />
                </EditBlock>
            </Col>
        </Row>

        <ButtonBlock onApply={onApply} onClose={onClose} />
    </>
};

export default AntModalEdit;