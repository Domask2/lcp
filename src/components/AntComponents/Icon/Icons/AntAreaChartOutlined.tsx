import React from "react";
import { AreaChartOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntAreaChartOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <AreaChartOutlined style={style} />
}
export default AntAreaChartOutlined