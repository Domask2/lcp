import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useActions, useTypedSelector} from '../../../hooks';

import Admin from '../admin/Admin';
import AuthModal from '../authModal/AuthModal';

import {getAuth} from '../../../redux/app/app.selector';

import {AppRoute, verification} from '../../../utils';
import {LoginOutlined, LogoutOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons';
import {RootState} from '../../../redux/redux.store';
import styles from './autorization.module.css';

const Authorization: React.FC = () => {
    const auth = useTypedSelector((state: RootState) => getAuth(state))
    const {logout} = useActions();
    const [view, setView] = useState(false)
    const {pathname} = useLocation()
    const navigate = useNavigate()

    const getHistoryLogout = () => {
        if (pathname === '/admin' || '/user' || '/wiki') {
            navigate('/');
            logout();
        } else {
            logout();
        }
    }

    const handleLoginClick = () => {
        auth.authenticated ? getHistoryLogout() : login();
    }

    function login() {
        setView(true);
    }

    return (
        <>
            <ul className={styles.list}>
                {!(pathname === '/') && <li className={styles.item}>
                    <Link className="logo_home" to={'/'}>
                        <HomeOutlined style={{marginRight: '5px'}} />
                    </Link>
                </li>}
                {auth.authenticated && (<li className={styles.item}>

                    <Link to={verification(auth) ? `${AppRoute.ADMINKA_USER_PAGE}/${auth.id}` : AppRoute.USER}>
                        <UserOutlined style={{marginRight: '5px'}} />
                        {auth.authenticated ? auth.name : 'Пользователь'}
                    </Link>
                </li>)}

                {
                    verification(auth) ? <li className={styles.item}><Admin /></li> : ''
                }

                <li className={styles.item} onClick={handleLoginClick}>
                    {auth.authenticated ? (
                        <LogoutOutlined style={{marginRight: '5px'}} />
                    ) : (
                        <>Login <LoginOutlined style={{marginRight: '5px', marginTop: '5px'}} /></>
                    )}
                </li>
            </ul>

            {view && <AuthModal view={view} setView={setView} />}
        </>
    )
};

export default Authorization;
