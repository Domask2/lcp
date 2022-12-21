import {AppInitializedSuccessActionType} from "../app/app.action.types";

export enum FileSystemActionsEnum {
    FILE_SYSTEM = "FILE_SYSTEM",
    FILE_SYSTEM_SUCCESS = "FILE_SYSTEM_SUCCESS",
    FILE_SYSTEM_FAILED = "FILE_SYSTEM_FAILED",
}

export type FileSystemType = { type: typeof FileSystemActionsEnum.FILE_SYSTEM }
export type FileSystemSuccessType = { type: typeof FileSystemActionsEnum.FILE_SYSTEM_SUCCESS, fileSystem: any }
export type FileSystemFailedType = { type: typeof FileSystemActionsEnum.FILE_SYSTEM_FAILED, fileSystem: any }


export type FncActionCreatorsType = FileSystemType | FileSystemSuccessType | FileSystemFailedType | AppInitializedSuccessActionType
