import React from "react";
import {checkRole} from "../utils";
import {MenuProps} from "antd/es/menu";
import {IAuth} from "../redux/app/app.initial";
import {INavigation, IProject} from "../redux/project/project.initial";

export type MenuItem = Required<MenuProps>['items'][number];

export const getItem = (label: React.ReactNode, key?: React.Key | null, icon?: React.ReactNode, children?: MenuItem[]): MenuItem => {
    return {key, icon, children, label} as MenuItem;
}

function renderItem(item: INavigation, url: string, navigate: (v: string) => void, editMode?: boolean) {
    if (item.active_page) {
        return <span onClick={() => navigate(url)}>
            {item.title}
            <span style={{fontSize: '10px'}}>
                {`${editMode ? `${item.project_roles && item.project_roles.length ? ` (${item.project_roles})` : ''}` : ''}`}
            </span>
        </span>
    } else {
        return <>
            {item.title}
            <span style={{fontSize: '10px'}}>
                {`${editMode ? `${item.project_roles && item.project_roles.length ? ` (${item.project_roles})` : ''}` : ''}`}
            </span>
        </>
    }
}

export const getItems = (currentProject: IProject | undefined, editMode: boolean, auth: IAuth, roleKey: string, navigate: (v: string) => void) => {
    const items: MenuItem[] = []
    currentProject && currentProject?.navigation.map((item: any) => {
        if (editMode) {
            items.push(getItem(renderItem(item, `/${currentProject?.key}/${item.key}`, navigate, editMode),
                `/${currentProject?.key}/${item.key}`,
                null,
                item?.children?.length &&
                item.children.map((it: any) => {
                    return getItem(renderItem(it, `/${currentProject?.key}/${item.key}/${it.key}`, navigate, editMode),
                        `/${currentProject?.key}/${item.key}/${it.key}`, null,
                        it?.children?.length &&
                        it.children.map((i: any) => {
                            return getItem(renderItem(i, `/${currentProject?.key}/${item.key}/${it.key}/${i.key}`, navigate, editMode),
                                `/${currentProject?.key}/${item.key}/${it.key}/${i.key}`, null)
                        })
                    )
                })
            ))
        } else {
            items.push(item.visible && (auth.projects_roles ? checkRole(item?.project_roles, auth.projects_roles[roleKey]) : checkRole(item?.project_roles, undefined)) &&
                getItem(renderItem(item, `/${currentProject?.key}/${item.key}`, navigate),
                    `/${currentProject?.key}/${item.key}`,
                    null,
                    item?.children?.length &&
                    item.children.map((it: any) => {
                        return it.visible && (auth.projects_roles ? checkRole(it?.project_roles, auth.projects_roles[roleKey]) : checkRole(it?.project_roles, undefined)) &&
                            getItem(renderItem(it, `/${currentProject?.key}/${item.key}/${it.key}`, navigate),
                                `/${currentProject?.key}/${item.key}/${it.key}`,
                                null,
                                it?.children?.length &&
                                it.children.map((i: any) => {
                                    return i.visible && (auth.projects_roles ? checkRole(i?.project_roles, auth.projects_roles[roleKey]) : checkRole(i?.project_roles, undefined)) &&
                                        getItem(renderItem(i, `/${currentProject?.key}/${item.key}/${it.key}/${i.key}`, navigate),
                                            `/${currentProject?.key}/${item.key}/${it.key}/${i.key}`, null)
                                })
                            )
                    })
                ))
        }
    })

    return items;
}

export const getSelectedKeys = (memoItems: any, pathname: string, setSelectedKeys: (prev: (prev: string[]) => string[]) => void) => {
    memoItems.map((item: any) => {
        if (item?.key === pathname.split('/').slice(0, pathname.split('/').length - 1).join('/')) {
            setSelectedKeys((prev) => ([...prev, item.key]));
        }

        if (item.children) {
            item.children.map((it: any) => {
                if (it.key === pathname.split('/').slice(0, pathname.split('/').length - 1).join('/')) {
                    setSelectedKeys((prev) => ([...prev, it.key]));

                }

                if (it.children) {
                    it.children.map((i: any) => {
                        if (i.key === pathname.split('/').slice(0, pathname.split('/').length - 1).join('/')) {
                            setSelectedKeys((prev) => ([...prev, i.key]));

                        }
                    })
                }
            })
        }
    })
}