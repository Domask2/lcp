import React from 'react';
import {Button, Popconfirm} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {useActions} from "../../../../../hooks/useActions";
import {deleteProject} from "../../../../../services/adminNavigationUtils/utils";

export const AdminNavigationDeletePage = ({ project, projectKey, keyItem, levelIteration, id}:any) => {
    const {updateProjectNavigation} = useActions();

    const deleteButton = (itemKey: any) => {
        let data = deleteProject(itemKey, project, projectKey, levelIteration, id);
        updateProjectNavigation(project.key, data);
    };

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Popconfirm
                title="Вы действительно хотите удалить проект?"
                onConfirm={() => deleteButton(keyItem)}
                onCancel={() => {
                }}
                okText="Да"
                cancelText="Нет"
            >
                <Button style={{width: '100%'}} type="text" danger>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <span>Удалить страницу</span> <DeleteOutlined/>
                    </div>
                </Button>
            </Popconfirm>
        </div>
    );
}
