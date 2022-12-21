import {intersection} from "./adminNavigationUtils/rolesEdit";
import {downloadData, getData} from "./apiAction";
import {IFnc} from "../redux/fnc/fnc.initial";
import {IDataSourceAll} from "../redux/ds/ds.initial";
import instance from "../saga/api/api";

export const setObjectSelect = (itemActions: any, e: any) => {
    let objectAction: any = {}

    if (typeof itemActions !== 'string') {
        const splitActions = itemActions.actionName.split(':')
        let typeSwitch = splitActions[0];
        let functionKey = splitActions[1];
        /*eslint-disable-next-line @typescript-eslint/no-unused-vars*/
        let paramsAction = splitActions[2];
        let functionParam = e;

        objectAction = {
            typeSwitch,
            functionKey,
            functionParam
        }
    }

    return {objectAction}
}

export const setObjectAction = (itemActions: any, item: any, form?: boolean, procObj?: boolean, reduxElement?: boolean) => {
    const splitActions = itemActions.actionName.split(':')

    let typeSwitch = splitActions[0];
    let functionKey = splitActions[1];
    let paramsAction = splitActions[2];

    let functionParam: any;
    let functionParamArray: any = [];

    let formValue;
    let formatDL;

    if (procObj) {
        formValue = item
    }

    if (typeSwitch === 'proc' && !form) {
        itemActions.params.forEach((param: any) => {
            functionParamArray.push({[Object.keys(param).toString()]: item[Object.values(param).toString()]})
        })
    }

    // fnc или procedure
    if (typeSwitch === 'fnc' || (typeSwitch === 'proc' && !form)) {
        itemActions.params.forEach((param: any) => {
            if (Object.keys(param)[0] === 'obj') {
                functionParamArray.push({[Object.keys(param)[0]]: item})
            } else
                functionParamArray.push({[Object.keys(param).toString()]: item[Object.values(param).toString()]})
        })
    }


    // proc
    if (typeSwitch === 'proc' && form && !procObj) {
        if (itemActions?.params) {
            functionParamArray.push({'obj': item})
            itemActions?.params?.forEach((param: any) => {
                if (Object.keys(param)[0] === 'obj')
                    functionParamArray.push({[Object.keys(param)[0]]: item})
                else
                    functionParamArray.push({[Object.keys(param).toString()]: item[Object.keys(param).toString()]})
            })
        } else {
            console.log('нет параметров')
        }

        if (itemActions?.params.length === 0) {
            functionParamArray.push({'obj': item})
        }

    }

    //dl
    if (typeSwitch === 'dl') {
        if (itemActions?.params) {
            itemActions?.params?.forEach((param: any) => {
                functionParamArray.push({[Object.keys(param).toString()]: item[Object.keys(param).toString()]})
            })
        } else {
            console.log('заполните параметры')
        }

        formatDL = {
            format: itemActions.format,
            sep: itemActions.sep,
            type: '__to=file'
        }

        if (form) {
            formValue = item
        }

    }

    if (typeSwitch === 'get') {
        if (reduxElement) {
            formValue = reduxElement
        } else {
            if (typeof item === "string") {
                formValue = item.split(',').join('&')
            } else {
                let itemArray: any = []
                Object.keys(item).forEach((it: any) => {
                    itemArray.push(it + '=' + item[it])
                })
                formValue = itemArray.join('&')
            }
        }

    }

    // to
    if (typeSwitch === 'to') {
        if (paramsAction) functionParam = '';
        if (item !== undefined) {
            if (item) functionParam = item[paramsAction]
        }
    }

    // api
    if (typeSwitch === 'api') {
        formValue = item
        if (itemActions.db_key) {
            formValue['db_key'] = itemActions?.db_key
        }
    }

    const objectAction = {
        typeSwitch,
        functionKey,
        functionParam,
        functionParamArray,
        formValue,
        formatDL
    }

    return {objectAction}
}

export const getGlobalFunction = (fncAll: any, functionKey: string, functionParam?: any, functionParamArray?: any) => {
    let myFnc: any;
    let dsFilter: any;

    let source
    let target

    fncAll.forEach((fnc: IFnc) => {
        if (fnc.key === functionKey) {
            myFnc = fnc
        }
    })

    if (myFnc) {
        let functionSource = myFnc?.source?.split(':')
        source = functionSource[0]

        if (functionParam) {
            dsFilter = functionSource[1] + '=' + functionParam
        }

        if (functionParamArray) {
            let arr: any = []
            functionParamArray.forEach((param: any) => {
                arr.push(`${Object.keys(param)}=${Object.values(param)}`)
            })
            dsFilter = arr.join(',');
        }

        target = myFnc.target
    }
    return {source, dsFilter, target}
}

export const getSourceDownload = (fncAll: any, functionKey: string, functionParam?: any, functionParamArray?: any) => {
    let myFnc: any = {source: 'no:no'}
    let dsFilter: any;

    fncAll.forEach((fnc: IFnc) => {
        if (fnc.key === functionKey) {
            myFnc = fnc
        }

    })

    let functionSource = myFnc?.hasOwnProperty('source') && myFnc.source.split(':')
    let source = functionSource[0]

    if (functionParam) {
        dsFilter = functionSource[1] + '=' + functionParam
    }

    if (functionParamArray) {
        let arr: any = []
        functionParamArray.forEach((param: any) => {
            arr.push(`${Object.keys(param)}=${Object.values(param)}`)
        })
        dsFilter = arr.join(',');
    }

    return {sourceDl: source, filterDl: dsFilter}
}

export const getAllReloadDs = (allDsProject: IDataSourceAll, reloadDS: Array<string>, dsBtnForm?: string, dsTable?: [string]) => {
    // получим массив всех ds подгружанных в redux
    let arrayAllDsProject: Array<string> = [];
    // массив ds для перезагрузки
    let actionReloadDs: any;


    if (allDsProject) {
        arrayAllDsProject = Object.keys(allDsProject)
    }

    if (reloadDS === undefined) {
        actionReloadDs = []
    } else {
        actionReloadDs = reloadDS
    }

    // находим ds которые необходимо перезагрузить
    let newds = intersection(arrayAllDsProject, actionReloadDs)

    // добавим ds которая находиться внутри компонента
    if (dsBtnForm) {
        newds.push(dsBtnForm)
    }

    if (dsTable) {
        let strDs_table = dsTable.join();
        newds.push(strDs_table)
    }

    let newDsFilter: Array<{ key: string, filter: string }> = [];
    newds.forEach((ds: any) => {
        Object.keys(allDsProject).forEach((allDs: any) => {
            if (ds === allDs) {
                let strDs_table_filter = {key: allDsProject[ds].key, filter: allDsProject[ds].filter}
                newDsFilter.push(strDs_table_filter)
            }
        })
    })

    return newDsFilter;
}

export const combineAction = (objectAction: any, fncAll: any, actionsHooks: any, ds?: any, reduxObj?: boolean) => {
    const {typeSwitch, functionKey, functionParam, functionParamArray, formValue, formatDL} = objectAction;
    switch (typeSwitch) {
        case 'to':
            actionsHooks.to(functionKey, functionParam)
            break
        case 'fnc':
            const {source, dsFilter, target} = getGlobalFunction(fncAll, functionKey, functionParam, functionParamArray)
            actionsHooks.loadDataSourceWithCache(source, "__filter=" + dsFilter, false, target)
            break
        case 'dl':
            const {sourceDl, filterDl} = getSourceDownload(fncAll, functionKey, functionParam, functionParamArray)
            let fullSourceDl: any
            if (formValue && formValue !== 'null') {
                // eslint-disable-next-line no-useless-concat
                fullSourceDl = sourceDl + '?' + '__filter=' + formValue + '&' + formatDL.type + '&' + '__format=' + formatDL.format + '&' + '__sep=' + encodeURIComponent(formatDL.sep)
            } else {
                // eslint-disable-next-line no-useless-concat
                fullSourceDl = sourceDl + '?' + '__filter=' + filterDl + '&' + formatDL.type + '&' + '__format=' + formatDL.format + '&' + '__sep=' + encodeURIComponent(formatDL.sep)
            }

            if (formValue === 'null') {
                // eslint-disable-next-line no-useless-concat
                fullSourceDl = sourceDl + '?' + formatDL.type + '&' + '__format=' + formatDL.format + '&' + '__sep=' + encodeURIComponent(formatDL.sep)
            }
            downloadData(fullSourceDl)
            break
        case 'proc':
            let procObj: any = {}

            let ds_source: any;
            fncAll.forEach((fnc: any) => {
                if (fnc.key === objectAction.functionKey) {
                    ds_source = fnc.source.split(':')[0]
                }
            })

            functionParamArray && functionParamArray.length && functionParamArray?.forEach((item: any) => {
                procObj[String(Object.keys(item))] = item[String(Object.keys(item))]
            })

            if (functionParamArray && functionParamArray.length === 0 && !formValue && !reduxObj) {
                fncAll.forEach((fnc: any) => {
                    if (fnc.hasOwnProperty('params')) {
                        fnc.params.forEach((fn: any) => {
                            if (fn === 'obj') {
                                procObj['obj'] = formValue
                            }
                        })
                    }
                })
                actionsHooks.executeDbProcedure(ds_source, procObj, [ds])

            }

            if (formValue && !reduxObj) {
                fncAll.forEach((fnc: any) => {
                    if (fnc.hasOwnProperty('params')) {
                        fnc.params.forEach((fn: any) => {
                            if (fn === 'obj') {
                                procObj['obj'] = formValue
                            }
                        })
                    }

                })
                actionsHooks.executeDbProcedure(ds_source, procObj, [ds])
            }

            if (formValue && reduxObj) {
                if (formValue.hasOwnProperty('obj')) {
                    procObj = formValue
                } else {
                    procObj['obj'] = formValue
                }
                actionsHooks.executeDbProcedure(ds_source, procObj, [ds])
            }

            if (Object.keys(procObj).length !== 0 && !reduxObj) {
                // console.log(procObj)
                actionsHooks.executeDbProcedure(ds_source, procObj, [ds])
            }

            break
        case 'get':
            let urlSource: any;
            fncAll.forEach((fnc: any) => {
                if (fnc.key === objectAction.functionKey) {
                    urlSource = fnc.source
                }
            })

            let getSource = urlSource + '?' + formValue

            getData(getSource)
            break
        case 'flyInput':
            let flyInputSource: any;
            fncAll.forEach((fnc: any) => {
                if (fnc.key === objectAction.functionKey) {
                    flyInputSource = fnc.source.split(':')[0]
                }
            })

            if (formValue) {
                let procObj: any = {};
                procObj['obj'] = formValue
                actionsHooks.executeDbProcedure(flyInputSource, procObj, [ds])
            }
            break
        case 'api':
            let api: any;
            fncAll.forEach((fnc: any) => {
                if (fnc.key === objectAction.functionKey) {
                    api = fnc.source.split(':')[0]
                }
            })

            const token = window.localStorage.getItem('user-token');
            instance.defaults.headers.authorization = 'Bearer ' + token;
            instance.post(api, formValue)
                .then(response => response.data)
                .then(data => {
                    if (data) {
                        actionsHooks.loadDataSource(ds[0].key ?? '', ds[0].filter ?? '')
                    }
                })

            break
        default:
            console.log('Неизвестная команда: ', typeSwitch)
    }
}