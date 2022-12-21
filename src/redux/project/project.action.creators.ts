import {IPage, IPages, IProject} from "./project.initial";
import {ComponentInterface} from "../../components/AntComponents/Page/templates";
import {
    CmpAddRowType,
    CmpAddType,
    CmpCopyType,
    CmpCutType,
    CmpDeleteType,
    CmpMoveType,
    CmpPasteType,
    CmpUpdateType,
    CreatePage,
    CreatePageFailed,
    CreatePageSuccess,
    CreateProject,
    CreateProjectFailed,
    CreateProjectSuccess,
    DeleteProject,
    DeleteProjectFailed,
    DeleteProjectSuccess,
    LoadProjectFailedType,
    LoadProjectSuccessType,
    LoadProjectType,
    ProjectActionsEnum,
    SavePageFailed,
    SavePageSuccess,
    SavePageType,
    SaveProject,
    SaveProjectFailed, SaveProjectFormData,
    SaveProjectSuccess,
    SetAllDsType,
    SetCurrentCmpType,
    SetCurrentPageType,
    SetCurrentProjectType,
    SetCutCmpType,
    UpdateAllDsType,
    UpdateProjectNavigationType,
    UploadDoneType
} from "./project.action.types";

export const projectActionCreators = {
    setCurrentProject: (key: string): SetCurrentProjectType => ({type: ProjectActionsEnum.SET_CURRENT_PROJECT, key}),
    setCurrentPage: (page: IPage): SetCurrentPageType => ({type: ProjectActionsEnum.SET_CURRENT_PAGE, page}),
    setCurrentCmp: (cmp: any): SetCurrentCmpType => ({type: ProjectActionsEnum.SET_CURRENT_CMP, cmp}),
    setCutCmp: (flag: boolean): SetCutCmpType => ({type: ProjectActionsEnum.SET_CUT_CMP, flag}),
    updatePage: (page: IPage) => ({type: ProjectActionsEnum.UPDATE_PAGE, page}),
    updateProjectNavigation: (project_key: string, navigation: any): UpdateProjectNavigationType => ({
        type: ProjectActionsEnum.UPDATE_PROJECT_NAVIGATION,
        project_key,
        navigation
    }),
    savePage: (page: IPage): SavePageType => ({type: ProjectActionsEnum.SAVE_PAGE, page}),
    savePageSuccess: (pages: IPages): SavePageSuccess => ({type: ProjectActionsEnum.SAVE_PAGE_SUCCESS, pages}),
    savePageFailed: (message: string): SavePageFailed => ({type: ProjectActionsEnum.SAVE_PAGE_FAILED, message}),
    createPage: (project: any, key: string): CreatePage => ({type: ProjectActionsEnum.CREATE_PAGE, project, key}),
    createPageSuccess: (page: IPage): CreatePageSuccess => ({
        type: ProjectActionsEnum.CREATE_PAGE_SUCCESS,
        page
    }),
    createPageFailed: (message: string): CreatePageFailed => ({type: ProjectActionsEnum.CREATE_PAGE_FAILED, message}),
    createProject: (): CreateProject => ({type: ProjectActionsEnum.CREATE_PROJECT}),
    createProjectSuccess: (project: IProject): CreateProjectSuccess => ({
        type: ProjectActionsEnum.CREATE_PROJECT_SUCCESS,
        project
    }),
    createProjectFailed: (message: string): CreateProjectFailed => ({
        type: ProjectActionsEnum.CREATE_PROJECT_FAILED,
        message
    }),
    deleteProject: (key: string): DeleteProject => ({type: ProjectActionsEnum.DELETE_PROJECT, key}),
    deleteProjectSuccess: (key: string): DeleteProjectSuccess => ({
        type: ProjectActionsEnum.DELETE_PROJECT_SUCCESS,
        key
    }),
    deleteProjectFailed: (message: string): DeleteProjectFailed => ({
        type: ProjectActionsEnum.DELETE_PROJECT_FAILED,
        message
    }),
    loadProject: (project_id: number): LoadProjectType => ({type: ProjectActionsEnum.LOAD_PROJECT, project_id}),
    loadProjectSuccess: (pages: IPages): LoadProjectSuccessType => ({
        type: ProjectActionsEnum.LOAD_PROJECT_SUCCESS,
        pages
    }),
    loadProjectFailed: (message: string): LoadProjectFailedType => ({
        type: ProjectActionsEnum.LOAD_PROJECT_FAILED,
        message
    }),
    saveProject: (project: IProject): SaveProject => ({type: ProjectActionsEnum.SAVE_PROJECT, project}),
    saveProjectFormData: (form_data: FormData, project: IProject): SaveProjectFormData => ({
        type: ProjectActionsEnum.SAVE_PROJECT_FORM_DATA,
        form_data,
        project
    }),
    saveProjectSuccess: (project: IProject, message: any): SaveProjectSuccess => ({
        type: ProjectActionsEnum.SAVE_PROJECT_SUCCESS,
        project,
        message
    }),
    saveProjectFailed: (project: any, message: any): SaveProjectFailed => ({
        type: ProjectActionsEnum.SAVE_PROJECT_FAILED,
        message,
        project
    }),
    cmpMove: (cmp: ComponentInterface, direction: string): CmpMoveType => ({
        type: ProjectActionsEnum.CMP_MOVE,
        cmp,
        direction
    }),
    cmpDelete: (cmp: ComponentInterface, currentPage: IPage): CmpDeleteType => ({
        type: ProjectActionsEnum.CMP_DELETE,
        cmp,
        currentPage
    }),
    cmpAdd: (parent: ComponentInterface, cmp: ComponentInterface, currentPage: IPage): CmpAddType => ({
        type: ProjectActionsEnum.CMP_ADD,
        parent,
        cmp,
        currentPage
    }),
    cmpAddRow: (parent: IPage, cmp: ComponentInterface): CmpAddRowType => ({
        type: ProjectActionsEnum.CMP_ADD_ROW,
        parent,
        cmp
    }),
    cmpCopy: (parent: ComponentInterface, cmp: ComponentInterface): CmpCopyType => ({
        type: ProjectActionsEnum.CMP_COPY,
        cmp
    }),
    cmpCut: (parent: ComponentInterface, cmp: ComponentInterface): CmpCutType => ({
        type: ProjectActionsEnum.CMP_CUT,
        cmp
    }),
    cmpPaste: (parent: ComponentInterface, cmp: ComponentInterface): CmpPasteType => ({
        type: ProjectActionsEnum.CMP_PASTE,
        parent,
        cmp
    }),
    cmpUpdate: (cmp: ComponentInterface): CmpUpdateType => ({type: ProjectActionsEnum.CMP_UPDATE, cmp}),
    allDs: (pages: any): SetAllDsType => ({type: ProjectActionsEnum.SET_ALL_DS, pages}),
    updateAllDs: (page: any): UpdateAllDsType => ({type: ProjectActionsEnum.UPDATE_ALL_DS, page}),
    uploadDone: (upload: boolean): UploadDoneType => ({type: ProjectActionsEnum.UPLOAD_DONE, upload})
}
