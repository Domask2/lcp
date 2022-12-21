import React from "react";
import { OrderedListOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntOrderedListOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <OrderedListOutlined style={style} />
}
export default AntOrderedListOutlined