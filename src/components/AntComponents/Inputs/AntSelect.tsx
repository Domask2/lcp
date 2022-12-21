import React, {useEffect} from "react";
import Editor from "../Editor/Editor";

import {getDataSource, getDataSourceLs} from "../../../redux/ds/ds.selector";
import {useAction, useTypedSelector} from "../../../hooks";

import {Col, Row, Select} from "antd";

import {RootState} from "../../../redux/redux.store";
import {IActionsType, IInputs} from "../Page/templates";
import ScrollableAnchor from "react-scrollable-anchor";
import {formationValue} from "../../../utils";
import {getCurrentPage} from "../../../redux/project/project.selector";

type AntSelectType = {
    cmp: IInputs;
    props: any;
};

const AntSelect: React.FC<AntSelectType> = ({cmp, props}) => {
    const ls: {[key: string]: any} = useTypedSelector((state: RootState) => getDataSourceLs(state))
    const currentPage = useTypedSelector((state: RootState) => getCurrentPage(state));
    const action = useAction(cmp.actions!);
    const filterKey = cmp.filterKey;
    const initDs = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds))?.items[0];
    const listDs = useTypedSelector((state: RootState) => getDataSource(state, cmp.listDs));
    // const filterDs: any = useTypedSelector((state: RootState) => getDataSource(state, cmp.filtredDs))

    const filtredValueUser = cmp.userFilter && cmp.userFilter.split(",");
    const filtredValueDs = initDs && initDs[cmp.filtredDsKey];

    const filtredDs =
        listDs &&
        // eslint-disable-next-line
        listDs.items.filter((item) => {
            if (cmp.filtredDsKey) {
                return filtredValueDs === item[filterKey];
            } else if (filtredValueUser?.length) {
                switch (filtredValueUser[0]) {
                    case ">":
                        return item[filterKey] > filtredValueUser[1];
                    case "<":
                        return item[filterKey] < filtredValueUser[1];
                    case ">=":
                        return item[filterKey] >= filtredValueUser[1];
                    case "<=":
                        return item[filterKey] <= filtredValueUser[1];
                    case "=":
                        return item[filterKey] == filtredValueUser[1];
                }
            } else {
                return item;
            }
        });

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.onChange(e)

        // выполнить action c задержкой для возможности отправки актуального значения Select из Redux
        setTimeout(() => {
            cmp?.actions?.forEach((act: IActionsType) => {
                switch (act.type) {
                    case 'flyInput':
                        // для выполнения action обязатлеьно наличие act.ReduxElement - название FlyInputGroup из настройки страницы
                        if (act.reduxElement && act.reduxElement.toString() !== '') {
                            if (currentPage) {
                                // в currentPage?.fly_inputs_groups храниться массив Redux Element
                                if (currentPage?.fly_inputs_groups) {
                                    // сопоставляем имя act.reduxElement с массивом объектом из currentPage?.fly_inputs_groups - получаем массив ReduxElement
                                    let reduxInputArray = currentPage?.fly_inputs_groups?.[act.reduxElement.toString()] ? currentPage?.fly_inputs_groups?.[act.reduxElement.toString()] : []
                                    let reduxElementObj: {[key: string]: string | number | undefined | null} | undefined = {}

                                    // перебираем массив reduxElement и вытаскиваем значение каждого элемента из Redux
                                    reduxInputArray && Array.isArray(reduxInputArray) && reduxInputArray.forEach((item: string) => {
                                        if (ls.requiredVars[item] === false) {
                                            reduxElementObj = undefined
                                        }
                                        if (reduxElementObj && ls.vars && ls.vars.hasOwnProperty(item)) {
                                            if (ls.vars[item] && ls.vars[item] !== '__no_name__') {
                                                reduxElementObj[item.split('__')[0]] = ls.vars[item]
                                            }
                                        }
                                    })

                                    if (reduxElementObj) {
                                        action.onClick(undefined, undefined, reduxElementObj)
                                    }
                                }
                            }
                        }
                        break
                    default:
                        console.log('неизветсный action')
                }
            })
        }, 500)
    }


    useEffect(() => {
        if (props.storedValue) {
            // props.onChange("");
            // при инициализаций select необходимо выполнить action fnc при наличии
            cmp?.actions?.forEach((act: IActionsType) => {
                switch (act.type) {
                    case 'fnc':
                        action.onClick(props.storedValue);
                        break
                    default:
                    // console.log('неизветсный action')
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.storedValue]);

    return (
        <>
            {cmp.anchor && (
                <ScrollableAnchor id={`${cmp.anchor}`}>
                    <span></span>
                </ScrollableAnchor>
            )}

            <Editor cmp={cmp} inputType={cmp.inputsType} />
            <Row style={{alignItems: "center", marginBottom: "10px", ...cmp?.style}}>
                <Col span={cmp.inputWidth ? 24 - cmp.inputWidth : 10}
                    style={{textAlign: "right", paddingRight: "10px"}}>
                    {(cmp.inputDescription || (cmp.helpMessage && !props.validate)) &&
                        <div style={{height: '20px'}}></div>}
                    {`${cmp.caption}: `}
                </Col>
                <Col span={cmp.inputWidth ? cmp.inputWidth : 14}>
                    <div style={{color: 'gray', fontSize: '12px', paddingLeft: '11px'}}>{cmp.inputDescription}</div>
                    <div style={{position: "relative", overflow: "hidden"}}>
                        {props.renderHelpMessage()}
                        <Select
                            showSearch
                            filterOption={(input: any, option: any) => (option!.children as unknown as string)
                                .toLowerCase().includes(input.toLowerCase())}
                            mode={cmp.inputsType === "Select" ? undefined : "multiple"}
                            value={
                                props.value
                                    ? props.value
                                    : props.initTextValue === null
                                        ? cmp.zeroOption ? "__no_name__" : null
                                        : props.initTextValue
                            }
                            style={{
                                width: "100%",
                                ...props.walidationBorderStyle,
                                ...cmp.inputsStyle,
                            }}
                            onChange={(e: any) => onChangeSelect(e)}
                        >
                            {cmp.inputsType === "Select" && cmp.zeroOption && (
                                <Select.Option
                                    key={`${cmp.key}_${cmp.key}`}
                                    value={"__no_name__"}
                                >
                                    -- не указано --
                                </Select.Option>
                            )}
                            {listDs
                                ? filtredDs.map((item: any, index: number) => {
                                    return (
                                        <Select.Option
                                            key={`${index}_${cmp.key}`}
                                            value={cmp.listKey ? item[cmp.listKey] : ""}
                                        >
                                            {cmp.listTextKeys.length
                                                ? formationValue(cmp.listTextKeys, item)
                                                : cmp.listKey && item[cmp.listKey]}
                                        </Select.Option>
                                    );
                                })
                                : cmp.initDictionary &&
                                Object.keys(cmp.initDictionary).map(
                                    (item: any, index: number) => {
                                        return (
                                            <Select.Option key={`${index}_${cmp.key}`} value={item}>
                                                {cmp.initDictionary[item]}
                                            </Select.Option>
                                        );
                                    }
                                )}
                        </Select>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default AntSelect;
