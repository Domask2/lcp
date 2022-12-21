import React, {useEffect, useState} from 'react';
import {useTypedSelector, useActions} from "../../../hooks";

import EditAcl from "../Editor/Components/EditAcl";
import ButtonBlock from "../Editor/ButtonBlock";
import AddictionContainer from '../../addiction/AddictionContainer';
import ObjectFixedEditor from "../Editor/Elements/ObjectFixedEditor";
import {mappedText, transliterate} from "../../../services/myService";

import {Card, Col, Input, Row} from "antd";
import {IProps as IQRProps} from 'react-qrcode-logo';
import {QRCode} from 'react-qrcode-logo';
import {RootState} from "../../../redux/redux.store";

type AntBarCodeType = {
    cmp: any,
    setVisible?: (v: boolean) => void
}
const AntQRCodeEdit: React.FC<AntBarCodeType> = ({
                                                     cmp, setVisible = () => {
    }
                                                 }) => {
    const rootState = useTypedSelector((state: RootState) => state)

    let model = {...cmp}
    const [qrProps, setQrProps] = useState<IQRProps>({...model.qrProps})
    const [acl, setAcl] = useState<any>(model.acl)
    const [addiction, setAddiction] = useState<number | ''>(model.addiction ? model.addiction : '')
    const [anchor, setAnchor] = useState<string>(model.anchor);

    const {cmpUpdate} = useActions()

    useEffect(() => {
        model.qrProps = qrProps
        model.acl = acl
        model.addiction = addiction
        model.anchor = anchor

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qrProps, acl, addiction, anchor])

    const getMappedValue = () => {
        let text = qrProps.value !== undefined ? qrProps.value : ''
        return transliterate(mappedText(rootState, text))
    }

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        cmpUpdate(model)
        setVisible(false)
    }

    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>
        <br/>
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Card size="small" className="cardEdit">
                    <div>{getMappedValue()}</div>
                    <QRCode {...qrProps} value={getMappedValue()}/>
                </Card>
                <Card size="small" className="cardEdit">
                    <h3>Anchor</h3>
                    <Input value={anchor && anchor} className="lcEditorInput" onChange={(e) => {
                        setAnchor(e.currentTarget.value)
                    }}/>
                </Card>
            </Col>

            <Col span={12}>
                <Card size="small" className="cardEdit">
                    <ObjectFixedEditor object={qrProps} setObject={setQrProps} template={
                        {
                            value: {
                                type: 'string',
                                title: 'value',
                                widthLabel: '120px'
                            },
                            ecLevel: {
                                type: 'select',
                                title: 'ecLevel',
                                widthLabel: '120px',
                                items: ['L', 'M', 'Q', 'H']
                            },
                            enableCORS: {
                                type: 'boolean',
                                title: 'enableCORS',
                                widthLabel: '120px'
                            },
                            size: {
                                type: 'number',
                                title: 'size',
                                widthLabel: '120px'
                            },
                            quietZone: {
                                type: 'number',
                                title: 'quietZone',
                                widthLabel: '120px'
                            },
                            bgColor: {
                                type: 'string',
                                title: 'bgColor',
                                widthLabel: '120px'
                            },
                            fgColor: {
                                type: 'string',
                                title: 'fgColor',
                                widthLabel: '120px'
                            },
                            logoImage: {
                                type: 'string',
                                title: 'logoImage',
                                widthLabel: '120px'
                            },
                            logoWidth: {
                                type: 'number',
                                title: 'logoWidth',
                                widthLabel: '120px'
                            },
                            logoHeight: {
                                type: 'number',
                                title: 'logoHeight',
                                widthLabel: '120px'
                            },
                            logoOpacity: {
                                type: 'number',
                                title: 'logoOpacity',
                                widthLabel: '120px'
                            },
                            qrStyle: {
                                type: 'select',
                                title: 'qrStyle',
                                widthLabel: '120px',
                                items: ['squares', 'dots']
                            }
                        }
                    }/>
                </Card>

                <Card size="small" className="cardEdit">
                    <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction}/>
                </Card>

                <Card size="small" className="cardEdit cardEditAcl">
                    <EditAcl item={acl} setItem={setAcl}/>
                </Card>
            </Col>
        </Row>

        <ButtonBlock onApply={onApply} onClose={onClose}/>
    </>
};

export default AntQRCodeEdit;