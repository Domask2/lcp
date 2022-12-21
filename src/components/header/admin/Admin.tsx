import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../../utils';
import styles from './admin.module.css'
import {SettingOutlined} from "@ant-design/icons";

const Admin: React.FC = () => {
    return (
        <Link className={styles.link} to={AppRoute.ADMIN}> <SettingOutlined style={{marginRight: '2px'}} /></Link>
    )
};

export default Admin;