import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getAuth } from "../../redux/app/app.selector";
import { AppRoute } from "../../utils";

const AuthProvider: React.FC = () => {
    const auth = useTypedSelector(getAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.authenticated) {
            navigate(AppRoute.LOGIN);
        }
    }, [auth, navigate]);

    return (
        <Outlet />
    )
}

export default AuthProvider;