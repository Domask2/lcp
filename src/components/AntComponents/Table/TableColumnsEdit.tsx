import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Popover, Row, Select } from "antd";
import { useTypedSelector } from '../../../hooks';
import { PlusOutlined } from '@ant-design/icons';
import { getDataSourcesAll } from '../../../redux/ds/ds.selector';
import TableColumnEdit from "./TableColumnEdit";
import { RootState } from '../../../redux/redux.store';
import { ITableColumns } from "../Page/templates";

type TableColumnsEditType = {
    setTableColumns: (c: any) => void
    tableColumns: ITableColumns
    cmp: any
}

const TableColumnsEdit: React.FC<TableColumnsEditType> = ({ tableColumns, setTableColumns, cmp }) => {
    const [columns, setColumns] = useState({ ...tableColumns })
    const [visible, setVisible] = useState(false)
    const [newCol, setNewCol] = useState<string>()

    const dsArr = useTypedSelector((state: RootState) => getDataSourcesAll(state));
    const dsColumns = dsArr[cmp?.ds.key]?.columns;
    const dsKeys = dsColumns?.map(item => item.key);

    const handleVisiblePopover = (v: any) => {
        setVisible(v)
    }

    useEffect(() => {
        setTableColumns({ ...columns })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columns])

    const addCol = (col: string | undefined) => {
        if (col !== undefined && col !== '' && col !== null) {
            columns[col] = {}
            setColumns(columns)
            setNewCol('')
            handleVisiblePopover(false)
        }
    }

    const deleteCol = (col: string) => {
        let c: any = {}
        Object.keys(columns).map(key => {
            if (key !== col)
                c[key] = columns[key]
            return true
        })

        setColumns(c)
    }

    return <>
        <Row gutter={[16, 16]}>
            <Col span={12}>
                {Object.keys(columns).map((col, index) => {
                    if (index % 2 === 0)
                        return <TableColumnEdit key={index}
                            object={{ ...columns[col] }}
                            col={col}
                            setObject={(o: any) => {
                                columns[col] = o
                                setTableColumns(columns)
                            }}
                            cmp={cmp}
                            deleteCol={deleteCol}
                        />
                    return false
                }
                )}
            </Col>
            <Col span={12}>
                {Object.keys(columns).map((col, index) => {
                    if (index % 2 === 1)
                        return <TableColumnEdit key={index}
                            object={{ ...columns[col] }}
                            col={col}
                            setObject={(o: any) => {
                                columns[col] = o
                                setTableColumns(columns)
                            }}
                            cmp={cmp}
                            deleteCol={deleteCol}
                        />
                    return false
                }
                )}

            </Col>
        </Row>


        <br />
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Popover
                    content={
                        <Input.Group compact>
                            {cmp && dsKeys ? (
                                <Select
                                    showSearch
                                    onChange={(e: any) => setNewCol(e)}
                                    style={{ minWidth: '150px' }}
                                >
                                    {dsKeys.map((item: any) => (
                                        <Select.Option key={item} value={item} >
                                            {item}
                                        </Select.Option>
                                    ))}
                                </Select>) : (
                                <Input style={{ width: '150px' }}
                                    onChange={(e) => setNewCol(e.currentTarget.value)}
                                    value={newCol} />
                            )}
                            <Button type="primary" onClick={() => addCol(newCol)} icon={<PlusOutlined />} />
                            {/* <Input style={{width: '150px'}}
                                   onChange={(e) => setNewCol(e.currentTarget.value)}
                                   value={newCol}/> */}
                        </Input.Group>
                    }
                    placement="right"
                    trigger="click"
                    visible={visible}
                    onVisibleChange={handleVisiblePopover}
                >
                    <Button type="text" icon={<PlusOutlined />}>добавить колонку</Button>
                </Popover>
            </Col>
        </Row>
    </>
};

export default TableColumnsEdit;