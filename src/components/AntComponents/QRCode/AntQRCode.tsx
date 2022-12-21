import React from 'react';
import {useTypedSelector} from "../../../hooks";
import Editor from "../Editor/Editor";
import {mappedText, transliterate} from "../../../services/myService";
import ScrollableAnchor from 'react-scrollable-anchor';

import {IQRCode} from "../Page/templates";
import {QRCode} from 'react-qrcode-logo';
import {RootState} from "../../../redux/redux.store";

type AntBarcodeType = {
    cmp: IQRCode
}

const AntQRCode: React.FC<AntBarcodeType> = ({cmp}) => {
    const rootState = useTypedSelector((state: RootState) => state)

    const getMappedValue = () => {
        let text = cmp.qrProps?.value !== undefined ? cmp.qrProps.value : ''
        return transliterate(mappedText(rootState, text))
    }

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span>''</span>
        </ScrollableAnchor>}

        <Editor cmp={cmp} />
        <QRCode {...cmp.qrProps} value={getMappedValue()} />
    </>
};

export default AntQRCode;