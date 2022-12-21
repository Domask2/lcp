import AdminSwitcher from "../../page/AdminPage/AdminSwitcher";
import MySideBarMenu from "./MySideBarMenu";
import React from "react";
import {Divider, Layout} from "antd";
import {IAuth} from "../../redux/app/app.initial";
import {IProjectAll} from "../../redux/project/project.initial";
import ProjectsBlock from "./ProjectsBlock";
import {getCurrentProject} from "../../redux/project/project.selector";
import {RootState} from "../../redux/redux.store";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const {Sider} = Layout;

type MySideBarType = {
    auth: IAuth
}
const MySideBar = ({auth}: MySideBarType) => {
    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state))

    return <Sider className="lcCard lcBlockLc" theme="light" width="250">
        <ProjectsBlock />
        <AdminSwitcher />

        <Divider style={{margin: "5px 0"}} />

        <MySideBarMenu auth={auth} currentProject={currentProject} />
    </Sider>
}

export default MySideBar