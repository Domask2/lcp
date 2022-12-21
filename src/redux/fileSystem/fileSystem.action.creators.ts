import {FileSystemActionsEnum, FileSystemFailedType, FileSystemSuccessType} from "./fileSystem.action.types";

const fileSystemActionCreators = {
    fileSystemSuccess: (fileSystem:any): FileSystemSuccessType => ({type: FileSystemActionsEnum.FILE_SYSTEM_SUCCESS, fileSystem}),
    fileSystemFailed: (fileSystem:any): FileSystemFailedType => ({type: FileSystemActionsEnum.FILE_SYSTEM_FAILED, fileSystem}),
}

export default fileSystemActionCreators