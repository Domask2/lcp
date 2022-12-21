import {IDataSource} from "../ds/ds.initial";

export interface IAuth {
    id: string | null
    name: string | null
    email: string | null
    role: string | null
    authenticated: boolean
    projects_roles: any
    theme: string | null
}
export interface IAppSetting {
    head_styles?: React.CSSProperties,
    logo?: string,
    project_key?: string,
    title?: string
    sys_vars?: any
    loading?: boolean
    error? : boolean
    message?: any
}
export interface IAppInitialized {
    auth: IAuth
    edit_mode: boolean
    components: any[]
    initialized: boolean
    initializeError: string
    setting: IAppSetting
    db: any
}
export interface IDB {
    [key: string]: string | Array<IDataSource>
    title: string
    key: string
    dataSources: Array<IDataSource>
}

let pr = localStorage.getItem('projects-roles')

let newPr = [];
if (pr?.length) {
    newPr = JSON.parse(pr);
}

export const initialStateApp: IAppInitialized = {
    initialized: false,
    initializeError: '',
    components: [],
    auth: {
        id: localStorage.getItem('user-id') !== undefined ? localStorage.getItem('user-id') : null,
        name: localStorage.getItem('user-name') !== undefined ? localStorage.getItem('user-name') : null,
        email: localStorage.getItem('user-email') !== undefined ? localStorage.getItem('user-email') : null,
        theme: localStorage.getItem('user-theme') !== undefined ? localStorage.getItem('user-theme') : 'default',
        role: localStorage.getItem('user-role') !== undefined ? localStorage.getItem('user-role') : null,
        authenticated: localStorage.getItem('user-token') !== null,
        projects_roles: newPr,
    },
    edit_mode: false,
    setting: {loading: false, error: false},
    db: {}
}