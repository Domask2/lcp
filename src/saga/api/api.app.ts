import instance from "./api";
import {IAuthRemote} from "../../redux/remote/remote.initial";
import axios from "axios";

interface InitializeAppInterfaces {
    data: {
        data: {
            components: Array<any>
            projects: Array<{
                description: string
                id: number
                is_published: boolean
                key: string
                navigations: {
                    key: string
                    title: string
                    visible: boolean
                    children?: Array<{
                        key: string
                        page: string
                        params: string
                        title: string
                    }>
                }
                title: string
                user_id: number
            }>
        }
    }
}
interface LoginInterface {
    email: string
    name: string
    role: string
    token: string
}
const ApiApp = {
    initializeApp() {
        const token = window.localStorage.getItem('user-token');
        if (token === null)
            return instance.get<InitializeAppInterfaces>('/api/free/init')
                .then(response => response.data)
        else {
            instance.defaults.headers.authorization = 'Bearer ' + token;
            return instance.get<InitializeAppInterfaces>('/api/init')
                .then(response => response.data)
        }
    },
    login(values: any) {
        return instance.post<LoginInterface>('/api/auth/login/', values)
            .then(response => response.data)
    },
    logout() {
        instance.defaults.headers.authorization = 'Bearer ' + window.localStorage.getItem('user-token');
        return instance.get('/api/auth/logout/')
            .then(response => response.data)
    },
    users() {
        instance.defaults.headers.authorization = 'Bearer ' + window.localStorage.getItem('user-token');
        return instance.get('/api/users')
            .then(response => response.data)
    },
    updateSettings1(data: FormData) {
        instance.defaults.headers.authorization = 'Bearer ' + window.localStorage.getItem('user-token');
        return instance.post('/api/setting', data)
            .then(response => response.data)
    },
    updateUser(data: any, id: number) {
        instance.defaults.headers.authorization = 'Bearer ' + window.localStorage.getItem('user-token');

        return instance.put(`api/users/${id}`, data)
            .then(response => response.data)
    },
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
    loginRemoteDb(values: IAuthRemote, url: string) {
        const ax = axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        return ax.post<LoginInterface>('/api/auth/login/', values)
            .then(response => response.data)
    },
}

export default ApiApp
