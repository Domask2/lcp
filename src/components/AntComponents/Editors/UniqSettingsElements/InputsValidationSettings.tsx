import React from 'react';
import {Checkbox, Input} from "antd";

type InputsSettingsType = {
    setModel: (e: any) => void
    model: any
}

const InputsValidationSettings: React.FC<InputsSettingsType> = ({model, setModel}) => {

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
            <h3>Validation</h3>
            <h4>RegExp</h4>
            <Input
                value={model.regexp}
                className="lcEditorInput"
                onChange={(e) => {
                    handleModelUpdate('regexp', e.currentTarget.value);
                }}
            />
            <br />
            <br />
            <h4>Help message</h4>
            <Input
                value={model.helpMessage ? model.helpMessage : ''}
                className="lcEditorInput"
                onChange={(e) => {
                    handleModelUpdate('helpMessage', e.currentTarget.value);
                }}
            />
            <br />
            <br />
            <Checkbox
                onChange={(e) => handleModelUpdate('required', e.target.checked)}
                checked={model.required}
            >
                Required
            </Checkbox>
        </>

    );
};

export default InputsValidationSettings;
