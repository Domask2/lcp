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
import AntInputDisabled from "./AntInputDisabled";

type AntInputType = {
    cmp: IInputs,
    props: any,
}

const InputsMaster: React.FC<AntInputType> = ({cmp, props}) => {

    switch (cmp.inputsType) {
        case 'Input':
            if (cmp.disabled) {
                // return <WithInputs WrappedComponent={AntInput} cmp={cmp} props={props} />
                return <AntInputDisabled cmp={cmp} props={props} />
            } else {
                return <WithInputs WrappedComponent={AntInput} cmp={cmp} props={props} />
            }
        case 'HiddenInput':
            // return <WithInputs WrappedComponent={AntInput} cmp={cmp} props={props} />
            return <AntInputDisabled cmp={cmp} props={props} />
        case 'Checkbox':
            return <WithInputs WrappedComponent={AntCheckbox} cmp={cmp} props={props} />
        case 'Radio':
            return <WithInputs WrappedComponent={AntRadioBtn} cmp={cmp} props={props} />
        case 'Select':
            return <WithInputs WrappedComponent={AntSelect} cmp={cmp} props={props} />
        case 'SelectMulti':
            return <WithInputs WrappedComponent={AntSelect} cmp={cmp} props={props} />
        case 'DatePicker':
            return <WithInputs WrappedComponent={AntDatePicker} cmp={cmp} props={props} />
        case 'RangePicker':
            return <WithInputs WrappedComponent={AntRangePicker} cmp={cmp} props={props} />
        case 'RangeInput':
            return <WithInputs WrappedComponent={AntRangeInput} cmp={cmp} props={props} />
        case 'DetailsPicker':
            return <WithInputs WrappedComponent={AntDetailsPicker} cmp={cmp} props={props} />
    }
    return null
}

export default InputsMaster
