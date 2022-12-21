import {RemoteActionCreatorsType, RemoteActionsEnum} from "./remote.action.types";
import {initialStateRemote, IRemoteInitialized} from "./remote.initial";

const remoteReducer = (state = initialStateRemote, action: RemoteActionCreatorsType): IRemoteInitialized => {
    switch (action.type) {
        case RemoteActionsEnum.AUTH_LOGIN_REMOTE_SUCCESS:
            return {
                ...state,
                authRemote: {
                    ...state.authRemote,
                    id: action.data.id,
                    name: action.data.name,
                    email: action.data.email,
                    role: action.data.role,
                    url: action.url,
                    token: action.data.token,
                }
            }

        case RemoteActionsEnum.LOAD_REMOTE_DB:
        case RemoteActionsEnum.LOAD_REMOTE_ADD_DB:
        case RemoteActionsEnum.LOAD_REMOTE_ADD_DS:
        case RemoteActionsEnum.LOAD_REMOTE_ADD_DS_FIELDS:
        case RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ALL:
        case RemoteActionsEnum.LOAD_REMOTE_PROJECT:
        case RemoteActionsEnum.LOAD_REMOTE_PAGE:
        case RemoteActionsEnum.LOAD_REMOTE_PAGE_ALL:
        case RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ACCESS:
            return {
                ...state,
                loadDB: true,
                loadProjectAll: true
            }

        case RemoteActionsEnum.LOAD_REMOTE_DB_SUCCESS:
            return {
                ...state,
                db: action.data.db,
                projectAll: action.data.projectAll,
                loadDB: false,
                loadProjectAll: false
            }

        case RemoteActionsEnum.LOAD_REMOTE_DB_FAILED:
        case RemoteActionsEnum.LOAD_REMOTE_ADD_DB_FAILED:
        case RemoteActionsEnum.LOAD_REMOTE_ADD_DS_FAILED:
        case RemoteActionsEnum.LOAD_REMOTE_ADD_DS_FIELDS_FAILED:
        case RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ALL_FAILED:
        case RemoteActionsEnum.LOAD_REMOTE_PROJECT_FAILED:
        case RemoteActionsEnum.LOAD_REMOTE_PAGE_FAILED:
        case RemoteActionsEnum.LOAD_REMOTE_PAGE_ALL_FAILED:
        case RemoteActionsEnum.LOAD_REMOTE_ADD_DS_ACCESS_FAILED:
            console.error(action.message)
            return {...state, loadDB: false, loadProjectAll: false}

        default:
            return state
    }
}

export default remoteReducer