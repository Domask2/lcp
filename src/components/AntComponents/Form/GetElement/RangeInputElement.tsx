import React from "react";
import {Col, Form, Input, Select} from "antd";

export const RangeInputElement = (item:any) => {
    return (
        <Col span={24} key={item.props.name} style={{padding: '0px'}}>
            <Col span={24}>
                <Form.Item label={item.props.label}
                           name={item.props.name + '1'}
                           key={item.props.name + '1'}
                           style={{marginBottom: '0px'}}>
                    <Input placeholder={'от'}
                           addonBefore={
                               <Form.Item initialValue=">"
                                          name={"prefix_" + item.props.name + '1'}
                                          noStyle>
                                   <Select style={{width: '61.5px'}} className="select-range-input">
                                       <Select.Option value=">">{'>'}</Select.Option>
                                       <Select.Option value=">=">{'>='}</Select.Option>
                                   </Select>
                               </Form.Item>
                           }
                    />

                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item style={{display: 'flex', justifyContent: 'end'}}
                           name={item.props.name + '2'}
                           key={item.props.name + '2'}>
                    <Input placeholder={'до'}
                           addonBefore={
                               <Form.Item initialValue="<="
                                          name={"prefix_" + item.props.name + '2'}
                                          noStyle>
                                   <Select style={{width: '61.5px'}} className="select-range-input">
                                       <Select.Option value="<">{'<'}</Select.Option>
                                       <Select.Option value="<=">{'<='}</Select.Option>
                                   </Select>
                               </Form.Item>
                           }
                    />
                </Form.Item>
            </Col>
        </Col>
    )
}