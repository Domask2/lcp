import React from "react";
import {SaveOutlined} from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntSaveOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <SaveOutlined style={style} />
}
export default AntSaveOutlined