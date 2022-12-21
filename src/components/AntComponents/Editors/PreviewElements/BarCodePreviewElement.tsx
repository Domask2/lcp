import React from "react";
import {mappedText, transliterate} from "../../../../services/myService";
import {useTypedSelector} from "../../../../hooks";
import {RootState} from "../../../../redux/redux.store";
import {useBarcode} from "react-barcodes";

type AntInputType = {
    props: any
}

const BarCodePreviewElement: React.FC<AntInputType> = ({props}) => {

    const rootState = useTypedSelector((state: RootState) => state)

    let txt = transliterate(mappedText(rootState, props.value.value))

    txt = txt === '' ? ' ' : txt
    const {inputRef} = useBarcode({
        options: props.value.options,
        value: txt
    })

    return (
        <canvas ref={inputRef} />
    )
};

export default BarCodePreviewElement