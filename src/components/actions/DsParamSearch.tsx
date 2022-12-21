import React, {useEffect, useState} from 'react';
import {useTypedSelector} from '../../hooks';
import {getDataSourcesAll} from '../../redux/ds/ds.selector';
import {getCurrentPage} from '../../redux/project/project.selector';
import FuncSelect from './FuncSelect';

import {Col, Form, Row} from 'antd';
import {RootState} from '../../redux/redux.store';
import {IAction} from '../../redux/project/project.initial';

interface IDsConstructor {
    flag?: boolean
    width?: number
    obj: any
    setActionObj?: any
    action: IAction
}

const DsParamSearch: React.FC<IDsConstructor> = ({action, width = 8, obj, setActionObj}) => {
    const [paramsFunc, setParamsFunc] = useState<any>();
    const ds = useTypedSelector((state: RootState) => getDataSourcesAll(state));
    const currentPage = useTypedSelector((state: RootState) => getCurrentPage(state));
    const pageFunctions = currentPage?.fnc;
    const curFunc: any = pageFunctions?.filter((fnc) => fnc.key === action.source);

    let source
    if (obj?.hasOwnProperty('ds')) {
        if (obj.ds?.hasOwnProperty('key')) {
            source = obj.ds.key ? obj.ds.key.split(':')[0] : obj.ds;
        } else {
            if (obj?.ds?.indexOf('selected') + 1) {
                source = obj.ds.split('-')[1];
            } else {
                source = obj.ds
            }
        }
    }

    if (obj?.hasOwnProperty('source')) {
        source = obj.source;
    }

    const dsParams = ds[source]?.columns;

    const handleParamsChange = (value: any, inputValue: any) => {
        setParamsFunc((prevState: any) => {
            const obj: any = {};
            obj[inputValue] = value;

            return {
                ...prevState,
                ...obj,
            }
        });
    }

    useEffect(() => {
        let par: any = {}
        action.params?.forEach((item: any) => {
            let key = Object.keys(item)[0]
            let val = Object.values(item)[0]
            par[key] = val;
        });
        setParamsFunc(par)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!action.actionParams?.length) {
            setParamsFunc('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [action.actionParams])

    // превращает объект параметров в массив объектов и записывает в таком виде в action.params
    useEffect(() => {
        if (paramsFunc) {
            const arr: any = [];

            Object.keys(paramsFunc).forEach((key: any) => {
                let obj: any = {}
                obj[key] = paramsFunc[key];
                arr.push(obj)
            })

            setActionObj({
                ...action,
                params: arr,
                actionParams: Object.values(paramsFunc)
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsFunc]);

    // фильтрует массив объектов action.params по ключу для записи в качестве value в соответствующее ключу поле
    const setValue = (action: IAction, key: string) => {
        let paramValue = '';
        if (action.params) {
            let value = action.params.filter((item: any) => item[key])[0]
            if (value) {
                paramValue = value[key]
            }
        }
        return paramValue;
    }

    return (
        <>
            {curFunc[0]?.params &&
                (<Form.Item labelCol={{span: 2, offset: 1}} label='Params' style={{marginBottom: '10px'}}>
                    {curFunc[0].params?.map((param: any) => {

                        return <Row key={param}>
                            <p style={{
                                padding: '0 10px',
                                minWidth: '20%',
                                marginTop: '5px'
                            }}>{param}:</p>
                            {dsParams && <Col span={width}>
                                <FuncSelect
                                    arrParams={dsParams}
                                    setItem={handleParamsChange}
                                    value={setValue(action, param)}
                                    placeholder={'Доступные значения'}
                                    param={param}
                                />
                            </Col>}
                        </Row>
                    })
                    }
                </Form.Item>)
            }
        </>
    );
};

export default DsParamSearch