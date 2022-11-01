// 请求模块
import axios from 'axios'
const request = axios.create({
    baseURL: 'http://geek.itheima.net'
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
