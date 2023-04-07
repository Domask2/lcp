import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useActions, useTypedSelector} from "../../../hooks";
import {getEditMode} from "../../../redux/app/app.selector";
import {getDataSource, getDataSourceAll, getDataSourceLs} from "../../../redux/ds/ds.selector";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";

import {Col, Input, Row, Select} from 'antd';
import {IInputs} from "../Page/templates";
import {RootState} from "../../../redux/redux.store";

type AntInputType = {
    cmp: IInputs;
    props: any;
};

const AntInput: React.FC<AntInputType> = ({cmp, props}) => {
    const {setLsVars} = useActions()
    const navigate = useNavigate();
    const editMode = useTypedSelector((state: RootState) => getEditMode(state));
    const dataSources = useTypedSelector((state) => getDataSource(state, cmp.initDs));
    let link = cmp?.link ? cmp.link : "";
    let disabled = cmp?.disabled ? cmp.disabled : false;

    // console.log(cmp.key);

    // инициализируем и добавляем prefix Input (< > =)
    const [prefix, setPrefix] = useState('=');
    useEffect(() => {
        if (cmp.prefix) {
            setLsVars('prefix_' + props.addictionKey, prefix);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prefix])

    if (cmp.inputsType === "HiddenInput") {
        if (!editMode) return null;
    }

    const handlePush = () => {
        if (link && cmp.initDs && cmp.link!) {
            let urlLinkArr = cmp.link.split(":");
            let animalId = dataSources?.items[0][urlLinkArr[1]];
            if (animalId === null || animalId === undefined || !animalId) {
                return null;
            }
            let url = urlLinkArr[0] + animalId;
            navigate(url);
        } else {
            return null;
        }
    };

    const validMinMaxValue = (num: number) => {
        let value = num

        if (cmp.minValue) {
            return value = num < +cmp.minValue ? +cmp.minValue : num
        }
        if (cmp.maxValue) {
            return value = num > +cmp.maxValue ? +cmp.maxValue : num
        }
        return value
    }
    // const validLengthValue = (val: string) => {
    //     let value = val
    //     if (value.toString().length > 5) {
    //         console.log(val, val.toString().split(''));
    //     }
    //     return value
    // }

    return (
        <div style={editMode ? {position: 'relative',  display:'inline-flex', width: '100%'}: {}}>
            {cmp?.anchor && (
                <ScrollableAnchor id={`${cmp?.anchor}`}>
                    <span/>
                </ScrollableAnchor>
            )}

            <Editor cmp={cmp} inputType={cmp.inputsType} testEditorStyle={true} height='73%' />
            <Row
                style={{alignItems: "center", marginBottom: "10px", width: '100%', ...cmp?.style}}
            >
                <Col
                    span={cmp.inputWidth ? 24 - cmp.inputWidth : 10}
                    style={{textAlign: "right", paddingRight: "10px", ...cmp.bodyStyle}}
                >
                    {(cmp.inputDescription || cmp.minValue || cmp.maxValue || (cmp.helpMessage && !props.validate)) &&
                        <div style={{height: '20px',}}/>}
                    {`${cmp.caption}: `}
                </Col>
                <Col span={cmp.inputWidth ? cmp.inputWidth : 14}>
                    <div style={{
                        color: 'gray',
                        fontSize: '12px',
                        paddingLeft: '11px'
                    }}>{props.renderHelpMessage()} {cmp.inputDescription}{cmp.minValue ? `Минимальное значение: ${cmp.minValue}.` : ''} {cmp.maxValue ? `Максимальное значение: ${cmp.maxValue}` : ''}</div>
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
                                ...props.walidationBorderStyle,
                                ...cmp.inputsStyle,
                            }}
                            onChange={(e) => {
                                if (!link) {
                                    cmp.numeric ? props.onChange(validMinMaxValue(+e.target.value)) : props.onChange(e.target.value)
                                }
                            }}
                            placeholder={"не указано"}
                            // value={props.value ? props.value : props.initTextValue ? props.initTextValue : props.initValue}
                            value={props.value}
                            addonBefore={
                                cmp.prefix ? (
                                    // <Select key={cmp.key} value={ls.vars['prefix_' + props.addictionKey]}
                                    <Select key={cmp.key} value={prefix}
                                        onChange={(e: any) => setPrefix(e)}
                                        style={{borderTop: "none", width: '80px'}} className="select-before">
                                        <Select.Option value="=">{'='}</Select.Option>
                                        <Select.Option value=">">{'>'}</Select.Option>
                                        <Select.Option value="<">{'<'}</Select.Option>
                                        <Select.Option value=">=">{'>='}</Select.Option>
                                        <Select.Option value="<=">{'<='}</Select.Option>
                                        <Select.Option value="!=">{'!='}</Select.Option>
                                        <Select.Option value=">-<">{'>-<'}</Select.Option>
                                        <Select.Option value="__like__">{'like'}</Select.Option>
                                        <Select.Option value="__is_null__">{'is null'}</Select.Option>
                                        <Select.Option value="__is_not_null__">{'is not null'}</Select.Option>
                                    </Select>
                                ) : (
                                    false
                                )
                            }
                            required
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AntInput;
