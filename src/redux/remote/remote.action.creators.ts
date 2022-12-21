import {
    LoadRemoteAddDbFailedType,
    LoadRemoteAddDbSuccessType,
    LoadRemoteAddDbType, LoadRemoteAddDsAccessFailedType, LoadRemoteAddDsAccessSuccessType, LoadRemoteAddDsAccessType,
    LoadRemoteAddDsAllFailedType,
    LoadRemoteAddDsAllSuccessType,
    LoadRemoteAddDsAllType,
    LoadRemoteAddDsFailedType,
    LoadRemoteAddDsFieldsFailedType,
    LoadRemoteAddDsFieldsSuccessType,
    LoadRemoteAddDsFieldsType,
    LoadRemoteAddDsSuccessType,
    LoadRemoteAddDsType,
    LoadRemoteDbFailedType,
    LoadRemoteDbSuccessType,
    LoadRemoteDbType, LoadRemotePageAllFailedType,
    LoadRemotePageAllSuccessType,
    LoadRemotePageAllType,
    LoadRemotePageFailedType,
    LoadRemotePageSuccessType,
    LoadRemotePageType,
    LoadRemoteProjectFailedType,
    LoadRemoteProjectSuccessType,
    LoadRemoteProjectType,
    RemoteActionsEnum,
    RemoteLoginActionType,
    RemoteLoginFailedActionType,
    RemoteLoginSuccessActionType,
} from "./remote.action.types";
import {IAuthRemote} from "./remote.initial";


const remoteActionCreators = {
    loginRemote: (values: any): RemoteLoginActionType => ({type: RemoteActionsEnum.AUTH_LOGIN_REMOTE, values}),
    loginRemoteSuccess: (data: any, url: string): RemoteLoginSuccessActionType => ({
        type: RemoteActionsEnum.AUTH_LOGIN_REMOTE_SUCCESS,
        data,
        url
    }),
    loginRemoteFailed: (message: string): RemoteLoginFailedActionType => ({
        type: RemoteActionsEnum.AUTH_LOGIN_REMOTE_FAILED,
        message
    }),

    loadRemoteDb: (authRemote: IAuthRemote): LoadRemoteDbType => ({type: RemoteActionsEnum.LOAD_REMOTE_DB, authRemote}),
    loadRemoteDbSuccess: (data: any): LoadRemoteDbSuccessType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_DB_SUCCESS,
        data
    }),
    loadRemoteDbFailed: (message: string): LoadRemoteDbFailedType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_DB_FAILED,
        message
    }),

    loadRemoteAddDb: (authRemote: IAuthRemote, db: any): LoadRemoteAddDbType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_ADD_DB,
        authRemote,
        db
    }),
    loadRemoteAddDbSuccess: (data: any): LoadRemoteAddDbSuccessType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_ADD_DB_SUCCESS,
        data
    }),
    loadRemoteAddDbFailed: (message: string): LoadRemoteAddDbFailedType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_ADD_DB_FAILED,
        message
    }),

    loadRemoteAddDs: (authRemote: IAuthRemote, ds: any): LoadRemoteAddDsType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_ADD_DS,
        authRemote,
        ds
    }),
    loadRemoteAddDsSuccess: (data: any): LoadRemoteAddDsSuccessType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_ADD_DS_SUCCESS,
        data
    }),
    loadRemoteAddDsFailed: (message: string): LoadRemoteAddDsFailedType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_ADD_DS_FAILED,
        message
    }),

    loadRemoteAddDsFields: (authRemote: IAuthRemote, dsFields: any): LoadRemoteAddDsFieldsType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_ADD_DS_FIELDS,
        authRemote,
        dsFields
    }),
    loadRemoteAddDsFieldsSuccess: (data: any): LoadRemoteAddDsFieldsSuccessType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_ADD_DS_FIELDS_SUCCESS,
        data
    }),
    loadRemoteAddDsFieldsFailed: (message: string): LoadRemoteAddDsFieldsFailedType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_ADD_DS_FIELDS_FAILED,
        message
    }),

    loadRemoteAddDsAccess: (authRemote: IAuthRemote, dsAccess: any): LoadRemoteAddDsAccessType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ACCESS,
        authRemote,
        dsAccess
    }),
    loadRemoteAddDsAccessSuccess: (data: any): LoadRemoteAddDsAccessSuccessType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ACCESS_SUCCESS,
        data
    }),
    loadRemoteAddDsAccessFailed: (message: string): LoadRemoteAddDsAccessFailedType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ACCESS_FAILED,
        message
    }),

    loadRemoteAddDsAll: (authRemote: IAuthRemote, dsAll: any): LoadRemoteAddDsAllType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ALL,
        authRemote,
        dsAll
    }),
    loadRemoteAddDsAllSuccess: (data: any): LoadRemoteAddDsAllSuccessType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ALL_SUCCESS,
        data
    }),
    loadRemoteAddDsAllFailed: (message: string): LoadRemoteAddDsAllFailedType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ALL_FAILED,
        message
    }),

    loadRemoteProject: (authRemote: IAuthRemote, project: any): LoadRemoteProjectType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_PROJECT,
        authRemote,
        project
    }),
    loadRemoteProjectSuccess: (data: any): LoadRemoteProjectSuccessType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_PROJECT_SUCCESS,
        data
    }),
    loadRemoteProjectFailed: (message: string): LoadRemoteProjectFailedType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_PROJECT_FAILED,
        message
    }),

    loadRemotePage: (authRemote: IAuthRemote, page: any): LoadRemotePageType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_PAGE,
        authRemote,
        page
    }),
    loadRemotePageSuccess: (data: any): LoadRemotePageSuccessType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_PAGE_SUCCESS,
        data
    }),
    loadRemotePageFailed: (message: string): LoadRemotePageFailedType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_PAGE_FAILED,
        message
    }),

    loadRemotePageAll: (authRemote: IAuthRemote, pages: any): LoadRemotePageAllType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_PAGE_ALL,
        authRemote,
        pages
    }),
    loadRemotePageAllSuccess: (data: any): LoadRemotePageAllSuccessType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_PAGE_ALL_SUCCESS,
        data
    }),
    loadRemotePageAllFailed: (message: string): LoadRemotePageAllFailedType => ({
        type: RemoteActionsEnum.LOAD_REMOTE_PAGE_ALL_FAILED,
        message
    }),
}

export default remoteActionCreators