import React from "react";
import { PieChartOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntPieChartOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <PieChartOutlined style={style} />
}
export default AntPieChartOutlined