import React, {useEffect, useState} from 'react';
import {useTypedSelector, useActions} from "../../../hooks";
import {getDataSourceAllLs, getDataSourcesAll} from '../../../redux/ds/ds.selector';

import AntPopover from '../Popover/AntPopover';
import ItemEdit from "../Editor/Elements/ItemEdit";
import ArrayEditor from "../Editor/Elements/ArrayEditor";
import ArrayObjectsEditor from "../Editor/Elements/ArrayObjectsEditor";
import SelectElement from './InputsEditElements/Select';
import ObjectEditor from "../Editor/Elements/ObjectEditor";
import ButtonBlock from "../Editor/ButtonBlock";
import EditAcl from "../Editor/Components/EditAcl";
import AddictionContainer from '../../addiction/AddictionContainer';

import {formItems, getFreeKeys, InputsType, renderListDsBlock} from '../../../utils';
import {Button, Card, Checkbox, Col, Input, Popconfirm, Row, Select, Space, Switch} from "antd";
import {ClearOutlined, DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {AndEditType, dateConditionType, IInputs} from "../Page/templates";
import {RootState} from '../../../redux/redux.store';

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

const AntInputsEdit: React.FC<AndEditType> = ({
    cmp,
    setVisible = () => { },
}) => {
    const {cmpUpdate, setLsVars, setLsInputs, setLsPP} = useActions();
    const ls: any = useTypedSelector((state: RootState) =>
        getDataSourceAllLs(state)
    );
    const allDS = useTypedSelector((state: RootState) =>
        getDataSourcesAll(state)
    );

    let model: IInputs = {...cmp};

    const [actions, setActions] = useState(
        model.actions ? [...model.actions] : []
    );
    const [style, setStyle] = useState({...model.style});
    const [inputsStyle, setInputsStyle] = useState({...model.inputsStyle});
    const [direction, setDirection] = useState(model.direction ? model.direction : "horizontal");
    const [acl, setAcl] = useState(model.acl);
    const [inputsType, setInputsType] = useState(model.inputsType);
    const [prefix, setPrefix] = useState<boolean>(model.prefix ? model.prefix : false);
    const [numeric, setNumeric] = useState<boolean>(model.numeric ? model.numeric : false);
    const [addiction, setAddiction] = useState<any>(model.addiction ? model.addiction : '');
    const [anchor, setAnchor] = useState<string>(model.anchor ? model.anchor : "");
    const [caption, setCaption] = useState<string>(model.caption);
    const [procName, setProcName] = useState<string>(model.procName);
    const [procKey, setProcKey] = useState<string>(model.procKey);
    const [filterKey, setFilterKey] = useState<string>(model.filterKey ? model.filterKey : '');
    const [filtredDsKey, setFiltredDsKey] = useState<string>(model.filtredDsKey ? model.filtredDsKey : '');
    const [userFilter, setUserFilter] = useState<string>(model.userFilter ? model.userFilter : '');
    const [helpMessage, setHelpMessage] = useState<string>(model.helpMessage ? model.helpMessage : '');
    const [regexp, setRegexp] = useState<string>(model.regexp ? model.regexp : '');
    const [required, setRequired] = useState<boolean>(model.required ? model.required : false);
    const [link, setLink] = useState<string>(model.link ? model.link : '');
    const [disabled, setDisabled] = useState<boolean>(model.disabled ? model.disabled : false);
    const [extComponent, setExtComponent] = useState<any>(model.extComponent ? model.extComponent : '');
    const [initDictionary, setInitDictionary] = useState<any>(model.initDictionary ? model.initDictionary : '');
    // const [defaultSelect, setDefaultSelect] = useState<any>(model.defaultSelect ? model.defaultSelect : '');
    const [inputDescription, setInputDescription] = useState<string>(model.inputDescription ? model.inputDescription : '');
    const [minValue, setMinValue] = useState<string>(model.minValue ? model.minValue : '');
    const [maxValue, setMaxValue] = useState<string>(model.maxValue ? model.maxValue : '');
    const [zeroOption, setZeroOption] = useState<boolean>(model.zeroOption);

    const [adKey, setAdKey] = useState<string>(model.adKey ? model.adKey : "");
    const [adKeyTwo, setAdKeyTwo] = useState<string>(model.adKeyTwo ? model.adKeyTwo : "");
    const [initValue, setInitValue] = useState<string>(model.initValue ? model.initValue : "");
    const [initDs, setInitDs] = useState(model.ds);
    const [initKey, setInitKey] = useState<string>(model.initKey ? model.initKey : "");
    const [initKeyTwo, setInitKeyTwo] = useState<string>(model.initKeyTwo ? model.initKeyTwo : "");
    const [initTextKeys, setInitTextKeys] = useState<[]>(model.initTextKeys ? model.initTextKeys : []);
    const [listDs, setListDs] = useState<string>(model.listDs ? model.listDs : "");
    const [listKey, setListKey] = useState<string>(model.listKey ? model.listKey : "");
    const [listKeyTwo, setListKeyTwo] = useState<string>(model.listKeyTwo ? model.listKeyTwo : "");
    const [listTextKeys, setListTextKeys] = useState<[]>(model.listTextKeys ? model.listTextKeys : []);

    const [menu, setMenu] = useState<any>(model.menu);
    const [inputWidth, setInputWidth] = useState<number>(model.inputWidth ? model.inputWidth : 14);

    let initDateCondition: dateConditionType = {
        condition: "c",
        count: 0,
        date: "month",
    };
    const [dateCondition, setDateCondition] =
        useState<dateConditionType>(initDateCondition);
    const [dateConditionArray, setDateConditionArray] = useState<any>(
        model.dateConditionArray ? model.dateConditionArray : []
    );

    useEffect(() => {
        model.actions = actions;
        model.style = style;
        model.inputsStyle = inputsStyle;
        model.direction = direction;
        model.inputsType = inputsType;
        model.prefix = prefix;
        model.numeric = numeric;
        model.acl = acl;
        model.ds = initDs;
        model.initKey = initKey;
        model.initKeyTwo = initKeyTwo;
        model.initTextKeys = initTextKeys;
        model.listDs = listDs;
        model.listKey = listKey;
        model.listKeyTwo = listKeyTwo;
        model.listTextKeys = listTextKeys;
        model.addiction = addiction;
        model.anchor = anchor;
        model.caption = caption;
        model.adKey = adKey;
        model.adKeyTwo = adKeyTwo;
        model.procName = procName;
        model.procKey = procKey;
        model.initValue = initValue;
        model.initDictionary = initDictionary;
        model.filterKey = filterKey;
        model.filtredDsKey = filtredDsKey;
        model.userFilter = userFilter;
        model.helpMessage = helpMessage;
        model.required = required;
        model.regexp = regexp;
        model.link = link;
        model.disabled = disabled;
        model.extComponent = extComponent;
        model.dateConditionArray = dateConditionArray;
        model.menu = menu;
        model.inputWidth = inputWidth;
        model.inputDescription = inputDescription;
        model.minValue = minValue;
        model.maxValue = maxValue;
        model.zeroOption = zeroOption;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        style, inputsStyle, acl, initDs, addiction, anchor, caption, adKey, initValue, procName, procKey, inputsType, direction, prefix, initDictionary, helpMessage, regexp, required, filterKey, filtredDsKey, link, disabled, extComponent, dateConditionArray, numeric, actions, menu, userFilter, initKey, initTextKeys, listDs, listKey, listTextKeys, adKeyTwo, initKeyTwo, listKeyTwo, inputWidth, inputDescription, minValue, maxValue, zeroOption]);

    const handleInitDsClean = () => {
        setInitDs("");
        setInitKey("");
        setInitTextKeys([]);
    };

    const handleListDsClean = () => {
        setListDs("");
        setListKey("");
        setListTextKeys([]);
    };

    const handleSetProcName = (e: any) => {
        setProcName(e);
        setProcKey("");
        if (procKey) {
            setLsPP(cmp.procName, procKey, "");
            setLsInputs(cmp.procName, procKey, "");
        }
    };

    // устанавливаем ключ процедуры и обнуляем текущюю привязку
    const handleSetProcKey = (e: any) => {
        setProcKey(e);
        if (procKey) {
            setLsPP(cmp.procName, procKey, "");
            setLsInputs(cmp.procName, procKey, "");
        } else {
            cmp.initDs &&
                setLsPP(cmp.procName, e, allDS[cmp.initDs].items[0][cmp.initDsKey]);
            setLsInputs(cmp.procName, e, cmp.key);
        }
    };

    const handleInitDs = (e: any) => {
        setInitDs(e);
        setInitKey("");
        setInitTextKeys([]);
        setFiltredDsKey("");
    };

    const handleListDs = (e: any) => {
        setListDs(e);
        setListKey("");
        setListTextKeys([]);
        setFilterKey("");
    };

    const handleNumericCheckbox = (e: boolean) => {
        setNumeric(e);
        setMinValue('');
        setMaxValue('')
    };

    const onClose = () => {
        setVisible(false);
    };

    const onApply = () => {
        adKey && setLsVars(adKey, "");
        cmpUpdate(model);
        setVisible(false);
        if (cmp.procName && procKey) {
            setLsInputs(cmp.procName, procKey, cmp.key);
        }
        procKey &&
            cmp.initDs &&
            setLsPP(cmp.procName, procKey, allDS[cmp.initDs].items[0][cmp.initDsKey]);
    };

    return (
        <>
            <h3>
                Редактирование: {cmp.type} - {cmp.key}
            </h3>
            <br />

            <Row gutter={[16, 16]}>
                <Col span={12} style={{minHeight: "280px"}}>
                    <Card size="small" className="cardEdit">
                        {caption}
                    </Card>

                    <Card size="small" className="cardEdit">
                        <h3>Actions</h3>
                        <ArrayEditor cmp={cmp} list={actions} setList={setActions} />
                    </Card>

                    <Card size="small" className="cardEdit">
                        <AddictionContainer
                            setState={setAddiction}
                            cmp={cmp}
                            addictionId={addiction}
                        />
                    </Card>

                    {cmp.inputsType === "DetailsPicker" && (
                        <Card size="small" className="cardEdit">
                            <h3>extComponent</h3>
                            <Input
                                value={extComponent}
                                className="lcEditorInput"
                                onChange={(e) => {
                                    setExtComponent(e.currentTarget.value);
                                }}
                            />
                        </Card>
                    )}
                    <Card size="small" className="cardEdit cardEditAcl">
                        <EditAcl item={acl} setItem={setAcl} />
                    </Card>

                    <Card size="small" className="cardEdit">
                        <h3>Procedure Name</h3>
                        <SelectElement
                            props={{
                                setValue: handleSetProcName,
                                value: procName,
                                list: Object.keys(ls.pp),
                                style: {width: "94%"},
                            }}
                        />
                        <Button
                            type="link"
                            onClick={() => handleSetProcName("")}
                            icon={<ClearOutlined />}
                        />

                        {procName && (
                            <>
                                <h3>Procedure Key</h3>
                                <SelectElement
                                    props={{
                                        setValue: handleSetProcKey,
                                        value: procKey,
                                        list: getFreeKeys(ls.inputs[procName]),
                                        style: {width: "94%"},
                                    }}
                                />
                                <Button
                                    type="link"
                                    onClick={() => handleSetProcKey("")}
                                    icon={<ClearOutlined />}
                                />
                            </>
                        )}
                    </Card>

                    <Card size="small" className="cardEdit">
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
                            {cmp.inputsType === InputsType.DETAILS_PICKER ? (
                                <>
                                    <Input
                                        style={inputStyleTwo}
                                        value={adKey}
                                        className="lcEditorInput"
                                        onChange={(e) => {
                                            setAdKey(e.currentTarget.value);
                                        }}
                                    />
                                    <Input
                                        style={inputStyleTwo}
                                        value={adKeyTwo}
                                        className="lcEditorInput"
                                        onChange={(e) => {
                                            setAdKeyTwo(e.currentTarget.value);
                                        }}
                                    />
                                </>
                            ) : (
                                <Input
                                    style={inputStyle}
                                    value={adKey}
                                    className="lcEditorInput"
                                    onChange={(e) => {
                                        setAdKey(e.currentTarget.value);
                                    }}
                                />
                            )}
                            <Button
                                type="link"
                                onClick={() => {
                                    setAdKey("");
                                    setAdKeyTwo("");
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
                                value={initValue}
                                className="lcEditorInput"
                                onChange={(e) => {
                                    setInitValue(e.currentTarget.value);
                                }}
                            />
                            <Button
                                type="link"
                                onClick={() => setInitValue("")}
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
                                    value: initDs,
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
                            {adKeyTwo ? (
                                <>
                                    <SelectElement
                                        props={{
                                            setValue: setInitKey,
                                            value: initKey,
                                            list: allDS[initDs]?.columns,
                                            style: {...selectStyleTwo},
                                        }}
                                    />
                                    <SelectElement
                                        props={{
                                            setValue: setInitKeyTwo,
                                            value: initKeyTwo,
                                            list: allDS[initDs]?.columns,
                                            style: {...selectStyleTwo},
                                        }}
                                    />
                                </>
                            ) : (
                                <SelectElement
                                    props={{
                                        setValue: setInitKey,
                                        value: initKey,
                                        list: allDS[initDs]?.columns,
                                        style: {...selectStyle},
                                    }}
                                />
                            )}
                            <Button
                                type="link"
                                onClick={() => {
                                    setInitKey("");
                                    setInitKeyTwo("");
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
                                    setValue: setInitTextKeys,
                                    value: initTextKeys,
                                    list: allDS[initDs]?.columns,
                                    style: {...selectStyle},
                                    mode: "multiple",
                                }}
                            />
                            <Button
                                type="link"
                                onClick={() => setInitTextKeys([])}
                                icon={<ClearOutlined />}
                            />
                        </div>
                        <br />

                        {renderListDsBlock(inputsType) && (
                            <>
                                <div style={containerStyle}>
                                    <AntPopover
                                        title="ListDs:"
                                        hoverText="Источник данных для формирования списка/таблицы"
                                    />
                                    <SelectElement
                                        props={{
                                            setValue: handleListDs,
                                            value: listDs,
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
                                    {adKeyTwo ? (
                                        <>
                                            <SelectElement
                                                props={{
                                                    setValue: setListKey,
                                                    value: listKey,
                                                    list: allDS[listDs]?.columns,
                                                    style: {...selectStyleTwo},
                                                }}
                                            />
                                            <SelectElement
                                                props={{
                                                    setValue: setListKeyTwo,
                                                    value: listKeyTwo,
                                                    list: allDS[listDs]?.columns,
                                                    style: {...selectStyleTwo},
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <SelectElement
                                            props={{
                                                setValue: setListKey,
                                                value: listKey,
                                                list: allDS[listDs]?.columns,
                                                style: {...selectStyle},
                                            }}
                                        />
                                    )}

                                    <Button
                                        type="link"
                                        onClick={() => setListKey("")}
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
                                            setValue: setListTextKeys,
                                            value: listTextKeys,
                                            list: allDS[listDs]?.columns,
                                            style: {...selectStyle},
                                            mode: "multiple",
                                        }}
                                    />
                                    <Button
                                        type="link"
                                        onClick={() => setListTextKeys([])}
                                        icon={<ClearOutlined />}
                                    />
                                </div>
                                {cmp.inputsType === InputsType.SELECT && <div style={containerStyle}>
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
                                        onChange={(e) => setZeroOption(e.target.checked)}
                                        checked={zeroOption}
                                    >
                                        -- не указано --
                                    </Checkbox>

                                </div>}

                                <br />
                            </>
                        )}

                        {inputsType === "Select" && (
                            <>
                                <div style={containerStyle}>
                                    <AntPopover
                                        title="FiltredKey:"
                                        hoverText={`Значения для фильтрации. Ключ из ${initDs ? initDs : "initDs"
                                            }, значение которого используется для фильтрации`}
                                    />
                                    <SelectElement
                                        props={{
                                            setValue: setFiltredDsKey,
                                            value: filtredDsKey,
                                            list: allDS[initDs]?.columns,
                                            style: {...selectStyle},
                                        }}
                                    />
                                    <Button
                                        type="link"
                                        onClick={() => setFiltredDsKey("")}
                                        icon={<ClearOutlined />}
                                    />
                                </div>

                                <div style={containerStyle}>
                                    <AntPopover
                                        title="FilterableKey:"
                                        hoverText={`Значения для фильтрации. Фильтруемый ключ из ${listDs ? listDs : "listDs"
                                            }`}
                                    />
                                    <SelectElement
                                        props={{
                                            setValue: setFilterKey,
                                            value: filterKey,
                                            list: allDS[listDs]?.columns,
                                            style: {...selectStyle},
                                        }}
                                    />
                                    <Button
                                        type="link"
                                        onClick={() => setFilterKey("")}
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
                                        value={userFilter}
                                        className="lcEditorInput"
                                        onChange={(e) => {
                                            setUserFilter(e.currentTarget.value);
                                        }}
                                    />
                                    <Button
                                        type="link"
                                        onClick={() => setUserFilter("")}
                                        icon={<ClearOutlined />}
                                    />
                                </div>
                            </>
                        )}
                    </Card>
                </Col>

                <Col span={12}>
                    <Card size="small" className="cardEdit">
                        <h3>Title</h3>
                        <Input
                            value={caption}
                            className="lcEditorInput"
                            onChange={(e) => {
                                setCaption(e.currentTarget.value);
                            }}
                        />
                        <br />
                        <br />
                        <h4>Description</h4>
                        <Input
                            value={inputDescription}
                            className="lcEditorInput"
                            onChange={(e) => {
                                setInputDescription(e.currentTarget.value);
                            }}
                        />
                    </Card>

                    <Card size="small" className="cardEdit">
                        <h3>Type</h3>
                        <SelectElement
                            props={{
                                setValue: setInputsType,
                                value: inputsType,
                                list: formItems,
                                style: {width: "100%"},
                            }}
                        />
                        <br />
                        {(inputsType === InputsType.INPUT || inputsType === InputsType.HIDDEN_INPUT) && (
                            <>
                                <Checkbox
                                    onChange={(e) => setPrefix(e.target.checked)}
                                    checked={prefix}
                                >
                                    Prefix
                                </Checkbox>
                                <br />
                                <Checkbox
                                    onChange={(e) => handleNumericCheckbox(e.target.checked)}
                                    checked={numeric}
                                >
                                    Numeric
                                </Checkbox>
                            </>
                        )}
                        {numeric && (
                            <Space>
                                <span>Min</span>
                                <Input
                                    value={minValue}
                                    className="lcEditorInput"
                                    onChange={(e) => {
                                        setMinValue(e.currentTarget.value);
                                    }}
                                />
                                <span>Max</span>
                                <Input
                                    value={maxValue}
                                    className="lcEditorInput"
                                    onChange={(e) => {
                                        setMaxValue(e.currentTarget.value);
                                    }}
                                />

                            </Space>
                        )}
                    </Card>

                    <Card size="small" className="cardEdit">
                        <h3>Validation</h3>
                        <h4>RegExp</h4>
                        <Input
                            value={regexp && regexp}
                            className="lcEditorInput"
                            onChange={(e) => {
                                setRegexp(e.currentTarget.value);
                            }}
                        />
                        <br />
                        <br />
                        <h4>Help message</h4>
                        <Input
                            value={helpMessage && helpMessage}
                            className="lcEditorInput"
                            onChange={(e) => {
                                setHelpMessage(e.currentTarget.value);
                            }}
                        />
                        <br />
                        <br />
                        <Checkbox
                            onChange={(e) => setRequired(e.target.checked)}
                            checked={required}
                        >
                            Required
                        </Checkbox>
                    </Card>

                    <Card size="small" className="cardEdit">
                        <h3>Body Style</h3>
                        <ObjectEditor autoCss={true} object={style} setObject={setStyle} />
                        <br />
                        <h3>Input Style</h3>
                        <Space>
                            Input Width:{" "}
                            <Input
                                min={1}
                                max={24}
                                type="number"
                                value={inputWidth}
                                className="lcEditorInput"
                                onChange={(e) => {
                                    setInputWidth(+e.currentTarget.value);
                                }}
                            />
                        </Space>
                        <ObjectEditor
                            autoCss={true}
                            object={inputsStyle}
                            setObject={setInputsStyle}
                        />
                    </Card>

                    {cmp.inputsType === "Input" && (
                        <>
                            <Card size="small" className="cardEdit">
                                <h3>Link</h3>
                                <Input
                                    value={link}
                                    className="lcEditorInput"
                                    onChange={(e) => {
                                        setLink(e.currentTarget.value);
                                    }}
                                />
                            </Card>

                            <Card size="small" className="cardEdit">
                                <div style={{display: "flex"}}>
                                    <h3 style={{marginRight: "30px"}}>Disabled</h3>
                                    <Switch
                                        style={{marginTop: "5px"}}
                                        size="small"
                                        checked={disabled}
                                        onChange={() => {
                                            setDisabled(!disabled);
                                        }}
                                    />
                                </div>
                            </Card>
                        </>
                    )}

                    {cmp.inputsType === "Radio" && (
                        <Card size="small" className="cardEdit">
                            <h3>Direction</h3>
                            <Select
                                placeholder="Выбор направления"
                                value={direction}
                                onChange={(e) => setDirection(e)}
                                style={{borderTop: "none", width: "100%"}}
                            >
                                <Select.Option key="vertical" value="vertical">
                                    vertical
                                </Select.Option>
                                <Select.Option key="horizontal" value="horizontal">
                                    horizontal
                                </Select.Option>
                            </Select>
                        </Card>
                    )}

                    {cmp.inputsType === "DatePicker" && (
                        <Card size="small" className="cardEdit">
                            <h3>Condition</h3>

                            {dateConditionArray &&
                                dateConditionArray.map((obj: any, index: any) => {
                                    let condition = obj.condition === "c" ? ">" : "<";
                                    let valueText = `${condition} ${obj.count} ${obj.date}`;

                                    return (
                                        <Row key={index}>
                                            <Col flex="70px">{"условие:"}</Col>
                                            <Col flex="auto">
                                                <Input
                                                    value={valueText}
                                                    style={{borderLeft: "1px dashed #ddd"}}
                                                    className="lcEditorInput"
                                                    name={obj + "##val##" + index}
                                                />
                                            </Col>
                                            <Col flex="20px">
                                                <Popconfirm
                                                    placement="right"
                                                    title="Точно удалить?"
                                                    onConfirm={() => {
                                                        setDateConditionArray((obj: any) => {
                                                            return obj.filter(
                                                                (url: any, ind: number) => ind !== index
                                                            );
                                                        });
                                                    }}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button
                                                        type="link"
                                                        style={{width: "8%", height: 1, lineHeight: 1}}
                                                        danger
                                                        icon={<DeleteOutlined />}
                                                    />
                                                </Popconfirm>
                                            </Col>
                                        </Row>
                                    );
                                })}

                            <Row>
                                <Col
                                    flex="70px"
                                    style={{
                                        marginTop: "20px",
                                        marginRight: "10px",
                                    }}
                                >
                                    <ItemEdit
                                        type="select"
                                        selectItems={["c", "po"]}
                                        item={dateCondition.condition}
                                        del={false}
                                        setItem={(e) => {
                                            setDateCondition((date: any) => {
                                                let newObj = {...date};
                                                newObj.condition = e;
                                                return newObj;
                                            });
                                        }}
                                    />
                                </Col>

                                <Col flex="auto" style={{marginTop: "20px"}}>
                                    <Input
                                        style={{
                                            width: "50%",
                                            marginRight: "10px",
                                            borderBottom: "1px solid #eee",
                                            backgroundColor: "#fff",
                                        }}
                                        placeholder={"name"}
                                        value={dateCondition.count}
                                        className="lcEditorInput"
                                        onChange={(e) => {
                                            setDateCondition((date: any) => {
                                                let newObj = {...date};
                                                newObj.count = e.target.value;
                                                return newObj;
                                            });
                                        }}
                                    />

                                    <Select
                                        style={{
                                            width: "45%",
                                            marginRight: "10px",
                                            borderBottom: "1px solid #eee",
                                            backgroundColor: "#fff",
                                        }}
                                        bordered={false}
                                        size="small"
                                        value={dateCondition.date}
                                        onChange={(val: any) => {
                                            setDateCondition((date: any) => {
                                                let newObj = {...date};
                                                newObj.date = val;
                                                return newObj;
                                            });
                                        }}
                                    >
                                        <Select.Option key={"month"} value={"month"}>
                                            {"month"}
                                        </Select.Option>
                                        )
                                        <Select.Option key={"year"} value={"year"}>
                                            {"year"}
                                        </Select.Option>
                                        )
                                        <Select.Option key={"day"} value={"day"}>
                                            {"day"}
                                        </Select.Option>
                                        )
                                    </Select>
                                </Col>

                                <Col flex="10px" style={{marginTop: "20px"}}>
                                    <Button
                                        type="link"
                                        style={{width: "8%", height: 1, lineHeight: 1}}
                                        onClick={() => {
                                            setDateConditionArray([
                                                ...dateConditionArray,
                                                dateCondition,
                                            ]);
                                        }}
                                        icon={<PlusCircleOutlined />}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    )}

                    <Card size="small" className="cardEdit">
                        <h3>Anchor</h3>
                        <Input
                            value={anchor && anchor}
                            className="lcEditorInput"
                            onChange={(e) => {
                                setAnchor(e.currentTarget.value);
                            }}
                        />
                    </Card>
                    {cmp.inputsType === "Select" && (
                        <Card size="small" className="cardEdit">
                            <h3>InitDictionary</h3>
                            <ObjectEditor
                                object={initDictionary}
                                setObject={setInitDictionary}
                            />
                        </Card>
                    )}
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {cmp.inputsType === "DetailsPicker" && (
                        <Card size="small" className="cardEdit">
                            <h3>Menu Table</h3>
                            <ArrayObjectsEditor
                                cmp={cmp}
                                list={menu}
                                setList={setMenu}
                                template={{
                                    title: "",
                                    actions: "",
                                    acl: [],
                                    addiction: "",
                                    visible: "",
                                    confirm: false,
                                }}
                            />
                        </Card>
                    )}
                </Col>
            </Row>

            <ButtonBlock onApply={onApply} onClose={onClose} />
        </>
    );
};

export default AntInputsEdit;
