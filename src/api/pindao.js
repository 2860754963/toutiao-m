import request from '@/utils/request'

// 获取所有的 频道信息
export const getallpindao = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels'
    })
}

// 已登录状态下 把 添加的频道 传过去
export const adduserpindao = channel => {
    return request({
        // GET POST PUT DELETE  PATCH(部分更新)
        method: 'PATCH',
        url: '/v1_0/user/channels',
        data: {
            channels: [channel]//这个参数必须是数组格式，但其实只需要传递一个对象过来即可
            //接口要求必须是数组，但是目前咱们实现的功能只能一次性添加一个频道
        }
    })
}

// 已登录状态下 把 删除 的频道 传过去
export const deluserpindao = channelId => {
    return request({
        // GET POST PUT DELETE  PATCH(部分更新)
        method: 'DELETE',
        url: `/v1_0/user/channels/${channelId}`,
    })
}


