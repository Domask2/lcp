import React from "react";
import { UnorderedListOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntUnorderedListOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <UnorderedListOutlined style={style} />
}
export default AntUnorderedListOutlined