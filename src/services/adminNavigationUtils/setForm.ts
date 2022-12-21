import {IProject} from "../../redux/project/project.initial";
import { v4 as uuidv4 } from 'uuid';

export const setFormNavigation = (projectKey:string, project:IProject, keyItem:any, data:any, hooksObject:any, id:any) => {
    const {keyInput, titleInput, visibleInput, activeInput, paramsInput, roleUserArray} = hooksObject;

    let newObj: any = { key: "", title: "", visible: "", project_roles: [], children: [] };
    newObj.key = keyInput;
    newObj.title = titleInput;
    newObj.id = uuidv4();

    newObj.visible = JSON.parse(visibleInput);
    newObj.active_page = JSON.parse(activeInput);

    if(paramsInput !== '') newObj.params = `${paramsInput}?`;
    newObj.project_roles = roleUserArray;

    data = setObject(projectKey, project, keyItem, data, newObj, id);

    return data;
};

export const setObject = (projectKey:string, project:IProject, keyItem:any, data:any, newObj:any, id:any) => {
    let collapseOpen:any = [];

    if (projectKey === project.key && keyItem === undefined) {
        data.push(newObj);
    }

    data.forEach((item: any) => {
        if(projectKey === project.key && item.key === keyItem && item?.id === id ) {
            item.children.push(newObj);
            collapseOpen.push(item.key)
        }

        if(projectKey !== project.key && item.key === projectKey) {
            item.children.forEach((i: any) => {
                if (i.key === keyItem && i?.id === id) {
                    console.log('3', item.key, i.key, project.key, projectKey, keyItem)
                    console.log(i)
                    delete newObj.children;
                    i.children.push(newObj);
                    collapseOpen.push(item.key , i.key)

                }
            })
        }
    });

    return [data, collapseOpen]
};
