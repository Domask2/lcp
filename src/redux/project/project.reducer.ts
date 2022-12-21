import {initialStateProject, IProjectInitialized} from "./project.initial";
import {ProjectActionCreatorsType, ProjectActionsEnum} from "./project.action.types";
import {AppActionsEnum} from "../app/app.action.types";
import {ComponentInterface} from "../../components/AntComponents/Page/templates";

const projectReducer = (state = initialStateProject, action: ProjectActionCreatorsType): IProjectInitialized => {
    let new_pages: any = {}
    let components: Array<any>
    let pages, page, newCmp
    let all: any = {}
    let currentProject: any = {}
    let allDs: any
    switch (action.type) {
        case AppActionsEnum.APP_INITIALIZED_SUCCESS:
            action.settings.data.projects.forEach(function (prj: any) {
                all[prj.key] = {...prj, message: {}, loading: false, errors: false}
            })
            /**
             * Инициализируя мы не грузим страницы проектов, они будут загружены при первом обращении.
             * Используется в app.reducer
             */
            return {
                ...state,
                all: all
            }

        case ProjectActionsEnum.LOAD_PROJECT_SUCCESS:
            /**
             * project.pages - собираются страницы всех проектов. и при новом обращении не будут грузиться с сервера.
             * страницы загружаются сразу для всего проекта к которому было обращение.
             */
            action.pages.data.forEach((item: any) => {
                new_pages[item.key] = item
            })

            return {
                ...state,
                pages: {...state.pages, ...new_pages},
                upload: true
            }

        case ProjectActionsEnum.UPDATE_PAGE:
            pages = state.pages
            pages[action.page.key] = {...action.page}
            return {...state, pages: {...state.pages}}

        case ProjectActionsEnum.UPDATE_PROJECT_NAVIGATION:
            all = {...state.all}
            all[action.project_key] = {...state.all[action.project_key]}
            all[action.project_key]['navigation'] = action.navigation
            return {...state, all: all}

        case ProjectActionsEnum.SET_CURRENT_PROJECT:
            let cp = state.all[action.key]
            if (cp !== undefined)
                return {...state, current: {...cp}, upload: false}
            else
                return {...state, current: cp}

        case ProjectActionsEnum.SET_CURRENT_PAGE:
            let cpage = action.page
            if (cpage !== undefined)
                return {...state, current_page: {...cpage}, upload: true}
            else
                return {...state, current_page: cpage}

        case ProjectActionsEnum.SET_CURRENT_CMP:
            let currentCmp = action.cmp
            if (currentCmp !== undefined)
                return {...state, current_cmp: {...currentCmp}}
            else
                return {...state, current_cmp: currentCmp}

        case ProjectActionsEnum.SET_CUT_CMP:
            let cut = action.flag
            return {...state, cut_out: cut}

        case ProjectActionsEnum.SAVE_PROJECT:
        case ProjectActionsEnum.SAVE_PROJECT_FORM_DATA:
            all = {...state.all}
            currentProject = {...state.current}
            if (Object.keys(currentProject).length) {
                currentProject = {...action.project, message:{}, loading: true, errors: false}
            }
            all[action.project.key] = {...action.project, message:{}, loading: true, errors: false}
            return {...state, all: all, current: currentProject}

        case ProjectActionsEnum.SAVE_PROJECT_SUCCESS:
            all = {...state.all}
            currentProject = {...state.current}
            if (Object.keys(currentProject).length) {
                currentProject = {...action.project, message: action.message, loading: false, errors: false}
            }
            all[action?.project.key] = {...action.project, message: action.message, loading: false, errors: false}
            return {...state, all: all, current: currentProject}

        case ProjectActionsEnum.SAVE_PROJECT_FAILED:
            all = {...state.all}
            currentProject = {...state.current}
            if (Object.keys(currentProject).length) {
                currentProject = {...currentProject, message: action.message, loading: false, errors: true}
            }
            all[action.project.key] = {
                ...all[action.project.key],
                message: action.message,
                loading: false,
                errors: true
            }
            return {...state, all: all, current: currentProject}

        case ProjectActionsEnum.CREATE_PAGE_SUCCESS:
            pages = state.pages
            pages[action.page.data.key] = {...action.page.data}
            return {...state, pages: {...state.pages}}

        case ProjectActionsEnum.CREATE_PROJECT_SUCCESS:
            let projects = {...state.all}
            projects[action.project.data.key] = action.project.data
            return {...state, all: projects}

        case ProjectActionsEnum.DELETE_PROJECT_SUCCESS:
            all = {...state.all}
            delete (all[action.key])
            return {...state, all: all}

        case ProjectActionsEnum.CMP_MOVE:
            pages = {...state.pages}
            let rt1, ret1;
            if (state.current_page) {
                rt1 = addPath(state.current_page.components, '0')
                ret1 = cmpMove(rt1, action.cmp.key, action.direction)
                pages[state.current_page.key] = {...pages[state.current_page.key], components: ret1}
            }
            return {...state, pages: pages}

        case ProjectActionsEnum.CMP_DELETE:
            page = state.current_page
            newCmp = cmpDelete(page?.components, action.cmp)
            pages = {...state.pages}
            if (page) {
                page.components = newCmp
                pages[page.key] = {...page}
            }
            return {...state, pages: pages}

        case ProjectActionsEnum.CMP_ADD:
            page = action.currentPage
            components = componentAdd(page.components, action.parent, action.cmp)
            pages = {...state.pages}

            page.components = components
            pages[page.key] = {...page}
            return {...state, pages: pages}

        case ProjectActionsEnum.CMP_ADD_ROW:
            if (action.parent.components === undefined) {
                console.log('not page components')
                return state
            }

            page = state.pages[action.parent.key]
            page.components.push(action.cmp)
            pages = {...state.pages}
            pages[action.parent.key] = {...page}

            return {...state, pages: pages}

        case ProjectActionsEnum.CMP_UPDATE:
            pages = {...state.pages}
            const page_key = action.cmp.page_key !== undefined ? action.cmp.page_key : ''
            let cp_key = state.current_page?.key !== undefined ? state.current_page.key : ''
            page = state.pages[cp_key]
            components = cmpUpdate(page.components, action.cmp)
            pages[page_key] = {...pages[page_key], components: components}
            return {...state, pages: pages}

        case ProjectActionsEnum.SET_ALL_DS:
            return {
                ...state,
                allDs: action.pages
            }

        case ProjectActionsEnum.UPDATE_ALL_DS:
            allDs = [...state.allDs]

            let allDsProject: any = [];
            Object.keys(action.page.datasources).forEach((d: any) => {
                allDsProject.push(d)
            })

            let setSortDs = allDs.concat(allDsProject.filter(function (item: any) {
                return allDs.indexOf(item) < 0;
            }));

            return {
                ...state,
                allDs: setSortDs
            }

        case ProjectActionsEnum.UPLOAD_DONE:
            return {
                ...state,
                upload: action.upload
            }

        default:
            return state
    }
}

const cmpUpdate = (components: Array<any>, cmp: ComponentInterface): Array<ComponentInterface> => {
    let arrCmp: Array<ComponentInterface> = []

    components.forEach((c: ComponentInterface) => {
        if (c.children !== undefined) {
            if (c.key === cmp.key) {
                c = cmp
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                c.children = cmpUpdate(c.children, cmp)
            }
        } else {
            if (c.key === cmp.key)
                c = cmp
        }

        if (c.type === 'Table') {
            if ("menu" in c) {
                c.menu.forEach((men: any, index: number) => {
                    if ("menu" in c) {
                        if (men?.modal?.cmpModal?.key === cmp.key) {
                            c.menu[index].modal.cmpModal = cmp
                        } else {
                            men?.modal?.cmpModal?.children.forEach((chil: any, ind: number) => {
                                if (chil.key === cmp.key) {
                                    if ("menu" in c) {
                                        c.menu[index].modal.cmpModal.children[ind] = cmp
                                    }
                                } else {
                                    if ("menu" in c) {

                                        c.menu[index].modal.cmpModal.children = cmpUpdate(c.menu[index].modal.cmpModal.children, cmp)
                                    }
                                }
                            })

                        }
                    }
                })
            }
        }

        arrCmp.push(c)
    })


    return arrCmp
}

const componentAdd = (components: Array<any>, parent: ComponentInterface, cmp: any): Array<ComponentInterface> => {
    let arrCmp: Array<ComponentInterface> = []

    components.forEach((c: ComponentInterface) => {
        if (c.children !== undefined) {
            if (c.key === parent.key) {
                c.children.push(cmp)
            } else {
                c.children = componentAdd(c.children, parent, cmp)
            }
        }

        if (c.type === 'Table' && parent.type === 'Modal') {
            if ("menu" in c) {
                c.menu.forEach((men: any) => {
                    if (men.modal) {
                        if (men.modal.cmpModal.key === parent.key) {
                            men.modal.cmpModal.children.push(cmp)
                        }
                    }
                })
            }
        }

        arrCmp.push(c)
    })

    return arrCmp
}
const cmpDelete = (components: Array<any>, cmp: ComponentInterface): Array<ComponentInterface> => {
    let arrCmp: Array<ComponentInterface> = []
    components.forEach((c: ComponentInterface) => {
        if (c.children !== undefined)
            c.children = cmpDelete(c.children, cmp)

        if (c.key !== cmp.key)
            arrCmp.push(c)

        if (c.type === 'Table') {
            if ("menu" in c) {
                c.menu.forEach((men: any) => {
                    if (men.modal) {
                        men.modal.cmpModal.children = cmpDelete(men.modal.cmpModal.children, cmp)

                    }
                })
            }
        }
    })

    return arrCmp
}
const cmpMove = (arr: Array<any>, key: string, direction: string) => {
    let obj = arr.find(item => item.key === key)

    let findPath = obj !== undefined ? obj.path : ''
    let objInd = 0
    let newArr: Array<any> = []

    if (findPath !== '') {
        let arrPath = findPath.split('-')
        objInd = arrPath[arrPath.length - 1] * 1
    }

    arr.forEach(item => {
        if (findPath !== '') {
            let arrPath = item.path.split('-')
            let curInd = arrPath[arrPath.length - 1] * 1

            if (direction === 'up')
                if (curInd + 1 === objInd)
                    newArr.push(obj)

            if (curInd !== objInd ||
                (objInd === 0 && direction === 'up') ||
                (objInd === arr.length - 1 && direction === 'down'))
                newArr.push(item)

            if (direction === 'down')
                if (curInd - 1 === objInd)
                    newArr.push(obj)
        } else {
            if (item.children !== undefined)
                item.children = cmpMove(item.children, key, direction)

            newArr.push(item)
        }
    })

    return newArr
}
const addPath = (arr: Array<any>, basePath: string) => {
    let newArr: Array<any> = []

    arr.forEach((item, index) => {
        let newPath = basePath + '-' + index
        let newItem = {...item, path: newPath}

        if (newItem.children !== undefined)
            newItem.children = addPath([...newItem.children], newPath)

        newArr.push(newItem)
    })

    return newArr
}


export default projectReducer