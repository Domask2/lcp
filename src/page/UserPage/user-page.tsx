import React, {useState} from 'react';
import {useActions} from '../../hooks';
import {getAuth} from '../../redux/app/app.selector';
import {getProjectsAll} from '../../redux/project/project.selector';
import {verification} from '../../utils';
import RenderRoles from './render-roles';
import DownLoad from "../../components/DownLoad/DownLoad";
import {useTypedSelector} from '../../hooks';
import {Avatar, Button, Card, Col, Row} from 'antd';
import {RootState} from '../../redux/redux.store';
import {IProject} from "../../redux/project/project.initial";
import styles from './user-page.module.css'
import {baseUrl} from "../../saga/api/api";

const UserPage: React.FC = () => {
    const auth = useTypedSelector((state: RootState) => getAuth(state));
    const allProject = useTypedSelector((state: RootState) => getProjectsAll(state));
    const arrProjects = Object.values(allProject);
    const {updateUser} = useActions()

    const [form, setValue] = useState({});

    function handleRolesChange(roles: any) {
        setValue(prevState => {
            return {...prevState, ...roles}
        })
    }

    function handleSaveButton() {
        updateUser({'projects_roles': form}, auth.id)
    }

    function renderProjectList(projectList: Array<IProject>): any {
        return projectList.map((project: IProject) => {
            return (
                <li className={styles.item} key={project.key}>
                    <RenderRoles project={project} handleFunc={handleRolesChange} />
                </li>
            )
        })
    };


    return (
        <Card size="small" className="lcCard lcBlockLc">
            <Row>
                <Col>
                    <p>Имя пользователя: <b>{auth.name}</b></p>
                    <p>Email пользователя: <b>{auth.email}</b></p>
                    <p>Глобальная роль: <b>{auth.role}</b></p>
                </Col>
                {
                    verification(auth) ?
                        (
                            <>
                                <Col className={styles.user_roles}>
                                    <p className={styles.title}>Роли по проектам:</p>
                                    <ul className={styles.paren_list}>
                                        {renderProjectList(arrProjects)}
                                    </ul>
                                </Col>
                                <Col>
                                    <Button type="primary" onClick={handleSaveButton}>Сохранить</Button>
                                </Col>
                            </>
                        )
                        : ''
                }
            </Row>
            <DownLoad url={'users/' + auth?.name?.split(' ').join('')} project={'users'} page={auth?.name?.split(' ').join('')} strPage={'users'}/>
        </Card>
    )
};

export default UserPage;