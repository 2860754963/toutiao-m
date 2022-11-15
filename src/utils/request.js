// 请求模块

import JSONBig from 'json-bigint'
import axios from 'axios'
const request = axios.create({
    // baseURL: 'http://toutiao.itheima.net',
    baseURL: 'http://geek.itheima.net',
    //在这里处理 后端返回 json格式的大数据  而前端 经过axios的json.parse()的隐式转换 丢失精度的问题
    //1.利用 json-bigint@0.3.0  进行解决
    //2.在 axios 的响应配置中 `transformRequest` 允许在向服务器发送前，修改请求数据,在原始数据被处理前 修改数据
    transformResponse: [function (data) {
        try {
            // 如果转换成功则返回转换的数据结果
            return JSONBig.parse(data)
        } catch (err) {
            // 如果转换失败，则包装为统一数据格式并返回
            return {
                data
            }
        }
    }]
})
// 与导出一样的
// axios.defaults.baseURL = "http://toutiao.itheima.net/"


import store from '@/store'

request.interceptors.request.use(function (config) {
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    const { user } = store.state
    if (user && user.token) {// 只有登陆之后，有了user才会添加token
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config   // 注意：这里务必要返回 config 配置对象，否则请求就停在这里出不去了
}, function (error) {
    // 如果请求出错了（还没有发出去）会进入这里
    return Promise.reject(error)
})

export default request





