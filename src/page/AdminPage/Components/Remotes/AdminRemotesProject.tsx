import React, {useEffect, useState} from 'react';
import {useActions, useTypedSelector} from "../../../../hooks";
import {getProjectsAll} from "../../../../redux/project/project.selector";
import {getAuthRemote, getRemoteLoadProjectAll, getRemoteProjectAll} from "../../../../redux/remote/remote.selector";
import {Button, Col, Row, Space, Table} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";
import Text from "antd/es/typography/Text";
import {RootState} from "../../../../redux/redux.store";

const colorType: any = {
    'VIEW': 'forestgreen',
    'BASE TABLE': 'dodgerblue',
    'PROCEDURE': 'blueviolet',
    'FUNCTION': 'deeppink',
}

const mergeDb = (ownDB: any, remoteDB: any) => {
    let new_data_db: any = {}
    let new_data_db_arr: any = []

    ownDB.forEach((item: any) => {
        let element: any = {...item}
        if (remoteDB)
            element.ident = identDbByDs(element, remoteDB)
        element.ProjectIdent = identDbByDs(element, remoteDB)

        element?.pages?.forEach((page: any) => {
            page.ident = identByPage(element?.key, page, remoteDB)
            element.pageIndent = identByPage(element?.key, page, remoteDB)
        })


        new_data_db[element.key] = {...element}
    })

    remoteDB.forEach((item: any) => {
        if (!new_data_db[item.key]) {
            new_data_db[item.key] = {key: item.key}
        }
        new_data_db[item.key].remote = item
    })

    Object.keys(new_data_db).forEach((key: string) => new_data_db_arr.push(new_data_db[key]))
    return new_data_db_arr
}

const identByPage = (elementKey: any, page: any, db: any) => {
    let result = false
    db.forEach((item: any) => {
        if (item.key === elementKey) {
            item.pages.forEach((pag: any) => {
                if (pag.key === page.key) {
                    let objPage: any = {}
                    objPage['addictions'] = pag.addictions
                    objPage['components'] = pag.components
                    objPage['datasources'] = pag.datasources
                    objPage['description'] = pag.description
                    objPage['fly_inputs_groups'] = pag.fly_inputs_groups
                    objPage['fnc'] = pag.fnc
                    objPage['key'] = pag.key
                    objPage['ls'] = pag.ls
                    objPage['title'] = pag.title

                    let objPage2: any = {}
                    objPage2['addictions'] = page.addictions
                    objPage2['components'] = page.components
                    objPage2['datasources'] = page.datasources
                    objPage2['description'] = page.description
                    objPage2['fly_inputs_groups'] = page.fly_inputs_groups
                    objPage2['fnc'] = page.fnc
                    objPage2['key'] = page.key
                    objPage2['ls'] = page.ls
                    objPage2['title'] = page.title
                    // eslint-disable-next-line
                    if (JSON.stringify(objPage) == JSON.stringify(objPage2)) {
                        result = true
                    }
                }
            })
        }
    })

    return result
}

const identDbByDs = (element: any, db: any) => {
    let result = false

    db.forEach((item: any) => {
        if (item.key === element.key) {

            let elementObj: any = {}
            let itemObj: any = {}

            elementObj['addictions'] = element.addictions
            elementObj['banner'] = element.banner
            elementObj['description'] = element.description
            elementObj['is_open'] = element.is_open
            elementObj['is_published'] = element.is_published
            elementObj['logo'] = element.logo
            elementObj['project_roles'] = element.project_roles
            elementObj['startpage'] = element.startpage
            elementObj['title'] = element.title

            itemObj['addictions'] = item.addictions
            itemObj['banner'] = item.banner
            itemObj['description'] = item.description
            itemObj['is_open'] = item.is_open
            itemObj['is_published'] = item.is_published
            itemObj['logo'] = item.logo
            itemObj['project_roles'] = item.project_roles
            itemObj['startpage'] = item.startpage
            itemObj['title'] = item.title
            // eslint-disable-next-line
            if (JSON.stringify(elementObj) == JSON.stringify(itemObj)) {
                result = true
            }
        }
    })

    return result
}

const AdminRemotesProject = () => {
    const {loadRemoteProject, loadRemotePage, loadRemotePageAll} = useActions();
    const authRemote = useTypedSelector((state: RootState) => getAuthRemote(state));
    const projectAll = useTypedSelector((state: RootState) => getProjectsAll(state));
    const remoteProjectAll: any = useTypedSelector((state: RootState) => getRemoteProjectAll(state))
    const loadProjectAll: any = useTypedSelector((state: RootState) => getRemoteLoadProjectAll(state))
    const [ownProject, setOwnProject] = useState(Object.values(projectAll))

    useEffect(() => {
        if (remoteProjectAll) {
            const newDbArr = mergeDb(Object.values(projectAll), remoteProjectAll)
            setOwnProject(newDbArr)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remoteProjectAll])

    const pushProject = (row: any) => {
        if (authRemote) {
            const date = {...row}
            delete date.pages
            delete date.id
            delete date.user_id
            loadRemoteProject(authRemote, date);
        }
    }

    const pushPage = (row: any, r: any) => {
        if (authRemote) {
            const date = {...r}
            date.project_key = row.key
            delete date.id
            delete date.project_id
            delete date.remote
            delete date.created_at
            delete date.updated_at
            delete date.ident
            loadRemotePage(authRemote, date);
        }
    }

    const pushPageAll = (row: any) => {
        if (authRemote) {
            const date: any = {}
            date['project_key'] = row.key
            date['pages'] = row.pages
            loadRemotePageAll(authRemote, date);
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
                    title: 'Project title',
                    dataIndex: 'title',
                    render: (t: any, row: any) => {
                        if (row.remote) {
                            if (row.ident)
                                return <Text type='success'>{t}</Text>
                            else
                                return <Text type='warning'>{t}</Text>
                        } else {
                            return <Text type='secondary'>{t}</Text>
                        }
                    }
                },
                {
                    title: '',
                    dataIndex: 'action',
                    width: 50,
                    render: (t: any, row: any) => {
                        if (row.ProjectIdent && row.pageIndent && row.remote)
                            return ''
                        if (!row.ProjectIdent && !row.pageIndent && row?.remote) {
                            return <Space>
                                <Button.Group>
                                    <Button size='small' type='dashed' onClick={
                                        () => pushProject(row)}><ArrowRightOutlined />Refact Project</Button>
                                </Button.Group>
                            </Space>
                        }
                        if (!row.ProjectIdent && !row.pageIndent && !row?.remote) {
                            return <Space>
                                <Button.Group>
                                    <Button size='small' type='dashed' onClick={
                                        () => pushProject(row)}><ArrowRightOutlined /></Button>
                                </Button.Group>
                            </Space>
                        }
                        if (row.ProjectIdent && !row.pageIndent && row.remote) {
                            return <Space>
                                <Button.Group>
                                    <Button size='small' type='dashed' onClick={
                                        () => pushPageAll(row)}>ALL</Button>
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
                    title: 'Project title',
                    dataIndex: 'remote_title',
                    render: (t: any, row: any) => {
                        let text = ''
                        if (row.remote)
                            text = row.remote.title

                        if (row.remote)
                            if (row.ident)
                                return <Text type='success'>{text}</Text>
                            else
                                return <Text type='warning'>{text}</Text>
                        else
                            return <Text type='secondary'>Проект отсутсвует в БД - <a target={'_blank'}
                                rel={'noreferrer'}
                                href={authRemote?.url}>{authRemote?.url}</a></Text>
                    }
                },
            ]
        },
    ]

    const expandedRowRender = (row: any) => {
        // const dataDsArr: any = row.pages

        let dataDs: any = {}
        let dataDsArr: any = []

        row.pages?.forEach((item: any) => {
            dataDs[item.key] = item
        })
        row.remote?.pages.forEach((item: any) => {
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
                title: 'title', dataIndex: 'title', key: 'title', width: '20%',
                render: (t: any) => {
                    return <Text style={{color: colorType[t]}}>{t}</Text>
                }
            },
            {
                title: 'action', dataIndex: 'key', key: 'key', width: '5%',
                render: (t: any, r: any) => {
                    if (!r.ident) {
                        return <Space>
                            <Button.Group>
                                <Button size='small' type='dashed' onClick={
                                    () => pushPage(row, r)}>Project</Button>
                            </Button.Group>
                        </Space>
                    }
                }
            },
            {
                title: 'remote_key', dataIndex: 'remote_key', key: 'remote_key', width: '20%',
                render: (t: any, r: any) => {
                    if (r.ident && r.remote) {
                        return <Text type='success'>{r.key}</Text>
                    } else {
                        if (r.ident) {
                            return <Text type='success'>{r.key}</Text>
                        } else {
                            return <Text type='warning'>{r.key}</Text>
                        }
                    }
                }
            },
            {
                title: 'remote_title', dataIndex: 'remote_title', key: 'remote_title', width: '20%',
                render: (t: any, r: any) => {
                    if (r.remote) {
                        return <Text type='success'>{r.title}</Text>
                    } else {
                        if (r.indent) {
                            return <Text type='warning'>{r.title}</Text>
                        } else {
                            return ''
                        }
                    }
                }
            },
        ];

        return <Table size='small' bordered={true} columns={columns} dataSource={dataDsArr} pagination={false} />;
    };

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Table
                    size='middle'
                    columns={DbColumns}
                    dataSource={ownProject}
                    bordered={true}
                    loading={loadProjectAll}
                    expandable={{expandedRowRender, defaultExpandedRowKeys: ['0']}}
                />
            </Col>
        </Row>
    )
}

export default AdminRemotesProject;