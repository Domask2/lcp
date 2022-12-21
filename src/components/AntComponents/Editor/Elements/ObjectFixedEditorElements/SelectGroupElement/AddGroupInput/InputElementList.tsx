import React, {FC} from 'react';
import {ActionsType, SetObjectType} from "../../../ObjectFixedEditor";

import {Button, Col, Input, Popconfirm, Row} from "antd";
import {DeleteOutlined, MoreOutlined} from "@ant-design/icons";

interface InputElementRowProps {
    index: number
    setObject: (o: (o: SetObjectType) => SetObjectType) => void
    act: ActionsType
    object: SetObjectType
    showModal: (item: SetObjectType, index: number) => void
}

export const InputElementList: FC<InputElementRowProps> = ({
                                                               index,
                                                               act,
                                                               object,
                                                               setObject,
                                                               showModal
                                                           }) => {

    const handlerOnConfirm = () => {
        let newList: Array<ActionsType> = []
        if (object.actions !== undefined) {
            object?.actions.forEach((item: ActionsType, ind: number) => {
                if (ind !== index)
                    newList.push(item)
            })

            setObject((o: SetObjectType) => {
                let newObj: SetObjectType = {...o}
                newObj['actions'] = newList
                return newObj
            })
        }
    }

    return (
        <Row key={index}>
            <Col flex='auto'>
                <Input value={act.actionName}
                       className="lcEditorInput"
                       placeholder='action'
                       style={{width: '100%', borderLeft: '1px solid #eee'}}
                />
            </Col>

            <Col flex='20px'>
                <Button
                    size='small'
                    icon={<MoreOutlined/>}
                    style={{width: '100%', border: 'none'}}
                    onClick={() => showModal && showModal(object, index)}
                />

            </Col>

            <Col flex="20px">
                <Popconfirm
                    placement="right" title='Точно удалить?'
                    okText="Yes" cancelText="No"
                    onConfirm={handlerOnConfirm}
                >
                    <Button
                        type="link"
                        style={{width: '100%', border: 'none', height: 1, lineHeight: 1}}
                        danger
                        icon={<DeleteOutlined/>}
                    />
                </Popconfirm>
            </Col>
        </Row>
    )
}