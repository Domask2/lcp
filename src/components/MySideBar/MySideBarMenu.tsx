import React, {useState} from "react";
import {
    UserOutlined,
    LoginOutlined,
} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, Menu, Modal} from 'antd';
import {NavLink} from "react-router-dom";
import {getEditMode} from "../../redux/app/app.selector";
import {IAuth} from "../../redux/app/app.initial";
import {IProject} from "../../redux/project/project.initial";
import {RootState} from "../../redux/redux.store";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";

const {SubMenu} = Menu;

type MySideBarMenuType = {
    auth: IAuth
    currentProject: IProject | undefined
}
const MySideBarMenu = ({auth, currentProject}: MySideBarMenuType) => {
    let editMode = useTypedSelector((state: RootState) => getEditMode(state))
    const {login, logout} = useActions()
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const showModal = () => {
        setIsModalVisible(true)
    };

    const handleOk = () => {
        setIsModalVisible(false)
    };

    const handleCancel = () => {
        setIsModalVisible(false)
    };

    const onFinish = (values: any) => {
        values.device_name = 'fradmin'
        login(values)
        setIsModalVisible(false)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    };

    const clickLogout = () => {
        logout()
    }

    let adminBlock
    if (auth.role === 'admin')
        adminBlock = <Menu.Item key="menuAdmin">
            <NavLink to='/admin'>Admin</NavLink>
        </Menu.Item>

    let authBlock
    if (auth.authenticated)
        authBlock = <SubMenu key="sub15" icon={<UserOutlined />} title={auth.name}>
            <Menu.Item key="menuLogout" onClick={clickLogout}>Выйти</Menu.Item>
            {adminBlock}
        </SubMenu>
    else
        authBlock = <>
            <Menu.Item key="menuLogin" onClick={showModal} icon={<LoginOutlined />}>Войти в систему</Menu.Item>

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
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>


    let menuBlock
    if (currentProject !== undefined)
        menuBlock = <>
            <h3 style={{padding: '10px 10px 10px 15px'}}>{currentProject.title}</h3>
            <Menu style={{background: 'none'}} theme="light" defaultSelectedKeys={['1']} mode="inline">
                <Menu.ItemGroup key="g1" title="Меню">
                    {/* eslint-disable-next-line array-callback-return */}
                    {currentProject.navigation.map((nav1: any) => {
                        let visible = nav1.visible === undefined ? true : nav1.visible
                        if (visible || (editMode && auth.role === 'admin'))   /** если режим редактирования и я админ */
                            if (nav1.acl === undefined || (nav1.acl.indexOf(auth.role) + 1))    /** если acl нет или моя роль подходит */
                                if (nav1.children !== undefined)
                                    return <SubMenu style={{background: 'none'}} key={nav1.key} title={nav1.title}>
                                        {/* eslint-disable-next-line array-callback-return */}
                                        {nav1.children.map((child: any) => {
                                            visible = child.visible === undefined ? true : child.visible
                                            if (visible || (editMode && auth.role === 'admin'))   /** если режим редактирования и я админ */
                                                if (child.acl === undefined || (child.acl.indexOf(auth.role) + 1))    /** если acl нет или моя роль подходит */
                                                    return <Menu.Item style={{background: 'none'}} key={child.key}>
                                                        <NavLink to={'/' + currentProject.key + '/' + child.key}>{child.title}</NavLink>
                                                    </Menu.Item>
                                        })}
                                    </SubMenu>
                                else
                                    return <Menu.Item key={nav1.key} style={{background: 'none'}}>
                                        <NavLink to={'/' + currentProject.key + '/' + nav1.key}>{nav1.title}</NavLink>
                                    </Menu.Item>
                            else
                                return ""
                    })}
                </Menu.ItemGroup>
            </Menu>
        </>

    const userBlock = <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
        <Menu.ItemGroup key="g2" title="Пользователь">
            {authBlock}
        </Menu.ItemGroup>
    </Menu>


    return <>
        {menuBlock}
        {userBlock}
    </>
}

export default MySideBarMenu