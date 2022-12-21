import React from 'react';
import {Checkbox, Input, Space} from "antd";
import SelectElement from '../../Inputs/InputsEditElements/Select';
import {formItems, InputsType} from '../../../../utils';

type InputsSettingsType = {
    setModel: (e: any) => void
    model: any
}

const InputsTypeSettings: React.FC<InputsSettingsType> = ({model, setModel}) => {

    const handleNumericCheckbox = (e: boolean) => {
        setModel((prev: any) => {
            return {
                ...prev,
                numeric: e,
                minValue: '',
                maxValue: '',
            }
        })

    };

    const handleModelUpdate = (key: string, value: any) => {
        setModel((prev: any) => {
            return {
                ...prev,
                [key]: value
            }
        })
    };


    return (
        <>
            <h3>Type</h3>
            <SelectElement
                props={{
                    setValue: (val: any) => handleModelUpdate('inputsType', val),
                    value: model.inputsType,
                    list: formItems,
                    style: {width: "100%"},
                }}
            />
            <br />
            {(model.inputsType === InputsType.INPUT || model.inputsType === InputsType.HIDDEN_INPUT) && (
                <>
                    <Checkbox
                        onChange={(e) => handleModelUpdate('prefix', e.target.checked)}
                        checked={model.prefix}
                    >
                        Prefix
                    </Checkbox>
                    <br />
                    <Checkbox
                        onChange={(e) => handleNumericCheckbox(e.target.checked)}
                        checked={model.numeric}
                    >
                        Numeric
                    </Checkbox>
                </>
            )}
            {model.numeric && (
                <Space>
                    <span>Min</span>
                    <Input
                        value={model.minValue}
                        className="lcEditorInput"
                        onChange={(e) => {
                            handleModelUpdate('minValue', e.currentTarget.value);
                        }}
                    />
                    <span>Max</span>
                    <Input
                        value={model.maxValue}
                        className="lcEditorInput"
                        onChange={(e) => {
                            handleModelUpdate('maxValue', e.currentTarget.value);
                        }}
                    />

                </Space>
            )}
        </>
    );
};

export default InputsTypeSettings;
