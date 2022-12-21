import React, {useState} from 'react';
import {Button, Form, Input, Modal} from "antd";
import {useActions} from "../../../../hooks";

const LoginRemote = () => {
    const {loginRemote} = useActions()
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values: any) => {
        loginRemote(values)
    };

    const onFinishFailed = (errorInfo: any) => {
    };

    return <>
        <Button type="primary" size='small' onClick={showModal}>
            Подключиться
        </Button>
        <Modal title="Подключение к удаленной LCP" footer={false} open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Url LCP"
                    name="url"
                    // initialValue={'https://back.lcp.plinor.ru'}
                    initialValue={'http://127.0.0.1:8000'}
                    rules={[{required: true, message: 'Please input url LCP'}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{required: true, message: 'Please input your email!'}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Device name"
                    name="device_name"
                    hidden={true}
                    initialValue='fradminremote'
                >
                    <Input />
                </Form.Item>


                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
};

export default LoginRemote;