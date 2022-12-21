import React from 'react';

import ArrayEditor from "./ArrayEditor";
import {SwitchElement} from "./ObjectFixedEditorElements/SwitchElement";
import {InputElement} from "./ObjectFixedEditorElements/InputElement";
import {SelectElement} from "./ObjectFixedEditorElements/SelectElement";
import {SelectGroupElement} from "./ObjectFixedEditorElements/SelectGroupElement/SelectGroupElement";

import {Col, Row, Typography} from "antd";
import {IForm} from "../../Page/templates";
const {Text} = Typography;

/**
 * Компонент для редактирования объектов
 *
 * Компонента принимает:
 *  - object - сам объект
 *  - setList - callback функция принимающая новый массив для обновления в системе
 *  - template - объект с описанием создаваемого элемента
 */

export type TemplateType = {
    [p: string]: {
        type: "boolean" | "string" | "number" | "select" | "select-input" | "multi-select" | "actions" | "modal"
        title: string
        widthLabel?: string
        items?: Array<string> | any
        visible?: boolean
        default?: boolean
        filter?: boolean
        description?: string
        popover?: any
    }
}

export interface ActionsType {
    actionName: string
    actionParams: [string]
    params: [{ [p: string]: string }]
    reloadDS: [string]
    source: string
    type: string
}

export interface SetObjectType {
    actions?: Array<ActionsType>
    actions1?: any
    actionsSubmit?: Array<ActionsType>
    actionsSubmitFilter?: Array<ActionsType>
    auto: boolean
    title: string
    type: 'action' | 'filter' // | 'create' | 'update'
    undefined: boolean
    visible: boolean
    isBtnFilter?: boolean
    typeSubmit: string
    titleBtnFilter: string
}

interface ObjectEditorType {
    cmp?: IForm
    template: TemplateType
    object: SetObjectType | any
    setObject: any
}

const ObjectFixedEditor: React.FC<ObjectEditorType> = ({
                                                           cmp,
                                                           template,
                                                           object,
                                                           setObject,
                                                       }) => {
    return <>
        {
            Object.keys(template).map((key, index) => {
                if (object === undefined) object = []
                if (typeof object === 'string') {
                    return [object]
                }


                if (object[key] === undefined) object[key] = ''
                if (template[key].visible || template[key].visible === undefined)
                    return <Row key={index}>
                        <Col flex={template[key].widthLabel}
                             className={template[key].title === 'action' ? 'marginTop10' : ''}>

                            {
                                template[key].popover ? template[key].popover : <Text>{template[key]?.title}</Text>
                            }

                        </Col>

                        <Col flex="auto">
                            {
                                template[key]?.type === 'boolean' && (
                                    <SwitchElement
                                        objectKey={object[key]}
                                        keyElement={key}
                                        setObject={setObject}/>
                                )
                            }

                            {
                                (template[key]?.type === 'string' || template[key]?.type === 'number') && (
                                    <InputElement
                                        objectKey={object[key]}
                                        keyElement={key}
                                        setObject={setObject}
                                        templateKeyType={template[key]?.type}
                                        templateKeyTitle={template[key]?.title}/>
                                )
                            }

                            {
                                template[key]?.type === 'select' && (
                                    <SelectElement
                                        objectKey={object[key]}
                                        keyElement={key}
                                        setObject={setObject}
                                        templateKeyItems={template[key]?.items}
                                        filter={template[key]?.filter}
                                    />
                                )

                            }

                            {
                                template[key]?.type === 'select-input' && (
                                    <SelectGroupElement
                                        object={object}
                                        setObject={setObject}
                                        templateKeyItems={template[key]?.items}
                                        cmp={cmp!}/>
                                )
                            }

                            {
                                template[key]?.type === 'actions' && (
                                    <ArrayEditor list={object.actions} setList={setObject} cmp={cmp}/>
                                )
                            }

                            {
                                template[key]?.type === 'modal' && (
                                    <ArrayEditor list={object.actions} setList={setObject} cmp={cmp}/>
                                )
                            }

                        </Col>
                    </Row>
                return false
            })
        }
    </>
};

export default ObjectFixedEditor;