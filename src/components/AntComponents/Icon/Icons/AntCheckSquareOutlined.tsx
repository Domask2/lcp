import React from "react";
import { CheckSquareOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntCheckSquareOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <CheckSquareOutlined style={style} />
}
export default AntCheckSquareOutlined