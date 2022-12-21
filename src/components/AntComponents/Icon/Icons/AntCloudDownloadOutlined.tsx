import React from "react";
import { CloudDownloadOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntCloudDownloadOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <CloudDownloadOutlined style={style} />
}
export default AntCloudDownloadOutlined