import React from 'react';
import {useNavigate} from "react-router-dom";
import {useTypedSelector, useActions} from "../hooks";

import {getCurrentProject} from "../redux/project/project.selector";
import {checkRole} from '../utils';

import {Avatar, Button, Card, Col, List, Row} from 'antd';
import {IProjectAll} from "../redux/project/project.initial";
import {RootState} from "../redux/redux.store";
import {IAuth} from "../redux/app/app.initial";
import {baseUrl} from "../saga/api/api";

type ProjectBlockType = {
    projectsAll: IProjectAll
    auth: IAuth
}
const HomePage = ({projectsAll, auth}: ProjectBlockType) => {
    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state))
    const {setCurrentProject} = useActions()
    const history = useNavigate();

    const onClickProject = (key: string) => {
        setCurrentProject(key)
    }

    const openProjects = Object.values(projectsAll).filter((item: any) => item.is_open === true);
    const closeProjects = Object.values(projectsAll).filter((item: any) => item.is_open === false);
    const filtredClosesProjects = closeProjects.filter((item: any) => auth.projects_roles ? checkRole(item?.project_roles, auth.projects_roles[item.key]) : checkRole(item?.project_roles, undefined));
    const allProjects = [...openProjects, ...filtredClosesProjects];

    // const actions: Array<React.ReactNode> = verification(auth) ? [
    //     <NavLink to="/wiki" title="Описание системы"><QuestionCircleOutlined/> Описание системы</NavLink>,
    //     <NavLink to="/feedback" title="Обратная связь"><MailOutlined/> Обратная связь</NavLink>,
    // ] : [
    //     <NavLink to="/feedback" title="Обратная связь"><MailOutlined/> Обратная связь</NavLink>,
    // ]

    const actions: Array<React.ReactNode> = [
        // <NavLink to="/faq/about" title="Описание системы"><QuestionCircleOutlined/> Описание системы</NavLink>,
        // <NavLink to="/feedback" title="Обратная связь"><MailOutlined/> Обратная связь</NavLink>
    ]

    const getActions = (key: string) => {
        if (currentProject !== undefined && key === currentProject.key) {
            if (currentProject.startpage) {
                return [<Button onClick={() => {
                    onClickProject(projectsAll[key].key)
                    if (projectsAll[key]?.startpage) {
                        history(projectsAll[key]?.startpage!)
                    }
                }} style={{width: '95px'}}>перейти</Button>]
            } else {
                return [<Button style={{width: '95px'}} disabled={true}>загрузить</Button>]
            }
        } else

            return [<Button style={{width: '95px'}} onClick={() => {
                onClickProject(projectsAll[key].key)
                if (projectsAll[key]?.startpage) {
                    history(projectsAll[key]?.startpage!)
                }
            }}
            >
                {
                    projectsAll[key].startpage ? 'перейти' : 'загрузить'
                }

            </Button>]
    }

    return <>
        <Row style={{marginTop: '100px'}}>
            <Col xs={24} sm={24} lg={{span: 16, offset: 4}}
                xl={{span: 12, offset: 6}}>
                <Card size="small" title="Доступные проекты" actions={actions} className="lcCard">
                    <List
                        itemLayout="horizontal"
                        dataSource={Object.values(allProjects)}
                        renderItem={(item) => (
                            <List.Item actions={getActions(item.key)}>
                                {
                                    item.logo ? (
                                        <List.Item.Meta
                                            avatar={<Avatar shape={"square"} src={`${baseUrl}/${item.logo}`} />}
                                            title={item.title}
                                            description={item.description}
                                        />
                                    ) : (
                                        <List.Item.Meta
                                            avatar={<Avatar src={`${baseUrl}/logo.png`} />}
                                            title={item.title}
                                            description={item.description}
                                        />
                                    )
                                }
                            </List.Item>
                        )}
                    />
                </Card>
            </Col>
        </Row>
    </>
};

export default HomePage;