import React, {memo} from "react";
import {Col, Input, Row, Select} from 'antd';

type AntInputType = {
    props: any
}

const FlyInputsPreviewElement: React.FC<AntInputType> = ({props}) => {

    return (
        <Row style={{alignItems: 'center'}}>
            <Col
                span={props.value.inputWidth ? 24 - props.value.inputWidth : 10}
                style={{textAlign: "right", paddingRight: "10px", ...props.value.style}}
            >
                {(props.value.inputDescription || props.value.minValue || props.value.maxValue || (props.value.helpMessage && !props.validate)) &&
                    <div style={{
                        height: '20px'
                    }}></div>}
                {`${props.value.caption}: `}
            </Col>
            <Col span={props.value.inputWidth ? props.value.inputWidth : 14}>
                <div style={{
                    color: 'gray',
                    fontSize: '12px',
                    paddingLeft: '11px',
                }}>{props.value.helpMessage} {props.value.inputDescription}{props.value.minValue ? `Минимальное значение: ${props.value.minValue}.` : ''} {props.value.maxValue ? `Максимальное значение: ${props.value.maxValue}` : ''}
                </div>

                <div style={{position: "relative", width: "100%"}}>
                    <Input
                        type={props.value.numeric ? "number" : "text"}
                        min={props.value.minValue}
                        max={props.value.maxValue}
                        style={{
                            width: "100%",
                            cursor: "text",
                            textDecorationStyle: "inherit",
                            ...props.value.inputsStyle,
                        }}
                        placeholder={"не указано"}
                        addonBefore={
                            props.value.prefix ? (
                                <Select key={props.value.key}
                                    style={{borderTop: "none", width: '80px', ...props.value.inputsStyle}} className="select-before">
                                    <Select.Option value="=">{'='}</Select.Option>
                                    <Select.Option value=">">{'>'}</Select.Option>
                                    <Select.Option value="<">{'<'}</Select.Option>
                                    <Select.Option value=">=">{'>='}</Select.Option>
                                    <Select.Option value="<=">{'<='}</Select.Option>
                                    <Select.Option value="!=">{'!='}</Select.Option>
                                    <Select.Option value=">-<">{'>-<'}</Select.Option>
                                    <Select.Option value="__like__">{'like'}</Select.Option>
                                    <Select.Option value="__is_null__">{'is null'}</Select.Option>
                                    <Select.Option value="__is_not_null__">{'is not null'}</Select.Option>
                                </Select>
                            ) : (
                                false
                            )
                        }
                        disabled={props.value.disabled}
                    />
                </div>
            </Col>

        </Row>
    )
}

export default memo(FlyInputsPreviewElement)