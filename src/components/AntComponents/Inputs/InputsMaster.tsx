import React from "react";
// import WithInputs from "./hoc/hocer";
import WithInputs from "./hoc/hocerTwoPointZero";
import {IInputs} from "../Page/templates";
import AntCheckbox from "./AntCheckbox";
import AntDatePicker from "./AntDatePicker";
import AntInput from "./AntInput";
import AntRadioBtn from "./AntRadioBtn";
import AntSelect from "./AntSelect";
import AntDetailsPicker from "./AntDetailsPicker";
import AntRangePicker from "./AntRangePicker";
import AntRangeInput from "./AntRangeInput";

type AntInputType = {
    cmp: IInputs
}

const InputsMaster: React.FC<AntInputType> = ({cmp}) => {

    switch (cmp.inputsType) {
        case 'Input':
            return <WithInputs WrappedComponent={AntInput} cmp={cmp} />
        case 'HiddenInput':
            return <WithInputs WrappedComponent={AntInput} cmp={cmp} />
        case 'Checkbox':
            return <WithInputs WrappedComponent={AntCheckbox} cmp={cmp} />
        case 'Radio':
            return <WithInputs WrappedComponent={AntRadioBtn} cmp={cmp} />
        case 'Select':
            return <WithInputs WrappedComponent={AntSelect} cmp={cmp} />
        case 'SelectMulti':
            return <WithInputs WrappedComponent={AntSelect} cmp={cmp} />
        case 'DatePicker':
            return <WithInputs WrappedComponent={AntDatePicker} cmp={cmp} />
        case 'RangePicker':
            return <WithInputs WrappedComponent={AntRangePicker} cmp={cmp} />
        case 'RangeInput':
            return <WithInputs WrappedComponent={AntRangeInput} cmp={cmp} />
        case 'DetailsPicker':
            return <WithInputs WrappedComponent={AntDetailsPicker} cmp={cmp} />
    }
    return null
}

export default InputsMaster
