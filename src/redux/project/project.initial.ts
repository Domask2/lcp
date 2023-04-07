import {IFnc} from "../fnc/fnc.initial";
import {CSSProperties} from "react";

export interface IColumn {
    modal: "this" | "mutate"
    mutate: string
    link: string
    type: "boolean"
}

export interface IProject {
    roleUser: any;
    addictions: Array<IAddictions | any>;
    startpage: string;
    id: number
    user_id: number
    title: string
    key: string
    description: string
    is_published: boolean
    is_open: boolean
    navigation: any
    project_roles?: Array<string>
    children?: [IProject]
    banner: string
    logo: string
    loading: boolean
    errors: boolean
    message: any
    pages?: any
}

export interface IProjectAll {
    [key: string]: IProject
}
export interface IPageDataSource {
    key: string
    filter: string | null
    cache?: boolean
}
export interface IPageDataSources {
    [key: string]: IPageDataSource
}
export interface IComponentDs {
    key: string
    dependency?: undefined | string
}
export interface ILocalStorage {
    key: string,
    value: "__params" | string | number,
    column: string,
    ds_key: string
}
export interface IAddictions {
    choice: 'prop' | 'key' | 'item' | 'row' | 'dsLoaded' | 'notDs' | ''
    ds: string
    dsKey: string
    id: number | ''
    title: string
    type: 'availability' | 'failure' | '>' | '<' | '>=' | '<=' | '=' | '!=' | 'dsLoaded' | 'notDs' | ''
    value: string
    page?: string[]
}
export interface IAction {
    actionName: string
    actionParams?: string[]
    params?: IParams[] | []
    reloadDS?: string[]
    source: string
    type: 'proc' | 'func' | 'to' | 'url' | ''
    format?: 'txt' | 'doc' | 'pdf'
    sep?: string
    reduxElement?: any
    db_key?: string
}
export interface IParams {
    [key: string]: string
}
export interface IPage {
    components: any
    datasources: IPageDataSources
    fnc?: Array<IFnc>
    ls: Array<ILocalStorage>
    description: string
    id: number
    key: string
    title: string
    addictions?: Array<IAddictions> | undefined
    fly_inputs_groups?: string[] | undefined
}
export interface IPages {
    [key: string]: IPage
}
export interface IProjectInitialized {
    all: IProjectAll
    current?: IProject
    current_page?: IPage
    pages: IPages
    current_cmp?: any
    cut_out?: boolean
    allDs: any
    upload: boolean
}
export const initialStateProject: IProjectInitialized = {
    all: {},
    pages: {},
    allDs: [],
    upload: false
}

export interface INavigation {
    key: string
    title: string
    visible: boolean
    active_page: boolean
    children?: [] | [INavigation] | undefined
    project_roles: [string]
    params?: string
}

export interface IArrayAddictionResult {
    result: boolean;
    addict: IAddictions
}

export interface IResult {
    finalResult: boolean;
    arrayAddictionResult: IArrayAddictionResult[]
}

export interface IAddictionStyleArray {
    id: number;
    style: CSSProperties
}