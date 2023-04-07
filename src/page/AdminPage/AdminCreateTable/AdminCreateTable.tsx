import React, {memo, useEffect, useState} from 'react';
import {getRemoteLoadDB} from "../../../redux/remote/remote.selector";
import {getAppDb} from "../../../redux/app/app.selector";
import {check, deleteCheck, optionsFromSqlPacksArray} from "./service";
import {useTypedSelector} from "../../../hooks";
import {Button, Col, Popconfirm, Row, Select, Space, Table} from "antd";
import {ArrowRightOutlined, MergeCellsOutlined, CheckCircleTwoTone, DeleteOutlined} from "@ant-design/icons";
import {ApiSqlPack} from "../../../saga/api/api.sqlPack";
import {RootState} from "../../../redux/redux.store";
import {dataBaseI, sqlPackI} from "./type";

const AdminCreateTable = () => {
    const loadDB: boolean = useTypedSelector((state: RootState) => getRemoteLoadDB(state));
    const appDB: dataBaseI[] = useTypedSelector((state: RootState) => getAppDb(state));
    const [ownDB, setOwnDB] = useState<dataBaseI[]>(appDB);
    const [sqlPacks, setSqlPacks] = useState<sqlPackI[] | []>([]);

    useEffect(() => {
        ApiSqlPack.sqlPacks()
            .then((res: sqlPackI[]) => {
                setSqlPacks(res)
            });
    }, []);

    const optionsFromSqlPacks = (array: sqlPackI[]) => {
        return optionsFromSqlPacksArray(array)
    }

    const pushCreateTables = (row: dataBaseI) => {
        let values = {
            db_key: row.key,
            sql_pack: row.sqlPack
        };

        ApiSqlPack.createTables(values)
            .then((res) => {
                if (res) {
                    setOwnDB(check(appDB, row.key, res));
                }
            });
    }

    const checkCreateTables = (row: dataBaseI) => {
        let values = {
            db_key: row.key,
            sql_pack: row.sqlPack
        };

        ApiSqlPack.checkCreateTables(values)
            .then((res) => {
                setOwnDB(check(appDB, row.key, res));
            });
    }

    const rollbackTables = (row: dataBaseI) => {
        let values = {
            db_key: row.key,
            sql_pack: row.sqlPack
        };

        ApiSqlPack.rollbackTables(values)
            .then((res) => {
                if (res) {
                    setOwnDB(deleteCheck(appDB, row.key));
                }
            });
    }

    const handleChangeSelect = (value: string, row: dataBaseI) => {
        setOwnDB((prev: any) => {
            let newObj = prev;
            newObj.map((obj: any) => {
                if (row.id === obj.id) {
                    obj['sqlPack'] = value;
                }
                return obj
            })
            return newObj
        })

        setOwnDB(deleteCheck(appDB, row.key));
    };

    const DbColumns = [
        {
            title: '#',
            dataIndex: 'index',
            render: (t: dataBaseI, row: dataBaseI, index: number) => <span>{index + 1}</span>
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
            title: 'SQL Pack',
            width: '25%',
            render: (t: dataBaseI, row: dataBaseI) => {
                return <Select
                    style={{width: '100%'}}
                    onChange={(value) => handleChangeSelect(value, row)}
                    options={optionsFromSqlPacks(sqlPacks)}/>
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 50,
            align: 'center' as const,
            render: (t: dataBaseI, row: dataBaseI) => {
                if (row?.hasOwnProperty('check')) {
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
                            <CheckCircleTwoTone style={{fontSize: '20px'}} twoToneColor="#52c41a"/>
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
        {
            title: 'Rollback',
            width: 50,
            align: 'center' as const,
            render: (t: dataBaseI, row: dataBaseI) => {
                return (
                    <Popconfirm
                        placement="right"
                        title="Точно удалить?"
                        onConfirm={() => rollbackTables(row)}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button
                            type="link"
                            style={{width: "20px", height: 1, lineHeight: 1}}
                            danger
                            icon={<DeleteOutlined/>}
                        />
                    </Popconfirm>


                )
            }
        }
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

export default memo(AdminCreateTable);