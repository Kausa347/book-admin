import axios from "axios";
import {message} from "antd";


// axios.defaults.baseURL = 'https://mock.apifox.cn/m1/2398938-0-default/api';
axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.withCredentials = true;

axios.defaults.timeout = 5000;

axios.interceptors.response.use(res => {
    console.log(res)
    if (typeof res.data !== 'object') {
        message.error('服务端错误')
        return Promise.reject(res)
    }
    if (res.status !== 200) {
        message.error(res.data)
        return Promise.reject(res)
    }
    if (res.data === null && res.status === 200) {
        res.data = 'success'
    }
    return res
})

export default axios