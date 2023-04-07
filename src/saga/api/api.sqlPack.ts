import instance from "./api";

export const ApiSqlPack = {
    sqlPacks() {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.get('/api/sqlPacks/')
            .then(response => response.data)
    },
    createTables(values: any) {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.post('/api/createTables/', values)
            .then(response => response.data)
    },
    checkCreateTables(values: any) {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.post('/api/checkCreateTables/', values)
            .then(response => response.data)
    },
    rollbackTables(values: any) {
        const token = window.localStorage.getItem('user-token');
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.post('/api/rollbackTables/', values)
            .then(response => response.data)
    }
}