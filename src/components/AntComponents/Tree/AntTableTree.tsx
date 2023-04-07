import React, {FC} from 'react';
import {Table} from "antd";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {RootState} from "../../../redux/redux.store";
import {getDataSource} from "../../../redux/ds/ds.selector";
import Editor from "../Editor/Editor";
import {NavLink} from "react-router-dom";

type AntTableTreeType = {
    cmp: any
}
const AntTableTree: FC<AntTableTreeType> = ({cmp}) => {
    const ds = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds.key))
    /**
     * ds.items[] - объект с данными которые нужно отобразить в качестве дерева.
     * нужно по нему пробежаться, отпарсить и каждое свойство объекта.
     */
    let rows: any[] = []
    let row: any
    if (ds?.items[0] !== undefined) {
        Object.keys(ds.items[0]).forEach((key: string) => {
            if (key !== 'key') {
                row = JSON.parse(ds.items[0][key])
                if (row.key !== undefined) {
                    rows.push(row)
                }
            }
        })
    }

    rows.sort((prev: any, next: any) => {
        if (prev.key < next.key) return -1
        else return 1;
    });

    let columns: any[] = []
    if (rows[0] !== undefined) {
        Object.keys(rows[0]).forEach((k: string) => {
            if (k !== 'children' && !(cmp.hide?.indexOf(k) + 1))
                columns.push({
                    title: k,
                    dataIndex: k,
                    key: k,
                    render: (text: any, row: any) => {
                        let ret = text
                        if (cmp.columns !== undefined && cmp.columns[k] !== undefined) {

                            let keys = Object.keys(cmp.columns[k])
                            keys.forEach(key => {
                                switch (key) {
                                    case 'link':
                                        let arr_cmp_link = cmp.columns[k][key].split(':')
                                        let to = arr_cmp_link[0] + row[arr_cmp_link[1]]
                                        ret = <NavLink to={to}>{ret}</NavLink>
                                }
                            })
                        }
                        return ret
                    }
                })
        })
    }

    return (
        <div>
            <Editor cmp={cmp} oldComponent={true} />
            <Table
                size="small"
                defaultExpandAllRows
                columns={columns}
                dataSource={rows}
            />
        </div>

    )
};

export default AntTableTree;