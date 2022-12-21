import React from "react";
import { FilterOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntFilterOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <FilterOutlined style={style} />
}
export default AntFilterOutlined