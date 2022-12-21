import {IPage, IProjectAll, IProject, IPages} from "./project.initial";
import { RootState } from "../redux.store";

export const getProjectsAll = (state: RootState): IProjectAll => {
    return state.project.all
}
export const getPages = (state: RootState): IPages => {
    return state.project.pages
}
export const getPage = (state: RootState, path: string): IPage => {
    return state.project.pages[path]
}
export const getMessage = (state: RootState, key: string): any => {
    return state.project.all[key]?.message
}
export const getUpload = (state: RootState): boolean => {
    return state.project.upload
}
export const getPagesKeys = (state: RootState, project: IProject): Array<string> => {
    return Object.keys(state.project.pages).filter((key: string) => key.split('/')[1] === project.key)
}
export const getProjectByPageKey = (state: RootState, path: string): IProject => {
    const arr = path.split('/')
    return state.project.all[arr[1]]
}
export const getCurrentProject = (state: RootState): IProject | undefined => {
    return state.project.current
}
export const getCurrentPage = (state: RootState): IPage | undefined => {
    return state.project.current_page
}
export const getCurrentCmp = (state: RootState): any | undefined => {
    return state.project.current_cmp
}
export const getCutCmp = (state: RootState): any | undefined => {
    return state.project.cut_out
}
export const getAllDs = (state: RootState): any | undefined => {
    return state.project.allDs
}
export const getAllDsProject = (state: RootState): any | undefined => {
    return state.ds.ds
}
