import React, {memo, useMemo} from "react";
import AdminLcp from "./Components/AdminLcp";
import AdminRemotes from "./Components/AdminRemotes";
import AdminDownload from "./AdminDownload/AdminDownload";
import FileSystem from "./FileSystem/FileSystem";
import {getProjectsAll} from "../../redux/project/project.selector";
import {getSettings} from "../../redux/app/app.selector";
import {getItemsProjectTabs, ItemsTabsProjectType} from "../../services/adminPage";
import AdminCreateTable from "./AdminCreateTable/AdminCreateTable";
import {useTypedSelector} from "../../hooks";
import {Card, Tabs} from "antd";
import {RootState} from "../../redux/redux.store";

const Admin: React.FC = () => {
    const projectsAll = useTypedSelector((state: RootState) => getProjectsAll(state))
    const settings = useTypedSelector((state: RootState) => getSettings(state))
    const itemsAllProject: ItemsTabsProjectType[] = useMemo(() => {
        return getItemsProjectTabs(projectsAll)
    },[projectsAll])

    const items = [
        {label: 'Проекты', key: '0', children: <Tabs tabPosition="left" items={itemsAllProject}/>},
        {label: 'Настройка LCP', key: '1', children: <AdminLcp settings={settings}/>},
        {label: 'Экспорт данных LCP', key: '2', children: <AdminRemotes/>},
        {label: 'Download', key: '3', children: <AdminDownload/>},
        {label: 'Create Tables', key: '4', children: <AdminCreateTable/>},
        {label: 'FileSystem', key: '5', children: <FileSystem/>},
    ]

    return (
        <Card size="small" className="lcCard lcBlockLc">
            <Tabs defaultActiveKey="0" items={items}/>
        </Card>
    )
}

export default memo(Admin);