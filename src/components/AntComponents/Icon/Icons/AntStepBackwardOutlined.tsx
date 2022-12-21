import React from "react";
import { StepBackwardOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntStepBackwardOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <StepBackwardOutlined style={style} />
}
export default AntStepBackwardOutlined