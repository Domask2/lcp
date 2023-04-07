import {IAuth} from "./app.initial";
import {RootState} from "../redux.store";

export const getInitialized = (state: RootState): boolean => state.app.initialized
export const getAuth = (state: RootState): IAuth => state.app.auth
export const getEditMode = (state: RootState): boolean => state.app.edit_mode
export const getAppDb = (state: RootState): any => state.app.db
export const getSettings = (state: RootState): any => state.app.setting
export const getSysVarsSettings = (state: RootState): any => state.app.setting.sys_vars
export const getLogoSetting = (state: RootState): any => state.app.setting.logo
export const getTitleSetting = (state: RootState): any => state.app.setting.title
export const getLoadingSetting = (state: RootState): any => state.app.setting.loading
export const getErrorSetting = (state: RootState): any => state.app.setting.error
