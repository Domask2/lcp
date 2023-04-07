import React, {memo} from "react";
import {Button, Select} from 'antd';
import AntPopover from "../../Popover/AntPopover";
import {ClearOutlined} from '@ant-design/icons';

type AntInputType = {
    props: any
    setValue: (e: any) => void
    // value: any
}

// const EditorSelectElement: React.FC<AntInputType> = ({props, setValue, value}) => {
const EditorSelectElement: React.FC<AntInputType> = ({props, setValue}) => {

    const arr = props?.inputsType?.arr ? props.inputsType.arr : props.list;

    return <>
        <div style={props.containerStyle}>
            {
                props.hoverText ? (
                    <AntPopover
                        title={`${props.title}:`}
                        hoverText={props.hoverText}
                    />
                ) : (
                    <span>{props.title && `${props.title}:`}</span>
                )
            }
            <Select
                showSearch
                mode={props?.inputsType?.mode}
                style={{
                    minWidth: "60%",
                    width: "60%",
                    marginLeft: "4%",
                    borderBottom: '1px solid #eee',
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                }}
                bordered={false}
                size="small"
                onChange={e => setValue(e)}
                value={(props.keyTwoLevel && props.value[props.key]) ? props.value[props.key][props.keyTwoLevel] : props.value[props.key]}
            >
                {
                    arr && arr.map((item: any, index: any) =>
                        <Select.Option key={`${item?.key ? item.key : item}_${index}`} value={item.key ? item.key : item}>{item.title ? item.title : item}</Select.Option>)
                }
            </Select>
            {props.clearButton !== false ? <Button
                type="link"
                onClick={() => setValue(props.startValue)}
                icon={<ClearOutlined />}
            /> : <span style={{width: '32px'}}></span>}
        </div>

    </>
}

export default memo(EditorSelectElement)