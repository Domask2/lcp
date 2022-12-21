import React, {useEffect} from "react";
import {Form, Select} from "antd";
import {IProject} from "../../../../../redux/project/project.initial";

interface IAdminNavigationRoles {
    project: IProject
    initObject: [string]
    roleUserArray: any
    setRoleUserArray: any
    item: any
}

export const AdminNavigationRoles:React.FC<IAdminNavigationRoles> = (props) => {
    const {project, roleUserArray, setRoleUserArray, item} = props;
    let children:any = [];

        useEffect(() => {
            if(item === undefined) {
                if (project.project_roles !== undefined && project.project_roles && project.project_roles.length > 0) {
                    setRoleUserArray(project.project_roles);
                }
            } else {
                if (item.project_roles !== undefined && item.project_roles && item.project_roles.length > 0) {
                    setRoleUserArray(item.project_roles);
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [project.project_roles, item]);

        if(roleUserArray && roleUserArray.length > 0) {
            roleUserArray.forEach((item: string, key: number) => {
                children.push(
                    <Select.Option key={key.toString(36) + key} value={item}>{item}</Select.Option>)
            })
        }


    const handleChange = (value: any) => {
        setRoleUserArray(value);
    }

    return (
        <Form.Item>
            <Select
                size='middle'
                mode="multiple"
                allowClear
                style={{width: '100%',marginTop:'20px' , marginBottom: '20px'}}
                placeholder="Please select"
                value={roleUserArray}
                onChange={handleChange}
            >
                {children}
            </Select>
        </Form.Item>

    );
};
