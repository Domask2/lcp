import React from 'react';
import AdminSwitcher from "../page/AdminPage/AdminSwitcher";
import Logo from "../components/header/logo/Logo"
import Autorization from "../components/header/authorization/Authorization"
import Navigation from '../components/header/navigation/Navigation'
// import {useTypedSelector} from "../hooks";
// import {getCurrentProject} from "../redux/project/project.selector";
// import {RootState} from "../redux/redux.store";

const HeaderLayout: React.FC = () => {
    // const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state));
    return <>
        <header className="lcHeader" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
            padding: '10px 20px',
            minHeight: '70px',
            backgroundColor: '#f0f2f5',
            position: 'sticky',
            top: '0'
        }}>
            <Logo />
            <Navigation />
            <Autorization />
            <AdminSwitcher />
        </header>
    </>;
};

export default HeaderLayout;