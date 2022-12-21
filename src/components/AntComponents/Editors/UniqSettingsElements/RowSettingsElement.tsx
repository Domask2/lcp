import React, {memo} from "react";
import {Card, Col, InputNumber, Row, Slider, Space} from 'antd';

type RowSettingsElementType = {
    setValue: any
    value: any
}

const RowSettingsElement: React.FC<RowSettingsElementType> = ({setValue, value}) => {

    return <>
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
                                        setValue([val, value[1]])
                                    }}
                                    value={value[0]}
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
                                        setValue([val, value[1]])
                                    }}
                                    value={value[0]}
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
                                        setValue([value[0], val])
                                    }}
                                    value={value[1]}
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
                                        setValue([value[0], val])
                                    }}
                                    value={value[1]}
                                />
                            </Col>
                        </Row>
                    </Col>

                    <Col span={12}>
                        <Row gutter={[
                            value[0] === undefined || value[0] === null ? 0 : value[0],
                            value[1] === undefined || value[1] === null ? 0 : value[1]
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
    </>
}

export default memo(RowSettingsElement)