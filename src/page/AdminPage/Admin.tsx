import React from "react";
import AdminLcp from "./Components/AdminLcp";
import AdminRemotes from "./Components/AdminRemotes";
import {getProjectsAll} from "../../redux/project/project.selector";
import {AdminProject} from "./AdminProject/AdminProject";
import {getSettings} from "../../redux/app/app.selector";
import {useTypedSelector, useActions} from "../../hooks";
import {Button, Card, Tabs} from "antd";
import {RootState} from "../../redux/redux.store";
import AdminTests from "./Components/AdminTests";
import AdminDownload from "./AdminDownload/AdminDownload";
import FileSystem from "./FileSystem/FileSystem";
import AdminCreateTable from "./AdminCreateTable/AdminCreateTable";

const {TabPane} = Tabs;

const Admin: React.FC = () => {
    const {createProject} = useActions()
    const projectsAll = useTypedSelector((state: RootState) => getProjectsAll(state))
    const settings = useTypedSelector((state: RootState) => getSettings(state))

    const onClickCreateProject = () => {
        createProject()
    }

    return <Card size="small" className="lcCard lcBlockLc">
        <Tabs defaultActiveKey="0">
            <TabPane tab="Проекты" key="0">
                <Tabs tabPosition="left">
                    {
                        Object.keys(projectsAll).map((key: string) => <TabPane tab={projectsAll[key].title} key={key}>
                            <AdminProject project={projectsAll[key]}/>
                        </TabPane>)
                    }
                    <TabPane tab={<div style={{
                        color: "#00c100",
                        fontWeight: "bold",
                        paddingTop: '30px',
                        marginTop: '0px',
                        borderTop: '2px solid lightgray'
                    }}>Создать новый проект +</div>} key="add_new_project">
                        <Button className="lcButtonLc" onClick={onClickCreateProject}>Создать проект</Button>
                    </TabPane>
                </Tabs>
            </TabPane>

            <TabPane tab="Настройка LCP" key="1">
                <AdminLcp settings={settings}/>
            </TabPane>

            <TabPane tab="Экспорт данных LCP" key="2">
                <AdminRemotes />
            </TabPane>

            {/*<TabPane tab="Test" key="3">*/}
            {/*    <AdminTests />*/}
            {/*</TabPane>*/}

            <TabPane tab="Download" key="4">
                <AdminDownload />
            </TabPane>

            <TabPane tab="Create Tables" key="5">
                <AdminCreateTable />
            </TabPane>

            <TabPane tab="FileSystem" key="6">
                <FileSystem />
            </TabPane>

        </Tabs>
    </Card>
}

export default Admin