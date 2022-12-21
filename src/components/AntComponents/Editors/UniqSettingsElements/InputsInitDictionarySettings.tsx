import React from 'react';
import ObjectEditor from '../../Editor/Elements/ObjectEditor';

type InputsSettingsType = {
    setModel: (e: any) => void
    model: any
}

const InputsInitDictionarySettings: React.FC<InputsSettingsType> = ({model, setModel}) => {

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
            <h3>InitDictionary</h3>
            <ObjectEditor
                object={model.initDictionary}
                setObject={(value: any) => handleModelUpdate('initDictionary', value)}
            />
        </>
    );
};

export default InputsInitDictionarySettings;
