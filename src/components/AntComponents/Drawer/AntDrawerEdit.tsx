import React, {useEffect, useState} from 'react';
import {useActions} from "../../../hooks/useActions";
import {IDrawer} from "../Page/templates";
import {Card, Col, Row} from "antd";
import ObjectFixedEditor from "../Editor/Elements/ObjectFixedEditor";
import ButtonBlock from "../Editor/ButtonBlock";
import EditBlock from "../Editor/Components/EditBlock";
import EditStyle from "../Editor/Components/EditStyle";
import EditAcl from "../Editor/Components/EditAcl";
import AddictionContainer from '../../addiction/AddictionContainer';

type AntDrawerEditType = {
    cmp: IDrawer,
    setVisible?: (v: boolean) => void
}
const AntDrawerEdit: React.FC<AntDrawerEditType> = ({cmp, setVisible = () => { }}) => {
    const {cmpUpdate} = useActions()
    let model = {...cmp, props: {...cmp.props}}

    const [headStyle, setHeadStyle] = useState<React.CSSProperties>({...model.headStyle})
    const [bodyStyle, setBodyStyle] = useState<React.CSSProperties>({...model.bodyStyle})
    const [props, setProps] = useState({...model.props})
    const [button, setButton] = useState({...model.button})
    const [acl, setAcl] = useState(model.acl)
    const [addiction, setAddiction] = useState<number | ''>(model.addiction ? model.addiction : '')

    useEffect(() => {
        model.headStyle = headStyle
        model.bodyStyle = bodyStyle

        model.props = props
        model.button = button

        model.acl = acl
        model.addiction = addiction

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, button, headStyle, bodyStyle, acl, addiction])

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
                <Card size="small" title="Props" className="cardEdit">
                    <ObjectFixedEditor object={props}
                        setObject={setProps}
                        template={
                            {
                                title: {
                                    type: 'string',
                                    title: 'Title',
                                    widthLabel: '110px',
                                },
                                width: {
                                    type: 'number',
                                    title: 'Width',
                                    widthLabel: '110px',
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

            </Col>

            <Col span={12}>
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

                <EditBlock title="Body Style">
                    <EditStyle style={bodyStyle} setStyle={setBodyStyle} />
                </EditBlock>

                <EditBlock title="Head Style">
                    <EditStyle style={headStyle} setStyle={setHeadStyle} />
                </EditBlock>
            </Col>
        </Row>

        <ButtonBlock onApply={onApply} onClose={onClose} />
    </>
};

export default AntDrawerEdit;