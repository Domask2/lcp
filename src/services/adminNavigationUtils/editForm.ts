import {IProject} from "../../redux/project/project.initial";
import { v4 as uuidv4 } from 'uuid';

//редактирования меню навигации
export const editFormNavigation = (data: any, keyItem: any, project: IProject, projectKey: string, hooksObject: any, id:any) => {
    let newObj: any = {};

    if(id === undefined) {
        newObj.id = uuidv4()
    }

    data.forEach((item: any, key: number) => {
        if (item.key === keyItem && project.key === projectKey) {
            newObj = setEditObject(newObj, item, hooksObject);
            data[key] = newObj;
        }
        if (item.children && item.children.length > 0) {
            item?.children.forEach((it: any, key1: any) => {
                if (it.key === keyItem && item.key === projectKey) {
                    newObj = setEditObject(newObj, it, hooksObject);
                    data[key].children[key1] = newObj;
                }

                if (it.children && it.children.length > 0) {
                    it?.children.forEach((i: any, key2: any) => {
                        if (i.key === keyItem && it.key === projectKey) {
                            newObj = setEditObject(newObj, i, hooksObject);
                            data[key].children[key1].children[key2] = newObj;
                        }
                    });
                }
            });
        }
    });

    return data;
}

// создание меню
export const setEditObject = (newObj: any, item: any, hooksObject: any) => {
    const {keyInput, titleInput, visibleInput, activeInput, paramsInput, roleUserArrayEdit} = hooksObject;

    item.children === undefined ? newObj.children = [] : newObj.children = item.children;
    newObj.key = keyInput;
    newObj.title = titleInput;
    newObj.visible = JSON.parse(visibleInput);
    newObj.active_page = JSON.parse(activeInput);
    if (paramsInput) {
        paramsInput.includes('?') ? newObj.params = paramsInput : newObj.params = `${paramsInput}?`;
    }
    ;

    if (roleUserArrayEdit && roleUserArrayEdit.length > 0) newObj.project_roles = roleUserArrayEdit;

    return newObj;
};

// поднять пункт меню
export const upPageNavigation = (data: any, project: IProject, projectKey: string, keyItem: string) => {
    let indexElement;
    let indexElement1;
    let indexElement2;
    let newArray = data;

    data.forEach((item: IProject, key: number) => {
        if (item.key === keyItem && project.key === projectKey) {
            indexElement = key;
        }
        if (item.children && item.children.length > 0) {
            item?.children.forEach((it: IProject, key1: number) => {
                if (it.key === keyItem && item.key === projectKey) {
                    indexElement = key;
                    indexElement1 = key1;
                }
                if (it?.children && it.children.length > 0) {
                    it?.children.forEach((i: IProject, key2: number) => {
                        if (i.key === keyItem && it.key === projectKey) {
                            indexElement = key;
                            indexElement1 = key1;
                            indexElement2 = key2;
                        }
                    });
                }
            });
        }
    });

    if (project.key === projectKey) {
        if (indexElement === 0) {
            return data
        }
        let el = data.splice(indexElement, 1)[0];
        indexElement !== undefined && newArray.splice(indexElement - 1, 0, el);
    }

    if (indexElement !== undefined && indexElement1 !== undefined) {
        if (data[indexElement].children[indexElement1].key === keyItem) {
            if (indexElement1 === 0) return data;
            let el = data[indexElement].children.splice(indexElement1, 1)[0];
            newArray[indexElement].children.splice(indexElement1 - 1, 0, el);
        }
    }

    if (indexElement !== undefined && indexElement1 !== undefined && indexElement2 !== undefined) {
        if (data[indexElement].children[indexElement1].children[indexElement2].key === keyItem) {
            if (indexElement2 === 0) return data;
            let el = data[indexElement].children[indexElement1].children.splice(indexElement2, 1)[0];
            newArray[indexElement].children[indexElement1].children.splice(indexElement2 - 1, 0, el);
        }
    }

    return data;
}

// опустить пункт меню
export const downPageNavigation = (data: any, project: IProject, projectKey: string, keyItem: string, id:string) => {
    let indexElement;
    let indexElement1;
    let indexElement2;
    let newArray = data;

    data.forEach((item: any, key: any) => {
        if (item.key === keyItem && project.key === projectKey) {
            indexElement = key;
        }
        if (item.children && item.children.length > 0) {
            item?.children.forEach((it: any, key1: any) => {

                if (it.key === keyItem && item.key === projectKey && it?.id === id) {
                    indexElement = key;
                    indexElement1 = key1;
                }
                if (it?.children && it.children.length > 0) {

                    it?.children.forEach((i: any, key2: any) => {
                        if (i.key === keyItem && it.key === projectKey && i?.id === id) {
                            indexElement = key;
                            indexElement1 = key1;
                            indexElement2 = key2;
                        }
                    });
                }
            });
        }
    });



    if (project.key === projectKey && indexElement !== undefined) {
        if (indexElement === data.length - 1) return data;
        let el = data.splice(indexElement, 1)[0];
        indexElement !== undefined && newArray.splice(indexElement + 1, 0, el);
    }

    if (indexElement !== undefined && indexElement1 !== undefined) {
        // if (indexElement1 === data[indexElement].children.length - 1) return data;
        if (data[indexElement].children[indexElement1].key === keyItem) {
            let el = data[indexElement].children.splice(indexElement1, 1)[0];
            newArray[indexElement].children.splice(indexElement1 + 1, 0, el);
        }
    }

    if (indexElement !== undefined && indexElement1 !== undefined && indexElement2 !== undefined) {
        if (indexElement2 === data[indexElement].children[indexElement1].children.length - 1) return data;
        if (data[indexElement].children[indexElement1].children[indexElement2].key === keyItem) {
            let el = data[indexElement].children[indexElement1].children.splice(indexElement2, 1)[0];
            newArray[indexElement].children[indexElement1].children.splice(indexElement2 + 1, 0, el);
        }
    }

    return data;
}
