import React, {memo} from "react";
import {Button, Input, Space} from 'antd';
import AntPopover from "../../Popover/AntPopover";
import {ClearOutlined} from '@ant-design/icons';

type AntInputType = {
    props: any
    setValue: any
    value: any
}

const EditorInputElement: React.FC<AntInputType> = ({props, setValue, value}) => {

    const getValue = (val: any) => {
        if (typeof val === 'string') {
            return val
        }
        if (val !== null && val !== undefined && Object.keys(val).length === 1) {

            return Object.values(val)[0]
        }
        return val
    }

    const handleChangeValue = (val: any) => {
        if (typeof value !== 'object') {
            setValue(val)
        } else if (value !== null && value !== undefined && Object.keys(value).length) {
            setValue({
                [Object.keys(value)[0]]: val
            })
        }
    }

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

            {props.inputsType.infoItem ? (
                <Space
                    style={{
                        minWidth: "60%",
                        width: 'calc(60% + 32px)',
                        marginLeft: "4%",
                        overflow: 'hidden',
                        paddingLeft: '5px'
                    }}
                >{props.value[props.key] ? props.value[props.key] : ' '}</Space>
            ) : (
                <>
                    <Input
                        style={{
                            minWidth: "60%",
                            width: "60%",
                            marginLeft: "4%",
                            borderBottom: '1px solid #eee',
                            backgroundColor: '#fff',
                            overflow: 'hidden',
                        }}
                        type={props.inputsType.numeric ? 'number' : 'text'}
                        value={getValue(value)}
                        className="lcEditorInput"
                        onChange={e => handleChangeValue(props.inputsType.numeric ? +e.target.value : e.target.value)}
                    />
                    {props.clearButton !== false && <Button
                        type="link"
                        onClick={() => setValue(props.startValue)}
                        icon={<ClearOutlined />}
                    />}

                </>
            )}

        </div>
        {props.description && <div style={{paddingLeft: '10px'}}>
            <code style={{fontSize: '12px', paddingLeft: '30px'}}><pre>{props.description}</pre></code>
        </div>}
    </>
}

export default memo(EditorInputElement)