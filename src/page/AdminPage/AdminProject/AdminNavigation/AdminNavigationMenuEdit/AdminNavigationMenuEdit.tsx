import React, {useState} from "react";
import {useActions} from "../../../../../hooks";

import {AdminNavigationDeletePage} from "./AdminNavigationDeletePage";
import {AdminNavigationModalEditForm} from "./AdminNavigationModalEditForm";
import {AdminNavigationForm} from "../AdminNavigationForm/AdminNavigationForm";
import {upPageNavigation, downPageNavigation} from "../../../../../services/adminNavigationUtils/editForm";

import {ArrowDownOutlined, ArrowUpOutlined, MoreOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {Menu, Dropdown, Button, Modal} from "antd";

export const AdminNavigationMenuEdit = ({project, projectKey, keyItem, setActiveCollapse, levelIteration, item}: any) => {
    const {updateProjectNavigation} = useActions();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleUpPage = () => {
        let data = project.navigation;
        data = upPageNavigation(data, project, projectKey, keyItem);
        updateProjectNavigation(project.key, data);
    };

    const handleDownPage = () => {
        let data = project.navigation;
        data = downPageNavigation(data, project, projectKey, keyItem, item.id);
        updateProjectNavigation(project.key, data);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const menu = (
        <Menu>
            {/* <Menu.Item key="5">
                {
                    levelIteration !== 2 && <AdminNavigationModalEditForm
                        project={project}
                        projectKey={projectKey}
                        keyItem={keyItem}
                        id={item.id}
                        setActiveCollapse={setActiveCollapse}
                        nameForm='Добавить пункт меню'
                        iconForm={<AppstoreAddOutlined />}
                    />
                }

            </Menu.Item> */}

            <Menu.Item key="1">
                <Button style={{width: "100%"}} type="text" onClick={handleUpPage}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: " center"}}>
                        <span style={{marginRight: "20px"}}>Поднять страницу на вверх</span> <ArrowUpOutlined />
                    </div>
                </Button>
            </Menu.Item>

            <Menu.Item key="2">
                <Button style={{width: "100%"}} type="text" onClick={handleDownPage}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: " center"}}>
                        <span>Опустить страницу вниз</span> <ArrowDownOutlined />
                    </div>
                </Button>
            </Menu.Item>

            <Menu.Item key="3">
                <AdminNavigationModalEditForm project={project} projectKey={projectKey} keyItem={keyItem} editForm={true} iconForm={<EditOutlined />} id={item?.id} />
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item key="4">
                <AdminNavigationDeletePage project={project} projectKey={projectKey} keyItem={keyItem} levelIteration={levelIteration} id={item?.id} />
            </Menu.Item>

            {/*<Menu.Item key="6" onClick={() => console.log(project.key, projectKey, keyItem, item.id)}>*/}
            {/*    <span >Работа</span>*/}
            {/*</Menu.Item>*/}
        </Menu>
    );

    return (<>
        {levelIteration !== 2 && <Button type="link" className="ant-dropdown-link" onClick={showModal} >
            <PlusOutlined style={{fontSize: "20px"}} />
        </Button>}
        {isModalVisible && <Modal title={'Редактировать страницу'} open={true} footer={null} onCancel={handleCancel}>
            <AdminNavigationForm
                handleOk={handleOk}
                handleCancel={handleCancel}
                // editForm={editForm}
                project={project}
                projectKey={projectKey}
                keyItem={keyItem}
                id={item.id}
                setActiveCollapse={setActiveCollapse}
            />
        </Modal>}


        <Dropdown overlay={menu} trigger={["click"]}>
            <Button type="text" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <MoreOutlined style={{fontSize: "20px"}} />
            </Button>
        </Dropdown>
    </>
    );
};
