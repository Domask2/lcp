import React from "react";
import { StepForwardOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntStepForwardOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <StepForwardOutlined style={style} />
}
export default AntStepForwardOutlined