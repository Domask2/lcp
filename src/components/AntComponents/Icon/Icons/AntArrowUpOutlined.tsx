import React from "react";
import { ArrowUpOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntArrowUpOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <ArrowUpOutlined style={style} />
}
export default AntArrowUpOutlined