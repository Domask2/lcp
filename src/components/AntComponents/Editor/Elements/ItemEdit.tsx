import React from 'react';
import {Button, Col, Input, Row, Select} from "antd";
import {DeleteOutlined} from '@ant-design/icons';

const {Option} = Select;

type TableColumnItemType = {
    label?: string
    item: any
    setItem: (item: any) => void
    del?: boolean
    type?: "number" | "string" | "select" | "boolean"
    mode?: "multiple" | "tags" | "none"
    selectItems?: Array<any>
    nullable?: boolean
    labelWidth?: string
    cmp?: any
}
const ItemEdit: React.FC<TableColumnItemType> = ({
    label,
    item,
    setItem,
    del = true,
    type = "string",
    mode = "",
    selectItems,
    nullable = false,
    labelWidth = '80px',
    cmp
}) => {
    let selectMode: {mode: "multiple" | "tags"} | {} = mode !== "none"
        ? {
            mode: mode
        }
        : {}

    return <>{((item !== undefined && item !== null) || nullable) &&
        <Row>
            <Col flex={labelWidth}>
                {label}
            </Col>
            <Col style={{display: 'flex'}} flex="auto">
                {
                    (type === 'string' || type === 'number') &&
                    <Input
                        className="lcEditorInput"
                        size="small"
                        onChange={(e) => {
                            setItem(e.currentTarget.value)
                        }}
                        value={item}
                    />
                }


                {
                    type === 'select' && <Select {...selectMode} style={{
                        width: '100%',
                        borderBottom: '1px solid #eee',
                        backgroundColor: '#fff'
                    }}
                        bordered={false}
                        size="small"
                        defaultValue={item}
                        onChange={(e) => {
                            setItem(e)
                        }}>
                        {selectItems?.map((item, index) =>
                            <Option key={index} value={item}>{item}</Option>)
                        }
                    </Select>
                }
            </Col>
            {del &&
                <Col flex="20px">
                    <Button type="link" style={{width: '8%', height: 1, lineHeight: 1, marginLeft: '5px'}} danger
                        icon={<DeleteOutlined />} onClick={() => setItem(undefined)} />
                </Col>
            }
        </Row>
    }</>
};

export default ItemEdit;