import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import ApiApp from "./api/api.app";
import ApiDs from "./api/api.ds";
import ApiProject from "./api/api.project"
import ApiRemote from "./api/api.remote";
import appActionCreators from "../redux/app/app.action.creators";
import dsActionCreators from "../redux/ds/ds.action.creators";
import remoteActionCreators from "../redux/remote/remote.action.creators";
import {projectActionCreators} from "../redux/project/project.action.creators";
import {ProjectActionsEnum} from "../redux/project/project.action.types";
import {DsActionsEnum} from "../redux/ds/ds.action.types";
import {AppActionsEnum, AppUpdateSettingsActionType} from "../redux/app/app.action.types";
import {RemoteActionsEnum} from "../redux/remote/remote.action.types";
import {errorNotification, successNotification} from "../notification/notification";
import {IAppSetting} from "../redux/app/app.initial";

const placement = 'bottomRight';

const initApp = function* (): any {
    try {
        const settings = yield call(ApiApp.initializeApp)
        yield put(appActionCreators.initializedSuccess(settings))
        yield put(dsActionCreators.setLs('_auth', {
            id: localStorage.getItem('user-id') !== undefined ? localStorage.getItem('user-id') : '',
            name: localStorage.getItem('user-name') !== undefined ? localStorage.getItem('user-name') : null,
            email: localStorage.getItem('user-email') !== undefined ? localStorage.getItem('user-email') : null,
            theme: localStorage.getItem('user-theme') !== undefined ? localStorage.getItem('user-theme') : null,
            role: localStorage.getItem('user-role') !== undefined ? localStorage.getItem('user-role') : null,
        }))
    } catch (e: any) {
        yield put(appActionCreators.initializedFailed(e.message))
    }
}

const login = function* (action: any): any {
    try {
        const data = yield call(ApiApp.login, action.values)
        yield put(appActionCreators.loginSuccess(data))
        yield put(appActionCreators.initializeApp())
        yield put(dsActionCreators.clearCache("all"))
        yield put(dsActionCreators.clearDs("all"))
    } catch (e: any) {
        yield put(appActionCreators.loginFailed(e.message))
    }
};

const logout = function* (): any {
    console.log('logout');

    try {
        yield call(ApiApp.logout)
        yield put(appActionCreators.logoutSuccess())
        yield put(appActionCreators.initializeApp())
        yield put(dsActionCreators.clearCache("all"))
        yield put(dsActionCreators.clearDs("all"))
        yield put(appActionCreators.appChangeEditMode(false))
    } catch (e: any) {
        yield put(appActionCreators.loginFailed(e.message))
    }
};

interface requestSettingsType extends IAppSetting {
    status: number;
    message: string;
    setting: IAppSetting
}

const updateSettings = function* (action: AppUpdateSettingsActionType) {
    try {
        const request: requestSettingsType = yield call(ApiApp.updateSettings1, action.data)
        if (request.status === 200) {
            successNotification(placement, '', request.message);
        }
        yield put(appActionCreators.updateSettingsSuccess(request.setting))
    } catch (e: any) {
        if (e.response.data.status === 422) {
            errorNotification(placement, '', e.response.data.message);
        }
        yield put(appActionCreators.updateSettingsFailed(e.response.data))
    }
}

const updateUser = function* (action: any): any {
    try {
        yield call(ApiApp.updateUser, action.data, action.id)
        yield put(appActionCreators.updateUserSuccess(action.data))
    } catch (e: any) {
        console.log('Ошибка редактирования пользователя: ', e)
    }
}

const getAllDs = (pages: any) => {
    let allDsProject: any = [];
    pages.forEach((page: any) => {
        Object.keys(page.datasources).forEach((d: any) => {
            allDsProject.push(d)
        })
    })

    return allDsProject.filter((val: any, ind: any, arr: any) => arr.indexOf(val) === ind)
}

const loadProject = function* (action: any): any {
    try {
        const pages = yield call(ApiProject.loadProject, action.project_id)
        yield put(projectActionCreators.allDs(getAllDs(pages.data)))
        yield put(projectActionCreators.loadProjectSuccess(pages))
    } catch (e: any) {
        yield put(projectActionCreators.loadProjectFailed(e.message))
    }
}

const savePageSaga = function* (action: any): any {
    try {
        const page = yield call(ApiProject.savePage, action.page)
        yield put(projectActionCreators.savePageSuccess(page))
        yield put(projectActionCreators.updatePage(action.page))

    } catch (e: any) {
        yield put(projectActionCreators.savePageFailed(e.message))
    }
}

const createPageSaga = function* (action: any): any {
    try {
        const page = yield call(ApiProject.createPage, action.project, action.key)
        yield put(projectActionCreators.createPageSuccess(page))
    } catch (e: any) {
        yield put(projectActionCreators.createPageFailed(e.message))
    }
}

const createProjectSaga = function* (): any {
    try {
        const project = yield call(ApiProject.createProject);
        yield put(projectActionCreators.createProjectSuccess(project));
    } catch (e: any) {
        yield put(projectActionCreators.createProjectFailed(e.message));
    }
}

const deleteProjectSaga = function* (action: any): any {
    try {
        yield call(ApiProject.deleteProject, action.key)
        yield put(projectActionCreators.deleteProjectSuccess(action.key))
    } catch (e: any) {
        yield put(projectActionCreators.deleteProjectFailed(e.message))
    }
}

const saveProjectSaga = function* (action: any): any {
    try {
        const project = yield call(ApiProject.saveProject, action.project)
        if (project.status === 200) {
            successNotification(placement, '', project.message);
        }
        yield put(projectActionCreators.saveProjectSuccess(project.project, {status: project.status, message: project.message}))
    } catch (e: any) {
        yield put(projectActionCreators.saveProjectFailed(action.project, e.message))
        console.error(e.message)
    }
}

const saveProjectFormDataSaga = function* (action: any): any {
    try {
        const project = yield call(ApiProject.saveProjectFormData, action.form_data)
        if (project.status === 200) {
            successNotification(placement, '', project.message);
        }
        yield put(projectActionCreators.saveProjectSuccess(project.project, {status: project.status, message: project.message}))
    } catch (e: any) {
        if (e.response.data.status === 422) {
            errorNotification(placement, '', e.response.data.message);
        } else if (e.response.data.status === 404) {
            errorNotification(placement, '', e.response.data.message);
        }
        yield put(projectActionCreators.saveProjectFailed(action.project, e.response.data))
    }
}

const loadDs = function* (action: any): any {
    try {
        yield put(dsActionCreators.setLoading(action.key, true))
        const ds = yield call(ApiDs.loadDs, action.key, action.filter)
        yield put(dsActionCreators.loadDataSourceSuccess(ds, action.filter, action.cache, action.target))
        yield put(dsActionCreators.setLoading(action.key, false))
        if (action.cache) {
            let params: Array<string> = []

            if (action.pagination)
                params.push('__cur_page=' + action.pagination.cur_page + '&__per_page=' + action.pagination.per_page)
            if (action.filter !== undefined && action.filter !== '')
                params.push('__filter=' + action.filter)
            if (action.search !== undefined && action.search !== '')
                params.push('__search=' + action.search)

            let key = params.join('&')
            yield put(dsActionCreators.setCache(ds.data.key + '#' + key, ds))
        }
    } catch (e: any) {
        yield put(dsActionCreators.loadDataSourceFailed(e.message))
    }
}

const createRecord = function* (action: any): any {
    try {
        const data = yield call(ApiDs.createRecord, action.ds_key, action.data)
        yield put(dsActionCreators.createRecordSuccess(data, action.ds_key, action.reload))
        // yield put(dsActionCreators.setNeedToReload(action.ds_key, action.reload))
    } catch (e: any) {
        yield put(dsActionCreators.createRecordFailed(e.message))
    }
}

const editRecord = function* (action: any): any {
    try {
        const data = yield call(ApiDs.editRecord, action.ds_key, action.data, action.primaries)
        yield put(dsActionCreators.editRecordSuccess(data, action.ds_key, action.reload))
        // yield put(dsActionCreators.setNeedToReload(action.ds_key, action.reload))
    } catch (e: any) {
        yield put(dsActionCreators.editRecordFailed(e.message))
    }
}

const deleteRecord = function* (action: any): any {
    try {
        yield call(ApiDs.deleteRecord, action.ds_key, action.primaries)
        yield put(dsActionCreators.deleteRecordSuccess(action.ds_key, action.reload))
        // yield put(dsActionCreators.setNeedToReload(action.ds_key, action.reload))
    } catch (e: any) {
        yield put(dsActionCreators.deleteRecordFailed(e.message))
    }
}

function* reloadDS(ds: any): any {
    try {
        yield put(dsActionCreators.loadDataSource(ds.key, ds.filter, false))
    } catch (err: any) {
        console.log(err.message)
    }
}

const executeDbProcedure = function* (action: any): any {
    try {
        yield call(ApiDs.executeDbProcedure, action.ds_key, action.payload)
        yield all(action.reload_ds[0].map((file: any) => call(reloadDS, file)))
        // yield put(dsActionCreators.loadDataSource(action.reload_ds, '', false))
        yield put(dsActionCreators.executeDbProcedureSuccess(action.ds_key, action.reload))
    } catch (e: any) {
        if (e.response.status === 401) {
            console.log('Авторизуйтесь заново!');
            yield put(appActionCreators.logoutSuccess())
        }
        yield put(dsActionCreators.executeDbProcedureFailed(e.message))
    }
}


const loginRemote = function* (action: any): any {
    try {
        const data = yield call(ApiRemote.loginRemote, action.values)
        yield put(remoteActionCreators.loginRemoteSuccess(data, action.values.url))
    } catch (e: any) {
        yield put(remoteActionCreators.loginRemoteFailed(e.message))
    }
};

const loadRemoteDb = function* (action: any): any {
    try {
        const data = yield call(ApiRemote.loadRemoteDb, action.authRemote)
        yield put(remoteActionCreators.loadRemoteDbSuccess(data))
    } catch (e: any) {
        yield put(remoteActionCreators.loadRemoteDbFailed(e.message))
    }
};

const loadRemoteAddDb = function* (action: any): any {
    try {
        yield call(ApiRemote.loadRemoteAddDb, action.authRemote, action.db)
        yield put(remoteActionCreators.loadRemoteDb(action.authRemote))
    } catch (e: any) {
        yield put(remoteActionCreators.loadRemoteDbFailed(e.message))
    }
};

const loadRemoteAddDs = function* (action: any): any {
    try {
        yield call(ApiRemote.loadRemoteAddDs, action.authRemote, action.ds)
        yield put(remoteActionCreators.loadRemoteDb(action.authRemote))
    } catch (e: any) {
        yield put(remoteActionCreators.loadRemoteAddDsFailed(e.message))
    }
};

const loadRemoteAddDsFields = function* (action: any): any {
    try {
        yield call(ApiRemote.loadRemoteAddDsFields, action.authRemote, action.dsFields)
        yield put(remoteActionCreators.loadRemoteDb(action.authRemote))
    } catch (e: any) {
        yield put(remoteActionCreators.loadRemoteAddDsFieldsFailed(e.message))
    }
};

const loadRemoteAddDsAccess = function* (action: any): any {
    try {
        yield call(ApiRemote.loadRemoteAddDsAccess, action.authRemote, action.dsAccess)
        yield put(remoteActionCreators.loadRemoteDb(action.authRemote))
    } catch (e: any) {
        yield put(remoteActionCreators.loadRemoteAddDsAccessFailed(e.message))
    }
};

const loadRemoteAddDsAll = function* (action: any): any {
    try {
        yield call(ApiRemote.loadRemoteAddDsAll, action.authRemote, action.dsAll)
        yield put(remoteActionCreators.loadRemoteDb(action.authRemote))
    } catch (e: any) {
        yield put(remoteActionCreators.loadRemoteAddDsAllFailed(e.message))
    }
};

const loadRemoteProject = function* (action: any): any {
    try {
        yield call(ApiRemote.loadRemoteProject, action.authRemote, action.project)
        yield put(remoteActionCreators.loadRemoteDb(action.authRemote))
    } catch (e: any) {
        yield put(remoteActionCreators.loadRemoteProjectFailed(e.message))
    }
};

const loadRemotePage = function* (action: any): any {
    try {
        yield call(ApiRemote.loadRemotePages, action.authRemote, action.page)
        yield put(remoteActionCreators.loadRemoteDb(action.authRemote))
    } catch (e: any) {
        yield put(remoteActionCreators.loadRemotePageFailed(e.message))
    }
};

const loadRemotePageAll = function* (action: any): any {
    try {
        yield call(ApiRemote.loadRemotePagesAll, action.authRemote, action.pages)
        yield put(remoteActionCreators.loadRemoteDb(action.authRemote))
    } catch (e: any) {
        yield put(remoteActionCreators.loadRemotePageAllFailed(e.message))
    }
};


function* mySaga() {
    /** ----- App ----- */
    yield takeLatest(AppActionsEnum.APP_INITIALIZE, initApp)

    yield takeLatest(AppActionsEnum.AUTH_LOGIN, login)
    yield takeLatest(AppActionsEnum.AUTH_LOGOUT, logout)

    yield takeLatest(AppActionsEnum.APP_UPDATE_SETTINGS, updateSettings)
    yield takeLatest(AppActionsEnum.APP_UPDATE_USER, updateUser)
    /** ----- App ----- */

    /** ----- Project ----- */
    yield takeLatest(ProjectActionsEnum.LOAD_PROJECT, loadProject)
    yield takeLatest(ProjectActionsEnum.SAVE_PAGE, savePageSaga)
    yield takeLatest(ProjectActionsEnum.CREATE_PAGE, createPageSaga)
    yield takeLatest(ProjectActionsEnum.CREATE_PROJECT, createProjectSaga)
    yield takeLatest(ProjectActionsEnum.DELETE_PROJECT, deleteProjectSaga)
    yield takeLatest(ProjectActionsEnum.SAVE_PROJECT, saveProjectSaga)
    yield takeLatest(ProjectActionsEnum.SAVE_PROJECT_FORM_DATA, saveProjectFormDataSaga)
    /** ----- Project ----- */

    /** ----- DataSource ----- */
    yield takeEvery(DsActionsEnum.LOAD_DATA_SOURCE, loadDs)
    yield takeEvery(DsActionsEnum.CREATE_RECORD, createRecord)
    yield takeEvery(DsActionsEnum.EDIT_RECORD, editRecord)
    yield takeEvery(DsActionsEnum.DELETE_RECORD, deleteRecord)
    yield takeEvery(DsActionsEnum.EXECUTE_DB_PROCEDURE, executeDbProcedure)
    /** ----- DataSource ----- */

    /** ----- Remote ------*/
    yield takeLatest(RemoteActionsEnum.AUTH_LOGIN_REMOTE, loginRemote)
    yield takeLatest(RemoteActionsEnum.LOAD_REMOTE_DB, loadRemoteDb)
    yield takeLatest(RemoteActionsEnum.LOAD_REMOTE_ADD_DB, loadRemoteAddDb)
    yield takeLatest(RemoteActionsEnum.LOAD_REMOTE_ADD_DS, loadRemoteAddDs)
    yield takeLatest(RemoteActionsEnum.LOAD_REMOTE_ADD_DS_FIELDS, loadRemoteAddDsFields)
    yield takeLatest(RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ACCESS, loadRemoteAddDsAccess)
    yield takeLatest(RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ALL, loadRemoteAddDsAll)
    yield takeLatest(RemoteActionsEnum.LOAD_REMOTE_PROJECT, loadRemoteProject)
    yield takeLatest(RemoteActionsEnum.LOAD_REMOTE_PAGE, loadRemotePage)
    yield takeLatest(RemoteActionsEnum.LOAD_REMOTE_PAGE_ALL, loadRemotePageAll)
    /** ----- Remote ------*/
}

export default mySaga