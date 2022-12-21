import {IAuthRemote} from "../../redux/remote/remote.initial";
import axios from "axios";

interface LoginInterface {
    email: string
    name: string
    role: string
    token: string
}
const ApiRemote = {
    loginRemote(values: IAuthRemote) {
        const ax = axios.create({
            baseURL: values.url,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        return ax.post<LoginInterface>('/api/auth/login/', values)
            .then(response => response.data)
    },
    loadRemoteDb(values: IAuthRemote) {
        const ax = axios.create({
            baseURL: values.url,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        ax.defaults.headers.authorization = 'Bearer ' + values.token;
        return ax.get('/api/db/')
            .then(response => response.data)
    },
    loadRemoteAddDb(values: IAuthRemote, db: any) {
        const ax = axios.create({
            baseURL: values.url,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        ax.defaults.headers.authorization = 'Bearer ' + values.token;
        return ax.post('/api/db/', db)
            .then(response => response.data)
    },
    loadRemoteAddDs(values: IAuthRemote, ds: any) {
        const ax = axios.create({
            baseURL: values.url,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        ax.defaults.headers.authorization = 'Bearer ' + values.token;
        return ax.post('/api/ds/', ds)
            .then(response => response.data)
    },
    loadRemoteAddDsFields(values: IAuthRemote, dsFields: any) {
        const ax = axios.create({
            baseURL: values.url,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        ax.defaults.headers.authorization = 'Bearer ' + values.token;
        return ax.post('/api/dsf/', dsFields)
            .then(response => response.data)
    },
    loadRemoteAddDsAccess(values: IAuthRemote, dsAccess: any) {
        const ax = axios.create({
            baseURL: values.url,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        ax.defaults.headers.authorization = 'Bearer ' + values.token;
        return ax.post('/api/dsa/', dsAccess)
            .then(response => response.data)
    },
    loadRemoteAddDsAll(values: IAuthRemote, dsAll: any) {
        const ax = axios.create({
            baseURL: values.url,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        ax.defaults.headers.authorization = 'Bearer ' + values.token;
        return ax.post('/api/allDs/', dsAll)
            .then(response => response.data)
    },
    loadRemoteProject(values: IAuthRemote, project: any) {
        const ax = axios.create({
            baseURL: values.url,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        ax.defaults.headers.authorization = 'Bearer ' + values.token;
        return ax.post('/api/projectRemote/', project)
            .then(response => response.data)
    },
    loadRemotePages(values: IAuthRemote, page: any) {
        const ax = axios.create({
            baseURL: values.url,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        ax.defaults.headers.authorization = 'Bearer ' + values.token;
        return ax.post('/api/pageRemote/', page)
            .then(response => response.data)
    },
    loadRemotePagesAll(values: IAuthRemote, pages: any) {
        const ax = axios.create({
            baseURL: values.url,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        ax.defaults.headers.authorization = 'Bearer ' + values.token;
        return ax.post('/api/pageRemoteAll/', pages)
            .then(response => response.data)
    },
}

export default ApiRemote
