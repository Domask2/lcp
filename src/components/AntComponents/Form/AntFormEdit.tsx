import React, {useEffect, useState} from 'react';

import {useActions, useTypedSelector} from "../../../hooks";
import {getDataSourcesAll} from "../../../redux/ds/ds.selector";

import AddictionContainer from '../../addiction/AddictionContainer';
import ObjectFixedEditor from "../Editor/Elements/ObjectFixedEditor";
import ItemEdit from "../Editor/Elements/ItemEdit";
import ButtonBlock from "../Editor/ButtonBlock";
import ObjectEditor from "../Editor/Elements/ObjectEditor";
import FormItemsEdit from "./FormItemsEdit";
import EditBlock from "../Editor/Components/EditBlock";
import EditStyle from "../Editor/Components/EditStyle";
import EditAcl from "../Editor/Components/EditAcl";

import {Card, Col, Input, Row, Switch, Tabs} from "antd";

import {RootState} from "../../../redux/redux.store";
import {IForm} from "../Page/templates";
import {NotificationType} from "../../../notification/types";

const {TabPane} = Tabs;

/**
 * Режим редактирования формы
 * каждый отдельный режим обарачивается в Card (actions, submit, reset и тд)
 *
 * Для отрисовки элементов используютсья след компоненты:
 * ItemEdit - отрисовка простого input или select
 * ObjectFixedEditor - продвинутая отрисовка элементов (передаем в template объект с элементами для отрисвоки,
 * есть visible(условие по которому отрисуется элемент))
 *
 */

type AndFormEditType = {
    cmp: IForm,
    setVisible?: (v: boolean) => void
}

const AntFormEdit: React.FC<AndFormEditType> = ({
    cmp, setVisible = () => {
    }
}) => {

    const dsArr = useTypedSelector((state: RootState) => getDataSourcesAll(state))
    const {cmpUpdate, setLsVars} = useActions()
    let model = {...cmp}

    const [items, setItems] = useState([...model.items])
    const [colSpan, setColSpan] = useState(model.colSpan)
    const [source, setSource] = useState(model?.source?.includes('selected') ? model?.source?.split('-')[1] : model?.source ? model?.source : '')
    const [size, setSize] = useState(model.size)
    const [submit, setSubmit] = useState({...model.submit})
    const [reset, setReset] = useState({...model.reset})

    const [name, setName] = useState(model.props.name)
    const [labelCol, setLabelCol] = useState({...model.props.labelCol})
    const [wrapperCol, setWrapperCol] = useState({...model.props.wrapperCol})
    const [initialValues, setInitialValues] = useState({...model.props.initialValues})

    const clName = cmp.className !== undefined ? cmp.className : ''
    const [className, setClassName] = useState<string>(clName)
    const [style, setStyle] = useState({...model.style})
    const [acl, setAcl] = useState(model.acl)
    const [addiction, setAddiction] = useState<number | ''>(model.addiction ? model.addiction : '')
    const [anchor, setAnchor] = useState<string>(model.anchor ? model.anchor : '');
    const [notify, setNotify] = useState<NotificationType>({...model.notify!})
    const [adKey, setAddKey] = useState<string>(model.adKey ? model.adKey : '');

    const [checked, setChecked] = useState<boolean>(!!model.checked)

    useEffect(() => {
        model.items = items
        model.colSpan = colSpan
        !checked ? model.source = source : model.source = `selected-${source}`
        model.checked = checked
        model.size = size
        model.submit = submit
        model.reset = reset
        model.adKey = adKey
        model.props.name = name
        model.props.labelCol = labelCol
        model.props.wrapperCol = wrapperCol
        model.props.initialValues = initialValues
        model.className = className
        model.style = style
        model.acl = acl
        model.addiction = addiction
        model.anchor = anchor
        model.notify = notify
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, colSpan, source, size, submit, reset, name, labelCol, wrapperCol, initialValues, className, style, acl, checked, addiction, anchor, notify, adKey])

    useEffect(() => {
        if (model.source.includes('selected')) {
            setSource(model.source.split('-')[1])
        } else {
            setSource(model.source)
        }
    }, [model.source, checked])

    const onClose = () => {
        setVisible(false)
    }

    const onApply = (e:any) => {
        e.stopPropagation()
        adKey && setLsVars(adKey, '');

        let newItems: Array<any> = []
        model.items.forEach(item => {
            if (!item.del)
                newItems.push(item)
        })
        let newModel = {...model, items: newItems}
        cmpUpdate(newModel)
        setVisible(false)
    }

    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>
        <Tabs defaultActiveKey="1">
            <TabPane tab="Внешний вид" key="1">
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <EditBlock title="Основные настройки">
                            <ItemEdit label="name" item={name} setItem={setName} del={false} labelWidth="90px" />
                            <ItemEdit label="colSpan" item={colSpan} setItem={setColSpan} del={false}
                                labelWidth="90px" />

                            <div style={{marginTop: '12px', marginBottom: '12px'}}>
                                <ItemEdit label="source" item={source} setItem={setSource}
                                    type='select'
                                    selectItems={Object.keys(dsArr)}
                                    del={false} nullable={true} labelWidth="90px" />

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    marginTop: '8px'
                                }}>
                                    <span style={{marginRight: '10px'}}>selected:</span>
                                    <Switch
                                        checked={checked}
                                        onChange={() => {
                                            setChecked(!checked)
                                        }}
                                        size='small' />
                                </div>
                            </div>

                            <ItemEdit label="size" item={size} setItem={setSize}
                                type='select'
                                selectItems={['desc', 'small', 'middle', 'large']}
                                del={false} nullable={true} labelWidth="90px" />

                            <Row>
                                <Col flex="90px">labelCol</Col>
                                <Col flex="auto">
                                    <ObjectFixedEditor object={labelCol}
                                        setObject={setLabelCol}
                                        template={
                                            {
                                                span: {
                                                    type: 'number',
                                                    title: '1 - 24',
                                                    widthLabel: '60px'
                                                }
                                            }
                                        } />
                                </Col>
                            </Row>

                            <Row>
                                <Col flex="90px">wrapperCol</Col>
                                <Col flex="auto">
                                    <ObjectFixedEditor object={wrapperCol}
                                        setObject={setWrapperCol}
                                        template={
                                            {
                                                span: {
                                                    type: 'number',
                                                    title: '1 - 24',
                                                    widthLabel: '60px'
                                                }
                                            }
                                        } />
                                </Col>
                            </Row>
                        </EditBlock>

                        <EditBlock title="Блок - Style">
                            <ItemEdit label="className" item={className} setItem={setClassName} del={false}
                                nullable={true} type="string" labelWidth="120px" />
                            <br />
                            <EditStyle style={style} setStyle={setStyle} />
                        </EditBlock>

                        <Card size="small" className="cardEdit">
                            <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction} />
                        </Card>
                        <Card size="small" className="cardEdit">
                            <h3>Anchor</h3>
                            <Input value={anchor && anchor} className="lcEditorInput" onChange={(e) => {
                                setAnchor(e.currentTarget.value)
                            }} />
                        </Card>


                        <Card size="small" className="cardEdit cardEditAcl">
                            <EditAcl item={acl} setItem={setAcl} />
                        </Card>
                    </Col>

                    <Col span={12}>
                        <EditBlock title="Инициализационные данные">
                            <ObjectEditor object={initialValues} setObject={setInitialValues} />
                        </EditBlock>

                        <EditBlock title="Submit Form">
                            <ObjectFixedEditor object={submit}
                                setObject={setSubmit}
                                cmp={cmp}
                                template={
                                    {
                                        type: {
                                            type: 'select',
                                            title: 'type',
                                            widthLabel: '70px',
                                            items: ['primary', 'ghost', 'dashed', 'link', 'text', 'default']
                                        },
                                        title: {
                                            type: 'string',
                                            title: 'title',
                                            widthLabel: '70px'
                                        },
                                        actions: {
                                            type: 'select-input',
                                            title: 'action',
                                            widthLabel: '70px',
                                            items: ['filter', 'action']
                                        },
                                        auto: {
                                            type: 'boolean',
                                            title: 'auto',
                                            widthLabel: '80px'
                                        },
                                        visible: {
                                            type: 'boolean',
                                            title: 'visible',
                                            default: true,
                                            widthLabel: '80px'
                                        },
                                        closeModal: {
                                            type: 'boolean',
                                            title: 'closeModal',
                                            default: true,
                                            widthLabel: '80px'
                                        },
                                    }
                                } />
                            {submit.closeModal && <>
                                <h4>Addiction Name</h4>
                                <Input value={adKey} className="lcEditorInput" onChange={(e) => {
                                    setAddKey(e.currentTarget.value)
                                }} />
                            </>}
                        </EditBlock>

                        <EditBlock title="Reset">
                            <ObjectFixedEditor object={reset}
                                setObject={setReset}
                                template={
                                    {
                                        type: {
                                            type: 'select',
                                            title: 'type',
                                            widthLabel: '70px',
                                            items: ['primary', 'ghost', 'dashed', 'link', 'text', 'default']
                                        },
                                        title: {
                                            type: 'string',
                                            title: 'title',
                                            widthLabel: '70px',
                                        },
                                        visible: {
                                            type: 'boolean',
                                            title: 'visible',
                                            widthLabel: '70px',
                                        }
                                    }
                                } />
                        </EditBlock>

                        <EditBlock title="Notification">
                            <ObjectFixedEditor object={notify}
                                setObject={setNotify}
                                template={
                                    {
                                        id: {
                                            type: 'string',
                                            title: 'id',
                                            widthLabel: '70px',
                                        },
                                        timeout: {
                                            type: 'number',
                                            title: 'timeout',
                                            widthLabel: '70px',
                                        },
                                        type: {
                                            type: 'select',
                                            title: 'type',
                                            widthLabel: '70px',
                                            items: ['error', 'success']
                                        },
                                        text: {
                                            type: 'string',
                                            title: 'text',
                                            widthLabel: '70px',
                                        }
                                    }
                                } />
                        </EditBlock>
                    </Col>
                </Row>
            </TabPane>

            <TabPane tab="Настройка элементов" key="3">
                <FormItemsEdit formItems={[...items]} setFormItems={setItems} cmp={cmp} />
            </TabPane>
        </Tabs>

        <ButtonBlock onApply={(e:any) => {
            onApply(e)
        }} onClose={onClose} />
    </>
};

export default AntFormEdit;