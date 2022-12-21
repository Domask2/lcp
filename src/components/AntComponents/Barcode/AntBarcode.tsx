import React from 'react';
import {useBarcode} from "next-barcode";
import {IBarCode} from "../Page/templates";
import Editor from "../Editor/Editor";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {RootState} from "../../../redux/redux.store";
import {mappedText, transliterate} from "../../../services/myService";
import ScrollableAnchor from "react-scrollable-anchor";

type AntBarcodeType = {
    cmp: IBarCode
}

const AntBarcode: React.FC<AntBarcodeType> = ({cmp}) => {
    const rootState = useTypedSelector((state: RootState) => state)

    let txt = transliterate(mappedText(rootState, cmp.value))

    txt = txt === '' ? ' ' : txt
    const {inputRef} = useBarcode({
        options: cmp.options,
        value: txt
    })

    return (
        <div style={cmp.style}>
            {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
                <span></span>
            </ScrollableAnchor>}
            <Editor cmp={cmp} />
            <canvas ref={inputRef} />
        </div>
    )
};

export default AntBarcode;