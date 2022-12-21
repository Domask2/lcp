import React, {useEffect, useState} from 'react';
import {Card, Col, Input, InputNumber, Row, Slider, Space} from "antd";
import {useActions} from "../../../hooks/useActions";
import ButtonBlock from "../Editor/ButtonBlock";
import EditBlock from "../Editor/Components/EditBlock";
import EditStyle from "../Editor/Components/EditStyle";
import EditAcl from "../Editor/Components/EditAcl";
import AddictionContainer from '../../addiction/AddictionContainer';

type AndRowEdit = {
    cmp: any,
    setVisible?: (v: boolean) => void
}
const AntRowEdit: React.FC<AndRowEdit> = ({
    cmp, setVisible = () => {
    }
}) => {
    const {cmpUpdate} = useActions()
    let model = {...cmp, props: {...cmp.props}}

    const [gutter, setGutter] = useState(model.props.gutter)
    const [style, setStyle] = useState({...model.style})
    const [acl, setAcl] = useState(model.acl)
    const [addiction, setAddiction] = useState<number | ''>(model.addiction ? model.addiction : '')
    const [anchor, setAnchor] = useState<string>(model.anchor);

    useEffect(() => {
        model.props.gutter = gutter
        model.style = style
        model.acl = acl
        model.addiction = addiction
        model.anchor = anchor

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gutter, style, acl, addiction, anchor])

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
            <Col span={24}>
                <Card className="cardEdit">
                    <Row>
                        <Col span={24}>
                            <h3>Gutter - отступы между колонками</h3>
                        </Col>

                        <Col span={12} style={{marginBottom: '16px'}}>
                            <Row gutter={[16, 16]} style={{marginBottom: '16px'}}>

                                <Col style={{width: '110px'}}>
                                    <Space style={{paddingTop: '3px'}}>
                                        Слева/справа
                                    </Space>
                                </Col>

                                <Col style={{width: '170px'}}>
                                    <Slider
                                        min={0}
                                        max={64}
                                        onChange={(val) => {
                                            setGutter([val, gutter[1]])
                                        }}
                                        value={gutter[0]}
                                        step={8}
                                        marks={{
                                            0: '0',
                                            16: '16',
                                            32: '32',
                                            48: '48',
                                            64: '64',
                                        }}
                                    />
                                </Col>

                                <Col>
                                    <InputNumber
                                        min={0}
                                        max={64}
                                        size="small"
                                        style={{width: '60px'}}
                                        onChange={(val) => {
                                            setGutter([val, gutter[1]])
                                        }}
                                        value={gutter[0]}
                                    />
                                </Col>
                            </Row>

                            <Row gutter={[16, 16]} style={{marginBottom: '16px'}}>
                                <Col style={{width: '110px'}}>
                                    <Space style={{paddingTop: '3px'}}>
                                        Сверху/снизу
                                    </Space>
                                </Col>

                                <Col style={{width: '170px'}}>
                                    <Slider
                                        min={0}
                                        max={64}
                                        onChange={(val) => {
                                            setGutter([gutter[0], val])
                                        }}
                                        value={gutter[1]}
                                        step={8}
                                        marks={{
                                            0: '0',
                                            16: '16',
                                            32: '32',
                                            48: '48',
                                            64: '64',
                                        }}
                                    />
                                </Col>

                                <Col>
                                    <InputNumber
                                        min={0}
                                        max={64}
                                        size="small"
                                        style={{width: '60px'}}
                                        onChange={(val) => {
                                            setGutter([gutter[0], val])
                                        }}
                                        value={gutter[1]}
                                    />
                                </Col>
                            </Row>
                        </Col>

                        <Col span={12}>
                            <Row gutter={[
                                gutter[0] === undefined || gutter[0] === null ? 0 : gutter[0],
                                gutter[1] === undefined || gutter[1] === null ? 0 : gutter[1]
                            ]}>
                                <Col span={12}>
                                    <Card size="small" style={{
                                        textAlign: "center",
                                        border: '3px dashed #91d5ff',
                                        color: '#66c5ff',
                                        fontWeight: 'bold'
                                    }}>1</Card>
                                </Col>
                                <Col span={12}>
                                    <Card size="small" style={{
                                        textAlign: "center",
                                        border: '3px dashed #91d5ff',
                                        color: '#66c5ff',
                                        fontWeight: 'bold'
                                    }}>2</Card>
                                </Col>
                                <Col span={12}>
                                    <Card size="small" style={{
                                        textAlign: "center",
                                        border: '3px dashed #91d5ff',
                                        color: '#66c5ff',
                                        fontWeight: 'bold'
                                    }}>3</Card>
                                </Col>
                                <Col span={12}>
                                    <Card size="small" style={{
                                        textAlign: "center",
                                        border: '3px dashed #91d5ff',
                                        color: '#66c5ff',
                                        fontWeight: 'bold'
                                    }}>4</Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Col>

            <Col span={12}>
                <Card size="small" className="cardEdit cardEditAcl">
                    <EditAcl item={acl} setItem={setAcl} />
                </Card>
                <Card size="small" className="cardEdit">
                    <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction} />
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

export default AntRowEdit;