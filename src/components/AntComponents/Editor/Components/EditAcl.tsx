import React from 'react';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { getCurrentProject } from '../../../../redux/project/project.selector';
import { RootState } from '../../../../redux/redux.store';
import { searchRoles } from '../../../../utils';
import ItemEdit from "../Elements/ItemEdit";

type EditAclType = {
    item: any
    setItem: (item: any) => void
    title?: boolean
}
const EditAcl:React.FC<EditAclType> = ({item, setItem, title = true}) => {

    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state))?.navigation;

    const pathName = document.location.pathname
    let arr = pathName.split('/');
    arr.splice(0, 2);

    let projectRoles = searchRoles(currentProject, arr, 0) ? searchRoles(currentProject, arr, 0) : [];
    return <ItemEdit label={title ? 'acl' : ''} item={item} setItem={setItem} del={false} nullable={true} type="select" mode="multiple" selectItems={projectRoles} />
};

export default EditAcl;