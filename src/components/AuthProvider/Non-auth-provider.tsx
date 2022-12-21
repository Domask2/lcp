import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks";
import { getAuth } from "../../redux/app/app.selector";

const NonAuthProvider: React.FC = () => {
    const auth = useTypedSelector(getAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.authenticated) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    return (<Outlet/>)
}

export default NonAuthProvider;