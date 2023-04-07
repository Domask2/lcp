import React from "react";
import {Table} from 'antd';

type CascadeTableType = {
    props: any
};


const AntCascadeTable: React.FC<CascadeTableType> = ({props}: any) => {

    const columnsArr: any = []
    props.dataSource?.columns?.map((item: any) => {
        if (!item.visible) {
            return
        }
        columnsArr.push({
            title: item.title.split(']').pop(),
            dataIndex: item.key,
            key: item.key,
            render: (t: string, row: any) => {
                const textColor = row[props.key] && row[props.key] === props.value ? '#1890ff' : 'inherit';
                return <span style={{color: textColor}}>{t}</span>
            }
        });
    });

    return <Table
        className="cascade-table"
        style={{marginTop: '10px', marginBottom: '5px'}}
        onRow={(record) => {
            return {
                onClick: () => props.handleClick(record),
                onDoubleClick: () => props.handleDoubleClick(record),
                // onContextMenu: (event) => { },
                // onMouseEnter: (event) => { },
                // onMouseLeave: (event) => { },
            };
        }}
        columns={columnsArr}
        dataSource={props.dataSource?.items}
        pagination={false}
        size={props.tableSize}
    />
};

export default AntCascadeTable
