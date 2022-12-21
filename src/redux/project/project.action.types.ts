import {IPage, IPages, IProject} from "./project.initial";
import {AppInitializedSuccessActionType} from "../app/app.action.types";
import {ComponentInterface} from "../../components/AntComponents/Page/templates";


export enum ProjectActionsEnum {
    UPDATE_PAGE = 'UPDATE_PAGE',
    UPDATE_PROJECT_NAVIGATION = 'UPDATE_PROJECT_NAVIGATION',
    SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT',
    SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
    SAVE_PAGE = 'SAVE_PAGE',
    SAVE_PAGE_SUCCESS = 'SAVE_PAGE_SUCCESS',
    SAVE_PAGE_FAILED = 'SAVE_PAGE_FAILED',
    CREATE_PAGE = 'CREATE_PAGE',
    CREATE_PAGE_SUCCESS = 'CREATE_PAGE_SUCCESS',
    CREATE_PAGE_FAILED = 'CREATE_PAGE_FAILED',
    CREATE_PROJECT = 'CREATE_PROJECT',
    CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS',
    CREATE_PROJECT_FAILED = 'CREATE_PROJECT_FAILED',
    DELETE_PROJECT = 'DELETE_PROJECT',
    DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS',
    DELETE_PROJECT_FAILED = 'DELETE_PROJECT_FAILED',
    SAVE_PROJECT = 'SAVE_PROJECT',
    SAVE_PROJECT_SUCCESS = 'SAVE_PROJECT_SUCCESS',
    SAVE_PROJECT_FAILED = 'SAVE_PROJECT_FAILED',
    SAVE_PROJECT_FORM_DATA = 'SAVE_PROJECT_FORM_DATA',
    LOAD_PROJECT = 'LOAD_PROJECT',
    LOAD_PROJECT_SUCCESS = 'LOAD_PROJECT_SUCCESS',
    LOAD_PROJECT_FAILED = 'LOAD_PROJECT_FAILED',
    SET_CURRENT_CMP = 'SET_CURRENT_CMP',
    SET_CUT_CMP = 'SET_CUT_CMP',
    CMP_MOVE = 'CMP_MOVE',
    CMP_DELETE = 'CMP_DELETE',
    CMP_ADD = 'CMP_ADD',
    CMP_ADD_ROW = 'CMP_ADD_ROW',
    CMP_UPDATE = 'CMP_UPDATE',
    CMP_COPY = 'CMP_COPY',
    CMP_CUT = 'CMP_CUT',
    CMP_PASTE = 'CMP_PASTE',
    SET_ALL_DS = 'SET_ALL_DS',
    UPDATE_ALL_DS = 'UPDATE_ALL_DS',
    UPLOAD_DONE = 'UPLOAD_DONE'
}


export type UpdatePageType = {type: typeof ProjectActionsEnum.UPDATE_PAGE, page: IPage}
export type SetCurrentProjectType = {type: typeof ProjectActionsEnum.SET_CURRENT_PROJECT, key: string}
export type SetCurrentPageType = {type: typeof ProjectActionsEnum.SET_CURRENT_PAGE, page: IPage}
export type UpdateProjectNavigationType = {type: typeof ProjectActionsEnum.UPDATE_PROJECT_NAVIGATION, project_key: string, navigation: any}
export type SavePageType = {type: typeof ProjectActionsEnum.SAVE_PAGE, page: IPage}
export type SavePageSuccess = {type: typeof ProjectActionsEnum.SAVE_PAGE_SUCCESS, pages: IPages}
export type SavePageFailed = {type: typeof ProjectActionsEnum.SAVE_PAGE_FAILED, message: string}
export type CreatePage = {type: typeof ProjectActionsEnum.CREATE_PAGE, project: any, key: string}
export type CreatePageSuccess = {type: typeof ProjectActionsEnum.CREATE_PAGE_SUCCESS, page: any}
export type CreatePageFailed = {type: typeof ProjectActionsEnum.CREATE_PAGE_FAILED, message: string}
export type CreateProject = {type: typeof ProjectActionsEnum.CREATE_PROJECT}
export type CreateProjectSuccess = {type: typeof ProjectActionsEnum.CREATE_PROJECT_SUCCESS, project: any}
export type CreateProjectFailed = {type: typeof ProjectActionsEnum.CREATE_PROJECT_FAILED, message: string}
export type DeleteProject = {type: typeof ProjectActionsEnum.DELETE_PROJECT, key: string}
export type DeleteProjectSuccess = {type: typeof ProjectActionsEnum.DELETE_PROJECT_SUCCESS, key: string}
export type DeleteProjectFailed = {type: typeof ProjectActionsEnum.DELETE_PROJECT_FAILED, message: string}
export type LoadProjectType = {type: typeof ProjectActionsEnum.LOAD_PROJECT, project_id: number}
export type LoadProjectSuccessType = {type: typeof ProjectActionsEnum.LOAD_PROJECT_SUCCESS, pages: any}
export type LoadProjectFailedType = {type: typeof ProjectActionsEnum.LOAD_PROJECT_FAILED, message: string}
export type SaveProject = {type: typeof ProjectActionsEnum.SAVE_PROJECT, project: IProject}
export type SaveProjectSuccess = {type: typeof ProjectActionsEnum.SAVE_PROJECT_SUCCESS, project: IProject, message:any}
export type SaveProjectFailed = {type: typeof ProjectActionsEnum.SAVE_PROJECT_FAILED, project:IProject, message: any}
export type SaveProjectFormData = {type: typeof ProjectActionsEnum.SAVE_PROJECT_FORM_DATA, form_data:FormData, project: IProject}
export type SetCurrentCmpType = {type: typeof ProjectActionsEnum.SET_CURRENT_CMP, cmp: any}
export type SetCutCmpType = {type: typeof ProjectActionsEnum.SET_CUT_CMP, flag: boolean}
export type CmpMoveType = {type: typeof ProjectActionsEnum.CMP_MOVE, cmp: any, direction: string}
export type CmpDeleteType = {type: typeof ProjectActionsEnum.CMP_DELETE, cmp: ComponentInterface, currentPage: IPage}
export type CmpAddType = {type: typeof ProjectActionsEnum.CMP_ADD, parent: ComponentInterface, cmp: ComponentInterface, currentPage: IPage}
export type CmpAddRowType = {type: typeof ProjectActionsEnum.CMP_ADD_ROW, parent: IPage, cmp: ComponentInterface}
export type CmpUpdateType = {type: typeof ProjectActionsEnum.CMP_UPDATE, cmp: ComponentInterface}
export type CmpCopyType = {type: typeof ProjectActionsEnum.CMP_COPY, cmp: ComponentInterface}
export type CmpCutType = {type: typeof ProjectActionsEnum.CMP_CUT, cmp: ComponentInterface}
export type CmpPasteType = {type: typeof ProjectActionsEnum.CMP_PASTE, parent: ComponentInterface, cmp: ComponentInterface}
export type SetAllDsType = {type: typeof ProjectActionsEnum.SET_ALL_DS, pages: any}
export type UpdateAllDsType = {type: typeof ProjectActionsEnum.UPDATE_ALL_DS, page: any}
export type UploadDoneType = {type: typeof ProjectActionsEnum.UPLOAD_DONE, upload: boolean}


export type ProjectActionCreatorsType =
    LoadProjectType
    | LoadProjectSuccessType
    | LoadProjectFailedType

    | CreateProject
    | CreateProjectSuccess
    | CreateProjectFailed

    | SaveProject
    | SaveProjectSuccess
    | SaveProjectFailed

    | DeleteProject
    | DeleteProjectSuccess
    | DeleteProjectFailed

    | SetCurrentProjectType
    | SetCurrentPageType
    | UpdateProjectNavigationType

    | SavePageType
    | SavePageSuccess
    | SavePageFailed
    | SaveProjectFormData

    | CreatePage
    | CreatePageSuccess
    | CreatePageFailed

    | UpdatePageType

    | SetCurrentCmpType
    | SetCutCmpType
    | CmpMoveType
    | CmpDeleteType
    | CmpAddType
    | CmpAddRowType
    | CmpUpdateType
    | CmpCopyType
    | CmpCutType
    | CmpPasteType

    | AppInitializedSuccessActionType

    | SetAllDsType
    | UpdateAllDsType

    | UploadDoneType
