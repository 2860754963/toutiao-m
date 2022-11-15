import request from "@/utils/request";

// 文章列表请求模块
// 获取不同的文章数据
export const getarticle = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params
    })

}

//使用id  获取文章详情 
export const getarticleid = (articleid) => {
    return request({
        method: 'GET',
        url: `/v1_0/articles/${articleid}`
    })
}



// 收藏文章
export const collectedarticle = (id) => {
    return request({
        method: 'POST',
        url: '/v1_0/article/collections',
        data: {
            target: id
        }
    })

}
// 取消收藏
export const canlecollectedarticle = (id) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/collections/${id}`
    })
}

// 增加 喜欢
export const likearticle = (target) => {
    return request({
        method: 'POST',
        url: '/v1_0/article/likings',
        data: {
            target: target
        }
    })
}
//减少喜欢
export const canclearticle = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/likings/${target}`
    })
}
