import React from "react";
import { CheckCircleOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntCheckCircleOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <CheckCircleOutlined style={style} />
}
export default AntCheckCircleOutlined