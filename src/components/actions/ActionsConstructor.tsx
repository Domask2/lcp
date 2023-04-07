import React, {useEffect, useState} from 'react';
import {useTypedSelector} from '../../hooks';
import {getCurrentPage} from '../../redux/project/project.selector';

// import LinkTree from '../AntComponents/Table/LinkTree';
import DsParamSearch from './DsParamSearch';
import {actionTemplate} from '../../utils';

import {Button, Form, Input, Select, Tabs} from 'antd';
import {RootState} from '../../redux/redux.store';
import {IAction} from '../../redux/project/project.initial';
import {getDataSourceKeys} from '../../redux/ds/ds.selector';
import {getAppDb} from "../../redux/app/app.selector";
import LinkTree from '../AntComponents/Table/LinkTree';

const {TabPane} = Tabs;

const Dictionary = {
    FUNC: 'fnc',
    TO: 'to',
    PROCEDURE: 'proc',
    DOWNLOAD: 'dl',
    LINK: 'url',
    URL_GET: 'get',
    FlyInput: 'flyInput',
    API: 'api'
}

interface IActionsConstructor {
    setAction?: any
    currentAction?: IAction
    width?: any
    currentComponent?: any
}

const ActionsConstructor: React.FC<IActionsConstructor> = ({
    setAction,
    currentAction,
    width = '90%',
    currentComponent
}) => {
    const [actionObj, setActionObj] = useState<IAction>(currentAction ? currentAction : actionTemplate);
    const currentPage = useTypedSelector((state: RootState) => getCurrentPage(state));
    const ds = useTypedSelector((state: RootState) => getDataSourceKeys(state));

    const dataBase = useTypedSelector((state: RootState) => getAppDb(state));

    const allDS = Object.keys(ds);

    const pageFunctions = currentPage?.fnc;
    const flyInputsGroups = currentPage?.fly_inputs_groups

    const handleTypeChange = (value: any) => {
        setActionObj((prevState: any) => ({
            ...prevState,
            type: value
        }));
    }

    const handleSource = (value: any) => {
        setActionObj((prevState: any) => ({
            ...prevState,
            source: value,
            params: [],
            actionParams: [],
        }));
    }

    const handleClickSave = (e: any) => {
        setAction(actionObj)
    }

    const handleClickClean = () => {
        setActionObj(actionTemplate);
    }

    const handleChangeDs = (value: any) => {
        setActionObj((prevState: any) => ({
            ...prevState,
            reloadDS: value
        }));
    }

    // const handleChangeFormat = (value: string) => {
    //     setActionObj((prevState: any) => ({
    //         ...prevState,
    //         format: value
    //     }));
    // }

    // const handleChangeSep = (value: string) => {
    //     setActionObj((prevState: any) => ({
    //         ...prevState,
    //         sep: value
    //     }));
    // }

    const handleChangeReduxElement = (value: string) => {
        setActionObj((prevState: any) => ({
            ...prevState,
            reduxElement: value
        }));
    }

    const handleDB = (value: string) => {
        setActionObj((prevState: any) => ({
            ...prevState,
            db_key: value
        }));
    }

    useEffect(() => {
        const type = actionObj.type ? `${actionObj.type}:` : '';
        const source = actionObj.source ? `${actionObj.source}` : '';
        const params = actionObj.actionParams?.length ? `:${actionObj.actionParams}` : [];

        if (type === 'dl') {
            actionObj.sep = ';'
        }

        setActionObj({
            ...actionObj,
            actionName: `${type}${source}${params}`
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actionObj.type, actionObj.source, actionObj.actionParams])

    return <>
        <Tabs onChange={handleTypeChange} activeKey={actionObj.type}>

            <TabPane tab={'Function'} key={Dictionary.FUNC}>
                <Form.Item labelCol={{span: 2, offset: 1}} label='Actions' style={{marginBottom: '10px'}}>
                    <Input value={actionObj.actionName} name={actionObj.actionName} />
                </Form.Item>

                <Form.Item labelCol={{span: 2, offset: 1}} label='Function' style={{marginBottom: '10px'}}>
                    <Select style={{minWidth: width}} value={actionObj.source} onChange={handleSource}>
                        {pageFunctions?.map((func) => {
                            return <Select.Option key={func.key} value={func.key}>{func.key}</Select.Option>
                        })}
                    </Select>
                </Form.Item>

                <DsParamSearch obj={currentComponent}
                    setActionObj={setActionObj}
                    action={actionObj}
                />

            </TabPane>

            <TabPane tab={'Procedure'} key={Dictionary.PROCEDURE}>
                <Form.Item labelCol={{span: 2, offset: 1}} label='Actions' style={{marginBottom: '10px'}}>
                    <Input value={actionObj.actionName} name={actionObj.actionName} />
                </Form.Item>

                <Form.Item labelCol={{span: 2, offset: 1}} label='Function' style={{marginBottom: '10px'}}>
                    <Select style={{minWidth: width}} value={actionObj.source} onChange={handleSource}>
                        {pageFunctions?.map((func) => {
                            return <Select.Option key={func.key} value={func.key}>{func.key}</Select.Option>
                        })}
                    </Select>
                </Form.Item>

                <DsParamSearch obj={currentComponent}
                    setActionObj={setActionObj}
                    action={actionObj}
                />

                <Form.Item labelCol={{span: 2, offset: 1}} label='Update DS' style={{marginBottom: '10px'}}>
                    <Select mode="multiple"
                        allowClear
                        style={{minWidth: width}}
                        value={actionObj.reloadDS}
                        onChange={handleChangeDs}>
                        {allDS?.map((ds: any, index: number) => {
                            return <Select.Option key={index} value={ds}>{ds}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
            </TabPane>

            <TabPane tab={'FlyInput'} key={Dictionary.FlyInput}>
                <Form.Item labelCol={{span: 2, offset: 1}} label='Actions' style={{marginBottom: '10px'}}>
                    <Input value={actionObj.actionName} name={actionObj.actionName} />
                </Form.Item>

                <Form.Item labelCol={{span: 2, offset: 1}} label='Function' style={{marginBottom: '10px'}}>
                    <Select style={{minWidth: width}} value={actionObj.source} onChange={handleSource}>
                        {pageFunctions?.map((func) => {
                            return <Select.Option key={func.key} value={func.key}>{func.key}</Select.Option>
                        })}
                    </Select>
                </Form.Item>

                <DsParamSearch obj={currentComponent}
                    setActionObj={setActionObj}
                    action={actionObj}
                />

                <Form.Item labelCol={{span: 2, offset: 1}} label='Fly Group' style={{marginBottom: '10px'}}>
                    <Select
                        style={{minWidth: width}}
                        allowClear
                        onChange={handleChangeReduxElement}
                        value={actionObj.reduxElement}
                    >
                        {
                            flyInputsGroups && Object.keys(flyInputsGroups).map((item: any, index: any) =>
                                <Select.Option key={index} value={item}>{item}</Select.Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item labelCol={{span: 2, offset: 1}} label='Update DS' style={{marginBottom: '10px'}}>
                    <Select mode="multiple"
                        allowClear
                        style={{minWidth: width}}
                        value={actionObj.reloadDS}
                        onChange={handleChangeDs}>
                        {allDS?.map((ds: any, index: number) => {
                            return <Select.Option key={index} value={ds}>{ds}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
            </TabPane>

            {/* <TabPane tab={'Download'} key={Dictionary.DOWNLOAD}>
                <Form.Item labelCol={{span: 2, offset: 1}} label='Actions' style={{marginBottom: '10px'}}>
                    <Input value={actionObj.actionName} name={actionObj.actionName}/>
                </Form.Item>

                <Form.Item labelCol={{span: 2, offset: 1}} label='Function' style={{marginBottom: '10px'}}>
                    <Select style={{minWidth: width}} value={actionObj.source} onChange={handleSource}>
                        {pageFunctions?.map((func) => {
                            return <Select.Option key={func.key} value={func.key}>{func.key}</Select.Option>
                        })}
                    </Select>
                </Form.Item>

                <DsParamSearch obj={currentComponent}
                               setActionObj={setActionObj}
                               action={actionObj}
                />

                <Form.Item labelCol={{span: 2, offset: 1}} label='Format' style={{marginBottom: '10px'}}>
                    <Select style={{minWidth: width}}
                            value={actionObj.format} onChange={handleChangeFormat}>
                        <Select.Option value={'txt'}>txt</Select.Option>
                        <Select.Option value={'doc'}>doc</Select.Option>
                        <Select.Option value={'pdf'}>pdf</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item labelCol={{span: 2, offset: 1}} label='Separator' style={{marginBottom: '10px'}}>
                    <Input value={actionObj.sep} name={actionObj.sep} defaultValue={';'}
                           onChange={(e) => handleChangeSep(e.target.value)}/>
                </Form.Item>

            </TabPane> */}

            <TabPane tab={'ActionTo'} key={Dictionary.TO}>
                <Form.Item labelCol={{span: 2, offset: 1}} label='Actions' style={{marginBottom: '10px'}}>
                    <Input value={actionObj.actionName} name={actionObj.actionName} />
                    <br />
                    <br />
                    <LinkTree item={actionObj.source ? actionObj.source : 'url'} setItem={handleSource} />
                </Form.Item>
            </TabPane>

            {/* <TabPane tab={'UrlGet'} key={Dictionary.URL_GET}>
                <Form.Item labelCol={{span: 2, offset: 1}} label='Actions' style={{marginBottom: '10px'}}>
                    <Input value={actionObj.actionName} name={actionObj.actionName}/>
                </Form.Item>

                <Form.Item labelCol={{span: 2, offset: 1}} label='UrlGet' style={{marginBottom: '10px'}}>
                    <Select style={{minWidth: width}} value={actionObj.source} onChange={handleSource}>
                        {pageFunctions?.map((func) => {
                            return <Select.Option key={func.key} value={func.key}>{func.key}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
            </TabPane> */}

            <TabPane tab={'Api'} key={Dictionary.API}>
                <Form.Item labelCol={{span: 2, offset: 1}} label='Actions' style={{marginBottom: '10px'}}>
                    <Input value={actionObj.actionName} name={actionObj.actionName} />
                </Form.Item>

                <Form.Item labelCol={{span: 2, offset: 1}} label='Api' style={{marginBottom: '10px'}}>
                    <Select style={{minWidth: width}} value={actionObj.source} onChange={handleSource}>
                        {pageFunctions?.map((func) => {
                            return <Select.Option key={func.key} value={func.key}>{func.key}</Select.Option>
                        })}
                    </Select>
                </Form.Item>

                <Form.Item labelCol={{span: 2, offset: 1}} label='Remote DB' style={{marginBottom: '10px'}}>
                    <Select style={{minWidth: width}} value={actionObj.db_key} onChange={handleDB}>
                        {dataBase?.map((db: any) => {
                            return <Select.Option key={db.key} value={db.key}>{db.title}</Select.Option>
                        })}
                    </Select>
                </Form.Item>

                <Form.Item labelCol={{span: 2, offset: 1}} label='Update DS' style={{marginBottom: '10px'}}>
                    <Select mode="multiple"
                        allowClear
                        style={{minWidth: width}}
                        value={actionObj.reloadDS}
                        onChange={handleChangeDs}>
                        {allDS?.map((ds: any, index: number) => {
                            return <Select.Option key={index} value={ds}>{ds}</Select.Option>
                        })}
                    </Select>
                </Form.Item>

            </TabPane>

        </Tabs>

        <Button style={{marginRight: '20px'}} type="primary" onClick={handleClickSave}>
            Сохранить изменения
        </Button>
        <Button type="primary" onClick={handleClickClean}>
            Очистить Actions
        </Button>


    </>
};

export default ActionsConstructor