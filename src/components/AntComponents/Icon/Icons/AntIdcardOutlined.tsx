import React from "react";
import { IdcardOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntIdcardOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <IdcardOutlined style={style} />
}
export default AntIdcardOutlined