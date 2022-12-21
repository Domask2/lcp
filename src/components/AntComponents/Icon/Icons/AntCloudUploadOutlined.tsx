import React from "react";
import { CloudUploadOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntCloudUploadOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <CloudUploadOutlined style={style} />
}
export default AntCloudUploadOutlined