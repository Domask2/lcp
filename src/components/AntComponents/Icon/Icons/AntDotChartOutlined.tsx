import React from "react";
import { DotChartOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntDotChartOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <DotChartOutlined style={style} />
}
export default AntDotChartOutlined