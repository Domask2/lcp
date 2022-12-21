import React from 'react';
import {Card} from "antd";

type EditBlockType = {
    children: React.ReactNode
    title?: string
    extra?: React.ReactNode
    style?: React.CSSProperties,
    bodyStyle?: React.CSSProperties,
    headStyle?: React.CSSProperties
}
const EditBlock: React.FC<EditBlockType> = (
    {
        children,
        title,
        extra,
        style,
        bodyStyle,
        headStyle,
    }) => {

    return <Card size="small"
                 children={children}
                 title={title}
                 extra={extra}
                 style={style}
                 bodyStyle={bodyStyle}
                 headStyle={headStyle}
                 className="cardEdit"/>
};

export default EditBlock;