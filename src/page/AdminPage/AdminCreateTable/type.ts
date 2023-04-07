export interface sqlPackI {
    id: number,
    description: string,
    key: string,
    order: string,
    title: string,
    value?: string,
    label?: string
}

export interface dataSourceFieldsI {
    dataIndex: string
    key: string
    pk: string | null
    search: boolean
    title: string
    type: string
    visible: boolean
}

export interface dataSourceAccessI {
    key: string
    source_name: string
    role: any
}

export interface dataSourceI {
    dataSourceAccess: dataSourceAccessI[] | []
    dataSourceFields: dataSourceFieldsI[] | []
    description: string | null
    key: string
    title: string
    type: string
}

export interface dataBaseI {
    charset: string
    dataSources: dataSourceI[] | []
    database: string
    description: string | null
    driver: string
    host: string
    id: number
    key: string
    password: string
    port: string
    prefix: string | null
    prefix_indexes: string | null
    schema: string
    sslmode: string | null
    title: string
    url: string | null
    username: string
    check?: boolean
    sqlPack?: string
}