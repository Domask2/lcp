import React from "react";
import { LineChartOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntLineChartOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <LineChartOutlined style={style} />
}
export default AntLineChartOutlined