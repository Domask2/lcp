import {checkRole, IRoutingChild} from "../utils";
import {Route} from "react-router";
import AntPage from "../components/AntComponents/Page/AntPage";
import {IProject} from "../redux/project/project.initial";
import React from "react";

let routeArr: any = [];

const getPath = (item: any, child: IRoutingChild) => {
    const param = child.params ?? "";
    const path = `/${item}/${child.key}${param}`;
    // в react-router-dom v6 убрали optional params, но с бекэнда все еще присылаются, поэтому приходится удалять
    return path.replace("?", "");
};
// выполняет рекурсивный цикл и наполняет массив(routeArr) роутами(url-маршрутами)
// поверяет есть ли чилды(вложенные страницы) у проекта,
// если есть - создает маршрут на текущую страницу и запускает себя (renderRoutes) для массива чилдренов
// если нет - просто создает маршрут на текущую страницу
function renderRoutes(parent: any, url: string, auth:any) {
    if (parent.children && parent.children.length) {
        routeArr.push(renderRoute(parent, url, auth));
        return parent.children.map((child: IRoutingChild) => {
            const newUrl = `${url}/${parent.key}`;
            return renderRoutes(child, newUrl, auth);
        });
    } else {
        routeArr.push(renderRoute(parent, url, auth));
        return routeArr;
    }
}

function renderRoute(parent: IRoutingChild, url: string, auth: any) {
    if (checkRole(parent?.project_roles, auth.projects_roles?.[url.split("/")[0]]) && parent.active_page) {
        return (
            <>
                {parent.params && <Route key={`${url}_${parent.key}_with_params`} path={getPath(url, parent)}
                                         element={<AntPage/>}/>}
                <Route key={`${url}_${parent.key}`} path={`/${url}/${parent.key}`} element={<AntPage/>}/>
            </>
        );
    }
}

export const renderDynamicsRoutes = (projectAllArr: any, editMode: boolean, auth: any) => {
    projectAllArr.map((item: IProject) => {
        return item.navigation.map((nav1: any) => {
            if (editMode) {
                return renderRoutes(nav1, item.key, auth);
            } else if (checkRole(nav1?.project_roles, auth.projects_roles?.[item.key])) {
                return renderRoutes(nav1, item.key, auth);
            }
        });
    })
}