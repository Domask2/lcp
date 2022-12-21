import React from 'react';
import {useTypedSelector} from '../../../../hooks';
import {getDataSourcesAll} from '../../../../redux/ds/ds.selector';
import {RootState} from '../../../../redux/redux.store';

import {Button, Checkbox, Input} from "antd";
import {ClearOutlined} from '@ant-design/icons';

import SelectElement from '../../Inputs/InputsEditElements/Select';
import {InputsType, renderListDsBlock} from '../../../../utils';
import AntPopover from '../../Popover/AntPopover';

const containerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
};
const inputStyle = {
    maxWidth: "100%",
    width: "70%",
    borderBottom: "1px solid #eee",
    backgroundColor: "#fff",
    marginLeft: "4%",
};
const inputStyleTwo = {
    width: "33%",
    borderBottom: "1px solid #eee",
    backgroundColor: "#fff",
    marginLeft: "4%",
};
const selectStyle = {
    width: "70%",
    marginLeft: "4%",
};
const selectStyleTwo = {
    width: "33%",
    marginLeft: "4%",
};

type InputsSettingsType = {
    setModel: (e: any) => void
    model: any
}

const InputsDsSettings: React.FC<InputsSettingsType> = ({setModel, model}) => {

    const allDS = useTypedSelector((state: RootState) =>
        getDataSourcesAll(state)
    );

    const handleModelUpdate = (key: string, value: any) => {
        setModel((prev: any) => {
            return {
                ...prev,
                [key]: value
            }
        })
    };

    const handleInitDs = (value: any) => {
        setModel((prev: any) => {
            return {
                ...prev,
                ds: value,
                initKey: '',
                initTextKeys: [],
                filtredDsKey: '',
            }
        })
    };
    const handleInitDsClean = () => {
        setModel((prev: any) => {
            return {
                ...prev,
                ds: '',
                initKey: '',
                initTextKeys: [],
                filtredDsKey: '',
            }
        })
    };

    const handleListDs = (value: any) => {
        setModel((prev: any) => {
            return {
                ...prev,
                listDs: value,
                listKey: '',
                listTextKeys: [],
                filterKey: '',
            }
        })
    };

    const handleListDsClean = () => {
        setModel((prev: any) => {
            return {
                ...prev,
                listDs: '',
                listKey: '',
                listTextKeys: [],
                filterKey: '',
            }
        })
    };


    return (
        <>
            <div style={containerStyle}>
                <AntPopover
                    title="LsVarsKey:"
                    hoverText={
                        <div style={{maxWidth: "600px"}}>
                            {
                                "Название ключа для state.ds.ls.vars в который будут сохраняться данные из инпута."
                            }
                            <br />
                            <br />
                            {"Для DetailsPicker:"}
                            <br />
                            {
                                "значение этого ключа из Ds будет сохранено в Redux при инициализации и будет использовано если не указан ключ в поле InitValue"
                            }
                        </div>
                    }
                />
                {model.inputsType === InputsType.DETAILS_PICKER ? (
                    <>
                        <Input
                            style={inputStyleTwo}
                            value={model.adKey}
                            className="lcEditorInput"
                            onChange={(e) => {
                                handleModelUpdate('adKey', e.currentTarget.value);
                            }}
                        />
                        <Input
                            style={inputStyleTwo}
                            value={model.adKeyTwo}
                            className="lcEditorInput"
                            onChange={(e) => {
                                handleModelUpdate('adKeyTwo', e.currentTarget.value);
                            }}
                        />
                    </>
                ) : (
                    <Input
                        style={inputStyle}
                        value={model.adKey}
                        className="lcEditorInput"
                        onChange={(e) => {
                            handleModelUpdate('adKey', e.currentTarget.value);
                        }}
                    />
                )}
                <Button
                    type="link"
                    onClick={() => {
                        handleModelUpdate('adKey', '');
                        handleModelUpdate('adKeyTwo', '');
                    }}
                    icon={<ClearOutlined />}
                />
            </div>

            {/* {renderInitValueBlock(inputsType) && */}
            <div style={containerStyle}>
                <AntPopover
                    title="InitValue:"
                    hoverText="Стоковое значение для инициализации инпута"
                />
                <Input
                    style={inputStyle}
                    value={model.initValue}
                    className="lcEditorInput"
                    onChange={(e) => {
                        handleModelUpdate('initValue', e.currentTarget.value);
                    }}
                />
                <Button
                    type="link"
                    onClick={() => handleModelUpdate('initValue', '')}
                    icon={<ClearOutlined />}
                />
            </div>
            {/* } */}
            <br />

            <div style={containerStyle}>
                <AntPopover
                    title="InitDs:"
                    hoverText="Источник данных для отображения при инициализации"
                />
                <SelectElement
                    props={{
                        setValue: handleInitDs,
                        value: model.ds,
                        list: Object.keys(allDS),
                        style: {...selectStyle},
                    }}
                />
                <Button
                    type="link"
                    onClick={handleInitDsClean}
                    icon={<ClearOutlined />}
                />
            </div>

            <div style={containerStyle}>
                <AntPopover
                    title="InitKey:"
                    hoverText={
                        <div
                            style={{maxWidth: "600px"}}
                        >{`Ключ для сохранния в Redux при инициализации из ${model.ds ? model.ds : "Ds"
                            }.`}</div>
                    }
                />
                {model.adKeyTwo ? (
                    <>
                        <SelectElement
                            props={{
                                setValue: (value: any) => handleModelUpdate('initKey', value),
                                value: model.initKey,
                                list: allDS[model.ds]?.columns,
                                style: {...selectStyleTwo},
                            }}
                        />
                        <SelectElement
                            props={{
                                setValue: (value: any) => handleModelUpdate('initKeyTwo', value),
                                value: model.initKeyTwo,
                                list: allDS[model.ds]?.columns,
                                style: {...selectStyleTwo},
                            }}
                        />
                    </>
                ) : (
                    <SelectElement
                        props={{
                            setValue: (value: any) => handleModelUpdate('initKey', value),
                            value: model.initKey,
                            list: allDS[model.ds]?.columns,
                            style: {...selectStyle},
                        }}
                    />
                )}
                <Button
                    type="link"
                    onClick={() => {
                        handleModelUpdate('initKey', '');
                        handleModelUpdate('initKeyTwo', '');
                    }}
                    icon={<ClearOutlined />}
                />
            </div>

            <div style={containerStyle}>
                <AntPopover
                    title="InitTextKeys:"
                    hoverText={
                        <div style={{maxWidth: "600px"}}>
                            {"Ключи для отображения при инициализации для пользователя"}
                        </div>
                    }
                />
                <SelectElement
                    props={{
                        setValue: (value: any) => handleModelUpdate('initTextKeys', value),
                        value: model.initTextKeys,
                        list: allDS[model.ds]?.columns,
                        style: {...selectStyle},
                        mode: "multiple",
                    }}
                />
                <Button
                    type="link"
                    onClick={() => handleModelUpdate('initTextKeys', [])}
                    icon={<ClearOutlined />}
                />
            </div>
            <br />

            {renderListDsBlock(model.inputsType) && (
                <>
                    <div style={containerStyle}>
                        <AntPopover
                            title="ListDs:"
                            hoverText="Источник данных для формирования списка/таблицы"
                        />
                        <SelectElement
                            props={{
                                setValue: handleListDs,
                                value: model.listDs,
                                list: Object.keys(allDS),
                                style: {...selectStyle},
                            }}
                        />
                        <Button
                            type="link"
                            onClick={handleListDsClean}
                            icon={<ClearOutlined />}
                        />
                    </div>

                    <div style={containerStyle}>
                        <AntPopover
                            title="ListKey:"
                            hoverText={
                                <div
                                    style={{maxWidth: "600px"}}
                                >{`Ключ для сохранния в Redux при выборе значения из ${model.ds ? model.ds : "Ds"
                                    }.`}</div>
                            }
                        />
                        {model.adKeyTwo ? (
                            <>
                                <SelectElement
                                    props={{
                                        setValue: (value: any) => handleModelUpdate('listKey', value),
                                        value: model.listKey,
                                        list: allDS[model.listDs]?.columns,
                                        style: {...selectStyleTwo},
                                    }}
                                />
                                <SelectElement
                                    props={{
                                        setValue: (value: any) => handleModelUpdate('listKeyTwo', value),
                                        value: model.listKeyTwo,
                                        list: allDS[model.listDs]?.columns,
                                        style: {...selectStyleTwo},
                                    }}
                                />
                            </>
                        ) : (
                            <SelectElement
                                props={{
                                    setValue: (value: any) => handleModelUpdate('listKey', value),
                                    value: model.listKey,
                                    list: allDS[model.listDs]?.columns,
                                    style: {...selectStyle},
                                }}
                            />
                        )}

                        <Button
                            type="link"
                            onClick={() => {
                                handleModelUpdate('listKey', '')
                                handleModelUpdate('listKeyTwo', '')
                            }}
                            icon={<ClearOutlined />}
                        />
                    </div>

                    <div style={containerStyle}>
                        <AntPopover
                            title="ListTextKeys:"
                            hoverText={
                                <div style={{maxWidth: "600px"}}>
                                    {"Ключи для отображения при выборе значения"}
                                </div>
                            }
                        />
                        <SelectElement
                            props={{
                                setValue: (value: any) => handleModelUpdate('listTextKeys', value),
                                value: model.listTextKeys,
                                list: allDS[model.listDs]?.columns,
                                style: {...selectStyle},
                                mode: "multiple",
                            }}
                        />
                        <Button
                            type="link"
                            onClick={() => handleModelUpdate('listTextKeys', [])}
                            icon={<ClearOutlined />}
                        />
                    </div>
                    {model.inputsType === InputsType.SELECT && <div style={containerStyle}>
                        <AntPopover
                            title="Наличие поля:"
                            hoverText={
                                <div style={{maxWidth: "600px"}}>
                                    {"Отключить/включить наличие в списке пункта «-- не указано --»"}
                                </div>
                            }
                        />
                        <Checkbox
                            style={{...selectStyle, marginRight: '32px'}}
                            onChange={(e) => handleModelUpdate('zeroOption', e.target.checked)}
                            checked={model.zeroOption}
                        >
                            -- не указано --
                        </Checkbox>

                    </div>}

                    <br />
                </>
            )}

            {model.inputsType === "Select" && (
                <>
                    <div style={containerStyle}>
                        <AntPopover
                            title="FiltredKey:"
                            hoverText={`Значения для фильтрации. Ключ из ${model.ds ? model.ds : "initDs"
                                }, значение которого используется для фильтрации`}
                        />
                        <SelectElement
                            props={{
                                setValue: (value: any) => handleModelUpdate('filtredDsKey', value),
                                value: model.filtredDsKey,
                                list: allDS[model.ds]?.columns,
                                style: {...selectStyle},
                            }}
                        />
                        <Button
                            type="link"
                            onClick={() => handleModelUpdate('filtredDsKey', '')}
                            icon={<ClearOutlined />}
                        />
                    </div>

                    <div style={containerStyle}>
                        <AntPopover
                            title="FilterableKey:"
                            hoverText={`Значения для фильтрации. Фильтруемый ключ из ${model.listDs ? model.listDs : "listDs"
                                }`}
                        />
                        <SelectElement
                            props={{
                                setValue: (value: any) => handleModelUpdate('filterKey', value),
                                value: model.filterKey,
                                list: allDS[model.listDs]?.columns,
                                style: {...selectStyle},
                            }}
                        />
                        <Button
                            type="link"
                            onClick={() => handleModelUpdate('filterKey', '')}
                            icon={<ClearOutlined />}
                        />
                    </div>

                    <div style={containerStyle}>
                        <AntPopover
                            title="User Filter:"
                            hoverText="Кастомное начения для фильтрации. Формат: знак,число (>,2)"
                        />
                        <Input
                            style={inputStyle}
                            value={model.userFilter}
                            className="lcEditorInput"
                            onChange={(e) => {
                                handleModelUpdate('userFilter', e.currentTarget.value);
                            }}
                        />
                        <Button
                            type="link"
                            onClick={() => handleModelUpdate('userFilter', '')}
                            icon={<ClearOutlined />}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default InputsDsSettings;
