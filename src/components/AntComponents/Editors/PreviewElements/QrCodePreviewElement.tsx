import React from "react";
import {mappedText, transliterate} from "../../../../services/myService";
import {useTypedSelector} from "../../../../hooks";
import {RootState} from "../../../../redux/redux.store";
import {QRCode} from "react-qrcode-logo";

type AntInputType = {
    props: any
}

const QrCodePreviewElement: React.FC<AntInputType> = ({props}) => {

    const rootState = useTypedSelector((state: RootState) => state)

    const getMappedValue = () => {
        let text = props.value.qrProps.value !== undefined ? props.value.qrProps.value : ''
        return transliterate(mappedText(rootState, text))
    }

    return (<>
        <div>{getMappedValue()}</div>
        <QRCode {...props.value.qrProps} value={getMappedValue()} />

    </>
    )
};

export default QrCodePreviewElement