import React from "react";
import {Tag} from "antd";

const TagColor = ({type, value, style}: any) => {
    const color: any = {
        admin: "#9d00c7",
        user: "#008d00",
        create: "#008d00",
        read: "#004adc",
        update: "#ffa200",
        delete: "#d00000",
    }

    return <Tag color={color[type]} style={style}>{value}</Tag>
}

export default TagColor