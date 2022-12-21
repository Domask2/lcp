import React, {useEffect, useState} from "react";
import FuncConstructor from "../../newComponents/FuncConstructor";
import {Button, Col, Form, Input, Popconfirm, Row, Select} from "antd";
import {DeleteOutlined, PlusCircleOutlined, DownOutlined, CloseOutlined} from "@ant-design/icons";
import Text from "antd/es/typography/Text";

interface IFunctionPage {
    cmp?: any
    initialValues?: any
    setInitialValues?: any
}

const cptStyle = {
    padding: '4px 11px',
    backgroundColor: '#fffbdf',
    border: '1px solid #ddd'
}

export const FunctionPage: React.FC<IFunctionPage> = ({cmp, initialValues, setInitialValues}) => {
    const [clearFuncConst, setClearFuncConst] = useState(false);
    const [funcObject, setFuncObject] = useState<any>({});
    const [errorSelectType, setErrorSelectType] = useState(false);
    const [errorInputKey, setErrorInputKey] = useState(false);
    const [openFuncConst, setOpenFuncConst] = useState(false)

    useEffect(() => {
        newFnc.source = funcObject.source;
        newFnc.params = funcObject.params;
        setNewFnc({...newFnc})
        setClearFuncConst(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [funcObject])

    const [newFnc, setNewFnc] = useState<any>({
        key: '',
        type: '',
        cache: false,
        source: '',
        target: ''
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.currentTarget.value
        let keys = e.currentTarget.name.split(':')
        initialValues[keys[0]][keys[1]][keys[2]] = val
        setInitialValues({...initialValues})
    }

    const onChangeNewSelectCache = (e: any) => {
        newFnc.cache = !!e;
        setNewFnc({...newFnc})
    }

    const onChangeNewSelectType = (e: any) => {
        setErrorSelectType(false);
        newFnc.type = e;
        setNewFnc({...newFnc})
    }

    const onChangeNewFnc = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.name === 'key' && e.currentTarget.value !== '') {
            setErrorInputKey(false)
        }
        newFnc[e.currentTarget.name] = e.currentTarget.value
        setNewFnc({...newFnc})
    }

    const addFnc = () => {
        setOpenFuncConst(false)

        if (newFnc.type === '' && newFnc.key === '') {
            setErrorSelectType(true)
            setErrorInputKey(true)
            return
        }

        if (newFnc.type !== '' && newFnc.key === '') {
            setErrorSelectType(false)
            setErrorInputKey(true)
            return
        }

        if (newFnc.type === '' && newFnc.key !== '') {
            setErrorSelectType(true)
            setErrorInputKey(false)
            return
        }

        if (newFnc.type !== '' && newFnc.key !== '') {
            setErrorSelectType(false)
            setErrorInputKey(false)
        }

        initialValues.fnc.push({...newFnc})
        setInitialValues(initialValues)

        newFnc.key = ''
        newFnc.type = ''
        newFnc.cache = false
        newFnc.source = ''
        newFnc.target = ''
        setNewFnc({...newFnc});
        setClearFuncConst(true);
        setErrorSelectType(false);
        setErrorInputKey(false);
    }

    const deleteFnc = (key: string) => {
        initialValues.fnc = initialValues.fnc.filter((item: any) => item.key !== key)
        setInitialValues({...initialValues})
    }

    return (
        <Form.Item label="Глобальные Функции">
            <Input.Group compact>
                <Text style={{...cptStyle, width: '18%'}}>key</Text>
                <Text style={{...cptStyle, width: '12%'}}>type</Text>
                <Text style={{...cptStyle, width: '10%'}}>cache</Text>
                <Text style={{...cptStyle, width: '29%'}}>source</Text>
                <Text style={{...cptStyle, width: '23%'}}>target</Text>
            </Input.Group>
            {
                initialValues.fnc.map((fnc: any, index: number) => <Input.Group key={index} compact>
                    <Input style={{borderTop: "none", width: '18%'}}
                           onChange={onChange}
                           name={"fnc:" + index + ":key"}
                           value={fnc.key}/>
                    <Input style={{borderTop: "none", width: '12%'}}
                           onChange={onChange}
                           name={"fnc:" + index + ":type"}
                           value={fnc.type}/>
                    <Input style={{borderTop: "none", width: '10%'}}
                           onChange={onChange}
                           name={"fnc:" + index + ":cache"}
                           value={fnc.cache}/>
                    <Input style={{borderTop: "none", width: '29%'}}
                           onChange={onChange}
                           name={"fnc:" + index + ":source"}
                           value={fnc.source}/>
                    <Input style={{borderTop: "none", width: '23%'}}
                           onChange={onChange}
                           name={"fnc:" + index + ":target"}
                           value={fnc.target}/>
                    <Popconfirm placement="left" title={`${fnc.key} - Точно удалить?`}
                                onConfirm={() => deleteFnc(fnc.key)} okText="Yes" cancelText="No">
                        <Button type="link" style={{width: '8%'}} danger icon={<DeleteOutlined/>}/>
                    </Popconfirm>
                </Input.Group>)
            }

            <Input.Group className='selectorFunction' style={{height: '68px'}}>
                <Input className={`${errorInputKey ? 'errorSelect' : ''}`} value={newFnc.key} onChange={onChangeNewFnc}
                       name="key" style={{borderTop: 'none', width: '18%'}}/>

                <Select style={{width: '12%', float: 'left'}} className={`${errorSelectType ? 'errorSelect' : ''}`}
                        value={newFnc.type} onChange={(e) => onChangeNewSelectType(e)}>
                    <Select.Option value={'LoadData'}>LoadData</Select.Option>
                    <Select.Option value={'ExecProc'}>ExecProc</Select.Option>
                    <Select.Option value={'Download'}>Download</Select.Option>
                    <Select.Option value={'UrlGet'}>UrlGet</Select.Option>
                    <Select.Option value={'Api'}>Api</Select.Option>
                </Select>

                <Select style={{width: '10%', float: 'left',}} defaultValue={String(newFnc.cache)}
                        value={String(newFnc.cache)} onChange={(e) => onChangeNewSelectCache(e)}>
                    <Select.Option value={'true'}>true</Select.Option>
                    <Select.Option value={'false'}>false</Select.Option>
                </Select>

                <div style={{position: 'relative'}}>
                    <Input style={{width: '28.6%', borderTop: 'none', borderLeft: 'none', position: 'relative'}}
                           defaultValue={funcObject.source} value={newFnc.source} onChange={onChangeNewFnc}
                           name="source"/>
                    {
                        !openFuncConst ? (
                            <DownOutlined className='buttonOpen' onClick={() => setOpenFuncConst(!openFuncConst)}/>

                        ) : (
                            <CloseOutlined className='buttonOpen' onClick={() => setOpenFuncConst(!openFuncConst)}/>
                        )
                    }
                </div>

                <Input style={{borderTop: "none", width: '22.9%', borderLeft: 'none'}} value={newFnc.target}
                       onChange={onChangeNewFnc} name="target"/>

                <Button type="link" style={{width: '8%'}} onClick={addFnc} icon={<PlusCircleOutlined/>}/>

                {
                    openFuncConst && (
                        <div className='selectorConstrucort'>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <FuncConstructor cmp={cmp} width='5' flag={clearFuncConst}
                                                     setFuncObject={setFuncObject}/>
                                </Col>

                            </Row>
                        </div>)
                }
            </Input.Group>
        </Form.Item>
    )
}