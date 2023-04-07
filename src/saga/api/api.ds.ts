import instance from "./api";

interface LoadIDataSource {
    data: {
        columns: Array<{
            dataIndex: string
            key: string
            pk: null | boolean
            title: string
            type: string
            visible: boolean
        }>
        crud: string
        data: Array<any>
        description: string
        key: string
        title: string
        type: string
    }
    userId: number
}
interface CedDataInterface {
    data: any
}

const ApiDs = {
    loadDs(key: string, filter: string) {
        const token = window.localStorage.getItem('user-token');

        let url_params = key + '?' + filter + '&' + Math.random()
        if (token === null)
            return instance.get<LoadIDataSource>('/api/free/mc/' + url_params)
                .then(response => response.data)
        else {
            instance.defaults.headers.authorization = 'Bearer ' + token;
            return instance.get<LoadIDataSource>('/api/mc/' + url_params)
                .then(response => response.data)
        }
    },
    createRecord(ds_key: string, data: any) {
        const token = window.localStorage.getItem('user-token');

        if (token === null)
            return []
        else {
            const payload = {
                "__data": data,
                "__method": "store"
            }
            instance.defaults.headers.authorization = 'Bearer ' + token;
            return instance.post<CedDataInterface>('/api/mc/' + ds_key, payload)
                .then(response => response.data)
        }
    },
    editRecord(ds_key: string, data: any, primaries: Array<{[key: string]: any}>) {
        const token = window.localStorage.getItem('user-token');

        if (token === null)
            return []
        else {
            let filter: string
            let arrFilter: Array<string> = []
            primaries.forEach(p => {
                arrFilter.push(Object.keys(p)[0] + '=' + p[Object.keys(p)[0]])
            })
            filter = arrFilter.join(',')
            const payload = {
                "__data": data,
                "__method": "update",
                "__filter": filter
            }

            instance.defaults.headers.authorization = 'Bearer ' + token;
            return instance.post<CedDataInterface>('/api/mc/' + ds_key, payload)
                .then(response => response.data)
        }
    },
    deleteRecord(ds_key: string, primaries: Array<{[key: string]: any}>) {
        const token = window.localStorage.getItem('user-token');

        if (token === null)
            return []
        else {
            let filter: string
            let arrFilter: Array<string> = []
            primaries.forEach(p => {
                arrFilter.push(Object.keys(p)[0] + '=' + p[Object.keys(p)[0]])
            })
            filter = arrFilter.join(' and ')
            const payload = {
                "__method": "destroy",
                "__filter": filter
            }

            instance.defaults.headers.authorization = 'Bearer ' + token;
            return instance.post<CedDataInterface>('/api/mc/' + ds_key, payload)
                .then(response => response.data)
        }
    },
    executeDbProcedure(ds_key: string, data: any) {
        const token = window.localStorage.getItem('user-token');
        if (token === null)
            return []
        else {
            const payload = {
                "__data": data,
                "__method": "execute",
            }

            instance.defaults.headers.authorization = 'Bearer ' + token;
            return instance.post<CedDataInterface>('/api/mc/' + ds_key, payload)
                .then(response => response.data)
        }
    },
    downloadData(source:string): any {
        const token = window.localStorage.getItem('user-token');
        if (token === null)
            return instance.get('/api/free/project/mc' + source)
                .then(response => response.data)
        else {
            instance.defaults.headers.authorization = 'Bearer ' + token;
            return instance.get('/api/project/mc' + source)
                .then(response => response.data)
        }
    },

    response(source:string):any {
        const token = window.localStorage.getItem('user-token');
        if (token === null)
            return instance.get('/api/free/mc/' + source)
                .then(response => response)
        else {
            instance.defaults.headers.authorization = 'Bearer ' + token;
            return instance.get('/api/mc/' + source)
                .then(response => response)
        }
    }
 }

export default ApiDs