import React, {useEffect, useState} from "react";
import {useActions, useTypedSelector} from "../../../hooks";
import DsConstructor from "../../newComponents/dsConstructor";
import {FunctionPage} from "./FunctionPage";

import {Button, Form, Input, Modal, Popconfirm, Select} from "antd";
import {DeleteOutlined, PlusCircleOutlined, SettingOutlined} from '@ant-design/icons';
import Text from "antd/es/typography/Text";
import {IPage} from "../../../redux/project/project.initial";
import {RootState} from "../../../redux/redux.store";
import {getDataSourceLs} from "../../../redux/ds/ds.selector";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 24},
};
const tailLayout = {
    wrapperCol: {offset: 4, span: 18},
};

type PageSettingsType = {
    page: IPage
}

interface flyInputsGroupsType {
    name: string,
    flyInputsArray: string[]
}

const PageSettings = ({page}: PageSettingsType) => {
    const [form] = Form.useForm();
    const {savePage} = useActions()
    const ls: any = useTypedSelector((state: RootState) => getDataSourceLs(state));
    const [isModalSettingsVisible, setIsModalSettingsVisible] = useState<boolean>(false);

    const getDs = () => {
        let item: any = {}
        Object.keys(page.datasources).forEach(key => {
            item[key] = {
                key: page.datasources[key].key,
                filter: page.datasources[key].filter !== undefined ? page.datasources[key].filter : ''
            }
        })

        return item
    }

    useEffect(() => {
        setInitialValues({
            ...initialValues,
            datasources: getDs(),
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    let pageLs = page.ls !== undefined && page.ls !== null ? [...page.ls] : []
    let pageFnc = page.fnc !== undefined && page.fnc !== null ? [...page.fnc] : []
    let pageFly_inputs_groups: flyInputsGroupsType | {} = page.fly_inputs_groups !== undefined && page.fly_inputs_groups !== null ? {...page.fly_inputs_groups} : {}

    const [initialValues, setInitialValues] = useState<any>({
        title: page.title,
        description: page.description,
        datasources: getDs(),
        ls: pageLs,
        fnc: pageFnc,
        fly_inputs_groups: pageFly_inputs_groups
    })
    const [newLs, setNewLs] = useState<any>({key: '', value: '', column: '', ds_key: ''})
    const [newDs, setNewDs] = useState<any>({key: '', filter: '', })
    const [flyInputObj, setFlyInputObj] = useState<flyInputsGroupsType>({name: '', flyInputsArray: []})

    const showModal = () => {
        setIsModalSettingsVisible(true);
    };
    const handleOk = () => {
        setIsModalSettingsVisible(false);
    };
    const handleCancel = () => {
        setIsModalSettingsVisible(false);
    };

    const onFinish = (values: any) => {
        let jsonPage = {...page, ...values}
        jsonPage.datasources = initialValues.datasources
        jsonPage.ls = initialValues.ls
        jsonPage.fnc = initialValues.fnc
        jsonPage.fly_inputs_groups = initialValues.fly_inputs_groups

        savePage(jsonPage)
        handleCancel();
    };

    const cptStyle = {
        padding: '4px 11px',
        backgroundColor: '#fffbdf',
        border: '1px solid #ddd'
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.currentTarget.value
        let keys = e.currentTarget.name.split(':')
        initialValues[keys[0]][keys[1]][keys[2]] = val
        setInitialValues({...initialValues})
    }

    const addDs = () => {
        initialValues.datasources[newDs.key] = {...newDs}
        setInitialValues(initialValues)
        newDs.key = ''
        newDs.filter = ''
        setNewDs({...newDs})
    }

    const onChangeNewLs = (e: React.ChangeEvent<HTMLInputElement>) => {
        newLs[e.currentTarget.name] = e.currentTarget.value
        setNewLs({...newLs})
    }

    const addLs = () => {
        initialValues.ls.push({...newLs})
        setInitialValues(initialValues)
        newLs.key = ''
        newLs.value = ''
        newLs.column = ''
        newLs.ds_key = ''
        setNewLs({...newLs})
    }

    const onChangeFlyInputsGroupsArray = (value: string[]) => {
        setFlyInputObj((prev: flyInputsGroupsType) => ({...prev, flyInputsArray: value}))
    }

    const onChangeFlyInputsGroupsName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFlyInputObj((prev: flyInputsGroupsType) => ({...prev, name: e.target.value}))
    }

    const onRenameFlyInputGroupName = (e: React.ChangeEvent<HTMLInputElement>, fly: string) => {
        let newObj = {...initialValues.fly_inputs_groups}
        newObj[e.target.value] = newObj[fly]
        delete newObj[fly]
        setInitialValues((prev: any) => ({...prev, fly_inputs_groups: {...newObj}}))
    }

    const onRemoveFlyInputGroupArray = (e: React.ChangeEvent<HTMLSelectElement>, fly: string) => {
        let newObj = {...initialValues.fly_inputs_groups}
        newObj[fly] = e

        setInitialValues((prev: flyInputsGroupsType) => {
            return {
                ...prev,
                fly_inputs_groups: {...newObj}
            }
        })
    }

    const addFlyInputsGroups = () => {
        if (flyInputObj.name && flyInputObj.flyInputsArray) {
            let newObj: any = {};
            newObj[flyInputObj.name] = flyInputObj.flyInputsArray

            setInitialValues((prev: flyInputsGroupsType) => ({
                ...prev,
                fly_inputs_groups: {...initialValues.fly_inputs_groups, ...newObj}
            }))
            setFlyInputObj({name: '', flyInputsArray: []})
        }
    }

    const deleteFlyInputObj = (fly: string) => {
        delete (initialValues.fly_inputs_groups[fly])
        setInitialValues({...initialValues})
    }

    const deleteDs = (key: string) => {
        delete (initialValues.datasources[key])
        setInitialValues({...initialValues})
    }

    const deleteLs = (key: string) => {
        initialValues.ls = initialValues.ls.filter((item: any) => item.key !== key)
        setInitialValues({...initialValues})
    }

    const modalTitle = <>{"#" + page.id + " - " + page.title} <code>[{page.key}]</code></>

    return <>
        <Button type="text" icon={<SettingOutlined />} onClick={showModal}>Настройки страницы...</Button>
        <Modal width={1000}
            style={{top: 0}}
            bodyStyle={{border: '5px solid #ba5fff', borderWidth: '7px 0 0 0'}}
            open={isModalSettingsVisible}
            footer={false}
            okText="Сохранить" onOk={handleOk} onCancel={handleCancel}>

            <h3>{modalTitle}</h3>

            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={initialValues}>
                <Form.Item name="title" label="Заголовок" rules={[{required: true}]}>
                    <Input />
                </Form.Item>

                <Form.Item name="description" label="Описание">
                    <Input.TextArea />
                </Form.Item>

                <Form.Item label="Источники данных">
                    <Input.Group compact>
                        <Text style={{...cptStyle, width: '46%'}}>key</Text>
                        <Text style={{...cptStyle, width: '46%'}}>filter</Text>
                    </Input.Group>
                    {
                        Object.keys(initialValues.datasources).map(key => <Input.Group key={key} compact>
                            <Input style={{borderTop: "none", width: '46%'}}
                                name={"datasources:" + key + ":key"}
                                value={initialValues.datasources[key].key} />
                            <Input style={{borderTop: "none", width: '46%'}}
                                onChange={onChange}
                                name={"datasources:" + key + ":filter"}
                                value={initialValues.datasources[key].filter} />
                            <Popconfirm placement="left" title={`${key} - Точно удалить?`}
                                onConfirm={() => deleteDs(key)} okText="Yes" cancelText="No">
                                <Button type="link" style={{width: '8%'}} danger icon={<DeleteOutlined />} />
                            </Popconfirm>
                        </Input.Group>)
                    }
                    <Input.Group compact>
                        <DsConstructor setItem={setNewDs} values={newDs} />
                        <Button type="link" style={{width: '8%'}} icon={<PlusCircleOutlined />} onClick={addDs} />
                    </Input.Group>
                </Form.Item>

                <Form.Item label="Локальные хранилища">
                    <Input.Group compact>
                        <Text style={{...cptStyle, width: '23%'}}>key</Text>
                        <Text style={{...cptStyle, width: '23%'}}>value</Text>
                        <Text style={{...cptStyle, width: '23%'}}>column</Text>
                        <Text style={{...cptStyle, width: '23%'}}>ds_key</Text>
                    </Input.Group>
                    {
                        initialValues.ls.map((ls: any, index: number) => <Input.Group key={index} compact>
                            <Input style={{borderTop: "none", width: '23%'}}
                                onChange={onChange}
                                name={"ls:" + index + ":key"}
                                value={ls.key} />
                            <Input style={{borderTop: "none", width: '23%'}}
                                onChange={onChange}
                                name={"ls:" + index + ":value"}
                                value={ls.value} />
                            <Input style={{borderTop: "none", width: '23%'}}
                                onChange={onChange}
                                name={"ls:" + index + ":column"}
                                value={ls.column} />
                            <Input style={{borderTop: "none", width: '23%'}}
                                onChange={onChange}
                                name={"ls:" + index + ":ds_key"}
                                value={ls.ds_key} />
                            <Popconfirm placement="left" title={`${ls.key} - Точно удалить?`}
                                onConfirm={() => deleteLs(ls.key)} okText="Yes" cancelText="No">
                                <Button type="link" style={{width: '8%'}} danger icon={<DeleteOutlined />} />
                            </Popconfirm>
                        </Input.Group>)
                    }
                    <Input.Group compact>
                        <Input value={newLs.key} onChange={onChangeNewLs} name="key"
                            style={{borderTop: "none", width: '23%'}} />
                        <Input value={newLs.value} onChange={onChangeNewLs} name="value"
                            style={{borderTop: "none", width: '23%'}} />
                        <Input value={newLs.column} onChange={onChangeNewLs} name="column"
                            style={{borderTop: "none", width: '23%'}} />
                        <Input value={newLs.ds_key} onChange={onChangeNewLs} name="ds_key"
                            style={{borderTop: "none", width: '23%'}} />
                        <Button type="link" style={{width: '8%'}} onClick={addLs} icon={<PlusCircleOutlined />} />
                    </Input.Group>
                </Form.Item>

                <FunctionPage
                    initialValues={initialValues}
                    setInitialValues={setInitialValues}
                />

                <Form.Item label='Redux Element Group' style={{marginBottom: '40px'}}>
                    {
                        initialValues.fly_inputs_groups && Object.keys(initialValues.fly_inputs_groups).map((fly: string, flyIndex: number) => {
                            return (
                                <div key={fly}>
                                    <Input value={fly} name={'fly_inputs_groups'} style={{width: '18%'}}
                                        onChange={(e) => onRenameFlyInputGroupName(e, fly)}
                                    />

                                    <Select
                                        style={{width: '73.5%'}}
                                        mode='multiple'
                                        allowClear
                                        value={initialValues.fly_inputs_groups[fly]}
                                        onChange={(e) => onRemoveFlyInputGroupArray(e, fly)}
                                    >
                                        {
                                            Object.keys(ls.vars).map((item: string, index: number) =>
                                                <Select.Option key={index} value={item}>{item}</Select.Option>)
                                        }
                                    </Select>

                                    <Popconfirm placement="left" title={`${fly} - Точно удалить?`}
                                        onConfirm={() => deleteFlyInputObj(fly)} okText="Yes" cancelText="No">
                                        <Button type="link" style={{width: '8%'}} danger icon={<DeleteOutlined />} />
                                    </Popconfirm>
                                </div>
                            )
                        })

                    }

                    <Input.Group>
                        <Input value={flyInputObj.name} onChange={(val) => onChangeFlyInputsGroupsName(val)}
                            name="flyInputGroupName" style={{width: '18%'}} />

                        <Select
                            style={{width: '73.5%'}}
                            mode='multiple'
                            allowClear
                            onChange={(val) => onChangeFlyInputsGroupsArray(val)}
                            value={flyInputObj.flyInputsArray}
                        >
                            {
                                Object.keys(ls.vars).map((item: string, index: number) =>
                                    <Select.Option key={index} value={item}>{item}</Select.Option>)
                            }
                        </Select>

                        <Button type="link" style={{width: '8%'}} onClick={addFlyInputsGroups}
                            icon={<PlusCircleOutlined />} />
                    </Input.Group>
                </Form.Item>

                <Form.Item {...tailLayout} style={{marginTop: '-10px'}}>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default PageSettings
