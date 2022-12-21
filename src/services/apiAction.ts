import instance from "../saga/api/api";

export const downloadData = (source: string): any => {
    const token = window.localStorage.getItem('user-token');
    if (token === null)
        return instance.get('/api/free/mc/' + source)
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.txt'); //or any other extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
    else {
        instance.defaults.headers.authorization = 'Bearer ' + token;
        return instance.get('/api/mc/' + source)
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.txt'); //or any other extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
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