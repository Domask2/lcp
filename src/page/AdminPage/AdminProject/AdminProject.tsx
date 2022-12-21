import React from "react";

import {useActions} from "../../../hooks";
import {AdminNavigation} from './AdminNavigation/AdminNavigation';
import {AdminProjectForm} from "./AdminProjectForm";
import {AdminNavigationModalEditForm} from "./AdminNavigation/AdminNavigationMenuEdit/AdminNavigationModalEditForm";

import {Col, Row, Tabs, Button, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {IProject} from "../../../redux/project/project.initial";

export const AdminProject = ({project}: {project: IProject}) => {
    const {saveProject} = useActions();

    // const onEdit = (e: any) => {
    //     updateProjectNavigation(project.key, e.updated_src)
    // }

    const handleSave = () => {
        let data = project
        saveProject(data)
    };

    return (
        <Tabs type="card">
            <Tabs.TabPane tab="Настройки проекта" key="1">
                <Col xs={24} sm={24} md={20} lg={18} xl={16}>
                    <AdminProjectForm project={project} />
                </Col>
            </Tabs.TabPane>

            <Tabs.TabPane tab='Навигация' key='2'>
                <Row gutter={[24, 10]}>
                    <Col xs={24} sm={24} md={20} lg={18} xl={16}>
                        <Space style={{width: '100%', marginBottom: '20px'}}>
                            <Button style={{width: '160px'}} type='primary' onClick={handleSave}>
                                Сохранить
                            </Button>

                            <div style={{width: '160px'}}>
                                <AdminNavigationModalEditForm project={project}
                                    projectKey={project.key}
                                    typeBtn='link'
                                    item={project.navigation}
                                    iconForm={<PlusOutlined />}
                                    nameForm='Добавить меню' />

                            </div>
                        </Space>

                        <AdminNavigation project={project} projectKey={project.key} items={project.navigation} />
                    </Col>
                </Row>
            </Tabs.TabPane>
        </Tabs>

    );
};