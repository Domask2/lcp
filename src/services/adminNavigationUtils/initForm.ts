import {IProject} from "../../redux/project/project.initial";

export const initFormNavigation = (project: IProject, initObject: any, keyItem: any, projectKey: string) => {
    let data = project.navigation;

    data.forEach((item: any, key: number) => {
        if (item.key === keyItem && project.key === projectKey) {
            initObject = setInitObject(item, initObject);
        }
        if (item.children && item.children.length > 0) {
            item?.children.forEach((it: any, key1: any) => {
                if (it.key === keyItem && item.key === projectKey) {
                    initObject = setInitObject(it, initObject);
                }

                if (it.children && it.children.length > 0) {
                    it?.children.forEach((i:any, key2:any) => {
                        if(i.key === keyItem && it.key === projectKey) {
                            initObject = setInitObject(i, initObject);
                        }
                    })
                }
            });

        }
    });
    return initObject;
};

export const setInitObject = (item: any, initObject: any) => {
    if (item.key) initObject.key = item.key;
    if (item.title) initObject.title = item.title;

    initObject.visible = String(item.visible);
    initObject.active_page = String(item.active_page);

    if (item.params) initObject.params = item.params;
    if (item.project_roles) initObject.project_roles = item.project_roles;

    return initObject;
};