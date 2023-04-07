import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import {getCurrentProject} from "../../../redux/project/project.selector";
import {getAuth} from "../../../redux/app/app.selector";
import {getEditMode} from "../../../redux/app/app.selector";
import {getItems, getSelectedKeys} from "../../../services/navigation";
import {useTypedSelector} from "../../../hooks";
import {RootState} from "../../../redux/redux.store";
import {Menu} from "antd";
import styles from './navigation.module.css'

const Nav: React.FC = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [selectedKeys, setSelectedKeys] = useState(['']);
    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state));
    const auth = useTypedSelector((state: RootState) => getAuth(state));
    const editMode = useTypedSelector((state: RootState) => getEditMode(state));
    const roleKey = currentProject ? currentProject.key : '';

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoItems = useMemo(() => getItems(currentProject, editMode, auth, roleKey, navigate), [currentProject?.navigation, editMode])

    useEffect(() => {
        setSelectedKeys([pathname]);

        if (memoItems.length && editMode) {
            getSelectedKeys(memoItems, pathname, setSelectedKeys);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, editMode]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onClick = useCallback((e => navigate(e.key)), []);

    return (
        <div className={styles.navigation}>
            <Menu
                selectedKeys={selectedKeys}
                onClick={onClick}
                mode='horizontal'
                theme='light'
                items={memoItems}
            />
        </div>
    )
};

export default memo(Nav);