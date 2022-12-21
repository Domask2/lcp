import React, {useEffect, useState} from 'react';
import {useActions} from "../../../hooks/useActions";
import {Card, Col, Input, Row} from "antd";
import ButtonBlock from "../Editor/ButtonBlock";
import ItemEdit from "../Editor/Elements/ItemEdit";
import {useBarcode} from "react-barcodes";
import {IBarCodeOptions} from "../Page/templates";
import ObjectFixedEditor from "../Editor/Elements/ObjectFixedEditor";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {RootState} from "../../../redux/redux.store";
import {mappedText, transliterate} from "../../../services/myService";
import EditAcl from "../Editor/Components/EditAcl";
import AddictionContainer from '../../addiction/AddictionContainer';
import ObjectEditor from '../Editor/Elements/ObjectEditor';
import EditBlock from '../Editor/Components/EditBlock';

type AntBarCodeType = {
    cmp: any,
    setVisible?: (v: boolean) => void
}
const AntBarCodeEdit: React.FC<AntBarCodeType> = ({
    cmp, setVisible = () => {
    }
}) => {
    const rootState = useTypedSelector((state: RootState) => state)

    let model = {...cmp, props: {...cmp.props}}
    const [props, setProps] = useState({...model.props})
    const [options, setOptions] = useState<IBarCodeOptions>({...model.options})
    const [value, setValue] = useState<string>(model.value)
    const [acl, setAcl] = useState<string>(model.acl)
    const [addiction, setAddiction] = useState<number | ''>(model.addiction)
    const [anchor, setAnchor] = useState<string>(model.anchor)

    const {cmpUpdate} = useActions()

    let txt = transliterate(mappedText(rootState, value))
    txt = txt === '' ? ' ' : txt
    const {inputRef} = useBarcode({
        options: options,
        value: txt
    })

    useEffect(() => {
        model.options = options
        model.value = value
        model.props = props
        model.acl = acl
        model.addiction = addiction
        model.anchor = anchor

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options, value, props, acl, anchor, addiction])

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
                <Card size="small" className="cardEdit">
                    <canvas ref={inputRef} />
                </Card>

                <Card size="small" className="cardEdit">
                    <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction} />
                </Card>

                <Card size="small" className="cardEdit cardEditAcl">
                    <EditAcl item={acl} setItem={setAcl} />
                </Card>

                <EditBlock title="Props">
                    <ObjectEditor object={props} setObject={setProps} />
                </EditBlock>

                <Card size="small" className="cardEdit">
                    <h3>Anchor</h3>
                    <Input value={anchor && anchor} className="lcEditorInput" onChange={(e) => {
                        setAnchor(e.currentTarget.value)
                    }} />
                </Card>
            </Col>

            <Col span={12}>
                <Card size="small" className="cardEdit">
                    <ItemEdit label="value" item={value} setItem={setValue} nullable={true} del={false} type="string" />

                    <ObjectFixedEditor object={options} setObject={setOptions} template={
                        {
                            format: {
                                type: 'string',
                                title: 'format',
                                widthLabel: '120px'
                            },
                            width: {
                                type: 'number',
                                title: 'width',
                                widthLabel: '120px'
                            },
                            height: {
                                type: 'number',
                                title: 'height',
                                widthLabel: '120px'
                            },
                            displayValue: {
                                type: 'boolean',
                                title: 'displayValue',
                                widthLabel: '120px'
                            },
                            // text: {
                            //     type: 'string',
                            //     title: 'text',
                            //     widthLabel: '120px'
                            // },
                            fontOptions: {
                                type: 'string',
                                title: 'fontOptions',
                                widthLabel: '120px'
                            },
                            font: {
                                type: 'string',
                                title: 'font',
                                widthLabel: '120px'
                            },
                            textAlign: {
                                type: 'select',
                                title: 'textAlign',
                                widthLabel: '120px',
                                items: ["left", "center", "right"]
                            },
                            textPosition: {
                                type: 'select',
                                title: 'textPosition',
                                widthLabel: '120px',
                                items: ["bottom", "top"]
                            },
                            textMargin: {
                                type: 'number',
                                title: 'textMargin',
                                widthLabel: '120px'
                            },
                            fontSize: {
                                type: 'number',
                                title: 'fontSize',
                                widthLabel: '120px'
                            },
                            background: {
                                type: 'string',
                                title: 'background',
                                widthLabel: '120px'
                            },
                            lineColor: {
                                type: 'string',
                                title: 'lineColor',
                                widthLabel: '120px'
                            },
                            margin: {
                                type: 'number',
                                title: 'margin',
                                widthLabel: '120px'
                            },
                            marginTop: {
                                type: 'number',
                                title: 'marginTop',
                                widthLabel: '120px'
                            },
                            marginBottom: {
                                type: 'number',
                                title: 'marginBottom',
                                widthLabel: '120px'
                            },
                            marginLeft: {
                                type: 'number',
                                title: 'marginLeft',
                                widthLabel: '120px'
                            },
                            marginRight: {
                                type: 'number',
                                title: 'marginRight',
                                widthLabel: '120px'
                            },
                            flat: {
                                type: 'boolean',
                                title: 'flat',
                                widthLabel: '120px'
                            }
                        }
                    } />
                </Card>
            </Col>
        </Row>

        <ButtonBlock onApply={onApply} onClose={onClose} />
    </>
};

export default AntBarCodeEdit;