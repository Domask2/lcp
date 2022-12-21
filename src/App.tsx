import React, {useEffect} from 'react';
import {BrowserRouter, useLocation} from "react-router-dom";
import {Provider} from "react-redux";
import store, {RootState} from "./redux/redux.store";
import {getInitialized} from "./redux/app/app.selector";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {useActions} from "./hooks/useActions";
import MainLayout from "./layouts/MainLayout";
import {configureAnchors} from "react-scrollable-anchor";
import Notifications from "./notification/Notifications";
import {getProjectsAll} from "./redux/project/project.selector";

configureAnchors({offset: -100, scrollDuration: 500});

const App: React.FC = () =>
    <BrowserRouter>
        <Provider store={store}>
            <MyApp />
            <Notifications />
        </Provider>
    </BrowserRouter>

export const MyApp: React.FC = () => {
    const {pathname} = useLocation();
    const {setCurrentProject, initializeApp} = useActions()
    const initialized = useTypedSelector((state: RootState) => getInitialized(state))
    const projectsAll = useTypedSelector((state: RootState) => getProjectsAll(state))
    const projectKey = pathname.split('/')[1]

    useEffect(() => {
        if (Object.keys(projectsAll).includes(projectKey)) {
            setCurrentProject(projectKey)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectKey, initialized, setCurrentProject])

    if (!initialized) {
        initializeApp()
        // return <Skeleton active paragraph={{rows: 5}} avatar/>
    }

    return <MainLayout />
}

export default App;

