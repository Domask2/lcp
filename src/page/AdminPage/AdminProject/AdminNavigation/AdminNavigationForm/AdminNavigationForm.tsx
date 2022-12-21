import React, {useEffect, useState} from "react";
import {useActions} from "../../../../../hooks/useActions";

import {AdminNavigationRoles} from "./AdminNavigationRoles";
import {AdminNavigationInput} from "./AdminNavigationInput";
import {AdminNavigationSelect} from "./AdminNavigationSelect";
import {AdminNavigationRolesEdit} from "./AdminNavigationRolesEdit";

import {initFormNavigation} from "../../../../../services/adminNavigationUtils/initForm";
import {setFormNavigation} from "../../../../../services/adminNavigationUtils/setForm";
import {editFormNavigation} from "../../../../../services/adminNavigationUtils/editForm";
import {checkSuccessInput} from "../../../../../services/adminNavigationUtils/utils";
import {resetInputFormState, setStateEditForm} from "../../../../../services/adminNavigationUtils/stateUtils";

import {Form, Button} from "antd";
import {IProject} from "../../../../../redux/project/project.initial";

interface IAdminNavigationForm {
    project: IProject
    projectKey: string
    editForm?: boolean
    keyItem?: string
    handleOk?: () => void
    handleCancel?: any
    item?: any
    setActiveCollapse: any
    id?: any
}

export const AdminNavigationForm: React.FC<IAdminNavigationForm> = (props) => {
    const {item, project, projectKey, editForm, keyItem, handleOk, handleCancel, setActiveCollapse, id} = props;

    const {updateProjectNavigation} = useActions();

    const [form] = Form.useForm();
    const layout = {labelCol: {span: 8}, wrapperCol: {span: 20}};
    let initObject: any = {};

    const [keyInput, setKeyInput] = useState<any>("");
    const [titleInput, setTitleInput] = useState<any>("");
    const [visibleInput, setVisibleInput] = useState<any>("true");
    const [activeInput, setActiveInput] = useState<any>("true");
    const [paramsInput, setParamsInput] = useState('');
    const [roleUserArray, setRoleUserArray] = useState<any>([]);
    const [roleUserArrayEdit, setRoleUserArrayEdit] = useState<any>([]);

    const [errorKeyInput, setErrorKeyInput] = useState<any>("success");
    const [errorTitleInput, setErrorTitleInput] = useState<any>("success");

    const hooksObject = {
        keyInput,
        titleInput,
        visibleInput,
        activeInput,
        paramsInput,
        roleUserArray,
        roleUserArrayEdit
    };
    const hooksObjectSet = {
        setKeyInput,
        setTitleInput,
        setVisibleInput,
        setActiveInput,
        setParamsInput,
        setRoleUserArray,
        setRoleUserArrayEdit
    };
    const hooksObjectError = {keyInput, titleInput, setErrorKeyInput, setErrorTitleInput};

    // при вызове формы редактирования - получаем объект initObject => который заполняет форму сохраненными данными из state.project
    if (editForm) {
        initObject = initFormNavigation(project, initObject, keyItem, projectKey);
    }

    // записанные данные в initObject устанавливает в соответсвующее useState
    useEffect(() => {
        setStateEditForm(editForm, initObject, hooksObjectSet);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resetInputForm = () => {
        resetInputFormState(hooksObjectSet)
    };

    const editFormFunction = (e: any) => {
        e.stopPropagation();
        let data = project.navigation;
        data = editFormNavigation(data, keyItem, project, projectKey, hooksObject, id);
        updateProjectNavigation(project.key, data);
        if (handleOk) handleOk();
    };

    const addFormNavigation = (e: any) => {
        e.stopPropagation();
        let data = project.navigation;
        data = setFormNavigation(projectKey, project, keyItem, data, hooksObject, id);
        if (setActiveCollapse) setActiveCollapse(data[1]);
        resetInputForm();
        item !== undefined ? setRoleUserArray(item.project_roles) : setRoleUserArray(project.project_roles);
        updateProjectNavigation(project.key, data[0]);
    };

    const handleFinish = (e: any) => {
        if (checkSuccessInput(hooksObjectError, project, projectKey, keyItem, item)) {
            addFormNavigation(e);
            form.resetFields();
            handleCancel();
        }
    };

    return (
        <div style={{marginBottom: "10px"}}>
            <Form size="small" {...layout} name="nest-messages" form={form}>
                <AdminNavigationInput
                    initObject={initObject.title}
                    setInput={setTitleInput}
                    getInput={titleInput}
                    setError={setErrorTitleInput}
                    getError={errorTitleInput}
                    name="title"
                    label="Имя страницы"
                />

                <AdminNavigationInput
                    initObject={initObject.key}
                    getError={errorKeyInput}
                    setError={setErrorKeyInput}
                    getInput={keyInput}
                    setInput={setKeyInput}
                    name="key"
                    label="Ключ"
                    helpMessage={true}
                />

                <AdminNavigationInput
                    initObject={initObject.params}
                    getInput={paramsInput}
                    setInput={setParamsInput}
                    name="params"
                    label="Параметры"
                />

                <AdminNavigationSelect
                    initObject={initObject.visible}
                    getInput={visibleInput}
                    setInput={setVisibleInput}
                    label="Видимость"
                    editForm={editForm}
                />

                <AdminNavigationSelect
                    initObject={initObject.active_page}
                    getInput={activeInput}
                    setInput={setActiveInput}
                    label="Активная страница"
                    editForm={editForm}
                />

                {
                    !editForm && <AdminNavigationRoles
                        initObject={initObject.project_roles}
                        project={project}
                        roleUserArray={roleUserArray}
                        setRoleUserArray={setRoleUserArray}
                        item={item} />
                }

                {
                    editForm && (<>
                        <AdminNavigationRolesEdit
                            initObject={initObject.project_roles}
                            project={project}
                            roleUserArrayEdit={roleUserArrayEdit}
                            setRoleUserArrayEdit={setRoleUserArrayEdit}
                            projectKey={projectKey}
                            keyItem={keyItem}
                        />

                        <Button onClick={(e) => editFormFunction(e)}>сохранить</Button>
                        <Button onClick={handleCancel}>отмена</Button>
                    </>)
                }

                <Button className="lcButtonLc" onClick={(e) => handleFinish(e)}>
                    {editForm ? null : "добавить пункт меню"}
                </Button>

            </Form>
        </div>
    );
};
