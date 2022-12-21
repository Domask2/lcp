import {IProject} from "../../redux/project/project.initial";

export const getRemoveRole = function (a1: any, a2: any) {
    return a1.filter((i: any) => !a2.includes(i)).concat(a2.filter((i: any) => !a1.includes(i)));
};

export const intersection = function (arrA: any, arrB: any) {
    return arrA.filter((x: any) => arrB.includes(x));
};

export const differenceRole = function (arrA: any, arrB: any) {
    return arrA.filter((x: any) => !arrB.includes(x));
};

export const setOptionArray = (optionArray: any, project: IProject, projectKey: string) => {
    if (project.key === projectKey) {
        optionArray = project.project_roles;
    } else {
        project.navigation.forEach((item: any) => {
            if (projectKey === item.key) {
                optionArray = item.project_roles;
            }
            item.children.forEach((it: any) => {
                if (it.key === projectKey) {
                    optionArray = it.project_roles;
                }
            });
        });
    }
    return optionArray;
}

export const changeRoleFromParent = (data: any, keyItem: any, projectKey: string, roleUserArrayEdit: any) => {
    data.forEach((item: any) => {
        if (item.key === keyItem) {
            if (item.project_roles && roleUserArrayEdit) {
                let removeRole = getRemoveRole(item.project_roles, roleUserArrayEdit);
                if (roleUserArrayEdit.length < item.project_roles.length) {
                    item?.children.forEach((it: any) => {
                        if (it.project_roles && removeRole) {
                            it.project_roles = differenceRole(it.project_roles, removeRole);
                        }
                        it?.children.forEach((i: any) => {
                            if (i.project_roles && removeRole) {
                                i.project_roles = differenceRole(i.project_roles, removeRole);
                            }
                        });
                    });
                }
            }
        }

        if (item.key === projectKey) {
            item.children.forEach((it: any) => {
                if (it.key === keyItem) {
                    if (it.project_roles && roleUserArrayEdit) {
                        let removeRole = getRemoveRole(it.project_roles, roleUserArrayEdit)
                        if (roleUserArrayEdit.length < it.project_roles.length) {
                            it?.children.forEach((i: any) => {
                                if (i.project_roles && removeRole) {
                                    i.project_roles = differenceRole(i.project_roles, removeRole);
                                }
                            });
                        }
                    }
                }
            })
        }

    });

    return data;
}