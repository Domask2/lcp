import React, {useEffect} from "react";
import {useActions} from "../../../../../hooks/useActions";
import {changeRoleFromParent, setOptionArray} from "../../../../../services/adminNavigationUtils/rolesEdit";

import {Form, Select} from "antd";
import {IProject} from "../../../../../redux/project/project.initial";

interface IAdminNavigationRolesEdit {
    project: IProject;
    projectKey: string;
    initObject: [string];
    roleUserArrayEdit: any;
    setRoleUserArrayEdit: any;
    keyItem?: string;
}

export const AdminNavigationRolesEdit: React.FC<IAdminNavigationRolesEdit> = (props) => {
    const {project, projectKey, keyItem, initObject, roleUserArrayEdit, setRoleUserArrayEdit} = props;
    const {updateProjectNavigation} = useActions();

    let children: any = [];
    let optionArray: any = [];
    optionArray = setOptionArray(optionArray, project, projectKey);

    useEffect(() => {
        if (initObject !== undefined && initObject && initObject.length > 0) {
            setRoleUserArrayEdit(initObject);
        } else {
            setRoleUserArrayEdit([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initObject]);

    if (optionArray && optionArray.length > 0) {
        optionArray.forEach((item: string, key: number) => {
            children.push(
                <Select.Option key={key.toString(36) + key} value={item}>
                    {item}
                </Select.Option>
            );
        });
    }

    useEffect(() => {
        let data = project.navigation;
        data = changeRoleFromParent(data, keyItem, projectKey, roleUserArrayEdit)
        updateProjectNavigation(projectKey, data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roleUserArrayEdit]);

    const handleChange = (value: any) => {
        setRoleUserArrayEdit(value);
    };

    return (
        <Form.Item>
            <Select
                size="middle"
                mode="multiple"
                allowClear
                style={{width: "100%", marginTop: "20px", marginBottom: "20px"}}
                placeholder="Please select"
                value={roleUserArrayEdit}
                onChange={(value) => handleChange(value)}
            >
                {children}
            </Select>
        </Form.Item>
    );
};
