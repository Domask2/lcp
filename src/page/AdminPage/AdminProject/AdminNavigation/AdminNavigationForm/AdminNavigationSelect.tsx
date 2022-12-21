import React from "react";
import {Form,  Select} from "antd";

interface IAdminNavigationSelect {
    initObject: any,
    getInput: any,
    setInput: any,
    label: string,
    editForm?: boolean
}

export const AdminNavigationSelect: React.FC<IAdminNavigationSelect> = (props) => {
    const { initObject, getInput, setInput, label, editForm } = props;
    return (
        <Form.Item
            valuePropName="option"
            initialValue={getInput}
            style={{marginBottom: "10px"}}
            label={label}
        >
            {
                editForm && <Select defaultValue={initObject} onChange={(e) => setInput(e)}>
                    <Select.Option value={'true'}>true</Select.Option>
                    <Select.Option value={'false'}>false</Select.Option>
                </Select>
            }

            {
                !editForm && <Select value={getInput} onChange={(e) => setInput(e)}>
                    <Select.Option value={'true'}>true</Select.Option>
                    <Select.Option value={'false'}>false</Select.Option>
                </Select>
            }
        </Form.Item>
    );
};