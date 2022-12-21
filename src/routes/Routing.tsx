import React from "react";
import {Route} from "react-router";
import {Routes} from "react-router-dom";

import AntPage from "../components/AntComponents/Page/AntPage";
import AuthModal from "../components/header/authModal/AuthModal";
import {AdminPage, UserPage, HomePage, NoteFoundPage} from "../page/index";
import {AuthProvider, NonAuthProvider} from "../components/AuthProvider/index";

import {useTypedSelector} from "../hooks";
import {getAuth, getEditMode} from "../redux/app/app.selector";
import {getProjectsAll} from "../redux/project/project.selector";

import {AppRoute, checkRole, IRoutingChild} from "../utils";
import {RootState} from "../redux/redux.store";
import {IProject} from "../redux/project/project.initial";

const Routing: React.FC = () => {
    const editMode = useTypedSelector((state: RootState) => getEditMode(state))
    const auth = useTypedSelector((state: RootState) => getAuth(state))
    const projectsAll = useTypedSelector((state: RootState) => getProjectsAll(state))

    const getPath = (item: any, child: IRoutingChild) => {
        const param = child.params ?? "";
        const path = `/${item}/${child.key}${param}`;
        // в react-router-dom v6 убрали optional params, но с бекэнда все еще присылаются, поэтому приходится удалять
        return path.replace("?", "");
    };

    let projectAllArr: any = Object.values(projectsAll);
    let routeArr: any = [];

    // выполняет рекурсивный цикл и наполняет массив(routeArr) роутами(url-маршрутами)
    // поверяет есть ли чилды(вложенные страницы) у проекта,
    // если есть - создает маршрут на текущую страницу и запускает себя (renderRoutes) для массива чилдренов
    // если нет - просто создает маршрут на текущую страницу
    function renderRoutes(parent: any, url: string) {
        if (parent.children && parent.children.length) {
            routeArr.push(renderRoute(parent, url));
            return parent.children.map((child: IRoutingChild) => {
                const newUrl = `${url}/${parent.key}`;
                return renderRoutes(child, newUrl);
            });
        } else {
            routeArr.push(renderRoute(parent, url));
            return routeArr;
        }
    }

    function renderRoute(parent: IRoutingChild, url: string) {

        // if (checkRole && checkRole(parent?.project_roles, auth.projects_roles?.[url?.split("/")[0]]) && parent.active_page) {
        return (
            <>
                {parent.params && <Route key={`${url}_${parent.key}_with_params`} path={getPath(url, parent)}
                    element={<AntPage />} />}
                <Route key={`${url}_${parent.key}`} path={`/${url}/${parent.key}`} element={<AntPage />} />
            </>
        );
        // }
    }

    return (
        <Routes>
            {/*eslint-disable-next-line no-lone-blocks*/}
            {projectAllArr.map((item: IProject) => {
                // eslint-disable-next-line array-callback-return
                return item.navigation.map((nav1: any) => {
                    if (editMode || checkRole(nav1?.project_roles, auth.projects_roles?.[item.key])) {
                        return renderRoutes(nav1, item.key);
                    }
                });
            })}

            <Route path={"/"} element={<HomePage projectsAll={projectsAll} auth={auth} />} />

            {/*роуты без авторизации*/}
            <Route element={<NonAuthProvider />}>
                <Route path={'*'} element={<AuthModal view={true} />} />
            </Route>

            {/*роуты с авторизацией*/}
            <Route element={<AuthProvider />}>
                <Route path={AppRoute.ADMIN} element={<AdminPage />} />
                <Route path={AppRoute.USER} element={<UserPage />} />
            </Route>

            <Route path="*" element={<NoteFoundPage />} />
        </Routes>
    );
};
export default Routing;
