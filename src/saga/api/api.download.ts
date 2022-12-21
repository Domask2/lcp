import instance from "./api";

export const ApiDownload = {
    downloadStore(values: any): any {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.post('/api/download/', values)
            .then(response => response.data)
    },
    downloadStoreInProject(values: any): any {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.post('/api/downloadInProject/', values)
            .then(response => response.data)
    },
    downloadShow(type:string, project:string = '', page:string = ''): any {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        let url = '/api/download/' + type;
        if(project && !page) {
            url = '/api/download/' + type + '/' + project + '/'
        } else if (project && page) {
            url = '/api/download/' + type + '/' + project + '/' +  page
        }
        return instance.get(url)
            .then(response => response.data)
    },
    downloadProjectFileSystem(project:string) {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.get('/api/allFiles/' + project)
            .then(response => response.data)
    },
    downloadEdit(id:number, values:any) {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.put('/api/download/' + id, values)
            .then(response => response.data)
    },
    downloadDelete(id:number) {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.delete('/api/download/' + id)
            .then(response => response.data)
    },
    downloadUniqueProject() {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.get('/api/uniqueProject/')
            .then(response => response.data)
    },
    downloadUniquePage(page:string) {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.get('/api/uniquePage/' + page)
            .then(response => response.data)
    },
    downloadUniqueUserElement(element:string) {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.get('/api/uniqueUserElement/' + element)
            .then(response => response.data)
    },
    downloadUniquePageElement(element:string) {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.get('/api/uniquePageElement/' + element)
            .then(response => response.data)
    },
    downloadUniquePageElementItem(item:string) {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.get('/api/uniquePageElementItem/' + item)
            .then(response => response.data)
    },
    downloadAllFiles() {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.get('/api/allFiles/')
            .then(response => response.data)
    },
    downloadCreateTables(values:any) {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.post('/api/createTables/', values)
            .then(response => response.data)
    },
    downloadCheckCreateTables(values:any) {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.post('/api/checkCreateTables/', values)
            .then(response => response.data)
    }
}