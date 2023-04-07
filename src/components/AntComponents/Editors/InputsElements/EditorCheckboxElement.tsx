import React from "react";
import {Space, Switch} from 'antd';
import AntPopover from "../../Popover/AntPopover";

type EditorCheckboxType = {
    props: any
    setValue: any
    value: any
}

const EditorCheckboxElement: React.FC<EditorCheckboxType> = ({props, setValue, value}) => {

    return <div style={{height: '32px', ...props.containerStyle}}>
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
            <Switch size="small"
                checked={value}
                onChange={setValue} />
        </Space>
    </div>
}

export default EditorCheckboxElement