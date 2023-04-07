import React from 'react';
import AdminSwitcher from "../page/AdminPage/AdminSwitcher";
import Logo from "../components/header/logo/Logo"
import Autorization from "../components/header/authorization/Authorization"
import Nav from "../components/header/navigation/Nav";

const HeaderLayout: React.FC = () => {
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
            {/*<Navigation />*/}
            <Nav />
            <Autorization />
            <AdminSwitcher />
        </header>
    </>;
};

export default HeaderLayout;