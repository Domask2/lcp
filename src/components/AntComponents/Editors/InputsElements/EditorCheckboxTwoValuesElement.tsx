import React, {useState} from "react";
import {Space, Switch} from 'antd';
import AntPopover from "../../Popover/AntPopover";

type EditorCheckboxTwoValuesType = {
    props: any
    setValue: any
}

const EditorCheckboxTwoValuesElement: React.FC<EditorCheckboxTwoValuesType> = ({props, setValue}) => {

    const [check, setCheck] = useState(props.keyTwoLevel ? (props.value[props.key] && props.value[props.key][props.keyTwoLevel] === props.valuesTwo) : (props.value[props.key] && props.value[props.key] === props.valuesTwo));

    const handleChange = (e: any) => {
        setCheck(e);
        e ? setValue(props.valuesTwo) : setValue(props.valuesOne)
    }

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
            <span style={{color: `${!check ? '#1890ff' : 'rgba(0, 0, 0, 0.85)'}`}}>{props.valuesOne}</span>
            <Switch size="small"
                checked={check}
                onChange={(e) => {
                    handleChange(e)
                }} />
            <span style={{color: `${check ? '#1890ff' : 'rgba(0, 0, 0, 0.85)'}`}}>{props.valuesTwo}</span>
        </Space>
    </div>
}

export default EditorCheckboxTwoValuesElement