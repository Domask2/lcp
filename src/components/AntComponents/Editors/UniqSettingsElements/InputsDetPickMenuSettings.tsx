import React from 'react';
import ArrayObjectsEditor from '../../Editor/Elements/ArrayObjectsEditor';

type InputsSettingsType = {
    setModel: (e: any) => void
    model: any
}

const InputsDetPickMenuSettings: React.FC<InputsSettingsType> = ({model, setModel}) => {

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
            <h3>Menu Table</h3>
            <ArrayObjectsEditor
                cmp={model}
                list={model.menu}
                setList={(value: any) => handleModelUpdate('menu', value)}
                template={{
                    title: "",
                    actions: "",
                    acl: [],
                    addiction: "",
                    visible: "",
                    confirm: false,
                }}
            />
        </>
    );
};

export default InputsDetPickMenuSettings;
