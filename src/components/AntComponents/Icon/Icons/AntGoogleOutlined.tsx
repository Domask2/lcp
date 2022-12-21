import React from "react";
import { GoogleOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntGoogleOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <GoogleOutlined style={style} />
}
export default AntGoogleOutlined