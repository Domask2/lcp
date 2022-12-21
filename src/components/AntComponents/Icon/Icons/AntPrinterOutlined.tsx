import React from "react";
import { PrinterOutlined } from '@ant-design/icons';

type AntIconCmp = {
    style?: any
}
const AntPrinterOutlined: React.FC<AntIconCmp> = ({style}) => {
    return <PrinterOutlined style={style} />
}
export default AntPrinterOutlined