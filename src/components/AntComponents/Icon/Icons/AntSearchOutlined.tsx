import React from "react";
import { SearchOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntAntSearchOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <SearchOutlined style={style} />
}
export default AntAntSearchOutlined