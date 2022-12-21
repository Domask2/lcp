import {IDownLoad} from "../Page/templates";

export interface IDownLoads {
    id: number,
    key: string,
    user_id: string,
    file: string,
    title: string | null,
    description: string | null,
    url: string,
    project: string,
    project_page: string | null,
    visible: boolean
}

export interface IFormValues {
    description: string,
    title: string,
    visible: string
}

export interface AntDownloadType {
    cmp: IDownLoad
}

export type AntDownLoadEditType = {
    cmp: IDownLoad,
    setVisible?: (v: boolean) => void
}

export interface defaultModeI {
    title: string,
    description: string
}

export interface modeDownloadI {
    download: boolean,
    title: boolean,
    description: boolean,
    visible: boolean,
    singleFile: boolean,
    slug: boolean
}

export interface CardModeType {
    defaultMode: defaultModeI,
    setDefaultMode: (prev: any) => void,
    modeDownload: modeDownloadI,
    setModeDownload: (prev: any) => void
    folder: string
    setFolder: (prev: any) => void
}

export interface albumType {
    album_title: string,
    category_id: number
    category_title: string
    id: number
    key: string
    object_name: string
    object_type_id: number
}

export interface dateBaseType {
    dbRemote: string,
    reloadDS: string
}

export interface dsKeyType {
    dsKeyObjectType: string,
    dsKeyCategories: string,
    dsKeyAlbums: string
}

export interface sortFilesType {
    album?: number | null,
    objectType?: string,
    category?: number | null
}

export interface CardRemoteSettingsType {
    dateBase: dateBaseType
    setDateBase: (a: dateBaseType) => void
    dsKey: dsKeyType
    setDsKey: (a: dsKeyType) => void
    sortFiles: sortFilesType
    setSortFiles: (a: sortFilesType) => void
}

export interface categoriesTypes {
    id: number
    key: string
    title: string
}

export interface ObjetType {
    id: number
    key: string
    object_name: string
}

export const popover = {
    dbRemote: 'Название удаленной база данных, куда будет записана ссылка на файл.',
    reloadDs: 'DS - которую необходимо перезагрузить после успешной загрузки файла.',
    dsObjectType: 'DS для выпадающего списка Object Type',
    dsCategories: 'DS для выпадающего списка Category',
    dsAlbums: 'DS для выпадающего списка Album',
}