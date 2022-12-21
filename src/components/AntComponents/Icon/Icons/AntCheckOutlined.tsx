import React from "react";
import { CheckOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntCheckOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <CheckOutlined style={style} />
}
export default AntCheckOutlined