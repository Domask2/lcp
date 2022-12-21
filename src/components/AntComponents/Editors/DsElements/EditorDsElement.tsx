import React, {memo, useEffect, useState} from "react";
import {Button, Select, Space, Switch} from 'antd';
import AntPopover from "../../Popover/AntPopover";
import {ClearOutlined} from '@ant-design/icons';

type EditorDsElementType = {
    props: any
    setValue: any
    setValueTwo: any
    value: any
    valueTwo: any
}

const EditorDsElement: React.FC<EditorDsElementType> = ({props, setValue, setValueTwo, value, valueTwo}) => {
    const [ds, setDs] = useState<string>(value);

    const handleChangeDs = (e: any) => {
        setDs(e)
        setValue(e)
        setValueTwo(false)
    }
    const handleCleanUp = () => {
        setDs(props.startValue);
        setValue(props.startValue);
        setValueTwo(false);
    }

    useEffect(() => {
        if (typeof value === 'string') {
            if (valueTwo) {
                !value.includes('selected') && setValue(`selected-${ds}`)
                !value.includes('selected') && setDs(`selected-${ds}`)
            } else {
                setValue(value.includes('selected') ? value.split('-')[1] : value ? value : '')
                setDs(value.includes('selected') ? value.split('-')[1] : value ? value : '')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueTwo])

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
                mode={props.inputsType.mode}
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
                onChange={e => handleChangeDs(e)}
                value={ds}
            >
                {
                    props.list && props.list.map((item: any, index: any) =>
                        <Select.Option key={`${item?.key ? item.key : item}_${index}`} value={item.key ? item.key : item}>{item.title ? item.title : item}</Select.Option>)
                }
            </Select>
            {props.clearButton !== false && <Button
                type="link"
                onClick={handleCleanUp}
                icon={<ClearOutlined />}
            />}
        </div>
        <div style={props.containerStyle}>
            {
                props.hoverText ? (
                    <AntPopover
                        title={`${props.prefix}:`}
                        hoverText={props.hoverText}
                    />
                ) : (
                    <span>{props.prefix && `${props.prefix}:`}</span>
                )
            }

            <Space style={{
                minWidth: "65.5%",
                width: "65.5%",
                marginLeft: "4%",
                overflow: 'hidden',
            }}>
                <Switch size="small"
                    disabled={!ds}
                    checked={valueTwo}
                    onChange={(e) => setValueTwo(e)} />
            </Space>
        </div>
    </>

}

export default memo(EditorDsElement)