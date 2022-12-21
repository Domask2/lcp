
export interface IAuthRemote {
    id: string
    name: string
    email: string
    role: string
    url: string
    token: string
}
export interface IRemoteInitialized {
    authRemote?: IAuthRemote
    db: any
    projectAll: any
    loadDB: boolean
    loadProjectAll: boolean
}

export const initialStateRemote: IRemoteInitialized = {
    db: [],
    projectAll: [],
    loadDB: false,
    loadProjectAll: false
}