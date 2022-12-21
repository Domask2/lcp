import React from 'react';
import {DeleteOutlined} from '@ant-design/icons';
import {Button, Card, Col, Input, Popconfirm, Row, Select} from "antd";
import ObjectEditor from "../Editor/Elements/ObjectEditor";
import {TypeAddictions} from '../../../utils';


type TableCellStyleAddictionType = {
    arrLength: number
    addict: any
    addictIndex: number
    delItem?: any
    addItem?: any
    changeItem?: any
    moveItem?: any
}


const TableCellStyleAddict: React.FC<TableCellStyleAddictionType> = ({arrLength, addict, addictIndex, delItem, addItem, changeItem, moveItem}) => {

    return (
        <Card size="small">
            <Row style={{width: '100%', justifyContent: 'space-between', marginBottom: '5px'}}>
                <Col flex="120px">
                    Условие
                </Col>
                <Col flex="auto">
                    <Input
                        style={{
                            width: '100%'
                        }}
                        onChange={(e: any) => changeItem(addictIndex, {...addict, value: e.target.value})}
                        placeholder={"не указано"}
                        value={addict.value}
                        addonBefore={
                            <Select key={`${addictIndex}_${addict.type}`} value={addict.type}
                                onChange={(e: any) => changeItem(addictIndex, {...addict, type: e})}
                                style={{borderTop: "none", width: '150px'}} className="select-before">
                                <Select.Option value="">{''}</Select.Option>
                                {Object.values(TypeAddictions).map((item: any) => {
                                    return <Select.Option value={item.value}>{item.title}</Select.Option>
                                })}
                            </Select>
                        }
                        required
                    />
                </Col>
                <Col flex="20px">
                    <Popconfirm placement="right" title='Точно удалить?' onConfirm={() => changeItem(addictIndex, {...addict, type: '', value: ''})}
                        okText="Yes" cancelText="No">
                        <Button type="link" style={{width: '100%', height: 1, lineHeight: 1}} danger
                            icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Col>
            </Row>
            <Row style={{width: '100%', justifyContent: 'space-between'}}>
                <Col flex="120px">
                    Style
                </Col>
                <Col flex="auto">
                    <ObjectEditor
                        autoCss={true}
                        object={addict.style}
                        setObject={(styleObj: any) => changeItem(addictIndex, {...addict, style: styleObj})} />
                </Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
                {arrLength - 1 === addictIndex && <Button onClick={addItem} style={{marginRight: '10px'}} size='small' type="primary">Добавить условие +</Button>}
                <Button onClick={() => moveItem(addictIndex, addict, true)} style={{marginRight: '10px'}} size='small' disabled={!addictIndex}>Поднять</Button>
                <Button onClick={() => moveItem(addictIndex, addict, false)} style={{marginRight: '10px'}} size='small' disabled={arrLength - 1 === addictIndex}>Опустить</Button>
                <Button onClick={() => delItem(addictIndex)} style={{marginRight: '10px'}} size='small' danger>Удалить</Button>
            </Row>
        </Card>
    )

}

export default TableCellStyleAddict;