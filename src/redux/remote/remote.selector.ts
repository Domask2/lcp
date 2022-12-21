import {RootState} from "../redux.store";
import {IAuthRemote} from "./remote.initial";

export const getAuthRemote = (state: RootState): IAuthRemote | undefined => state.remote.authRemote
export const getRemoteDb = (state: RootState): any | undefined => state.remote.db
export const getRemoteProjectAll = (state: RootState): any | undefined => state.remote.projectAll
export const getRemoteLoadDB = (state: RootState): any | undefined => state.remote.loadDB
export const getRemoteLoadProjectAll = (state: RootState): any | undefined => state.remote.loadProjectAll
