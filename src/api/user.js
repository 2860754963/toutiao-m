import request from "@/utils/request";
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}
export const sendSms = mobile => {
    return request({
        method: 'get',
        url: `/v1_0/sms/codes/${mobile}`
    })
}
// import store from "@/store";
export const getinfo = () => {
    return request({
        method: 'get',
        url: `/v1_0/user`
        // headers: {
        // 因为添加请求头
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}



















