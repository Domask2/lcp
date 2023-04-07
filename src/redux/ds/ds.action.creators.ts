import {ILocalStorage} from "../project/project.initial";

import {IDataSource} from "./ds.initial";
import {
    addChildrenToItemsDsType,
    clearCache,
    clearDs,
    clearSelect,
    createRecordFailedType,
    createRecordSuccessType,
    createRecordType,
    dataSourceAddKeyValueType,
    dataSourceSelectMultiType,
    deleteRecordFailedType,
    deleteRecordPrimariesType,
    deleteRecordSuccessType,
    deleteRecordType,
    DsActionsEnum,
    editRecordFailedType,
    editRecordPrimariesType,
    editRecordSuccessType,
    editRecordType,
    executeDbProcedure,
    executeDbProcedureFailed,
    executeDbProcedureSuccess,
    initLsInputsType,
    initLsPPType,
    loadDataSourceFailedType,
    loadDataSourceSuccessType,
    loadDataSourceType,
    response, responseFailed, responseSuccess,
    setCache,
    setLoadingType,
    setLsBadVarsType,
    setLsByType,
    setLsInputsType,
    setLsPPType,
    setLsType,
    setLsVarsType,
    updateDs,
} from "./ds.action.types";

const dsActionCreators = {
    dataSourceSelectMulti: (ds_key: string, keys: Array<string>, rows: Array<any>): dataSourceSelectMultiType =>
        ({type: DsActionsEnum.DS_SELECT_MULTI, ds_key, keys, rows}),
    dataSourceAddKeyValue: (ds_key: string, key: string, value: any): dataSourceAddKeyValueType =>
        ({type: DsActionsEnum.DS_ADD_KEY_VALUE, ds_key, key, value}),
    createRecord: (ds_key: string, data: any, reload: "force" | "lazy" | "none"): createRecordType =>
        ({type: DsActionsEnum.CREATE_RECORD, ds_key, data, reload}),
    createRecordSuccess: (data: any, ds_key: string, reload: "force" | "lazy" | "none"): createRecordSuccessType =>
        ({type: DsActionsEnum.CREATE_RECORD_SUCCESS, data, ds_key, reload}),
    createRecordFailed: (message: string): createRecordFailedType => ({
        type: DsActionsEnum.CREATE_RECORD_FAILED,
        message
    }),
    editRecord: (ds_key: string, data: any, primaries: editRecordPrimariesType, reload: "force" | "lazy" | "none"): editRecordType =>
        ({type: DsActionsEnum.EDIT_RECORD, ds_key, data, primaries, reload}),
    editRecordSuccess: (data: any, ds_key: string, reload: "force" | "lazy" | "none"): editRecordSuccessType =>
        ({type: DsActionsEnum.EDIT_RECORD_SUCCESS, data, ds_key, reload}),
    editRecordFailed: (message: string): editRecordFailedType => ({type: DsActionsEnum.EDIT_RECORD_FAILED, message}),
    deleteRecord: (ds_key: string, primaries: deleteRecordPrimariesType, reload: "force" | "lazy" | "none"): deleteRecordType =>
        ({type: DsActionsEnum.DELETE_RECORD, ds_key, primaries, reload}),
    deleteRecordSuccess: (ds_key: string, reload: "force" | "lazy" | "none"): deleteRecordSuccessType =>
        ({type: DsActionsEnum.DELETE_RECORD_SUCCESS, ds_key, reload}),
    deleteRecordFailed: (message: string): deleteRecordFailedType => ({
        type: DsActionsEnum.DELETE_RECORD_FAILED,
        message
    }),
    setLoading: (ds_key: string, value: boolean): setLoadingType => ({type: DsActionsEnum.SET_LOADING, ds_key, value}),
    setLs: (key: string, ls_data: any): setLsType => ({type: DsActionsEnum.SET_LS, key, ls_data}),
    initLsPP: (pp_data: any): initLsPPType => ({type: DsActionsEnum.INIT_LS_PP, pp_data}),
    setLsPP: (name: string, key: string, pp_data: any): setLsPPType => ({
        type: DsActionsEnum.SET_LS_PP,
        name,
        key,
        pp_data
    }),
    initLsInputs: (pp_data: any): initLsInputsType => ({type: DsActionsEnum.INIT_LS_INPUTS, pp_data}),
    setLsInputs: (name: string, key: string, pp_data: any): setLsInputsType => ({
        type: DsActionsEnum.SET_LS_INPUTS,
        name,
        key,
        pp_data
    }),
    setLsVars: (key: string, vars_data: any): setLsVarsType => ({type: DsActionsEnum.SET_LS_VARS, key, vars_data}),
    setLsBadVars: (key: string, vars_data: any): setLsBadVarsType => ({
        type: DsActionsEnum.SET_LS_BAD_VARS,
        key,
        vars_data
    }),
    setLsBy: (ls: ILocalStorage): setLsByType => ({type: DsActionsEnum.SET_LS_BY, ls}),
    addChildrenToItemsDs: (ds_key: string, compare_field: string, compare_value: any, children: any): addChildrenToItemsDsType =>
        ({type: DsActionsEnum.ADD_CHILDREN_TO_ITEMS_DS, ds_key, compare_field, compare_value, children}),
    setCache: (key: string, payload: any): setCache => ({type: DsActionsEnum.SET_CACHE, key, payload}),
    clearCache: (key: string): clearCache => ({type: DsActionsEnum.CLEAR_CACHE, key}),
    clearDs: (key: string): clearDs => ({type: DsActionsEnum.CLEAR_DS, key}),
    updateDs: (key: string, payload: any): updateDs => ({type: DsActionsEnum.UPDATE_DS, key, payload}),
    loadDataSource: (key: string, filter: string, cache = true, target?: string): loadDataSourceType =>
        ({type: DsActionsEnum.LOAD_DATA_SOURCE, key, filter, cache, target}),
    loadDataSourceSuccess: (ds: IDataSource, filter: string, cache: boolean, target?: string): loadDataSourceSuccessType =>
        ({type: DsActionsEnum.LOAD_DATA_SOURCE_SUCCESS, ds, filter, cache, target}),
    loadDataSourceFailed: (message: string): loadDataSourceFailedType => ({
        type: DsActionsEnum.LOAD_DATA_SOURCE_FAILED,
        message
    }),
    executeDbProcedure: (ds_key: string, payload: any, reload_ds: any): executeDbProcedure => ({
        type: DsActionsEnum.EXECUTE_DB_PROCEDURE,
        ds_key,
        payload,
        reload_ds
    }),
    executeDbProcedureFailed: (message: string): executeDbProcedureFailed => ({
        type: DsActionsEnum.EXECUTE_DB_PROCEDURE_FAILED,
        message
    }),
    executeDbProcedureSuccess: (payload: any, ds_key: string): executeDbProcedureSuccess => ({
        type: DsActionsEnum.EXECUTE_DB_PROCEDURE_SUCCESS,
        payload,
        ds_key
    }),
    clearSelect: (sourceDs: string): clearSelect => ({type: DsActionsEnum.CLEAR_SELECT, sourceDs}),

    response: (href: string, key: string): response => ({type: DsActionsEnum.CREATE_RESPONSE, href, key}),
    responseSuccess: (key:string, payload: any): responseSuccess => ({type: DsActionsEnum.CREATE_RESPONSE_SUCCESS, key, payload}),
    responseFailed: (key:string, payload: any): responseFailed => ({type: DsActionsEnum.CREATE_RESPONSE_FAILED, key, payload}),
}

export default dsActionCreators
