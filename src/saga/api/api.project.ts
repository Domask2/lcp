import instance from "./api";
import DefaultTamplates from "./data/default_values";

const ApiProject = {
    loadProject(project_id: any): any {
        const token = window.localStorage.getItem('user-token');
        if (token === null)
            return instance.get('/api/free/project/' + project_id + '/pages')
                .then(response => response.data)
        else {
            instance.defaults.headers.authorization = 'Bearer ' + token;
            return instance.get('/api/project/' + project_id + '/pages')
                .then(response => response.data)
        }
    },
    savePage(page: any): any {
        const token = window.localStorage.getItem('user-token');
        if (token === null)
            return []
        else {
            instance.defaults.headers.authorization = 'Bearer ' + token;
            return instance.put('/api/page/' + page.id, page)
                .then(response => response.data)
        }
    },
    createPage(project: any, key: string): any {
        const token = window.localStorage.getItem('user-token');
        if (token === null)
            return []
        else {
            instance.defaults.headers.authorization = 'Bearer ' + token;
            const data = {
                ...DefaultTamplates.STANDART.template,
                title: 'Новая страница',
                key: key,
                project_id: project.id,
            }

            return instance.post('/api/page', data)
                .then(response => response.data)
        }
    },
    createTemplatesPage(project: any, key: string, tamplateKey: string): any {
        console.log(tamplateKey);

        const token = window.localStorage.getItem('user-token');
        if (token === null)
            return []
        else {
            instance.defaults.headers.authorization = 'Bearer ' + token;
            let tamplate = DefaultTamplates[tamplateKey].template;
            // switch (tamplateKey) {
            //     case DefaultTamplates.STANDART.key:
            //         tamplate = DefaultTamplates.STANDART.template
            //         break;
            //     case DefaultTamplates.LEFT_MENU.key:
            //         tamplate = DefaultTamplates.LEFT_MENU.template
            //         break;
            // }
            const data = {
                ...tamplate,
                title: 'Новая страница',
                key: key,
                project_id: project.id,
            }

            return instance.post('/api/page', data)
                .then(response => response.data)
        }
    },

    createProject(): any {
        const token = window.localStorage.getItem('user-token');
        if (token === null)
            return []
        else {
            instance.defaults.headers.authorization = 'Bearer ' + token;
            const data = {}
            return instance.post('/api/project', data)
                .then(response => response.data)
        }
    },
    deleteProject(key: string): any {
        const token = window.localStorage.getItem('user-token');
        if (token === null)
            return []
        else {
            instance.defaults.headers.authorization = 'Bearer ' + token;
            return instance.delete('/api/project/' + key)
        }
    },
    saveProject(project: any): any {
        const token = window.localStorage.getItem('user-token');
        if (token === null)
            return []
        else {
            instance.defaults.headers.authorization = 'Bearer ' + token;
            return instance.put('/api/project/' + project.id, project)
                .then(response => response.data)
        }
    },
    saveProjectFormData(form_data: any): any {
        const token = window.localStorage.getItem('user-token');
        if (token === null)
            return []
        else {
            instance.defaults.headers.authorization = 'Bearer ' + token;
            return instance.post('/api/projectFormData/', form_data)
                .then(response => response.data)
        }
    },
}

export default ApiProject