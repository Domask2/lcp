import React from "react";
import { EditOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntEditOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <EditOutlined style={style} />
}
export default AntEditOutlined