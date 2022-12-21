import {IAppSetting} from "./app.initial";

export enum AppActionsEnum {
    AUTH_LOGOUT = "AUTH_LOGOUT",
    AUTH_LOGOUT_SUCCESS = "AUTH_LOGOUT_SUCCESS",
    AUTH_LOGIN = "AUTH_LOGIN",
    AUTH_LOGIN_REMOTE = "AUTH_LOGIN_REMOTE",
    AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS",
    AUTH_LOGIN_REMOTE_SUCCESS = "AUTH_LOGIN_REMOTE_SUCCESS",
    AUTH_LOGIN_FAILED = "AUTH_LOGIN_FAILED",
    AUTH_LOGIN_REMOTE_FAILED = "AUTH_LOGIN_REMOTE_FAILED",
    APP_INITIALIZED_SUCCESS = "APP_INITIALIZED_SUCCESS",
    APP_INITIALIZED_FAILED = "APP_INITIALIZED_FAILED",
    APP_INITIALIZE = "APP_INITIALIZE",
    APP_CHANGE_EDIT_MODE = "APP_CHANGE_EDIT_MODE",
    APP_UPDATE_SETTINGS = "APP_UPDATE_SETTINGS",
    APP_UPDATE_SETTINGS_SUCCESS = "APP_UPDATE_SETTINGS_SUCCESS",
    APP_UPDATE_USER = "APP_UPDATE_USER",
    APP_UPDATE_USER_SUCCESS = "APP_UPDATE_USER_SUCCESS",
    APP_UPDATE_SETTINGS_FAILED = "APP_UPDATE_SETTINGS_FAILED"
}

export type AppLogoutSuccessActionType = { type: typeof AppActionsEnum.AUTH_LOGOUT_SUCCESS }
export type AppLogoutActionType = { type: typeof AppActionsEnum.AUTH_LOGOUT }
export type AppLoginActionType = { type: typeof AppActionsEnum.AUTH_LOGIN, values: any }
export type AppLoginRemoteActionType = { type: typeof AppActionsEnum.AUTH_LOGIN_REMOTE, values: any, url: string }
export type AppLoginSuccessActionType = { type: typeof AppActionsEnum.AUTH_LOGIN_SUCCESS, data: any }
export type AppLoginRemoteSuccessActionType = { type: typeof AppActionsEnum.AUTH_LOGIN_REMOTE_SUCCESS, data: any, url: string }
export type AppLoginFailedActionType = { type: typeof AppActionsEnum.AUTH_LOGIN_FAILED, message: string }
export type AppLoginRemoteFailedActionType = { type: typeof AppActionsEnum.AUTH_LOGIN_REMOTE_FAILED, message: string }

export type AppInitializedSuccessActionType = { type: typeof AppActionsEnum.APP_INITIALIZED_SUCCESS, settings: any }
export type AppInitializedFailedActionType = { type: typeof AppActionsEnum.APP_INITIALIZED_FAILED, message: string }
export type AppInitializedActionType = { type: typeof AppActionsEnum.APP_INITIALIZE }
export type AppChangeEditModeActionType = { type: typeof AppActionsEnum.APP_CHANGE_EDIT_MODE, value: boolean }

export type AppUpdateSettingsActionType = { type: typeof AppActionsEnum.APP_UPDATE_SETTINGS, data: FormData }
export type AppUpdateSettingsSuccessActionType = { type: typeof AppActionsEnum.APP_UPDATE_SETTINGS_SUCCESS, data: IAppSetting }
export type AppUpdateUserFailedActionType = { type: typeof AppActionsEnum.APP_UPDATE_SETTINGS_FAILED, error: any }
export type AppUpdateUserActionType = { type: typeof AppActionsEnum.APP_UPDATE_USER, data: any, id: any }
export type AppUpdateUserSuccessActionType = { type: typeof AppActionsEnum.APP_UPDATE_USER_SUCCESS, user: any }

export type AppActionCreatorsType =
    AppLogoutSuccessActionType
    | AppLogoutActionType
    | AppLoginActionType
    |
    AppLoginRemoteActionType
    | AppLoginSuccessActionType
    | AppLoginRemoteSuccessActionType
    | AppLoginFailedActionType
    |
    AppInitializedSuccessActionType
    | AppInitializedFailedActionType
    | AppInitializedActionType
    |
    AppChangeEditModeActionType
    | AppUpdateSettingsActionType
    | AppUpdateUserActionType
    | AppUpdateUserSuccessActionType
    | AppUpdateSettingsSuccessActionType
    | AppUpdateUserFailedActionType