import React, {useEffect, useState} from "react";
import {useActions, useTypedSelector} from "../../../../hooks";
import {
    getDataSourceLsVars,
    getDataSourceLsVarsByKey,
    getDataSourcesLsVarsByKey
} from "../../../../redux/ds/ds.selector";
import useDebounce from "../UseDebounce";
import {formationValue, InputsType, validateValue} from "../../../../utils";
import {RootState} from "../../../../redux/redux.store";
import {IInputs} from "../../Page/templates";

const errorBorderStyle = {
    border: '1px solid tomato',
}
const warningBorderStyle = {
    border: '1px solid orange',
}
const errorTextStyle = {
    color: 'tomato'
}
const warningTextStyle = {
    color: 'orange'
}

const WithInputs = ({WrappedComponent, cmp, props}: { WrappedComponent: any, cmp: IInputs, props: any }) => {

    const {setLsVars, setLsPP, setLsBadVars} = useActions();
    const initDs: any = props.dataSource?.items[props.index];
    // const listDs = useTypedSelector((state: RootState) => getDataSource(state, cmp.listDs))?.items[0]
    // const lsVars: any = useTypedSelector((state: RootState) => getDataSourceLsVars(state));
    const addictionKey = cmp.adKey ? `${cmp.adKey}__${cmp.key}` : undefined
    const addictionKeyTwo = cmp.adKeyTwo ? `${cmp.adKeyTwo}__${cmp.key}` : undefined;

    const vars = useTypedSelector((state: RootState) => getDataSourceLsVarsByKey(state, addictionKey));
    const initVarsValue = useTypedSelector((state: RootState) => getDataSourceLsVarsByKey(state, cmp.initVarsValue));

    const [initValue, setInitValue] = useState<any>(cmp.initValue)
    const [initValueKey, setInitValueKey] = useState<any>(cmp.initValueKey)
    const [initTextValue, setInitTextValue] = useState<any>()
    const [storedValue, setStoredValue] = useState<any>('')
    const [storedValueTwo, setStoredValueTwo] = useState<any>('')
    const [value, setValue] = useState<any>('')
    const [validate, setValidate] = useState<boolean>(true)

    // функция задержки записи
    const debouncedStoredValue = useDebounce(storedValue, 300);
    const debouncedValue = useDebounce(value, 300);

    const validationBorderStyle = validate ? {} : cmp.required ? errorBorderStyle : warningBorderStyle;
    const validationTextStyle = validate ? {} : cmp.required ? errorTextStyle : warningTextStyle;

    const renderHelpMessage = () => {
        if (validate) return
        if (cmp.helpMessage) {
            switch (cmp.inputsType) {
                case InputsType.CHECKBOX:
                    return (
                        <span style={{fontSize: '10px', ...validationTextStyle}}>{cmp.helpMessage}</span>
                    )
                default:
                    return (
                        <span style={{fontSize: '10px', ...validationTextStyle}}>{cmp.helpMessage}</span>
                    )
            }
        }
    }

    useEffect(() => {
        if (vars === undefined) {
            setValue('')
            setStoredValue('')
            // setInitValue(vars)
        }
    }, [vars])

    useEffect(() => {
        if (initVarsValue) {
            setValue(initVarsValue)
            setStoredValue(initVarsValue)
            // setInitValue(initVarsValue)
        } else {
            setValue('')
            setStoredValue('')
        }
    }, [initVarsValue])

    // проводим инициализацию - записываем данные в redux и отображаем в полях ввода
    useEffect(() => {
        // addictionKey && setLsVars(addictionKey, '');
        if (initDs) {
            if (cmp.initValue) {

                if (cmp.initValueKey) {
                    addictionKey && setLsVars(addictionKey, +cmp.initValueKey);
                    cmp.inputsType === InputsType.CHECKBOX && setValue(cmp.initValue)
                } else {
                    addictionKey && setLsVars(addictionKey, cmp.numeric ? +cmp.initValue : cmp.initValue);
                    cmp.inputsType === InputsType.CHECKBOX && setValue(cmp.initValue)
                }
            }
            if (cmp.ds && initDs) {
                if (cmp.procName && cmp.procKey) {
                    cmp.initValue && setLsPP(cmp.procName, cmp.procKey, cmp.numeric ? +cmp.initValue : cmp.initValue);
                    cmp.initKey && setLsPP(cmp.procName, cmp.procKey, cmp.numeric ? +initDs[cmp.initKey] : initDs[cmp.initKey]);
                }
                if (cmp.initKey) {
                    // setInitKeyValue(initDs[cmp.initKey]);
                    cmp.initTextKeys && setInitTextValue(formationValue(cmp.initTextKeys, initDs))
                    addictionKey && setLsVars(addictionKey, cmp.numeric ? +initDs[cmp.initKey] : initDs[cmp.initKey])
                    addictionKey && setStoredValue(cmp.numeric ? +initDs[cmp.initKey] : initDs[cmp.initKey])
                    if (cmp.procName && cmp.procKey) {
                        setLsPP(cmp.procName, cmp.procKey, cmp.numeric ? +initDs[cmp.initKey] : initDs[cmp.initKey]);
                    }
                }
                if (cmp.initKeyTwo) {
                    addictionKeyTwo && setLsVars(addictionKeyTwo, cmp.numeric ? +initDs[cmp.initKeyTwo] : initDs[cmp.initKeyTwo])
                    addictionKeyTwo && setStoredValueTwo(cmp.numeric ? +initDs[cmp.initKey] : initDs[cmp.initKey])
                }
                cmp.initTextKeys?.length ? setValue(formationValue(cmp.initTextKeys, initDs)) : setValue(cmp.initValue)
            }
        } else if (initValue) {

            if (cmp.initValueKey) {
                addictionKey && setLsVars(addictionKey, +initValueKey);
                setValue(initValue)
            } else {
                addictionKey && setLsVars(addictionKey, cmp.numeric ? +initValue : initValue);
                setValue(cmp.initValue);
            }

            // addictionKey && setLsVars(addictionKey, cmp.numeric ? +initValue : initValue);
            // setValue(cmp.initValue);
        }

        return () => {
            addictionKey && setLsVars(addictionKey, '')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initDs])

    useEffect(() => {
        if (!cmp.disabled || cmp.inputsType === 'HiddenInput') {
            if (storedValue) {
                if (cmp.procName && cmp.procKey) {
                    setLsPP(cmp.procName, cmp.procKey, storedValue);
                }
                if (addictionKey) {
                    if (addictionKeyTwo) {
                        setLsVars(addictionKey, storedValue)
                        setLsVars(addictionKeyTwo, storedValueTwo)
                    } else {
                        setLsVars(addictionKey, storedValue)
                    }
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedStoredValue])

    useEffect(() => {
        if (!cmp.disabled || cmp.inputsType === 'HiddenInput') {
            if (addictionKey) {
                setValidate(validateValue(cmp, value ? value : initValue))
                if (cmp.required) {
                    if (addictionKeyTwo) {
                        setLsBadVars(addictionKey, validateValue(cmp, storedValue ? storedValue : value))
                        setLsBadVars(addictionKeyTwo, validateValue(cmp, storedValueTwo ? storedValueTwo : value))
                    } else {
                        setLsBadVars(addictionKey, validateValue(cmp, value ? value : initValue))
                    }
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue])

    const propsObj = {
        addictionKey,
        value,
        initValue,
        storedValue,
        validate,
        walidationBorderStyle: validationBorderStyle,
        initTextValue,
        renderHelpMessage,
        // обнуляем initValue
        onChange: (value: any) => {
            if (!value) {
                addictionKey && setLsVars(addictionKey, '')
                addictionKeyTwo && setLsVars(addictionKeyTwo, '')
            }
            initValue && setInitValue('')
            setValue(cmp.numeric ? +value : value);
            setStoredValue(cmp.numeric ? +value : value)
        },
        onChangeDetailsPicker: (row: any, textValue: any) => {
            initValue && setInitValue('')
            setValue(cmp.numeric ? +textValue : textValue);
            cmp.listKey && setStoredValue(cmp.numeric ? +row[cmp.listKey] : row[cmp.listKey]);
            cmp.listKeyTwo && setStoredValueTwo(cmp.numeric ? +row[cmp.listKeyTwo] : row[cmp.listKeyTwo])
        },
        onClearDetailsPicker: () => {
            setInitTextValue('')
            setValue('');
            setStoredValue('');
            setStoredValueTwo('')
            addictionKey && setLsVars(addictionKey, '__no_name__')
            addictionKeyTwo && setLsVars(addictionKeyTwo, '__no_name__')
        }
    }

    return <WrappedComponent cmp={cmp} props={propsObj}/>;
};

export default WithInputs