import {initialStateFileSystem} from "./fileSystem.initial";
import {FncActionCreatorsType} from "./fileSystem.action.types";
import {AppActionsEnum} from "../app/app.action.types";

const fileSystemReducer = (state = initialStateFileSystem, action: FncActionCreatorsType):any => {
    switch (action.type) {
        case AppActionsEnum.APP_INITIALIZED_SUCCESS:
            return {
                ...state,
                // users: action.settings.data.fileSystem.users,
                // project: action.settings.data.fileSystem.project,
            }
        default:
            return state
    }
}

export default fileSystemReducer