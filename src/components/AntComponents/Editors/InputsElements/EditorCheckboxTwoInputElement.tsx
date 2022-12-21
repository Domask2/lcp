import React from "react";
import {Input, Space, Switch} from 'antd';
import AntPopover from "../../Popover/AntPopover";

type EditorCheckboxInputType = {
    props: any
}

const EditorCheckboxTwoInputElement: React.FC<EditorCheckboxInputType> = ({props}) => {

    const handleNumericCheckbox = (e: boolean) => {
        props.setValue((prev: any) => {
            return {
                ...prev,
                [props.key]: e,
                [props.keyTwo]: '',
                [props.keyThree]: '',
            }
        })

    };

    const handleModelUpdate = (key: string, value: any) => {
        props.setValue((prev: any) => {
            return {
                ...prev,
                [key]: value
            }
        })
    };


    return <div style={{marginBottom: '10px', ...props.containerStyle}}>
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
        <Space style={{
            minWidth: "60%",
            width: "60%",
            marginLeft: "4%",
            overflow: 'hidden',
        }}>
            <Switch
                checked={props.value[props.key]}
                size={'small'}
                onChange={(e: any) => {handleNumericCheckbox(e)}}
                style={{marginRight: '10px'}}
            />
            {props.value[props.key] && (
                <>

                    <span>{props.titleTwo && `${props.titleTwo}:`}</span>
                    <Input
                        type={props.inputsType.numeric ? 'number' : 'text'}
                        value={props.value.minValue}
                        className="lcEditorInput"
                        onChange={(e) => {
                            handleModelUpdate(props.keyTwo, e.currentTarget.value);
                        }}
                    />
                    <span>{props.titleThree && `${props.titleThree}:`}</span>
                    <Input
                        type={props.inputsType.numeric ? 'number' : 'text'}
                        value={props.value.maxValue}
                        className="lcEditorInput"
                        onChange={(e) => {
                            handleModelUpdate(props.keyThree, e.currentTarget.value);
                        }}
                    />
                </>
            )}
        </Space>
        <span style={{width: '32px'}}></span>
    </div>

}

export default EditorCheckboxTwoInputElement