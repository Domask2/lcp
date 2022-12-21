import React, {ChangeEvent} from "react";
import {Form, Input} from "antd";

interface IAdminNavigationInput {
    initObject: string,
    getInput: any,
    setInput: any,
    setError?: any,
    getError?: any,
    name: string,
    label: string,
    helpMessage?: boolean
}

export const AdminNavigationInput: React.FC<IAdminNavigationInput> = (props) => {
    const {initObject, getInput, setInput, name, label, getError, helpMessage} = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // if (e.target.value !== '') setError('success')
        setInput(e.target.value);
    }

    return (
        <>
            {
                helpMessage ? (
                        <Form.Item
                            className='inputErrorKey'
                            initialValue={initObject}
                            style={{marginBottom: "10px"}}
                            name={name}
                            label={label}
                            validateStatus={getError}
                            help={getError === 'warning' ? 'введите уникальный ключ' : ''}
                        >
                            <Input
                                placeholder={getError === 'error' ? "заполните форму" : ''}
                                value={getInput}
                                onChange={(e) => handleChange(e)}
                            />
                        </Form.Item>) :
                    (
                        <Form.Item
                            className='inputKey'
                            initialValue={initObject}
                            style={{marginBottom: "10px"}}
                            name={name}
                            label={label}
                            validateStatus={getError}
                        >
                            <Input
                                placeholder={getError === 'error' ? "заполните форму" : ''}
                                value={getInput}
                                onChange={(e) => handleChange(e)}
                            />
                        </Form.Item>
                    )
            }
        </>
    )
}
