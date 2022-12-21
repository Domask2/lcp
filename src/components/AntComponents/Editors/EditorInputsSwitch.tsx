import React, {useEffect, useState} from "react";
import {SettingsType} from "../../../editorUtils/editorDictionaries";
import AddictionContainer from "../../addiction/AddictionContainer";
import ObjectEditor from "../Editor/Elements/ObjectEditor";
import useDebounce from "../Inputs/UseDebounce";
import EditorSelectElement from "./InputsElements/EditorSelectElement";
import EditorInputElement from "./InputsElements/EditorInputElement";
import EditorPreviewSwitch from "./PreviewElements/EditorPreviewSwitch";
import EditorUniqSwitch from "./UniqSettingsElements/EditorUniqSwitch";
import EditorCheckboxElement from "./InputsElements/EditorCheckboxElement";
import EditorCheckboxTwoValuesElement from "./InputsElements/EditorCheckboxTwoValuesElement";
import EditorCheckboxInputElement from "./InputsElements/EditorCheckboxInputElement";
import EditorActionsElement from "./InputsElements/EditorActionsElement";
import ObjectUrlEditor from "../Editor/Elements/ObjectUrlEditor/ObjectUrlEditor";
import EditorDsElement from "./DsElements/EditorDsElement";
import EditorTableDsElement from "./DsElements/EditorTableDsElement";
import EditorObjInputsElement from "./InputsElements/EditorObjInputsElement";
import InputsTypeSettings from "./UniqSettingsElements/InputsTypeSettings";
import InputsValidationSettings from "./UniqSettingsElements/InputsValidationSettings";
import InputsConditionSettings from "./UniqSettingsElements/InputsConditionSettings";
import InputsInitDictionarySettings from "./UniqSettingsElements/InputsInitDictionarySettings";
import InputsDetPickMenuSettings from "./UniqSettingsElements/InputsDetPickMenuSettings";
import InputsDsSettings from "./UniqSettingsElements/InputsDsSettings";
import EditorCheckboxTwoInputElement from "./InputsElements/EditorCheckboxTwoInputElement";

type AntInputType = {
    props: any
}

const EditorInputsSwitch: React.FC<AntInputType> = ({props}) => {

    const [value, setValue] = useState<any>(props.keyTwoLevel ? (props.value[props.key] && props.value[props.key][props.keyTwoLevel] ? props.value[props.key][props.keyTwoLevel] : props.startValue) : (props.value[props.key] ? props.value[props.key] : props.startValue));
    const [valueTwo, setValueTwo] = useState(props.value[props.keyTwo]);

    const debouncedValue = useDebounce(value, 500);
    const debouncedValueTwo = useDebounce(valueTwo, 500);

    useEffect(() => {
        props.keyTwoLevel ?
            (
                props.setValue((prev: any) => {
                    return {
                        ...prev,
                        [props.key]: {
                            ...prev[props.key],
                            [props.keyTwoLevel]: value
                        }
                    }
                })
            )
            : (
                props.setValue((prev: any) => {
                    return {
                        ...prev,
                        [props.key]: value
                    }
                })
            )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    useEffect(() => {
        props.setValue((prev: any) => {
            return {
                ...prev,
                [props.keyTwo]: valueTwo
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValueTwo]);

    const renderInputs = () => {
        switch (props.inputsType.type) {
            case SettingsType.INPUT:
                return <EditorInputElement
                    props={props}
                    setValue={setValue}
                    value={value}
                />
            case SettingsType.BR:
                return <div style={{height: '20px'}}></div>
            case SettingsType.SELECT:
                return <EditorSelectElement
                    props={props}
                    setValue={setValue}
                // value={value}
                />
            case SettingsType.CHECKBOX_TWO_VALUES:
                return <EditorCheckboxTwoValuesElement
                    props={props}
                    setValue={setValue}
                />
            case SettingsType.CHECKBOX:
                return <EditorCheckboxElement
                    props={props}
                    setValue={setValue}
                    value={value}
                />
            case SettingsType.CHECKBOX_INPUT:
                return <EditorCheckboxInputElement
                    props={props}
                    setValue={setValue}
                    value={value}
                    valueTwo={valueTwo}
                    setValueTwo={setValueTwo}
                />
            case SettingsType.CHECKBOX_TWO_INPUTS:
                return <EditorCheckboxTwoInputElement
                    props={props}
                />
            case SettingsType.ADDICTION:
                return <AddictionContainer
                    setState={setValue}
                    cmp={props.value}
                    addictionId={props.list}
                />

            case SettingsType.PREVIEW:
                return <EditorPreviewSwitch props={props} />
            case SettingsType.DS:
                return <EditorDsElement
                    props={props}
                    setValue={setValue}
                    value={value}
                    valueTwo={valueTwo}
                    setValueTwo={setValueTwo}
                />
            case SettingsType.TABLE_DS:
                return <EditorTableDsElement
                    props={props}
                    setValue={setValue}
                    value={value}
                />
            case SettingsType.ACTIONS:
                return <EditorActionsElement
                    props={props}
                    setValue={setValue}
                    value={value}
                />
            case SettingsType.UNIQ:
                return <EditorUniqSwitch
                    props={props}
                    setValue={setValue}
                    value={value}
                />
            case SettingsType.GET_URL:
                return <>
                    <h3>Get URL</h3>
                    <ObjectUrlEditor object={value} setObject={setValue} />
                </>
            case SettingsType.STYLE:
                return <div>
                    <div>{props.key}:</div>
                    <ObjectEditor
                        autoCss={true}
                        object={value}
                        setObject={setValue}
                    />
                </div>
            case SettingsType.OBJ_INPUTS:
                return <div>
                    <EditorObjInputsElement
                        props={props}
                        setValue={setValue}
                        value={value}
                    />
                </div>
            case SettingsType.INPUTS_TYPE:
                return <div>
                    <InputsTypeSettings
                        setModel={props.setValue}
                        model={props.value}
                    />
                </div>
            case SettingsType.INPUTS_VALIDATION:
                return <div>
                    <InputsValidationSettings
                        setModel={props.setValue}
                        model={props.value}
                    />
                </div>
            case SettingsType.INPUTS_CONDITION:
                return <div>
                    <InputsConditionSettings
                        setModel={props.setValue}
                        model={props.value}
                    />
                </div>
            case SettingsType.INPUTS_INIT_DICTIONARY:
                return <div>
                    <InputsInitDictionarySettings
                        setModel={props.setValue}
                        model={props.value}
                    />
                </div>
            case SettingsType.INPUTS_DETAILS_PICKER_MENU:
                return <div>
                    <InputsDetPickMenuSettings
                        setModel={props.setValue}
                        model={props.value}
                    />
                </div>
            case SettingsType.INPUTS_DS_SETTINGS:
                return <div>
                    <InputsDsSettings
                        setModel={props.setValue}
                        model={props.value}
                    />
                </div>

            default:
                break;
        }

    }

    return <>
        {renderInputs()}
    </>
}

export default EditorInputsSwitch