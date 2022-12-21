import React, {useState} from "react";
import {AdminNavigationMenuEdit} from "./AdminNavigationMenuEdit/AdminNavigationMenuEdit";
import {getLevelIteration} from "../../../../services/adminNavigationUtils/utils";
import {Collapse} from "antd";
import {INavigation, IProject} from "../../../../redux/project/project.initial";
import {EyeOutlined, EyeInvisibleOutlined, FileTextOutlined, FileOutlined, NodeExpandOutlined} from "@ant-design/icons";

interface IAdminNavigation {
    project: IProject
    projectKey: string
    item?: INavigation
    items: [INavigation] | []
}

export const AdminNavigation: React.FC<IAdminNavigation> = ({project, projectKey, item, items}) => {
    const [activeCollapse, setActiveCollapse] = useState<any>([]);

    return (
        <div className='adminNavigation'>
            {Array.isArray(items) && items.length
                ? items.map((item: INavigation, key: number) => {
                    // получение уровня вложенности
                    // в зависимости от вложенности устанавливаем соответствующие стили и поведение
                    let disabled: "header" | "disabled" = "header";
                    let levelIteration = getLevelIteration(project.navigation, projectKey, item.key);
                    if (levelIteration === 2) disabled = "disabled";
                    if (!item.children?.length) disabled = "disabled";

                    let projectRoles;
                    if(item.project_roles?.length) {
                        projectRoles = `(${item.project_roles?.join(',')})`
                    } else {
                        projectRoles = ''
                    }

                    // установка графических подсказок в заголовок меню
                    let params = item.params !== undefined ? item.params : ''
                    let eye: any = item.visible ? <EyeOutlined style={{color: '#1890ff', fontSize: '15px'}} /> : <EyeInvisibleOutlined style={{color: 'lightgray', fontSize: '15px'}} />
                    let page: any = item.active_page ? <FileTextOutlined style={{color: '#1890ff', fontSize: '15px'}} /> : <FileOutlined style={{color: 'lightgray', fontSize: '15px'}} />
                    let child: any = item.children?.length ? <NodeExpandOutlined style={{color: '#1890ff', fontSize: '15px'}} /> : <NodeExpandOutlined style={{color: 'lightgray', fontSize: '15px'}} />
                    let header = <>{eye} {page} {child} {item.title} [{item.key + params}] {projectRoles}</>

                    let classNameCollapse;
                    if (levelIteration === 1) classNameCollapse = 'classNameCollapse1';
                    if (levelIteration === 2) classNameCollapse = 'classNameCollapse2';
                    return (
                        <div key={key} style={{marginBottom: "10px"}}>
                            <Collapse
                                ghost key={key}
                                activeKey={activeCollapse}
                                className={classNameCollapse}
                                onChange={(e) => {
                                    // логика по открытию и закрытию подпунктов меню
                                    if (String(activeCollapse[0]) !== item.key) {
                                        setActiveCollapse([item.key])
                                    } else if (String(activeCollapse[0]) === item.key) {
                                        setActiveCollapse([])
                                    }

                                    if (String(activeCollapse[1]) === item.key) {
                                        setActiveCollapse([])
                                    }
                                }}

                            >
                                <Collapse.Panel
                                    key={item.key}
                                    header={header}
                                    collapsible={disabled}
                                    extra={
                                        <div>
                                            <AdminNavigationMenuEdit
                                                project={project}
                                                projectKey={projectKey}
                                                keyItem={item.key}
                                                item={item}
                                                setActiveCollapse={setActiveCollapse}
                                                levelIteration={levelIteration}
                                            />
                                        </div>
                                    }
                                >
                                    {item.children && (
                                        <AdminNavigation
                                            project={project}
                                            projectKey={item.key}
                                            item={item}
                                            items={item.children}
                                        />
                                    )}
                                </Collapse.Panel>
                            </Collapse>
                        </div>
                    );
                })
                : null}
        </div>
    );
};
