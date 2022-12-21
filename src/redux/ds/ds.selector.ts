import {createSelector} from "reselect";
import {IDataSource, IDataSourceAll} from "./ds.initial";
import {RootState} from "../redux.store";
import {mappedText} from "../../services/myService";

export const getDataSourcesAll = (state: RootState): IDataSourceAll => state.ds.ds;

export const getDataSourceAll = createSelector(
    [getDataSourcesAll], (all: IDataSourceAll) => {
        return all
    }
);

export const getDataSource = (state: RootState, ds_key: any): IDataSource => state.ds.ds[ds_key];

export const getDataSourceKeys = (state: RootState): IDataSourceAll => state.ds.ds

export const getDataSourceLs = (state: RootState): IDataSourceAll => state.ds.ls

export const getDataSourceLsVars = (state: RootState): IDataSourceAll => state.ds.ls.vars

export const getDataSourceAllLs = createSelector(
    [getDataSourceLs], (ls: IDataSourceAll) => {
        return ls
    }
);

export const getRootState = (state: RootState): RootState => state

export const getDataSourcesKeys = createSelector(
    [getDataSourceKeys], (all: IDataSourceAll) => {
        return Object.keys(all)
    }
);

export const getDataSourceSelectedRowKeys = (state: RootState, ds_key: string | undefined): Array<string> => {
    let ds: any = getDataSource(state, ds_key)
    if (ds === undefined)
        return []

    if (ds.selectedRowKeys === undefined)
        ds.selectedRowKeys = []

    return ds.selectedRowKeys
}

/**
 * Возвращает массив выделенных строк в источнике от которого зависит текущий.
 * Этот массив в дальнейшем называем master. В нем содержатся данные от которых зависит наш источник.
 *
 * @param state
 * @param dependency
 */
export const getMasterFnc = (state: RootState, dependency: string | undefined): Array<any> | null => {
    if (dependency === undefined || dependency === null) return null

    let arr = dependency.split(':')
    if (state.ds.ds[arr[0]] === undefined) return []

    if (state.ds.ds[arr[0]].selectedRows !== undefined)
        return state.ds.ds[arr[0]].selectedRows

    return []
}
export const getMaster = createSelector([getMasterFnc], (ret: any) => {
    return ret
})


/**
 * Возвращает объект key => value. Где ключ это это key DS мутатора, а value это сам DS мутатор.
 *
 * @param state
 * @param cmp
 */
interface cInterface {
    [p: string]: {modal?: "this" | "mutate"; mutate?: string; link?: string; type?: string}
}

export const getMutators = (state: RootState, columns: cInterface | undefined): IDataSourceAll | [] => {
    if (columns === undefined) return []
    let result: any = {}
    let arr_mutator: any = []
    /** Переберем описание колонок в таблице если оно есть */

    Object.keys(columns).forEach((key: string) => {
        if (columns[key].mutate === undefined || columns[key].mutate === null) return

        /** Если среди описания колонок нашли 'mutate' то вытаскиваем ds для этой мутации. */
        arr_mutator = columns[key].mutate?.split(':')
        result[key] = state.ds.ds[arr_mutator[0]]
    })

    return result
}

export const getDataSourceItem_ = (state: RootState, ds_key: string, column: string, value: any) => {
    let result: any = undefined
    if (state.ds.ds[ds_key] !== undefined) {
        // eslint-disable-next-line eqeqeq
        result = state.ds.ds[ds_key].items.filter((item: any) => item[column] == value)
    }

    return {
        row: result === undefined ? [] : result[0],
        columns: state.ds.ds[ds_key] !== undefined ? state.ds.ds[ds_key].columns : []
    }
}
export const getDataSourceItem = createSelector(
    [getDataSourceItem_], (entity: any) => {
        return entity
    }
);
export const getLsByKey =
    (state: RootState, key: string) => state.ds.ls[key] !== undefined ? state.ds.ls[key] : false

export const getLs = (state: RootState) => state.ds.ls

export const getLsVars = (state: RootState) => state.ds.ls.vars

export const getLsVarsReselect = createSelector(
    [getLsVars], (all: any) => {
        return all
    }
);

export const getDsByKey =
    (state: RootState, key: string) => state.ds.ds[key] !== undefined ? state.ds.ds[key] : false

export const getCache = (state: RootState, key: string) => state.ds.cache[key] !== undefined ? state.ds.cache[key] : false
export const getCacheAll = (state: RootState) => state.ds.cache

/**
 * Функция меняет в строке название переменых на их значение. [[ls_key:column_name]]
 *
 * @param state
 * @param text
 */
export const getMappedText = (state: RootState, text: string) => {
    if (text === undefined)
        return ''

    return mappedText(state, text)
}


export const getMappedObj = (state: RootState, obj?: {[key: string]: string | number | boolean}) => {
    let resultObj: {[key: string]: string | number | boolean} = {}

    if (obj !== undefined)
        Object.keys(obj).forEach((key: string) => {
            resultObj[key] = getMappedText(state, obj[key].toString())
        })

    return resultObj
}