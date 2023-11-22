'use client'

import axios from "axios";
import {message} from "antd";


axios.defaults.baseURL = 'https://mock.apifox.cn/m1/2398938-0-default/api'

axios.defaults.withCredentials = true

axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        message.error('服务端错误')
        return Promise.reject(res)
    }
    message.success('数据获取成功')
    return res.data
})

export default axios