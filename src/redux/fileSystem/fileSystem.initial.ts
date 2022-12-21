export interface IFileSystemReducer {

}

export interface IFileSystemInitialized {
    users: any
    project: any
}

export const initialStateFileSystem: IFileSystemInitialized = {
    users: [],
    project: []
}