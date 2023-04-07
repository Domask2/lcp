import instance, {baseUrl} from "../saga/api/api";


export const downloadData = (source: string, params?: { [key: string]: { name: string, type: string } }[] | undefined) => {
    let fileName = 'file';
    params && Object.values(params).forEach((param) => {
        if (Object.keys(param)[0] === '__table_name') {
            fileName = Object.values(param)[0].name
        }
    })

    const token = window.localStorage.getItem('user-token');
    if (token === null)
        return instance.get('/api/free/mc/' + source)
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName); //or any other extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
    else {
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.get('/api/mc/' + source)
            .then(response => {
                if (response?.data && response?.data?.data.includes('dbf')) {
                    const url = `${baseUrl}/${response.data.data}`;
                    const link = document.createElement('a');
                    link.href = url;
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                } else {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', fileName); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                }
            })
    }
}

export const ajaxData = (source: string, params: { [key: string]: { name: string, type: string } }[] | undefined, key: string | undefined) => {
    let fileName = 'file';
    params && Object.values(params).forEach((param) => {
        if (Object.keys(param)[0] === '__table_name') {
            fileName = Object.values(param)[0].name
        }
    })

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

export const getData = (source: string): any => {
    const link = document.createElement('a');
    link.href = source;
    link.setAttribute('target', '_blank'); //or any other extension
    document.body.appendChild(link);
    link.click();
    link.remove();
}