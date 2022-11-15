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

// 获取用户频道列表
export const getuserpindao = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}

/**
 * 关注用户
 */
export const addFollow = target => {
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data: {//post请求方式，要传递的数据，放入data对象中
            target  //target关注目标（被关注的用户id）
        }
    })
}

/**
 * 取消关注用户
 */
export const deleteFollow = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${target}`//target目标用户（被取消关注的用户id）
    })
}

/**
 * 获取用户个人资料
 */
// 获取指定用户信息
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/profile'
    })
}
/**
 * 更新用户资料
 */
export const updateUserProfile = data => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/profile',
        data
    })
}

/**
 * 更新用户照片资料
 */
export const updateUserPhoto = data => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/photo',
        data
    })
}












