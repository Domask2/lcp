import React from "react";
import { ArrowRightOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntArrowRightOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <ArrowRightOutlined style={style} />
}
export default AntArrowRightOutlined