import {IAuthRemote} from "./remote.initial";

export enum RemoteActionsEnum {
    AUTH_LOGIN_REMOTE = "AUTH_LOGIN_REMOTE",
    AUTH_LOGIN_REMOTE_SUCCESS = "AUTH_LOGIN_REMOTE_SUCCESS",
    AUTH_LOGIN_REMOTE_FAILED = "AUTH_LOGIN_REMOTE_FAILED",

    LOAD_REMOTE_DB = "LOAD_REMOTE_DB",
    LOAD_REMOTE_DB_SUCCESS = "LOAD_REMOTE_DB_SUCCESS",
    LOAD_REMOTE_DB_FAILED = "LOAD_REMOTE_DB_FAILED",

    LOAD_REMOTE_ADD_DB = "LOAD_REMOTE_ADD_DB",
    LOAD_REMOTE_ADD_DB_SUCCESS = "LOAD_REMOTE_DB_ADD_SUCCESS",
    LOAD_REMOTE_ADD_DB_FAILED = "LOAD_REMOTE_DB_ADD_FAILED",

    LOAD_REMOTE_ADD_DS = "LOAD_REMOTE_ADD_DS",
    LOAD_REMOTE_ADD_DS_SUCCESS = "LOAD_REMOTE_ADD_DS_SUCCESS",
    LOAD_REMOTE_ADD_DS_FAILED = "LOAD_REMOTE_ADD_DS_FAILED",

    LOAD_REMOTE_ADD_DS_FIELDS = "LOAD_REMOTE_ADD_DS_FIELDS",
    LOAD_REMOTE_ADD_DS_FIELDS_SUCCESS = "LOAD_REMOTE_ADD_DS_FIELDS_SUCCESS",
    LOAD_REMOTE_ADD_DS_FIELDS_FAILED = "LOAD_REMOTE_ADD_DS_FIELDS_FAILED",

    LOAD_REMOTE_ADD_DS_ACCESS = "LOAD_REMOTE_ADD_DS_ACCESS",
    LOAD_REMOTE_ADD_DS_ACCESS_SUCCESS = "LOAD_REMOTE_ADD_DS_ACCESS_SUCCESS",
    LOAD_REMOTE_ADD_DS_ACCESS_FAILED = "LOAD_REMOTE_ADD_DS_ACCESS_FAILED",

    LOAD_REMOTE_ADD_DS_ALL = "LOAD_REMOTE_ADD_DS_ALL",
    LOAD_REMOTE_ADD_DS_ALL_SUCCESS = "LOAD_REMOTE_ADD_DS_ALL_SUCCESS",
    LOAD_REMOTE_ADD_DS_ALL_FAILED = "LOAD_REMOTE_ADD_DS_ALL_FAILED",

    LOAD_REMOTE_PROJECT = "LOAD_REMOTE_PROJECT",
    LOAD_REMOTE_PROJECT_SUCCESS = "LOAD_REMOTE_PROJECT_SUCCESS",
    LOAD_REMOTE_PROJECT_FAILED = "LOAD_REMOTE_PROJECT_FAILED",

    LOAD_REMOTE_PAGE = "LOAD_REMOTE_PAGE",
    LOAD_REMOTE_PAGE_SUCCESS = "LOAD_REMOTE_PAGE_SUCCESS",
    LOAD_REMOTE_PAGE_FAILED = "LOAD_REMOTE_PAGE_FAILED",

    LOAD_REMOTE_PAGE_ALL = "LOAD_REMOTE_PAGE_ALL",
    LOAD_REMOTE_PAGE_ALL_SUCCESS = "LOAD_REMOTE_PAGE_ALL_SUCCESS",
    LOAD_REMOTE_PAGE_ALL_FAILED = "LOAD_REMOTE_PAGE_ALL_FAILED",
}

export type RemoteLoginActionType = { type: typeof RemoteActionsEnum.AUTH_LOGIN_REMOTE, values: any }
export type RemoteLoginSuccessActionType = { type: typeof RemoteActionsEnum.AUTH_LOGIN_REMOTE_SUCCESS, data: any, url: string }
export type RemoteLoginFailedActionType = { type: typeof RemoteActionsEnum.AUTH_LOGIN_REMOTE_FAILED, message: string }

export type LoadRemoteDbType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_DB, authRemote: IAuthRemote }
export type LoadRemoteDbSuccessType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_DB_SUCCESS, data: any }
export type LoadRemoteDbFailedType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_DB_FAILED, message: string }

export type LoadRemoteAddDbType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_ADD_DB, authRemote: IAuthRemote, db:any }
export type LoadRemoteAddDbSuccessType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_ADD_DB_SUCCESS, data: any }
export type LoadRemoteAddDbFailedType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_ADD_DB_FAILED, message: string }

export type LoadRemoteAddDsType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_ADD_DS, authRemote: IAuthRemote, ds:any }
export type LoadRemoteAddDsSuccessType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_ADD_DS_SUCCESS, data: any }
export type LoadRemoteAddDsFailedType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_ADD_DS_FAILED, message: string }

export type LoadRemoteAddDsFieldsType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_ADD_DS_FIELDS, authRemote: IAuthRemote, dsFields:any }
export type LoadRemoteAddDsFieldsSuccessType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_ADD_DS_FIELDS_SUCCESS, data: any }
export type LoadRemoteAddDsFieldsFailedType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_ADD_DS_FIELDS_FAILED, message: string }

export type LoadRemoteAddDsAccessType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ACCESS, authRemote: IAuthRemote, dsAccess:any }
export type LoadRemoteAddDsAccessSuccessType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ACCESS_SUCCESS, data: any }
export type LoadRemoteAddDsAccessFailedType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ACCESS_FAILED, message: string }

export type LoadRemoteAddDsAllType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ALL, authRemote: IAuthRemote, dsAll:any }
export type LoadRemoteAddDsAllSuccessType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ALL_SUCCESS, data: any }
export type LoadRemoteAddDsAllFailedType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ALL_FAILED, message: string }

export type LoadRemoteProjectType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_PROJECT, authRemote: IAuthRemote, project:any }
export type LoadRemoteProjectSuccessType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_PROJECT_SUCCESS, data: any }
export type LoadRemoteProjectFailedType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_PROJECT_FAILED, message: string }

export type LoadRemotePageType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_PAGE, authRemote: IAuthRemote, page:any }
export type LoadRemotePageSuccessType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_PAGE_SUCCESS, data: any }
export type LoadRemotePageFailedType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_PAGE_FAILED, message: string }

export type LoadRemotePageAllType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_PAGE_ALL, authRemote: IAuthRemote, pages:any }
export type LoadRemotePageAllSuccessType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_PAGE_ALL_SUCCESS, data: any }
export type LoadRemotePageAllFailedType = { type: typeof RemoteActionsEnum.LOAD_REMOTE_PAGE_ALL_FAILED, message: string }


export type RemoteActionCreatorsType = RemoteLoginActionType | RemoteLoginSuccessActionType |
    RemoteLoginFailedActionType | LoadRemoteDbType | LoadRemoteDbSuccessType | LoadRemoteDbFailedType |
    LoadRemoteAddDbType | LoadRemoteAddDbSuccessType | LoadRemoteAddDbFailedType |
    LoadRemoteAddDsType | LoadRemoteAddDsSuccessType | LoadRemoteAddDsFailedType |
    LoadRemoteAddDsFieldsType | LoadRemoteAddDsFieldsSuccessType | LoadRemoteAddDsFieldsFailedType |
    LoadRemoteAddDsAccessType | LoadRemoteAddDsAccessSuccessType | LoadRemoteAddDsAccessFailedType |
    LoadRemoteAddDsAllType | LoadRemoteAddDsAllSuccessType | LoadRemoteAddDsAllFailedType |
    LoadRemoteProjectType | LoadRemoteProjectSuccessType | LoadRemoteProjectFailedType |
    LoadRemotePageType | LoadRemotePageSuccessType | LoadRemotePageFailedType |
    LoadRemotePageAllType | LoadRemotePageAllSuccessType | LoadRemotePageAllFailedType