import React from 'react';
import {Link} from 'react-router-dom';
import {useTypedSelector} from "../../../hooks";
import {getCurrentProject} from "../../../redux/project/project.selector";
import {getAuth} from "../../../redux/app/app.selector";
import {getEditMode} from "../../../redux/app/app.selector";
import {checkRole} from '../../../utils';

import SubMenu from "antd/es/menu/SubMenu";

import {Menu} from "antd";
import {RootState} from "../../../redux/redux.store";
import styles from './navigation.module.css'
import {INavigation} from "../../../redux/project/project.initial";

const Navigation: React.FC = () => {
    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state));
    const auth = useTypedSelector((state: RootState) => getAuth(state));
    const editMode = useTypedSelector((state: RootState) => getEditMode(state));
    const roleKey = currentProject ? currentProject.key : '';

    console.log(currentProject)

    function renderMenu(arr: any) {
        return (
            <Menu
                theme="light"
                style={{background: 'none'}}
                // defaultSelectedKeys={['2']}
                mode="horizontal">
                {/*eslint-disable-next-line array-callback-return*/}
                {arr?.navigation?.map((item: INavigation) => {
                    const url = `/${arr.key}/${item.key}`;
                    if (editMode) {
                        return item.children && item.children.length ? renderSubMenu(item, url) : renderItem(item, url)
                    } else if (item.visible) {
                        if (auth.projects_roles ? checkRole(item?.project_roles, auth.projects_roles[roleKey]) : checkRole(item?.project_roles, undefined)) {    /** если acl нет или моя роль подходит */
                            return item.children && item.children.length ? renderSubMenu(item, url) : renderItem(item, url)
                        }
                    }
                })}
            </Menu>
        )
    }

    function renderSubMenu(arr: any, url: string) {
        return (
            <SubMenu
                style={{background: 'none'}}
                key={arr.id ? arr.id : url}
                title={arr.active_page ? (
                    <Link to={`${url}`}>{arr.title} <span
                        style={{fontSize: '10px'}}>{`${editMode ? `${arr.project_roles && arr.project_roles.length ? `(${arr.project_roles})` : ''}` : ''}`}</span></Link>
                ) : (
                    <>
                        {arr.title} <span
                            style={{fontSize: '10px'}}>{`${editMode ? `${arr.project_roles && arr.project_roles.length ? `(${arr.project_roles})` : ''}` : ''}`}</span>
                    </>
                )}>
                {/*eslint-disable-next-line array-callback-return*/}
                {arr.children.map((item: any) => {
                    const newUrl = `${url}/${item.key}`
                    if (editMode) {
                        return item.children && item.children.length ? renderSubMenu(item, newUrl) : renderItem(item, newUrl)
                    } else if (item.visible) {
                        if (auth.projects_roles ? checkRole(item?.project_roles, auth.projects_roles[roleKey]) : checkRole(item?.project_roles, undefined)) {
                            return item.children && item.children.length ? renderSubMenu(item, newUrl) : renderItem(item, newUrl)
                        }
                    }
                })}
            </SubMenu>
        )
    }

    function renderItem(item: any, url: string) {
        return (
            <Menu.Item key={item.id ? item.id : url} style={{background: 'none'}}>
                {item.active_page ? (
                    <Link to={`${url}`}>{item.title} <span
                        style={{fontSize: '10px'}}>{`${editMode ? `${item.project_roles && item.project_roles.length ? `(${item.project_roles})` : ''}` : ''}`}</span></Link>
                ) : (
                    <>
                        {item.title} <span
                            style={{fontSize: '10px'}}>{`${editMode ? `${item.project_roles && item.project_roles.length ? `(${item.project_roles})` : ''}` : ''}`}</span>
                    </>
                )}
            </Menu.Item>
        )
    }

    return (
        <div className={styles.navigation}>
            {renderMenu(currentProject)}
        </div>
    )
};

export default Navigation;