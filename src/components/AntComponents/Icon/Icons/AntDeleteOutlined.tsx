import React from "react";
import {DeleteOutlined} from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntDeleteOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <DeleteOutlined style={style} />
}
export default AntDeleteOutlined