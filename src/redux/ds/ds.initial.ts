export interface IColumn {
    search: unknown
    dataIndex: string
    data_source_id: bigint
    id: bigint
    key: string
    title: string
    type: string
    visible: boolean
    pk: boolean
}
export interface IDataSource {
    key: string
    columns: Array<IColumn>
    items: Array<any>
    filter: string
    selectedRowKeys: Array<string>
    selectedRows: Array<any>
    loading: boolean
    loaded: boolean
    title: string
    description: string
    crud: string
    cache: boolean
    pagination?: {
        cur_page: number
        per_page: number
    }
    count: number
}
export interface IDataSourceAll {
    [key: string]: IDataSource
}
export interface IDataSourceInitialized {
    ls: {[key: string]: any}
    ds: IDataSourceAll
    cache: {[p: string]: any}
}
export const initialStateDs: IDataSourceInitialized = {
    ls: {
        pp: {},
        vars: {},
        inputs: {},
        requiredVars: {},
    },
    ds: {},
    cache: {}
}