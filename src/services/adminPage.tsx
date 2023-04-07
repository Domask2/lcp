import React from "react";
import {AdminProject} from "../page/AdminPage/AdminProject/AdminProject";
import {useActions} from "../hooks";
import {Button} from "antd";

export interface ItemsTabsProjectType {
    label: string | React.ReactNode,
    key: string,
    children: React.ReactNode
}

const BtnCreateProject = () => {
    const {createProject} = useActions();
    const onClickCreateProject = () => {
        createProject()
    }
    return (
        <Button className="lcButtonLc" onClick={onClickCreateProject}>Создать проект</Button>
    )
}

export const getItemsProjectTabs = (projectsAll: any): ItemsTabsProjectType[] => {
    const itemsAllProject: ItemsTabsProjectType[] = []

    Object.keys(projectsAll).map((key: string) => {
        return itemsAllProject.push(
            {
                label: projectsAll[key].title,
                key: key,
                children: <AdminProject project={projectsAll[key]}/>
            }
        )
    })
    itemsAllProject.push({
        label: <div style={{
            color: "#00c100",
            fontWeight: "bold",
            paddingTop: '30px',
            marginTop: '0px',
            borderTop: '2px solid lightgray'
        }}>Создать новый проект +</div>,
        key: 'add_new_project',
        children: <BtnCreateProject/>
    })

    return itemsAllProject
}

