import React from "react";
import { BarChartOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntBarChartOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <BarChartOutlined style={style} />
}
export default AntBarChartOutlined