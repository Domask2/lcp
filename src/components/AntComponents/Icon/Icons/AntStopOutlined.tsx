import React from "react";
import {StopOutlined} from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntStopOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <StopOutlined style={style} />
}
export default AntStopOutlined