import React, {useState} from 'react';
import {useActions} from "../../../hooks";
import {Button, Checkbox, Form, Input, Modal} from "antd";

interface IAuchModal {
    view: boolean
    setView?: (item: any) => void
}
const AuthModal: React.FC<IAuchModal> = ({view, setView}) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(view);
    const {login} = useActions();

    const handleOk = () => {
        setIsModalVisible(false)
        setView && setView(false);

    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setView && setView(false);
    };

    const onFinish = (values: any) => {
        values.device_name = 'frclient'

        login(values)
        setIsModalVisible(false)
        setView && setView(false);

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    };

    return (
        <Modal title="Авторизация" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={false}>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                    <Checkbox>Запомнить</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default AuthModal;