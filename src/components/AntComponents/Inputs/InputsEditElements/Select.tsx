import React from "react";
import {Select} from 'antd';

type AntInputType = {
    props: any
}

const SelectElement: React.FC<AntInputType> = ({props}) => {

    return <>
        <Select
            showSearch
            mode={props.mode}
            style={{
                ...props.style,
                borderBottom: '1px solid #eee',
                backgroundColor: '#fff',
                overflow: 'hidden',
            }}
            bordered={false}
            size="small"
            onChange={props.setValue}
            value={props.value && props.value}
        >
            {
                props.list && props.list.map((item: any, index: any) =>
                    <Select.Option key={`${item?.key ? item.key : item}_${index}`} value={item.key ? item.key : item}>{item.title ? item.title : item}</Select.Option>)
            }
        </Select>
    </>
}

export default SelectElement