import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {Button, Input, Modal, Select} from "antd";
import {useTypedSelector} from "../../../hooks";
import {RootState} from "../../../redux/redux.store";
import {getAppDb} from "../../../redux/app/app.selector";
import {ClearOutlined} from "@ant-design/icons";
import {useLocation} from "react-router-dom";

interface FilterSettingsModalType {
    isModalOpenFilter: boolean
    handleOkFilter: () => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleCancelFilter: () => void
    setInitialValues: (val: any) => void
    dsKeyModal: string
    initialValues: {datasources: {[v: string]: {filter: string, key: string}}}
}

const FilterSettingsModal: FC<FilterSettingsModalType> = ({
    setInitialValues,
    onChange,
    isModalOpenFilter,
    handleOkFilter,
    handleCancelFilter,
    dsKeyModal,
    initialValues,
}) => {
    const db: any = useTypedSelector((state: RootState) => getAppDb(state));
    const {pathname} = useLocation();
    const keyDS = dsKeyModal?.split('/')[0];
    const keyFunction = dsKeyModal?.split('/')[1];
    console.log(pathname.split('/')[pathname.split('/').length - 1])
    const [curPage, setCurPage] = useState('');
    const [perPage, setPerPage] = useState('');
    const [filter, setFilter] = useState('');

    const [filterDBKey, setFilterDBKey] = useState(keyDS ?? '');
    const [filterDBDsKey, setFilterDBDsKey] = useState(keyFunction ?? '');
    const [filterDBDsDfKey, setFilterDBDsDfKey] = useState('');
    const [filterSymbols, setFilterSymbols] = useState('=');
    const [filterInput, setFilterInput] = useState('');

    const setParam = (str: string, callback: Dispatch<SetStateAction<string>>) => {
        callback(str.split('=')[1])
    }

    useEffect(() => {
        const strArr = initialValues?.datasources?.[dsKeyModal]?.filter?.split('&');
        strArr?.forEach((item: string) => {
            if (item.includes('__cur_page')) {
                setParam(item, setCurPage)
            }

            if (item.includes('__per_page')) {
                setParam(item, setPerPage)
            }

            if (item.includes('__filter=')) {
                const fil = item?.split('__filter=')[1]

                if (fil?.includes('>')) {
                    setFilterDBDsDfKey(fil?.split('>')[0])
                    setFilterInput(fil?.split('>')[1])
                    setFilterSymbols('>');
                    setParam(item, setFilter)
                }

                if (fil?.includes('<')) {
                    setFilterDBDsDfKey(fil?.split('<')[0])
                    setFilterInput(fil?.split('<')[1])
                    setFilterSymbols('<');
                    setParam(item, setFilter)
                }

                if (fil?.includes('=')) {
                    setFilterDBDsDfKey(item.split('=')[1])
                    if (item.split('=')[2].includes(':')) {
                        setFilterInput(item.split(':')[1])
                        setFilterSymbols('=:');
                        setFilter(`${item.split('=')[1]}=${item.split('=')[2]}`)
                    } else {
                        setFilterInput(item.split('=')[2])
                        setFilterSymbols('=');
                        setFilter(`${item.split('=')[1]}=${item.split('=')[2]}`)
                    }
                }

            }

        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const map = new Map();
    db.forEach((item: any) => {
        const mapDS = new Map();
        item.dataSources.forEach((item: any) => {
            mapDS.set(item.key, item);
        })

        item.datasources = mapDS;
        map.set(item.key, item)
    });

    return (
        <Modal width={960}
            style={{top: 100}}
            bodyStyle={{border: '5px solid #ba5fff', borderWidth: '7px 0 0 0'}}
            open={isModalOpenFilter}
            title={dsKeyModal}
            okText="Сохранить"
            onOk={() => {
                handleOkFilter();
                const newObj = {...initialValues};
                newObj.datasources[dsKeyModal].filter = `${curPage ? `__cur_page=${curPage}` : ''}${perPage ? `&__per_page=${perPage}&` : ''}${filter ? `__filter=${filter}` : ''}`
                setInitialValues({...newObj})

            }}
            onCancel={() => {
                handleCancelFilter()
                const newObj = {...initialValues};
                newObj.datasources[dsKeyModal].filter = `${curPage ? `__cur_page=${curPage}` : ''}${perPage ? `&__per_page=${perPage}&` : ''}${filter ? `__filter=${filter}` : ''}`
                setInitialValues({...newObj})
            }}>

            <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}} className="cur">
                <Input style={{width: '100%', marginRight: '6px', paddingRight: '40px'}}
                    onChange={onChange}
                    name={"datasources:" + dsKeyModal + ":filter"}
                    disabled={true}
                    value={initialValues?.datasources?.[dsKeyModal]?.filter ?
                        initialValues?.datasources?.[dsKeyModal]?.filter :
                        `${curPage ? `__cur_page=${curPage}&` : ''}${perPage ? `__per_page=${perPage}&` : ''}${filter ? `__filter=${filter}` : ''}`
                    } />
            </div>

            <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                <div style={{marginRight: '10px', width: '70px'}}>curPage:</div>
                <Input
                    style={{width: '20%'}}
                    size={'small'}
                    type={'number'}
                    value={curPage === '0' ? undefined : curPage}
                    min={0}
                    onChange={(e) => {
                        if (e.target.value === '0') {
                            setCurPage('')
                        } else {
                            setCurPage(e.target.value)
                        }

                        const newObj = {...initialValues};
                        newObj.datasources[dsKeyModal].filter = `${e.target.value !== '0' && e.target.value !== '' ? `__cur_page=${e.target.value}&` : ''}${perPage ? `__per_page=${perPage}&` : ''}${filter ? `__filter=${filter}` : ''}`
                        setInitialValues({...newObj})
                    }}
                />
            </div>

            <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                <div style={{marginRight: '10px', width: '70px'}}>perPage:</div>
                <Input
                    style={{width: '20%'}}
                    size={'small'}
                    type={'number'}
                    value={perPage === '0' ? undefined : perPage}
                    min={0}
                    onChange={(e) => {
                        if (e.target.value === '0') {
                            setPerPage('')
                        } else {
                            setPerPage(e.target.value)
                        }

                        const newObj = {...initialValues};
                        newObj.datasources[dsKeyModal].filter = `${curPage ? `__cur_page=${curPage}&` : ''}${e.target.value !== '0' && e.target.value !== '' ? `__per_page=${e.target.value}&` : ''}${filter ? `__filter=${filter}` : ''}`
                        setInitialValues({...newObj})
                    }}
                />
            </div>

            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                    <div style={{marginRight: '10px', width: '70px'}}>filter:</div>
                    <Input
                        style={{width: '20%', marginRight: '8px'}}
                        size={'small'}
                        type={'text'}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <Button onClick={() => {
                        setFilter('')
                        setFilterDBDsDfKey('')
                        setFilterSymbols('=')
                        setFilterInput('')

                        const newObj = {...initialValues};
                        newObj.datasources[dsKeyModal].filter = `${curPage ? `__cur_page=${curPage}&` : ''}${perPage ? `__per_page=${perPage}&` : ''}`
                        setInitialValues({...newObj})
                    }}
                        size={'small'} type={'text'} icon={<ClearOutlined style={{color: '#008dff', outline: 'none'}} />} />
                </div>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                    <div style={{marginRight: '10px', width: '70px'}}>{''}</div>
                    <Select
                        style={{width: '15%'}}
                        size={"small"}
                        allowClear
                        value={filterDBKey}
                        disabled={true}
                        onChange={(e) => {
                            setFilterDBKey(e)
                            setFilterDBDsKey('');
                            setFilterDBDsDfKey('');
                        }}
                    >
                        {
                            db.map((item: any, index: number) =>
                                <Select.Option key={index} value={item.key}>{item.key}</Select.Option>)
                        }
                    </Select>

                    <Select
                        style={{width: '15%'}}
                        size={"small"}
                        value={filterDBDsKey}
                        disabled={true}
                        allowClear
                        onChange={(e) => {
                            setFilterDBDsKey(e)
                            setFilterDBDsDfKey('');
                        }}
                    >
                        {
                            map.get(filterDBKey)?.dataSources?.map((item: any, index: number) =>
                                <Select.Option key={index} value={item.key}>{item.key}</Select.Option>)
                        }
                    </Select>

                    <Select
                        style={{width: '15%'}}
                        size={"small"}

                        value={filterDBDsDfKey}
                        onChange={(e) => {
                            setFilterDBDsDfKey(e)
                            setFilter(`${e}${filterSymbols}${filterInput}`)

                            const newObj = {...initialValues};
                            newObj.datasources[dsKeyModal].filter =
                                `${curPage ? `__cur_page=${curPage}` : ''}${perPage ? `&__per_page=${perPage}&` : ''}__filter=${e}${filterSymbols}${filterInput}`
                            setInitialValues({...newObj})
                        }}
                    >
                        {
                            map.get(filterDBKey)?.datasources.get(filterDBDsKey)?.dataSourceFields.map((item: any, index: number) =>
                                <Select.Option key={index} value={item.key}>{item.key}</Select.Option>)
                        }
                    </Select>
                </div>

                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{marginRight: '10px', width: '70px'}}>{''}</div>
                    <Select
                        style={{width: '15%'}}
                        size={"small"}
                        allowClear={false}
                        value={filterSymbols}
                        onChange={(e) => {
                            setFilterSymbols(e)
                            setFilter(`${filterDBDsDfKey}${e}${filterInput}`)

                            // console.log(e)
                            // if(e === '=:') {
                            //     setFilterInput(pathname.split('/')[pathname.split('/').length - 1])
                            // }

                            const newObj = {...initialValues};
                            newObj.datasources[dsKeyModal].filter =
                                `${curPage ? `__cur_page=${curPage}` : ''}${perPage ? `&__per_page=${perPage}&` : ''}${filter ? `__filter=${filterDBDsDfKey}${e}${filterInput}` : ''}`
                            setInitialValues({...newObj})
                        }}
                    >
                        <Select.Option key={'='} value={'='}>{'='}</Select.Option>)
                        <Select.Option key={'>'} value={'>'}>{'>'}</Select.Option>)
                        <Select.Option key={'<'} value={'<'}>{'<'}</Select.Option>)
                        <Select.Option key={'=:'} value={'=:'}>{'=:'}</Select.Option>)
                    </Select>

                    <Input style={{width: '15%', marginRight: '6px', paddingRight: '40px'}}
                        size={'small'}
                        onChange={(e) => {
                            setFilterInput(e.target.value)
                            setFilter(`${filterDBDsDfKey}${filterSymbols}${e.target.value}`)

                            const newObj = {...initialValues};
                            newObj.datasources[dsKeyModal].filter =
                                `${curPage ? `__cur_page=${curPage}` : ''}${perPage ? `&__per_page=${perPage}&` : ''}${filter ? `__filter=${filterDBDsDfKey}${filterSymbols}${e.target.value}` : ''}`
                            setInitialValues({...newObj})
                        }}
                        name={"datasources:" + dsKeyModal + ":filterInput"}
                        value={filterInput} />
                </div>
            </div>
        </Modal>
    );
}

export default FilterSettingsModal;