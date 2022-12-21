import React from "react";
import {NavLink} from "react-router-dom";

const ProjectsBlock = () => {

    return <>
        <NavLink key='navLogo' to="/" className="logo">
            <div style={{
                "height": "32px",
                "margin": "16px",
                "fontSize": "22px",
                "padding": "0 9px",
                "overflow": "hidden",
                "fontWeight": "bold",
                "color": "#1890ff",
                cursor: "pointer"
            }}>
                <img src="/logo.png" width={25} style={{marginTop: '-5px'}} alt="logo" /> LCP
            </div>
        </NavLink>
    </>
}

export default ProjectsBlock