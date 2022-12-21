import React from "react";
import { PlusOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntPlusOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <PlusOutlined style={style} />
}
export default AntPlusOutlined