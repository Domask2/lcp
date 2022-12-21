import React, {memo} from "react";
import {Card, Col, Row, Slider, Space} from 'antd';
import {marks} from "../../../../utils";

type ColSettingsElementType = {
    setValue: any
    value: any
}

const ColSettingsElement: React.FC<ColSettingsElementType> = ({setValue, value}) => {

    const handleChange = (val: number, key: string) => {
        setValue({
            ...value,
            [key]: val
        })
    }

    return <>
        <Col span={24}>
            <Card className="cardEdit" size="small">
                <Row gutter={[16, 16]} style={{marginBottom: '16px'}}>

                    <Col style={{width: '130px'}}>
                        <Space style={{paddingTop: '3px'}}>
                            Размер колонки span
                        </Space>
                    </Col>

                    <Col style={{width: 'calc(100% - 130px)'}}>
                        <Slider
                            min={1}
                            max={24}
                            onChange={(val) => {
                                handleChange(val, 'span')
                            }}
                            value={value.span}
                            step={1}
                            marks={marks}
                        />
                    </Col>
                </Row>

                <Row gutter={[16, 16]} style={{marginBottom: '16px'}}>

                    <Col style={{width: '130px'}}>
                        <Space style={{paddingTop: '3px'}}>
                            Размер колонки XS
                        </Space>
                    </Col>

                    <Col style={{width: 'calc(100% - 130px)'}}>
                        <Slider
                            min={1}
                            max={24}
                            onChange={(val) => {
                                handleChange(val, 'xs')
                            }}
                            value={value.xs}
                            step={1}
                            marks={marks}
                        />
                    </Col>
                </Row>

                <Row gutter={[16, 16]} style={{marginBottom: '16px'}}>

                    <Col style={{width: '130px'}}>
                        <Space style={{paddingTop: '3px'}}>
                            Размер колонки SM
                        </Space>
                    </Col>

                    <Col style={{width: 'calc(100% - 130px)'}}>
                        <Slider
                            min={1}
                            max={24}
                            onChange={(val) => {
                                handleChange(val, 'sm')
                            }}
                            value={value.sm}
                            step={1}
                            marks={marks}
                        />
                    </Col>
                </Row>

                <Row gutter={[16, 16]} style={{marginBottom: '16px'}}>

                    <Col style={{width: '130px'}}>
                        <Space style={{paddingTop: '3px'}}>
                            Размер колонки MD
                        </Space>
                    </Col>

                    <Col style={{width: 'calc(100% - 130px)'}}>
                        <Slider
                            min={1}
                            max={24}
                            onChange={(val) => {
                                handleChange(val, 'md')
                            }}
                            value={value.md}
                            step={1}
                            marks={marks}
                        />
                    </Col>
                </Row>

                <Row gutter={[16, 16]} style={{marginBottom: '16px'}}>

                    <Col style={{width: '130px'}}>
                        <Space style={{paddingTop: '3px'}}>
                            Размер колонки LG
                        </Space>
                    </Col>

                    <Col style={{width: 'calc(100% - 130px)'}}>
                        <Slider
                            min={1}
                            max={24}
                            onChange={(val) => {
                                handleChange(val, 'lg')
                            }}
                            value={value.lg}
                            step={1}
                            marks={marks}
                        />
                    </Col>
                </Row>

                <Row gutter={[16, 16]} style={{marginBottom: '16px'}}>

                    <Col style={{width: '130px'}}>
                        <Space style={{paddingTop: '3px'}}>
                            Размер колонки XL
                        </Space>
                    </Col>

                    <Col style={{width: 'calc(100% - 130px)'}}>
                        <Slider
                            min={1}
                            max={24}
                            onChange={(val) => {
                                handleChange(val, 'xl')
                            }}
                            value={value.xl}
                            step={1}
                            marks={marks}
                        />
                    </Col>
                </Row>

                <Col span={24}>
                    <Row gutter={[16, 16]}>
                        <Col span={value.span}>
                            <Card size="small" style={{
                                textAlign: "center",
                                border: '3px dashed #91d5ff',
                                color: '#66c5ff',
                                fontWeight: 'bold'
                            }}>1</Card>
                        </Col>
                        <Col span={24 - value.span}>
                            <Card size="small" style={{
                                textAlign: "center",
                                border: '3px dashed #eee',
                                color: '#ddd',
                                fontWeight: 'bold'
                            }}>2</Card>
                        </Col>
                    </Row>
                </Col>
            </Card>
        </Col>

    </>
}

export default memo(ColSettingsElement)