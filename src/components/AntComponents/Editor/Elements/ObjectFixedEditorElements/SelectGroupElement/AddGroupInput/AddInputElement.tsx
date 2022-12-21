import React, {FC} from 'react';
import {ActionsType, SetObjectType} from "../../../ObjectFixedEditor";

import {Button, Col, Input, Row} from "antd";
import {ControlOutlined, PlusCircleOutlined} from "@ant-design/icons";

interface AddInputElementProps {
    newItem: ActionsType
    inputActionAdd: string
    setObject: (o: (o: SetObjectType) => SetObjectType) => void,
    setInputActionAdd: (s: string) => void
    openNewAction: () => void
}

export const AddInputElement: FC<AddInputElementProps> = ({
                                                              newItem,
                                                              inputActionAdd,
                                                              setObject,
                                                              setInputActionAdd,
                                                              openNewAction,
                                                          }) => {

    const handlerOnClickAdd = () => {
        setObject((o: SetObjectType) => {
            let newObj: SetObjectType = {...o}
            if (newObj['actions']) {
                newObj['actions'] = [...newObj['actions'], newItem]
            } else {
                newObj['actions'] = [newItem]
            }
            return newObj
        })
        setInputActionAdd('')
    }

    return (
        <Row>
            <Col flex='auto'>
                <Input
                    onChange={() => null}
                    value={inputActionAdd}
                    placeholder='action'
                    className="lcEditorInput"
                    style={{width: '100%', borderLeft: '1px solid #eee'}}
                />
            </Col>
            <Col flex='20px'>
                <Button
                    onClick={openNewAction}
                    size='small'
                    icon={<ControlOutlined/>}
                    style={{width: '100%', border: 'none'}}
                />
            </Col>
            <Col flex='20px'>
                <Button
                    size='small'
                    type='link'
                    style={{width: '100%', border: 'none', height: 1, lineHeight: 1}}
                    onClick={handlerOnClickAdd}
                    icon={<PlusCircleOutlined/>}
                />
            </Col>
        </Row>
    )
}