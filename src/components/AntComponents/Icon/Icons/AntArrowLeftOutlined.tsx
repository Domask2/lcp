import React from "react";
import { ArrowLeftOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntArrowLeftOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <ArrowLeftOutlined style={style} />
}
export default AntArrowLeftOutlined