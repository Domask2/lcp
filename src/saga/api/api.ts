import axios from "axios";
// eslint-disable-next-line no-restricted-globals
export let baseUrl = location.origin

if (baseUrl.includes('admin.lcp.plinor')) baseUrl = baseUrl.replace('admin.lcp.plinor', 'back.lcp.plinor');
if (baseUrl.includes('client.lcp.plinor')) baseUrl = baseUrl.replace('client.lcp.plinor', 'back.lcp.plinor');

if (!baseUrl.includes('back.lcp'))
    baseUrl = 'http://b.lcplinor.ru'
// baseUrl = 'http://127.0.0.1:8000'
// baseUrl = 'http://127.0.0.1:80'

const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

export default instance