import axios from "axios";

const portApi = '4056';

const ip = '192.168.19.82';

const apiUrlLocal = `http://${ip}:${portApi}`;

const api = axios.create({
    baseURL: apiUrlLocal
})

export default api;