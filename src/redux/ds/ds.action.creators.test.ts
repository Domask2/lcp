import dsActionCreators from "./ds.action.creators";
import {DsActionsEnum} from "./ds.action.types";


describe('Actions', () => {

    it('dataSourceSelectMulti', () => {
        const expectedAction = {
            type: DsActionsEnum.DS_SELECT_MULTI,
            ds_key: 'key1',
            keys: ['key2'],
            rows: ['key3']
        }
        expect(dsActionCreators.dataSourceSelectMulti('key1', ['key2'], ['key3'])).toEqual(expectedAction)
    })

    it('dataSourceAddKeyValue', () => {
        const expectedAction = {
            type: DsActionsEnum.DS_ADD_KEY_VALUE,
            ds_key: 'key1',
            key: 'key2',
            value: 2
        }
        expect(dsActionCreators.dataSourceAddKeyValue('key1', 'key2', 2)).toEqual(expectedAction)
    })

    it('createRecord', () => {
        const expectedAction = {
            type: DsActionsEnum.CREATE_RECORD,
            ds_key: 'key1',
            data: 'key2',
            reload: 'force'
        }
        expect(dsActionCreators.createRecord('key1', 'key2', 'force')).toEqual(expectedAction)
    })

    it('createRecordSuccess', () => {
        const expectedAction = {
            type: DsActionsEnum.CREATE_RECORD_SUCCESS,
            data: 'key1',
            ds_key: 'key2',
            reload: 'lazy'
        }
        expect(dsActionCreators.createRecordSuccess('key1', 'key2', 'lazy')).toEqual(expectedAction)
    })

    it('createRecordFailed', () => {
        const expectedAction = {
            type: DsActionsEnum.CREATE_RECORD_FAILED,
            message: 'message',
        }
        expect(dsActionCreators.createRecordFailed('message')).toEqual(expectedAction)
    })

    it('editRecord', () => {
        const expectedAction = {
            type: DsActionsEnum.EDIT_RECORD,
            ds_key: 'key2',
            data: 22,
            primaries: {
                key: 2
            },
            reload: 'lazy'
        }
        expect(dsActionCreators.editRecord('key2', 22, {key: 2}, 'lazy')).toEqual(expectedAction)
    })

    it('editRecordSuccess', () => {
        const expectedAction = {
            type: DsActionsEnum.EDIT_RECORD_SUCCESS,
            data: 222,
            ds_key: 'key1',
            reload: 'force'
        }
        expect(dsActionCreators.editRecordSuccess(222, 'key1', 'force')).toEqual(expectedAction)
    })

    it('editRecordFailed', () => {
        const expectedAction = {
            type: DsActionsEnum.EDIT_RECORD_FAILED,
            message: 'message',
        }
        expect(dsActionCreators.editRecordFailed('message')).toEqual(expectedAction)
    })

    it('deleteRecord', () => {
        const expectedAction = {
            type: DsActionsEnum.DELETE_RECORD,
            ds_key: 'key2',
            primaries: {
                key: 2
            },
            reload: 'lazy'
        }
        expect(dsActionCreators.deleteRecord('key2', {key: 2}, 'lazy')).toEqual(expectedAction)
    })

    it('deleteRecordSuccess', () => {
        const expectedAction = {
            type: DsActionsEnum.DELETE_RECORD_SUCCESS,
            ds_key: 'key2',
            reload: 'lazy'
        }
        expect(dsActionCreators.deleteRecordSuccess('key2', 'lazy')).toEqual(expectedAction)
    })

    it('deleteRecordFailed', () => {
        const expectedAction = {
            type: DsActionsEnum.DELETE_RECORD_FAILED,
            message: 'message'
        }
        expect(dsActionCreators.deleteRecordFailed('message')).toEqual(expectedAction)
    })

    it('setLoading', () => {
        const expectedAction = {
            type: DsActionsEnum.SET_LOADING,
            ds_key: 'key1',
            value: false
        }
        expect(dsActionCreators.setLoading('key1', false)).toEqual(expectedAction)
    })

    it('setLs', () => {
        const expectedAction = {
            type: DsActionsEnum.SET_LS,
            key: 'key1',
            ls_data: [false, '12312']
        }
        expect(dsActionCreators.setLs('key1', [false, '12312'])).toEqual(expectedAction)
    })

    it('initLsPP', () => {
        const expectedAction = {
            type: DsActionsEnum.INIT_LS_PP,
            pp_data: 'key1',
        }
        expect(dsActionCreators.initLsPP('key1')).toEqual(expectedAction)
    })

    it('setLsPP', () => {
        const expectedAction = {
            type: DsActionsEnum.SET_LS_PP,
            name: 'key1',
            key: 'key2',
            pp_data: [false, '12312']
        }
        expect(dsActionCreators.setLsPP('key1', 'key2', [false, '12312'])).toEqual(expectedAction)
    })

    it('initLsInputs', () => {
        const expectedAction = {
            type: DsActionsEnum.INIT_LS_INPUTS,
            pp_data: [false, '12312']
        }
        expect(dsActionCreators.initLsInputs([false, '12312'])).toEqual(expectedAction)
    })

    it('setLsInputs', () => {
        const expectedAction = {
            type: DsActionsEnum.SET_LS_INPUTS,
            name: 'key1',
            key: 'key2',
            pp_data: [false, '12312']
        }
        expect(dsActionCreators.setLsInputs('key1', 'key2', [false, '12312'])).toEqual(expectedAction)
    })

    it('setLsVars', () => {
        const expectedAction = {
            type: DsActionsEnum.SET_LS_VARS,
            key: 'key2',
            vars_data: [false, '12312']
        }
        expect(dsActionCreators.setLsVars('key2', [false, '12312'])).toEqual(expectedAction)
    })

    it('setLsBadVars', () => {
        const expectedAction = {
            type: DsActionsEnum.SET_LS_BAD_VARS,
            key: 'key2',
            vars_data: [false, '12312']
        }
        expect(dsActionCreators.setLsBadVars('key2', [false, '12312'])).toEqual(expectedAction)
    })

    it('setLsBy', () => {
        const ILocalStorageTypeObj = {
            key: 'key1',
            value: "__params",
            column: 'column',
            ds_key: 'key_ds'
        }
        const expectedAction = {
            type: DsActionsEnum.SET_LS_BY,
            ls: ILocalStorageTypeObj
        }
        expect(dsActionCreators.setLsBy(ILocalStorageTypeObj)).toEqual(expectedAction)
    })

    it('addChildrenToItemsDs', () => {
        const expectedAction = {
            type: DsActionsEnum.ADD_CHILDREN_TO_ITEMS_DS,
            ds_key: 'key1',
            compare_field: 'key2',
            compare_value: [false, '12312'],
            children: [false, '12312'],
        }
        expect(dsActionCreators.addChildrenToItemsDs('key1', 'key2', [false, '12312'], [false, '12312'])).toEqual(expectedAction)
    })

    it('setCache', () => {
        const expectedAction = {
            type: DsActionsEnum.SET_CACHE,
            key: 'key2',
            payload: [false, '12312']
        }
        expect(dsActionCreators.setCache('key2', [false, '12312'])).toEqual(expectedAction)
    })

    it('clearCache', () => {
        const expectedAction = {
            type: DsActionsEnum.CLEAR_CACHE,
            key: 'key2',
        }
        expect(dsActionCreators.clearCache('key2')).toEqual(expectedAction)
    })

    it('clearDs', () => {
        const expectedAction = {
            type: DsActionsEnum.CLEAR_DS,
            key: 'key2',
        }
        expect(dsActionCreators.clearDs('key2')).toEqual(expectedAction)
    })

    it('updateDs', () => {
        const expectedAction = {
            type: DsActionsEnum.UPDATE_DS,
            key: 'key2',
            payload: [false, '12312']
        }
        expect(dsActionCreators.updateDs('key2', [false, '12312'])).toEqual(expectedAction)
    })

    it('loadDataSource', () => {
        const expectedAction = {
            type: DsActionsEnum.LOAD_DATA_SOURCE,
            key: 'key1',
            filter: 'key2',
            cache: false,
            target: '12312'
        }
        expect(dsActionCreators.loadDataSource('key1', 'key2', false, '12312')).toEqual(expectedAction)
    })

    it('loadDataSourceSuccess', () => {
        const IDataSourceObj = {
            key: 'string',
            columns: [
                {
                    search: 1,
                    dataIndex: 'string',
                    data_source_id: BigInt(9007199254740991),
                    id: BigInt(9007199254740991),
                    key: 'string',
                    title: 'string',
                    type: 'string',
                    visible: true,
                    pk: true,
                }
            ],
            items: [1, 'qwe'],
            filter: 'string',
            selectedRowKeys: ['qwe', '123'],
            selectedRows: [1, 'qwe'],
            loading: false,
            loaded: false,
            title: 'string',
            description: 'string',
            crud: 'string',
            cache: true,
            count: 123,
        }
        const expectedAction = {
            type: DsActionsEnum.LOAD_DATA_SOURCE_SUCCESS,
            ds: IDataSourceObj,
            filter: 'key2',
            cache: false,
            target: '12312',
        }
        expect(dsActionCreators.loadDataSourceSuccess(IDataSourceObj, 'key2', false, '12312')).toEqual(expectedAction)
    })

    it('loadDataSourceFailed', () => {
        const expectedAction = {
            type: DsActionsEnum.LOAD_DATA_SOURCE_FAILED,
            message: 'message',
        }
        expect(dsActionCreators.loadDataSourceFailed('message')).toEqual(expectedAction)
    })

    it('executeDbProcedure', () => {
        const expectedAction = {
            type: DsActionsEnum.EXECUTE_DB_PROCEDURE,
            ds_key: 'key1',
            payload: ['key2'],
            reload_ds: ['false', '12312'],
        }
        expect(dsActionCreators.executeDbProcedure('key1', ['key2'], ['false', '12312'])).toEqual(expectedAction)
    })

    it('executeDbProcedureFailed', () => {
        const expectedAction = {
            type: DsActionsEnum.EXECUTE_DB_PROCEDURE_FAILED,
            message: 'message',
        }
        expect(dsActionCreators.executeDbProcedureFailed('message')).toEqual(expectedAction)
    })

    it('executeDbProcedureSuccess', () => {
        const expectedAction = {
            type: DsActionsEnum.EXECUTE_DB_PROCEDURE_SUCCESS,
            payload: 'key1',
            ds_key: 'key2',
        }
        expect(dsActionCreators.executeDbProcedureSuccess('key1', 'key2')).toEqual(expectedAction)
    })

    it('clearSelect', () => {
        const expectedAction = {
            type: DsActionsEnum.CLEAR_SELECT,
            sourceDs: 'sourceDs',
        }
        expect(dsActionCreators.clearSelect('sourceDs')).toEqual(expectedAction)
    })

})

