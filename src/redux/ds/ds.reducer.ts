import {IDataSourceInitialized, initialStateDs} from "./ds.initial";
import {DsActionCreatorsType, DsActionsEnum} from "./ds.action.types";

const dsReducer = (state = initialStateDs, action: DsActionCreatorsType): IDataSourceInitialized => {
    let new_state: any = []
    let cache: any = []
    let dataSources: any = {}
    let ls

    switch (action.type) {
        case DsActionsEnum.DS_SELECT_MULTI:
            new_state = {...state, ds: {...state.ds}, ls: {...state.ls}}

            new_state.ds[action.ds_key].selectedRowKeys = action.keys
            new_state.ds[action.ds_key].selectedRows = action.rows

            new_state.ds['selected-' + action.ds_key] = {
                ...new_state.ds[action.ds_key],
                items: action.rows
            }

            return new_state
        case DsActionsEnum.DS_TABLE_ROW_SELECT:
            return new_state
        case DsActionsEnum.DS_ADD_KEY_VALUE:
            new_state = {...state, ds: {...state.ds}}
            let ds = {...new_state.ds[action.ds_key]}
            ds[action.key] = action.value
            new_state.ds[action.ds_key] = ds
            // console.log(new_state)
            return new_state
        case DsActionsEnum.LOAD_DATA_SOURCE_SUCCESS:
            dataSources = {...state.ds};
            if (action.target) {

                let newItems: Array<any> = []
                let arrTar = action.target.split(':')
                let targetKey = arrTar[0]
                let targetCompareField = arrTar[2]
                let targetValue: any = action.filter.split('=')
                targetValue = targetValue[2]

                state.ds[targetKey].items.forEach(item => {
                    let newItem
                    if (item[targetCompareField].toString() === targetValue.toString()) {
                        newItem = {...item}
                        newItem.children = action.ds.data.data
                    } else newItem = item
                    newItems.push(newItem)
                })

                dataSources = {...state.ds}
                dataSources[targetKey].items = newItems
            }

            dataSources[action.ds.data.key] = {              //ключ нашего источника храним тут
                key: action.ds.data.key,                  //ключ будет переписан ключем таблицы из БД
                columns: action.ds.data.columns,
                title: action.ds.data.title,
                description: action.ds.data.description,
                items: action.ds.data.data,
                type: action.ds.data.type,
                crud: action.ds.data.crud,
                filter: action.filter,
                cache: action.cache,
                count: action.ds.data.count
            };

            return {...state, ds: dataSources}
        case DsActionsEnum.CREATE_RECORD_SUCCESS:
        case DsActionsEnum.EDIT_RECORD_SUCCESS:
        case DsActionsEnum.DELETE_RECORD_SUCCESS:
            return state
        case DsActionsEnum.SET_LOADING:
            dataSources = {...state.ds}
            const value = action.value !== undefined ? action.value : true
            if (dataSources[action.ds_key] !== undefined) {
                dataSources[action.ds_key] = {...dataSources[action.ds_key]}
                dataSources[action.ds_key].loading = value
            }

            return {...state, ds: {...dataSources}}
        case DsActionsEnum.SET_LS:
            ls = {...state.ls}
            // ls[action.key] = action.ls_data
            ls[action.key] = {...ls[action.key], ...action.ls_data}
            return {...state, ls: ls}

        case DsActionsEnum.INIT_LS_PP:
            ls = {...state.ls}
            ls.pp = {...action.pp_data, ...ls.pp}
            return {...state, ls: ls}

        case DsActionsEnum.SET_LS_PP:
            ls = {...state.ls}
            ls.pp[action.name] = {...ls.pp[action.name]}
            ls.pp[action.name][action.key] = action.pp_data
            return {...state, ls: ls}

        case DsActionsEnum.INIT_LS_INPUTS:
            ls = {...state.ls}
            ls.inputs = {...action.pp_data, ...ls.inputs}
            return {...state, ls: ls}

        case DsActionsEnum.SET_LS_INPUTS:
            ls = {...state.ls}
            ls.inputs[action.name] = {...ls.inputs[action.name]}
            ls.inputs[action.name][action.key] = action.pp_data
            return {...state, ls: ls}

        case DsActionsEnum.SET_LS_VARS:
            ls = {...state.ls}
            ls.vars[action.key] = action.vars_data
            return {...state, ls: ls}

        case DsActionsEnum.SET_LS_BAD_VARS:
            ls = {...state.ls}
            ls.requiredVars[action.key] = action.vars_data
            return {...state, ls: ls}

        case DsActionsEnum.SET_LS_BY:
            ls = {...state.ls}
            const result = state.ds[action.ls.ds_key].items.filter(item =>
                item[action.ls.column]?.toString() === action.ls.value?.toString()
            )
            ls[action.ls.key] = {
                columns: state.ds[action.ls.ds_key].columns,
                row: result[0]
            }

            return {...state, ls: ls}
        case DsActionsEnum.ADD_CHILDREN_TO_ITEMS_DS:
            let newItems: Array<any> = []
            state.ds[action.ds_key].items.forEach(item => {
                let newItem
                if (item[action.compare_field].toString() === action.compare_value.toString()) {
                    newItem = {...item}
                    newItem.children = action.children
                } else newItem = item
                newItems.push(newItem)
            })

            dataSources = {...state.ds}
            dataSources[action.ds_key].items = newItems

            return {...state, ds: dataSources}
        case DsActionsEnum.SET_CACHE:
            cache = {...state.cache}
            cache[action.key] = action.payload
            return {...state, cache: cache}
        case DsActionsEnum.CLEAR_CACHE:
            cache = {...state.cache}
            if (action.key !== 'all')
                delete cache[action.key]
            else
                cache = {}

            return {...state, cache: cache}
        case DsActionsEnum.CLEAR_DS:
            dataSources = {...state.ds}
            if (action.key !== 'all')
                delete dataSources[action.key]
            else
                dataSources = {}

            return {...state, ds: dataSources}
        case DsActionsEnum.UPDATE_DS:
            dataSources = {...state.ds}
            let row: any = {}
            /**
             * Тут нужно проверить DS ли это. Пока только DS там должны быть.
             */
            dataSources[action.key] = {...dataSources[action.key]}
            dataSources[action.key].items = [...dataSources[action.key].items]
            dataSources[action.key].items[0] = {...dataSources[action.key].items[0]}

            Object.keys(dataSources[action.key].items[0]).forEach(key => {
                row[key] = action.payload[key] !== undefined ? action.payload[key] : dataSources[action.key].items[0][key]
            })

            dataSources[action.key].items[0] = row
            return {...state, ds: dataSources}
        case DsActionsEnum.CLEAR_SELECT:
            dataSources = {...state.ds}
            delete dataSources[action.sourceDs]
            return {...state, ds: dataSources}
        case DsActionsEnum.CREATE_RESPONSE_SUCCESS:
            dataSources = {...state.ds}
            dataSources[`ajax-${action.key}`] = action.payload
            return {...state, ds: dataSources}
        default:
            return state
    }
}

export default dsReducer