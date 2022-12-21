import {intersection} from "./rolesEdit";
import {IProject} from "../../redux/project/project.initial";

export const setHeaderPanelNavigation = (project: any, key: any, title: any, item: any) => {
    let headerPanel;
    let levelIteration = getLevelIteration(project, key);

    if (levelIteration === 0) headerPanel = "Добавить навигацию";
    if (levelIteration === 1)
        headerPanel = `Добавить навигацию`;
    if (levelIteration === 2)
        headerPanel = `Добавить навигацию`;

    return headerPanel;
};

export const getLevelIteration = (project: any, item: any, itemKey?: any) => {
    let levelIteration;

    if (!item) levelIteration = 0;

    project.forEach((proj: any) => {
        if (proj.key === item) {
            levelIteration = 1;
        }

        proj.children.forEach((pr: any) => {
            if (pr.key === item) {
                levelIteration = 2;
            }
        });


    });

    return levelIteration;
};

export const deleteProject = (itemKey: any, project: any, projectKey: any, levelIteration: any, id: any) => {
    let data = project.navigation;

    if (projectKey === project.key) {
        data = data.filter((el: any) => el.key !== itemKey);
    }

    data.forEach((item: any, keyData: any) => {
        item.children.forEach((i: any, keyParent: any) => {
            if (i.key === itemKey && item.key === projectKey && i?.id === id) {
                data[keyData].children.splice(keyParent, 1);
            }

            i?.children?.forEach((lastItem: any, keyLastItem: any) => {
                if (lastItem.key === itemKey && i.key === projectKey && lastItem?.id === id) {
                    data[keyData].children[keyParent].children.splice(keyLastItem, 1);
                }
            });
        });
    });

    return data;
}

export const setArrayCheckedKeyInput = (project: IProject, projectKey: string, keyItem: any, item: any) => {
    let arrayChecked: any = [];

    if (project?.key === projectKey && keyItem === undefined) {
        project?.navigation.forEach((item: any) => {
            arrayChecked.push(item.key);
        })
    }

    project?.navigation.forEach((item: any) => {
        if (item.key === keyItem) {
            item?.children.forEach((it: any) => {
                arrayChecked.push(it.key)
            })
        }

        item?.children.forEach((it: any) => {
            if (it.key === projectKey) {
                it?.children.forEach((i: any) => {
                    arrayChecked.push(i.key)
                })
            }
        })
    })

    return arrayChecked;
}

export const checkSuccessInput = (hooksObjectError: any, project: IProject, projectKey: string, keyItem: any, item: any) => {
    const {keyInput, titleInput, setErrorKeyInput, setErrorTitleInput} = hooksObjectError;

    let checkSuccess = false;
    let arrayChecked: any = setArrayCheckedKeyInput(project, projectKey, keyItem, item);
    let checkedRole = intersection(arrayChecked, [keyInput]);

    if (keyInput === "") {
        setErrorKeyInput("error");
        titleInput === "" && setErrorTitleInput("error");
    }

    if (keyInput !== "") {

        if (checkedRole.length) {
            setErrorKeyInput('warning')
        } else {
            setErrorKeyInput("success");
        }


        if (titleInput === "") {
            setErrorTitleInput("error");
        }
    }

    if (keyInput === "") {
        setErrorKeyInput("error");
        if (titleInput !== "") {
            setErrorTitleInput("success");
        }
    }

    if (keyInput !== "" && titleInput !== "") {
        setErrorKeyInput("success");
        setErrorTitleInput("success");


        if (checkedRole.length) {
            setErrorKeyInput('warning');
            return;
        } else {
            setErrorKeyInput('success')
        }


        checkSuccess = true;
    }


    if (keyInput === 'warning') {

    }

    return checkSuccess;
};