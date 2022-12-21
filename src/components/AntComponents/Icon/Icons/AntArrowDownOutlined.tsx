import React from "react";
import { ArrowDownOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntArrowDownOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <ArrowDownOutlined style={style} />
}
export default AntArrowDownOutlined