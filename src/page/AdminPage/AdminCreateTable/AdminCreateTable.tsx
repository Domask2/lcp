import React, {useState} from 'react';
import {useTypedSelector} from "../../../hooks";
import {getRemoteLoadDB} from "../../../redux/remote/remote.selector";
import {getAppDb} from "../../../redux/app/app.selector";
import {Button, Col, Row, Space, Table} from "antd";
import {ArrowRightOutlined, MergeCellsOutlined, CheckCircleTwoTone} from "@ant-design/icons";
import {RootState} from "../../../redux/redux.store";
import {ApiDownload} from "../../../saga/api/api.download";

const check = (db: any, key: string, res: boolean) => {
    return db.map((db: any) => {
        if (db.key === key) {
            db['check'] = res
        }
        return db
    })
}

const AdminCreateTable = () => {
    const loadDB: any = useTypedSelector((state: RootState) => getRemoteLoadDB(state));
    const appDB: any = useTypedSelector((state: RootState) => getAppDb(state));
    const [ownDB, setOwnDB] = useState(appDB);

    const pushCreateTables = (row: any) => {
        let values = {
            db_key: row.key
        };

        ApiDownload.downloadCreateTables(values)
            .then((res) => {
                if (res) {
                    setOwnDB(check(appDB, row.key, res));
                }
            });
    }

    const checkCreateTables = (row: any) => {
        let values = {
            db_key: row.key
        };

        ApiDownload.downloadCheckCreateTables(values)
            .then((res) => {
                setOwnDB(check(appDB, row.key, res));
            });
    }

    const DbColumns = [
        {
            title: '#',
            dataIndex: 'index',
            render: (t: any, row: any, index: any) => <span>{index + 1}</span>
        },
        {
            title: 'key',
            dataIndex: 'key',
            width: '5%',
        },
        {
            title: 'DataBase name',
            dataIndex: 'title',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 50,
            align: 'center' as const,
            render: (t: any, row: any) => {
                if (row.hasOwnProperty('check')) {
                    if (!row.check) {
                        return <Space>
                            <Button.Group>
                                <Button size='small' type='dashed' onClick={() => pushCreateTables(row)}>
                                    <ArrowRightOutlined/>
                                </Button>
                            </Button.Group>
                        </Space>
                    } else {
                        return <Space>
                            <CheckCircleTwoTone style={{fontSize:'20px'}} twoToneColor="#52c41a"/>
                        </Space>
                    }
                } else {
                    return <Space>
                        <Button.Group>
                            <Button size='small' type='dashed' onClick={() => checkCreateTables(row)}>
                                <MergeCellsOutlined/>
                            </Button>
                        </Button.Group>
                    </Space>
                }
            }
        },
    ]

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Table
                    size='middle'
                    columns={DbColumns}
                    dataSource={ownDB}
                    bordered={true}
                    loading={loadDB}
                />
            </Col>
        </Row>
    );
}

export default AdminCreateTable;