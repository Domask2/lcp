import React, {useEffect, useState} from 'react';
import {Button, Col, Input, Popconfirm, Row, Select} from "antd";
import {DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';
import ItemEdit from '../../Editor/Elements/ItemEdit';
import {dateConditionType} from '../../Page/templates';

type InputsSettingsType = {
    setModel: (e: any) => void
    model: any
}

const InputsConditionSettings: React.FC<InputsSettingsType> = ({model, setModel}) => {

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
        setModel((prev: any) => {
            return {
                ...prev,
                dateConditionArray: dateConditionArray
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateConditionArray]);

    return (
        <>
            <h3>Condition</h3>

            {model.dateConditionArray &&
                model.dateConditionArray.map((obj: any, index: any) => {
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
                        <Select.Option key={"year"} value={"year"}>
                            {"year"}
                        </Select.Option>
                        <Select.Option key={"day"} value={"day"}>
                            {"day"}
                        </Select.Option>
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
        </>
    );
};

export default InputsConditionSettings;
