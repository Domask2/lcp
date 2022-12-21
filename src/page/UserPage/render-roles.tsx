import CheckableTag from 'antd/es/tag/CheckableTag';
import React, { useEffect, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getAuth } from '../../redux/app/app.selector';
import { RootState } from '../../redux/redux.store';
import styles from './user-page.module.css'

const RenderRoles = ({ project, handleFunc }: any) => {
  const auth = useTypedSelector((state: RootState) => getAuth(state));

  const [roles, setRoles] = useState<any>(!!auth.projects_roles ? auth.projects_roles[project.key] : []);
  const [form, setValue] = useState<any>([]);

  const rolesMock = project.project_roles;

  useEffect(() => {
    let key = project.key
    setValue({
      [key]: roles
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles])

  useEffect(() => {
    handleFunc(form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form])

  function updateForm(key: any, flag: boolean, ) {
    let copy: any = Object.assign([], roles);
    if (flag) {
      copy.push(key);
    } else {
      let index = copy.indexOf(key);
      if (index !== -1) {
        copy.splice(index, 1);
      }
    }
    return setRoles(copy);
  }

  function renderRoles(arr: any): any {
    
    if (!arr || !arr.length) {
      return <span className={styles.two_list__noroles}>Нет ролей</span>
    } else {
      return rolesMock.map((role: any) => {
        return (
          <li className={styles.two_list__item} key={`${project.id}_${role}`}>
            <CheckableTag
              key={`${project.id}_${role}`}
              checked={roles?.indexOf(role) > -1}
              onChange={checked => updateForm(role, checked)}
            >
              {role}
            </CheckableTag>
          </li>
        )
      })
    }
  }

  return (
    <>
      <h3>{project.title}</h3>
      <ul className={styles.two_list}>
        {renderRoles(project.project_roles)}
      </ul>
    </>
  )
}

export default RenderRoles;