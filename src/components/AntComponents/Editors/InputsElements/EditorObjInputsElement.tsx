import React from "react";
import {Button, Input} from 'antd';
import AntPopover from "../../Popover/AntPopover";
import {ClearOutlined} from '@ant-design/icons';

type AntInputType = {
    props: any
    setValue: any
    value: any
}

const EditorObjInputsElement: React.FC<AntInputType> = ({props, setValue, value}) => {

    const handleChangeValue = (key: string, value: any) => {
        setValue(() => {
            return {
                ...(props.keyTwoLevel ? (props.value[props.key] && props.value[props.key][props.keyTwoLevel] ? props.value[props.key][props.keyTwoLevel] : '') : props.value[props.key]),
                [key]: value
            }
        })
    }

    return <>
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
        {props.inputsType.arr.map((key: string) => {
            return (
                <div style={props.containerStyle}>
                    <span>
                        {key}:
                    </span>
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
                        value={value[key]}
                        className="lcEditorInput"
                        onChange={e => handleChangeValue(key, e.target.value)}
                    />
                    {props.clearButton !== false && <Button
                        type="link"
                        onClick={() => handleChangeValue(key, props.startValue)}
                        icon={<ClearOutlined />}
                    />}
                    <br />
                </div>
            )
        })}

        {props.description && <div style={{paddingLeft: '10px'}}>
            <code style={{fontSize: '12px', paddingLeft: '30px'}}><pre>{props.description}</pre></code>
        </div>}
    </>
}

export default EditorObjInputsElement