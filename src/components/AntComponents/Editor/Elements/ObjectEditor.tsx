import React, {useState} from 'react';
import {useFocus} from "../../../../hooks";

import {AutocompleteCss} from "autocomplite-css";
import 'autocomplite-css/dist/index.css';

import {Button, Col, Input, Popconfirm, Row} from "antd";
import {DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {KeyCode} from "../../../../utils";

/**
 * Компонент для редактирования объектов
 *
 * Компонента принимает:
 *  - object - сам объект
 *  - setList - callback функция принимающая новый массив для обновления в системе
 */

type ObjectEditorType = {
    object: any
    setObject: any
    autoCss?: boolean
}

const ObjectEditor: React.FC<ObjectEditorType> = ({object, setObject, autoCss}) => {
    const [inputRef, setInputRef] = useFocus();
    const [newItemKey, setNewItemKey] = useState<string>('')
    const [newItemVal, setNewItemVal] = useState<string>('')

    const changeItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [key, typ] = e.currentTarget.name.split('##')
        let val = e.currentTarget.value

        let newObject: any = {}
        switch (typ) {
            case 'key': //меняем ключ !!!! НЕ ИСПОЛЬЗУЕТСЯ !!!!!
                Object.keys(object).filter(k => {
                    if (key !== k)
                        newObject[k] = object[k]
                    return false
                })

                val = val === '' ? val = 'empty' : val
                newObject[val] = object[key]
                setObject(newObject)
                break
            case 'val': //меняем значение
                newObject = {...object}
                newObject[key] = val
                setObject(newObject)

                break
        }
    }

    const deleteItem = (key: string) => {
        let newObject: any = {}
        Object.keys(object).forEach(k => {
            if (k !== key)
                newObject[k] = object[k]
        })
        setObject(newObject)
    }

    const addItem = () => {
        let newObject = {...object}
        if (newItemKey !== undefined) {
            newObject[newItemKey] = newItemVal
            setObject(newObject)
        }
        setNewItemKey('')
        setNewItemVal('')
    }

    // @ts-ignore
    return <>
        {/*разметка объектов*/}
        {
            object && Object.keys(object).map((key, index) => <Row key={index}>
                <Col flex="120px">
                    {key}
                </Col>
                <Col flex="auto">
                    <Input value={object[key]} style={{borderLeft: '1px dashed #ddd'}} className="lcEditorInput"
                        name={key + '##val##' + index} onChange={changeItem} />
                </Col>
                <Col flex="20px">
                    <Popconfirm placement="right" title='Точно удалить?' onConfirm={() => deleteItem(key)}
                        okText="Yes" cancelText="No">
                        <Button type="link" style={{width: '100%', height: 1, lineHeight: 1}} danger
                            icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Col>
            </Row>
            )
        }

        {/*создание нового объекта*/}
        <Row>
            {autoCss ? (
                <Col
                    flex="120px"
                // style={{marginTop: '10px'}}
                >
                    <AutocompleteCss
                        refInput={inputRef}
                        className={"lcEditorInput focusInputStyle"}
                        style={{borderBottom: '1px dashed #ddd'}}
                        valueInput={newItemKey}
                        onClick={setNewItemKey}
                    />
                </Col>
            ) : (
                <Col flex="120px"
                // style={{marginTop: '10px'}} 
                >

                    <Input value={newItemKey}
                        ref={inputRef}
                        className="lcEditorInput focusInputStyle"
                        style={{borderBottom: '1px dashed #ddd'}}
                        onChange={(e: any) => {
                            setNewItemKey(e.currentTarget.value)
                        }} />
                </Col>
            )}

            <Col flex="auto"
            //  style={{marginTop: '10px'}}
            >
                <Input value={newItemVal}
                    className="lcEditorInput"
                    style={{borderBottom: '1px dashed #ddd', borderLeft: '1px dashed #ddd'}}
                    onKeyDown={(e) => {
                        if (e.code === KeyCode.ENTER || e.code === KeyCode.NUM_ENTER) {
                            addItem()
                            setInputRef()
                        }
                    }}
                    onChange={(e) => {
                        setNewItemVal(e.currentTarget.value)
                    }} />
            </Col>
            <Col
                flex="20px"
            // style={{marginTop: '10px'}}
            >
                <Button type="link" style={{width: '100%', height: 1, lineHeight: 1}}
                    onClick={addItem} icon={<PlusCircleOutlined />} />
            </Col>
        </Row>
    </>
};

export default ObjectEditor;