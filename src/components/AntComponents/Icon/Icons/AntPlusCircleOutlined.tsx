import React from "react";
import { PlusCircleOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntPlusCircleOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <PlusCircleOutlined style={style} />
}
export default AntPlusCircleOutlined