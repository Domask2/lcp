import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useActions, useTypedSelector} from "../../../hooks";
import {getEditMode} from "../../../redux/app/app.selector";
import {getDataSourcesLsVarsByKey} from "../../../redux/ds/ds.selector";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";

import {Col, Input, Row} from 'antd';
import {IInputs} from "../Page/templates";
import {RootState} from "../../../redux/redux.store";
import {formationValue, InputsType} from "../../../utils";

type AntInputType = {
    cmp: IInputs;
    props?: any;
};

const AntInputDisabled: React.FC<AntInputType> = ({cmp, props}) => {

    const initDs: any = props.dataSource?.items[props.index];
    // console.log(initDs);

    const {setLsVars, setLsPP} = useActions()
    const navigate = useNavigate();
    const editMode = useTypedSelector((state: RootState) => getEditMode(state));
    // const dataSources = useTypedSelector((state) => getDataSource(state, cmp.initDs));
    const addictionKey = cmp.adKey ? `${cmp.adKey}__${cmp.key}` : undefined

    const vars = useTypedSelector((state: RootState) => getDataSourcesLsVarsByKey(state, addictionKey));
    const initVarsValue = useTypedSelector((state: RootState) => getDataSourcesLsVarsByKey(state, cmp.initVarsValue));

    const [value, setValue] = useState<any>('')

    let link = cmp?.link ? cmp.link : "";
    let disabled = cmp?.disabled ? cmp.disabled : false;

    // console.log(cmp.type);

    useEffect(() => {
        if (vars === undefined) {
            setValue('')
        }
    }, [vars])

    useEffect(() => {
        if (initVarsValue) {
            setValue(initVarsValue)
        } else {
            setValue('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initVarsValue])

    // проводим инициализацию - записываем данные в redux и отображаем в полях ввода
    useEffect(() => {
        if (initDs) {
            if (cmp.initValue) {
                addictionKey && setLsVars(addictionKey, cmp.numeric ? +cmp.initValue : cmp.initValue);
                cmp.inputsType === InputsType.CHECKBOX && setValue(cmp.initValue)
            }
            if (cmp.ds && initDs) {
                if (cmp.procName && cmp.procKey) {
                    cmp.initValue && setLsPP(cmp.procName, cmp.procKey, cmp.numeric ? +cmp.initValue : cmp.initValue);
                    cmp.initKey && setLsPP(cmp.procName, cmp.procKey, cmp.numeric ? +initDs[cmp.initKey] : initDs[cmp.initKey]);
                }
                if (cmp.initKey) {
                    // setInitKeyValue(initDs[cmp.initKey]);
                    addictionKey && setLsVars(addictionKey, cmp.numeric ? +initDs[cmp.initKey] : initDs[cmp.initKey])
                    if (cmp.procName && cmp.procKey) {
                        setLsPP(cmp.procName, cmp.procKey, cmp.numeric ? +initDs[cmp.initKey] : initDs[cmp.initKey]);
                    }
                }
                cmp.initTextKeys?.length ? setValue(formationValue(cmp.initTextKeys, initDs)) : setValue(cmp.initValue)
            }
        }

        return () => {
            addictionKey && setLsVars(addictionKey, '')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initDs])

    if (cmp.inputsType === "HiddenInput") {
        if (!editMode) return null;
    }

    const handlePush = () => {
        if (link && cmp.initDs && cmp.link!) {
            let urlLinkArr = cmp.link.split(":");
            let animalId = initDs[urlLinkArr[1]];
            if (animalId === null || animalId === undefined || !animalId) {
                return null;
            }
            let url = urlLinkArr[0] + animalId;
            navigate(url);
        } else {
            return null;
        }
    };

    return (
        <div style={editMode ? {
            position: 'relative',
            display: 'inline-flex',
            width: '100%'
        } : {}}>
            {cmp?.anchor && (
                <ScrollableAnchor id={`${cmp?.anchor}`}>
                    <span></span>
                </ScrollableAnchor>
            )}

            <Editor cmp={cmp} inputType={cmp.inputsType} testEditorStyle={true} height='73%'/>
            <Row
                style={{alignItems: "center", marginBottom: "10px", width: '100%', ...cmp?.style}}
            >
                <Col
                    span={cmp.inputWidth ? 24 - cmp.inputWidth : 10}
                    style={{textAlign: "right", paddingRight: "10px", ...cmp.bodyStyle}}
                >
                    {`${cmp.caption}: `}
                </Col>
                <Col span={cmp.inputWidth ? cmp.inputWidth : 14}>

                    <div style={{position: "relative", width: "100%"}}>

                        <Input
                            spellCheck={!link}
                            type={cmp.numeric ? "number" : "text"}
                            min={cmp.minValue}
                            max={cmp.maxValue}
                            onClick={handlePush}
                            className={link ? "inputLink" : ""}
                            disabled={disabled ? (link ? false : disabled) : false}
                            style={{
                                // minWidth: '200px',
                                width: "100%",
                                color: link ? "#1890ff" : "black",
                                cursor: link ? "pointer" : "text",
                                textDecorationStyle: link ? "unset" : "inherit",
                                ...cmp.inputsStyle,
                            }}
                            placeholder={"не указано"}
                            value={value}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AntInputDisabled;
