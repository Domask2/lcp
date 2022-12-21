import React, {memo, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useTypedSelector} from "../../../../../hooks";
import {getDataSourceLs, getDataSourcesAll} from "../../../../../redux/ds/ds.selector";
import {getAppDb, getSettings} from "../../../../../redux/app/app.selector";

import ArrayEditorList from "../ArrayEditorList";

import {RootState} from "../../../../../redux/redux.store";
import {Button, Checkbox, Col, Input, Row, Select, Switch} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import type {CheckboxChangeEvent} from 'antd/es/checkbox';
import ProcedureOrFunctionUrl from "./ProcedureOrFunctionUrl";

interface appDBType {
    dataSources: dataSourceType[]
    key: string
    title: string | null
}

interface dataSourceType {
    dataSourceFields: dataSourceFieldsType[]
    description: string | null
    key: string
    title: string | null
    type: string | null
}

interface dataSourceFieldsType {
    dataIndex: string | null
    key: string
    pk: string | null
    search: string | null
    title: string | null
    type: string | null
    visible: boolean
}

export interface objectType {
    baseUrl: string,
    params: { [key: string]: { [key: string]: { name: string, type: string, clear?: boolean } } }[]
    random?: boolean
    download?: boolean
}

const ObjectUrlEditor = ({object, setObject}: any) => {
    let model = {...object}
    const [selectChange, setSelectChange] = useState('ds')
    const [selectDS, setSelectDS] = useState('')
    const [selectDsValue, setSelectDsValue] = useState('')
    const [arrayDsValue, setArrayDsValue] = useState<dataSourceFieldsType[]>([])
    const [sysVarsSelect, setSysVarsSelect] = useState('')
    const [checkedFly, setCheckedFly] = useState(false);
    const [random, setRandom] = useState(model.random)
    const [download, setDownload] = useState(model.download)
    const [nameUrl, setNameUrl] = useState('')
    const [baseUrl, setBaseUrl] = useState(model.baseUrl)

    const dsArr = useTypedSelector((state: RootState) => getDataSourcesAll(state));
    const ls = useTypedSelector((state: RootState) => getDataSourceLs(state));
    const appDB: appDBType[] = useTypedSelector((state: RootState) => getAppDb(state));
    const settings = useTypedSelector((state: RootState) => getSettings(state));

    const {pathname} = useLocation();
    let idPage = pathname.split('/').length
    let paramsPage = pathname.split('/')[idPage - 1]

    useEffect(() => {
        if (selectDS) {
            let [ds_key, ds_value] = selectDS.split('/');
            appDB.forEach((db) => {
                if (db.key === ds_key) {
                    db.dataSources.forEach((ds) => {
                        if (ds.key === ds_value) {
                            setArrayDsValue(ds.dataSourceFields)
                        }
                    })
                }
            })
        }
    }, [selectDS, appDB])

    useEffect(() => {
        model.baseUrl = baseUrl
        model.random = random
        model.download = download
        setObject(model)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [baseUrl, random, download])

    const onConfirmDelete = (index: number) => {
        setObject((obj: objectType) => {
            return {
                baseUrl: obj.baseUrl,
                download: obj.download,
                params: object.params.filter((url: string, ind: number) => ind !== index)
            }
        })
    }

    const addParam = () => {
        let newObj: { [key: string]: { name: string, type: string, clear?: boolean } } = {}

        switch (selectChange) {
            case 'ds':
                newObj[nameUrl] = {type: 'ds', name: `ds:${selectDS}:${selectDsValue}`}
                break
            case 'fly':
                newObj[nameUrl] = {type: 'fly', name: `fly:${selectDsValue}`, clear: checkedFly}
                break
            case 'param':
                newObj[nameUrl] = {type: 'param', name: `${paramsPage}`}
                break
            case 'sys_vars':
                newObj[nameUrl] = {type: 'sys_vars', name: `sys_vars:${sysVarsSelect}`}
                break
            default:
                newObj[nameUrl] = {type: 'value', name: `${selectDsValue}`}
                break
        }

        setObject((obj: objectType) => {
            return {
                baseUrl: obj.baseUrl,
                download: obj.download,
                params: [...object.params, newObj]
            }
        })

        setSelectChange('ds')
        reset()
    }

    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
        setCheckedFly(e.target.checked)
    }

    const onRemoveCheckbox = (e: CheckboxChangeEvent, obj: objectType, index: number) => {
        let newObj: objectType = {...object}
        // @ts-ignore
        newObj.params[index][Object.keys(obj).toString()].clear = e.target.checked
        setObject(newObj)
    }

    const reset = () => {
        setNameUrl('')
        setSelectDS('')
        setSelectDsValue('')
        setSysVarsSelect('')
        setArrayDsValue([])
        setCheckedFly(false)
    }

    return (
        <>
            <Row>
                <Col flex="70px">
                    <h4>Base URL</h4>
                </Col>
                <Col flex='auto'>
                    <Input
                        className="lcEditorInput"
                        size="small"
                        onChange={(e) => {
                            if (!download) {
                                setBaseUrl(e.currentTarget.value)
                            }
                        }}
                        value={baseUrl}
                    />
                </Col>
            </Row>

            {
                download && <ProcedureOrFunctionUrl baseUrl={baseUrl} setBaseUrl={setBaseUrl}/>
            }

            <Row>
                <Col flex="70px">
                    <h4>Random</h4>
                </Col>
                <Col flex='auto'>
                    <Switch
                        checked={random}
                        onChange={() => setRandom(!random)}
                        size='small'
                    />
                </Col>

                <Col flex="70px">
                    <h4>Download</h4>
                </Col>
                <Col flex='auto'>
                    <Switch
                        checked={download}
                        onChange={() => setDownload(!download)}
                        size='small'
                    />
                </Col>
            </Row>

            {
                object?.params?.map((obj: any, index: number) =>
                    <ArrayEditorList index={index}
                                     key={index}
                                     obj={obj}
                                     onConfirm={() => onConfirmDelete(index)}
                                     onCheckbox={(e) => onRemoveCheckbox(e, obj, index)}
                    />)

            }

            <Row>
                <Col flex="70px" style={{
                    marginTop: '20px', marginRight: '10px',
                }}>
                    <Select
                        style={{
                            width: '100%',
                            borderBottom: '1px solid #eee',
                            backgroundColor: '#fff'
                        }}
                        bordered={false}
                        size="small"
                        value={selectChange}
                        onChange={(val: string) => {
                            setSelectChange(val);
                            reset()
                        }}>

                        {
                            ['ds', 'fly', 'value', 'param', 'sys_vars'].map((item: string, index: number) =>
                                <Select.Option key={index} value={item}>{item}</Select.Option>)
                        }

                    </Select>
                </Col>

                <Col flex="auto" style={{marginTop: '20px'}}>
                    {
                        selectChange === 'ds' && (
                            <>
                                <Input
                                    style={{
                                        width: '25%',
                                        marginRight: '10px',
                                        borderBottom: '1px solid #eee',
                                        backgroundColor: '#fff'
                                    }}
                                    placeholder={'name'}
                                    value={nameUrl}
                                    className="lcEditorInput"
                                    onChange={(e) => {
                                        setNameUrl(e.currentTarget.value)
                                    }}/>

                                <Select
                                    style={{
                                        width: '45%',
                                        marginRight: '10px',
                                        borderBottom: '1px solid #eee',
                                        backgroundColor: '#fff'
                                    }}
                                    bordered={false}
                                    size="small"
                                    value={selectDS}
                                    onChange={(val: string) => {
                                        setSelectDS(val)

                                        if (val === '') {
                                            setSelectDS('')
                                            setSelectDsValue('')
                                            setArrayDsValue([])
                                        }
                                    }}>

                                    <Select.Option key={'clear'} value={''}>{'--------'}</Select.Option>)
                                    {
                                        dsArr && Object.keys(dsArr).map((item: string, index: number) =>
                                            <Select.Option key={index} value={item}>{item}</Select.Option>)
                                    }

                                </Select>

                                <Select
                                    style={{
                                        width: '25%',
                                        borderBottom: '1px solid #eee',
                                        backgroundColor: '#fff'
                                    }}
                                    bordered={false}
                                    size="small"
                                    value={selectDsValue}
                                    onChange={(val: string) => {
                                        setSelectDsValue(val)
                                    }}>

                                    <Select.Option key={'clear'} value={''}>{'--------'}</Select.Option>)
                                    {
                                        arrayDsValue.length && arrayDsValue.map((item: dataSourceFieldsType, index: number) =>
                                            <Select.Option key={index} value={item.key}>{item.key}</Select.Option>)
                                    }

                                </Select>
                            </>
                        )
                    }

                    {
                        selectChange === 'fly' && (
                            <>
                                <Input
                                    style={{
                                        width: '25%',
                                        marginRight: '10px',
                                        borderBottom: '1px solid #eee',
                                        backgroundColor: '#fff'
                                    }}
                                    placeholder={'name'}
                                    value={nameUrl}
                                    className="lcEditorInput"
                                    onChange={(e) => {
                                        setNameUrl(e.currentTarget.value)
                                    }}/>

                                <Select
                                    style={{
                                        width: '56%',
                                        marginRight: '10px',
                                        borderBottom: '1px solid #eee',
                                        backgroundColor: '#fff'
                                    }}
                                    bordered={false}
                                    size="small"
                                    defaultValue={''}
                                    value={selectDsValue}
                                    onChange={(val: string) => {
                                        setSelectDsValue(val)

                                        if (val === '') {
                                            setSelectDsValue('')
                                        }
                                    }}
                                >

                                    <Select.Option key={'clear'} value={''}>{'--------'}</Select.Option>)
                                    {
                                        Object.keys(ls.vars).map((item: string, index: number) =>
                                            <Select.Option key={index} value={item}>{item}</Select.Option>)
                                    }

                                </Select>
                                <Checkbox defaultChecked={checkedFly} onChange={onChangeCheckbox}>Clear</Checkbox>
                            </>
                        )
                    }

                    {
                        selectChange === 'value' && (
                            <>
                                <Input
                                    style={{
                                        width: '30%',
                                        marginRight: '10px',
                                        borderBottom: '1px solid #eee',
                                        backgroundColor: '#fff'
                                    }}
                                    placeholder={'name'}
                                    value={nameUrl}
                                    className="lcEditorInput"
                                    onChange={(e) => {
                                        setNameUrl(e.currentTarget.value)
                                    }}/>

                                <Input
                                    style={{
                                        width: '67%',
                                        borderBottom: '1px solid #eee',
                                        backgroundColor: '#fff'
                                    }}
                                    value={selectDsValue}
                                    className="lcEditorInput"
                                    onChange={(e) => {
                                        setSelectDsValue(e.currentTarget.value)
                                    }}/>
                            </>
                        )
                    }

                    {
                        selectChange === 'param' && (
                            <>
                                <Input
                                    style={{
                                        width: '30%',
                                        marginRight: '10px',
                                        borderBottom: '1px solid #eee',
                                        backgroundColor: '#fff'
                                    }}
                                    placeholder={'name'}
                                    value={nameUrl}
                                    className="lcEditorInput"
                                    onChange={(e) => {
                                        setNameUrl(e.currentTarget.value)
                                    }}/>

                                <Input
                                    style={{
                                        width: '65%',
                                        borderBottom: '1px solid #eee',
                                        backgroundColor: '#fff'
                                    }}
                                    value={paramsPage}
                                    className="lcEditorInput"
                                />
                            </>
                        )
                    }

                    {
                        selectChange === 'sys_vars' && (
                            <>
                                <Input
                                    style={{
                                        width: '25%',
                                        marginRight: '10px',
                                        borderBottom: '1px solid #eee',
                                        backgroundColor: '#fff'
                                    }}
                                    placeholder={'name'}
                                    value={nameUrl}
                                    className="lcEditorInput"
                                    onChange={(e) => {
                                        setNameUrl(e.currentTarget.value)
                                    }}/>

                                <Select
                                    style={{
                                        width: '72%',
                                        borderBottom: '1px solid #eee',
                                        backgroundColor: '#fff'
                                    }}
                                    bordered={false}
                                    size="small"
                                    defaultValue={''}
                                    value={sysVarsSelect}
                                    onChange={(val: string) => {
                                        setSysVarsSelect(val)

                                        if (val === '') {
                                            setSysVarsSelect('')
                                        }
                                    }}
                                >

                                    <Select.Option key={'clear'} value={''}>{'--------'}</Select.Option>)
                                    {
                                        settings[0]?.sys_vars && Object.keys(settings[0]?.sys_vars).map((item: string, index: number) =>
                                            <Select.Option key={index}
                                                           value={`${item}=${settings[0]?.sys_vars[item]}`}>{item}={settings[0]?.sys_vars[item]}</Select.Option>)
                                    }
                                </Select>
                            </>
                        )
                    }
                </Col>

                <Col flex="10px" style={{marginTop: '20px'}}>
                    <Button
                        type="link"
                        style={{width: '8%', height: 1, lineHeight: 1}}
                        onClick={addParam}
                        icon={<PlusCircleOutlined/>}
                    />
                </Col>
            </Row>
        </>

    )
}

export default memo(ObjectUrlEditor);