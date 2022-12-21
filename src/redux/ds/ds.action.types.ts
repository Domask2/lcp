import {ILocalStorage} from "../project/project.initial";

export enum DsActionsEnum {
    DS_SELECT_MULTI = "DS_SELECT_MULTI",
    DS_TABLE_ROW_SELECT = "DS_TABLE_ROW_SELECT",
    DS_ADD_KEY_VALUE = "DS_ADD_KEY_VALUE",
    LOAD_DATA_SOURCE = "LOAD_DATA_SOURCE",
    LOAD_DATA_SOURCE_SUCCESS = "LOAD_DATA_SOURCE_SUCCESS",
    LOAD_DATA_SOURCE_FAILED = "LOAD_DATA_SOURCE_FAILED",
    CREATE_RECORD = "CREATE_RECORD",
    CREATE_RECORD_SUCCESS = "CREATE_RECORD_SUCCESS",
    CREATE_RECORD_FAILED = "CREATE_RECORD_FAILED",
    EDIT_RECORD = "EDIT_RECORD",
    EDIT_RECORD_SUCCESS = "EDIT_RECORD_SUCCESS",
    EDIT_RECORD_FAILED = "EDIT_RECORD_FAILED",
    DELETE_RECORD = "DELETE_RECORD",
    DELETE_RECORD_SUCCESS = "DELETE_RECORD_SUCCESS",
    DELETE_RECORD_FAILED = "DELETE_RECORD_FAILED",
    SET_LOADING = "SET_LOADING ",
    SET_LS = "SET_LS",
    INIT_LS_PP = "INIT_LS_PP",
    SET_LS_PP = "SET_LS_PP",
    INIT_LS_INPUTS = "INIT_LS_INPUTS",
    SET_LS_INPUTS = "SET_LS_INPUTS",
    SET_LS_VARS = "SET_LS_VARS",
    SET_LS_BAD_VARS = "SET_LS_BAD_VARS",
    SET_LS_BY = "SET_LS_BY",
    ADD_CHILDREN_TO_ITEMS_DS = "ADD_CHILDREN_TO_ITEMS_DS",
    SET_CACHE = "SET_CACHE",
    CLEAR_CACHE = "CLEAR_CACHE",
    CLEAR_DS = "CLEAR_DS",
    UPDATE_DS = "UPDATE_DS",
    EXECUTE_DB_PROCEDURE = "EXECUTE_DB_PROCEDURE",
    EXECUTE_DB_PROCEDURE_SUCCESS = "EXECUTE_DB_PROCEDURE_SUCCESS",
    EXECUTE_DB_PROCEDURE_FAILED = "EXECUTE_DB_PROCEDURE_FAILED",
    SET_PAGINATION = "SET_PAGINATION",
    CLEAR_SELECT = 'CLEAR_SELECT',

    LOAD_REMOTE_DB = 'LOAD_REMOTE_DB',
}

export type ReloadType = "force" | "lazy" | "none"

export type dataSourceSelectMultiType = {type: typeof DsActionsEnum.DS_SELECT_MULTI, ds_key: string, keys: Array<string>, rows: Array<any>}
export type dataSourceRowTableType = {type: typeof DsActionsEnum.DS_SELECT_MULTI, ds_key: string, keys: Array<string>, rows: Array<any>}
export type dataSourceAddKeyValueType = {type: typeof DsActionsEnum.DS_ADD_KEY_VALUE, ds_key: string, key: string, value: any}
export type loadDataSourceType = {type: typeof DsActionsEnum.LOAD_DATA_SOURCE, key: string, filter: string, cache: boolean, target?: string}
export type loadDataSourceSuccessType = {type: typeof DsActionsEnum.LOAD_DATA_SOURCE_SUCCESS, ds: any, filter: string, cache: boolean, target?: string}
export type loadDataSourceFailedType = {type: typeof DsActionsEnum.LOAD_DATA_SOURCE_FAILED, message: string}
export type createRecordType = {type: typeof DsActionsEnum.CREATE_RECORD, ds_key: string, data: any, reload: ReloadType}
export type createRecordSuccessType = {type: typeof DsActionsEnum.CREATE_RECORD_SUCCESS, data: any, ds_key: string, reload: ReloadType}
export type createRecordFailedType = {type: typeof DsActionsEnum.CREATE_RECORD_FAILED, message: string}
export type editRecordPrimariesType = {[key: string]: any}
export type editRecordType = {type: typeof DsActionsEnum.EDIT_RECORD, ds_key: string, data: any, primaries: editRecordPrimariesType, reload: ReloadType}
export type editRecordSuccessType = {type: typeof DsActionsEnum.EDIT_RECORD_SUCCESS, data: any, ds_key: string, reload: ReloadType}
export type editRecordFailedType = {type: typeof DsActionsEnum.EDIT_RECORD_FAILED, message: string}
export type deleteRecordPrimariesType = {[key: string]: any}
export type deleteRecordType = {type: typeof DsActionsEnum.DELETE_RECORD, ds_key: string, primaries: deleteRecordPrimariesType, reload: ReloadType}
export type deleteRecordSuccessType = {type: typeof DsActionsEnum.DELETE_RECORD_SUCCESS, ds_key: string, reload: ReloadType}
export type deleteRecordFailedType = {type: typeof DsActionsEnum.DELETE_RECORD_FAILED, message: string}
export type setLoadingType = {type: typeof DsActionsEnum.SET_LOADING, ds_key: string, value: boolean}
export type setLsType = {type: typeof DsActionsEnum.SET_LS, key: string, ls_data: any}
export type initLsPPType = {type: typeof DsActionsEnum.INIT_LS_PP, pp_data: any}
export type setLsPPType = {type: typeof DsActionsEnum.SET_LS_PP, name: string, key: string, pp_data: any}
export type initLsInputsType = {type: typeof DsActionsEnum.INIT_LS_INPUTS, pp_data: any}
export type setLsInputsType = {type: typeof DsActionsEnum.SET_LS_INPUTS, name: string, key: string, pp_data: any}
export type setLsVarsType = {type: typeof DsActionsEnum.SET_LS_VARS, key: string, vars_data: any}
export type setLsBadVarsType = {type: typeof DsActionsEnum.SET_LS_BAD_VARS, key: string, vars_data: any}
export type setLsByType = {type: typeof DsActionsEnum.SET_LS_BY, ls: ILocalStorage}
export type addChildrenToItemsDsType = {
    type: typeof DsActionsEnum.ADD_CHILDREN_TO_ITEMS_DS,
    ds_key: string,
    compare_field: string,
    compare_value: string | number,
    children: any
}
export type setCache = {type: typeof DsActionsEnum.SET_CACHE, key: string, payload: any}
export type clearCache = {type: typeof DsActionsEnum.CLEAR_CACHE, key: string}
export type clearDs = {type: typeof DsActionsEnum.CLEAR_DS, key: string}
export type updateDs = {type: typeof DsActionsEnum.UPDATE_DS, key: string, payload: any}
export type executeDbProcedure = {type: typeof DsActionsEnum.EXECUTE_DB_PROCEDURE, ds_key: string, payload: any, reload_ds: any}
export type executeDbProcedureSuccess = {type: typeof DsActionsEnum.EXECUTE_DB_PROCEDURE_SUCCESS, ds_key: string, payload: any}
export type executeDbProcedureFailed = {type: typeof DsActionsEnum.EXECUTE_DB_PROCEDURE_FAILED, message: string}

export type clearSelect = {type: typeof DsActionsEnum.CLEAR_SELECT, sourceDs: string}

export type DsActionCreatorsType = createRecordFailedType | dataSourceAddKeyValueType | createRecordSuccessType | createRecordType |
    dataSourceSelectMultiType | deleteRecordFailedType | deleteRecordPrimariesType | deleteRecordSuccessType |
    deleteRecordType | editRecordFailedType | editRecordPrimariesType | editRecordSuccessType | editRecordType |
    loadDataSourceFailedType | loadDataSourceSuccessType | loadDataSourceType | setLsType | setLsByType | initLsPPType |
    setLsPPType | initLsInputsType | setLsInputsType | setLsVarsType | setLsBadVarsType | setLoadingType | addChildrenToItemsDsType |
    setCache | clearCache | clearDs | updateDs | executeDbProcedure | clearSelect
