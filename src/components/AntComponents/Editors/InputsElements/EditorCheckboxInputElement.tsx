import React from "react";
import {Input, Space, Switch} from 'antd';
import AntPopover from "../../Popover/AntPopover";

type EditorCheckboxInputType = {
    props: any
    setValue: any
    setValueTwo: any
    value: any
    valueTwo: any
}

const EditorCheckboxInputElement: React.FC<EditorCheckboxInputType> = ({props, setValue, setValueTwo, value, valueTwo}) => {

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
            minWidth: "65.5%",
            width: "65.5%",
            marginLeft: "4%",
            overflow: 'hidden',
        }}>
            <Switch
                checked={value}
                size={'small'}
                onChange={setValue}
                style={{marginRight: '10px'}}
            />
            {value && <>
                <span>AdKey: </span>
                <Input value={valueTwo} className="lcEditorInput" onChange={(e) => {
                    setValueTwo(e.currentTarget.value)
                }} />
            </>
            }
        </Space>
    </div>

}

export default EditorCheckboxInputElement