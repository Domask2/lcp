import React, {useEffect, useState} from 'react';
import {useActions, useTypedSelector} from "../../../../hooks";
import {getAppDb} from "../../../../redux/app/app.selector";
import {getAuthRemote, getRemoteDb, getRemoteLoadDB} from "../../../../redux/remote/remote.selector";
import {Button, Col, Row, Space, Table} from "antd";
import {ArrowRightOutlined} from '@ant-design/icons';
import Text from "antd/es/typography/Text";
import {RootState} from "../../../../redux/redux.store";
import {IDB} from "../../../../redux/app/app.initial";

const colorType: any = {
    'VIEW': 'forestgreen',
    'BASE TABLE': 'dodgerblue',
    'PROCEDURE': 'blueviolet',
    'FUNCTION': 'deeppink',
}

const mergeDb = (ownDB: Array<IDB>, remoteDB: Array<IDB>) => {
    let new_data_db: any = {}
    let new_data_db_arr: any = []

    ownDB.forEach((item: IDB) => {
        let element: any = {...item}
        if (remoteDB) {
            element.ident = identDbByDs(element, remoteDB)
        }

        new_data_db[element.key] = {...element}
    })

    remoteDB.forEach((item: IDB) => {
        if (!new_data_db[item.key]) {
            new_data_db[item.key] = {key: item.key}
        }
        new_data_db[item.key].remote = item
    })

    Object.keys(new_data_db).forEach((key: string) => new_data_db_arr.push(new_data_db[key]))
    return new_data_db_arr
}
const identDbByDs = (element: any, db: Array<IDB>) => {
    let result = false

    db.forEach((item: any) => {
        if (item.key === element.key) {
            let elementResource: any = []
            element.dataSources.forEach((eds: any) => {
                let objResource: any = {}
                objResource['title'] = eds.title
                objResource['key'] = eds.key
                objResource['description'] = eds.description
                objResource['type'] = eds.type
                objResource['dataSourceFields'] = eds.dataSourceFields
                objResource['dataSourceAccess'] = eds.dataSourceAccess
                elementResource.push(objResource);
            })
            // eslint-disable-next-line
            if (JSON.stringify(elementResource) == JSON.stringify(item.dataSources)) {
                result = true
            }
        }
    })

    return result
}

const AdminRemotesDs = () => {
    const {
        loadRemoteAddDb,
        loadRemoteAddDs,
        loadRemoteAddDsFields,
        loadRemoteAddDsAll,
        loadRemoteAddDsAccess
    } = useActions();
    const authRemote = useTypedSelector((state: RootState) => getAuthRemote(state));
    const appDB: any = useTypedSelector((state: RootState) => getAppDb(state));
    const remoteDB: any = useTypedSelector((state: RootState) => getRemoteDb(state));
    const loadDB: any = useTypedSelector((state: RootState) => getRemoteLoadDB(state));
    const [ownDB, setOwnDB] = useState(appDB);

    useEffect(() => {
        if (remoteDB) {
            const newDbArr = mergeDb(appDB, remoteDB)
            setOwnDB(newDbArr)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remoteDB])

    const pushDb = (row: any) => {
        if (authRemote) {
            loadRemoteAddDb(authRemote, row);
        }
    }

    const pushDbDataSource = (r: any, row: any) => {
        if (authRemote) {
            let ds: any = {};
            ds['db_key'] = row.key
            ds['title'] = r.title
            ds['key'] = r.key
            ds['description'] = r.description
            ds['type'] = r.type
            loadRemoteAddDs(authRemote, ds);
        }
    }

    const pushDbDataSourceFields = (r: any, row: any) => {
        if (authRemote) {
            let dsFields: any = {
                db: row.key,
                ds: r?.key,
                dsf: r?.dataSourceFields
            }
            loadRemoteAddDsFields(authRemote, dsFields);
        }
    }

    const pushDbDataSourceAccess = (r: any, row: any) => {
        if (authRemote) {
            let dataSourceAccess: any = {
                dataSourceKey: r.key,
                dataBaseKey: row.key,
                dsa: r.dataSourceAccess
            };
            loadRemoteAddDsAccess(authRemote, dataSourceAccess)
        }
    }

    const pushDbDataSourceAll = (row: any) => {
        if (authRemote) {
            let dsAll: any = {db_key: row.key, ds: row.dataSources};
            loadRemoteAddDsAll(authRemote, dsAll);
        }
    }

    const DbColumns = [
        {
            title: '#',
            dataIndex: 'index',
            render: (t: any, row: any, index: any) => <span>{index + 1}</span>
        },
        {
            title: 'This LCP',
            dataIndex: 'thisLcp',
            children: [
                {
                    title: 'key',
                    dataIndex: 'key',
                    width: '5%',
                    render: (t: any) => t
                },
                {
                    title: 'DataBase name',
                    dataIndex: 'title',
                    render: (t: any, row: any) => {
                        let text = '';
                        if (row.host && row.port && row.database) {
                            text = row.host + ':' + row.port + '/' + row.database
                        }

                        if (row.remote) {
                            if (row.ident)
                                return <Text type='success'>{t} - {text}</Text>
                            else
                                return <Text type='warning'>{t} - {text}</Text>
                        } else {
                            return <Text type='secondary'>{t} - {text}</Text>
                        }
                    }
                },
                {
                    title: '',
                    dataIndex: 'action',
                    width: 50,
                    render: (t: any, row: any) => {
                        if (row.ident)
                            return ''
                        if (!row.ident && !row.remote) {
                            return <Space>
                                <Button.Group>
                                    <Button size='small' type='dashed' onClick={
                                        () => pushDb(row)}><ArrowRightOutlined /></Button>
                                </Button.Group>
                            </Space>
                        }
                        if (!row.ident && row.remote) {
                            return <Space>
                                <Button.Group>
                                    <Button size='small' type='dashed' onClick={
                                        () => pushDbDataSourceAll(row)}>ALL</Button>
                                </Button.Group>
                            </Space>
                        }
                    }
                }
            ]
        },
        {
            title: 'Remote LCP - ' + authRemote?.url,
            dataIndex: 'thisLcp',
            children: [
                {
                    title: 'DataBase name',
                    dataIndex: 'remote_title',
                    render: (t: any, row: any) => {
                        let text = ''
                        if (row.remote)
                            text = row.remote.title + ' - ' + row.remote.host + ':' +
                                row.remote.port + '/' + row.remote.database

                        if (row.remote)
                            if (row.ident)
                                return <Text type='success'>{text}</Text>
                            else
                                return <Text type='warning'>{text}</Text>
                        else
                            return <Text type='secondary'>Не настроено подключение к БД - <a target={'_blank'} rel="noreferrer"
                                href={authRemote?.url}>{authRemote?.url}</a></Text>
                    }
                },
            ]
        },
    ]

    const expandedRowRender = (row: any) => {
        let dataDs: any = {}
        let dataDsArr: any = []

        row.dataSources?.forEach((item: any) => {
            dataDs[item.key] = item
        })
        row.remote?.dataSources.forEach((item: any) => {
            if (!dataDs[item.key]) {
                dataDs[item.key] = {}
                dataDs[item.key].key = item.key
            }

            dataDs[item.key].remote = item
        })
        Object.keys(dataDs).forEach((key: string) => dataDsArr.push(dataDs[key]))

        const columns = [
            {
                title: '#', dataIndex: 'index', width: '2%',
                render: (t: any, row: any, index: any) => <span>{index + 1}</span>
            },
            {
                title: 'key', dataIndex: 'key', key: 'key', width: '5%',
                render: (t: any) => t
            },
            {
                title: 'type', dataIndex: 'type', key: 'type', width: '20%',
                render: (t: any) => {
                    return <Text style={{color: colorType[t]}}>{t}</Text>
                }
            },
            {
                title: 'title', dataIndex: 'title', key: 'title', width: '20%',
                render: (t: any, r: any) => {
                    let countF = ''
                    if (r.type === 'VIEW' || r.type === 'BASE TABLE') {
                        countF = r.dataSourceFields ? '- [' + r.dataSourceFields.length + ']' : ''
                    }

                    let text = <Text type='secondary'>{t} {countF}</Text>
                    if (r.remote && r.title !== r.remote.title)
                        text = <Text type='danger'>{t} {countF}</Text>

                    return text
                }
            },
            {
                title: 'action', dataIndex: 'key', key: 'key', width: '5%',
                render: (t: any, r: any) => {
                    if (!r.remote) {
                        return <Space>
                            <Button.Group>
                                <Button size='small' type='dashed' onClick={
                                    () => pushDbDataSource(r, row)}>DS</Button>
                            </Button.Group>
                        </Space>
                    }
                    if (r?.remote && r?.remote?.dataSourceFields?.length !== r?.dataSourceFields?.length) {
                        return <Space>
                            <Button.Group>
                                <Button size='small' type='dashed' onClick={
                                    () => pushDbDataSourceFields(r, row)}>DSF</Button>
                            </Button.Group>
                        </Space>
                    }

                    if (r.remote && r.remote?.dataSourceAccess?.length !== r?.dataSourceAccess?.length) {
                        return <Space>
                            <Button.Group>
                                <Button size='small' type='dashed' onClick={
                                    () => pushDbDataSourceAccess(r, row)}>DAS</Button>
                            </Button.Group>
                        </Space>
                    }
                }
            },
            {
                title: 'remote_title', dataIndex: 'remote_title', key: 'remote_title', width: '20%',
                render: (t: any, r: any) => {
                    let text = ''
                    let countF = ''

                    if (r.remote) {
                        if (r.type === 'VIEW' || r.type === 'BASE TABLE') {
                            countF = r.dataSourceFields ? '- [' + r.dataSourceFields.length + ']' : ''
                        }
                        text = r.remote.title + ' ' + countF
                    }
                    let jsx = <Text type='secondary'>{text}</Text>
                    if (r.remote && r.title !== r.remote.title)
                        jsx = <Text type='danger'>{text}</Text>

                    return jsx
                }
            },
            {
                title: 'remote_type', dataIndex: 'remote_type', key: 'remote_type', width: '20%',
                render: (t: any, r: any) => {
                    if (r.remote)
                        return <Text style={{color: colorType[r.remote.type]}}>{r.remote.type}</Text>
                    else
                        return ''
                }
            },
        ];

        return <Table size='small' bordered={true} columns={columns} dataSource={dataDsArr} pagination={false} />;
    };

    return <Row gutter={[16, 16]}>
        <Col span={24}>
            <Table
                size='middle'
                columns={DbColumns}
                dataSource={ownDB}
                bordered={true}
                loading={loadDB}
                expandable={{expandedRowRender, defaultExpandedRowKeys: ['0']}}
            />
        </Col>
    </Row>
};

export default AdminRemotesDs;