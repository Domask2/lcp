import React from "react";
import {Button, Checkbox, Col, Input, Popconfirm, Row} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

interface ArrayEditorListType {
    index: number
    obj: {name: any, clear:any}
    onConfirm?: () => void
    onRemoveName?: (e:any) => void
    onCheckbox?: (e:any) => void
}

const ArrayEditorList: React.FC<ArrayEditorListType> = ({index, obj, onConfirm, onRemoveName, onCheckbox}) => {
    return (
        <Row key={index} style={{marginBottom:'2px'}}>
            <Col flex="90px">
                {/*{Object.keys(obj)}*/}
                <Input value={Object.keys(obj)} style={{borderLeft: '1px dashed #ddd', fontSize:'14px', backgroundColor:'#f7f7f7'}}
                       className="lcEditorInput"
                       name={obj + '##val##' + index}
                       size={'small'}
                       onChange={onRemoveName}
                />
            </Col>
            <Col flex="auto">
                <Input value={Object.values(obj)[0].name} style={{borderLeft: '1px dashed #ddd'}}
                       className="lcEditorInput"
                       name={obj + '##val##' + index}
                />
            </Col>
            {
                 Object.values(obj)[0].type === 'fly' && <Col flex="20px">
                    <Checkbox onChange={onCheckbox} defaultChecked={Object.values(obj)[0].clear}>Clear</Checkbox>
                </Col>
            }

            <Col flex="20px">
                <Popconfirm placement="right" title='Точно удалить?' onConfirm={onConfirm}
                            okText="Yes" cancelText="No">
                    <Button type="link" style={{width: '8%', height: 1, lineHeight: 1}} danger
                            icon={<DeleteOutlined/>}/>
                </Popconfirm>
            </Col>
        </Row>
    )
}

export default ArrayEditorList;