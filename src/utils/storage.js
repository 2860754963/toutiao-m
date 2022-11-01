// 存储项目

export const setitem = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
}



// 读取项目
export const getitem = (key) => {
    const data = window.localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}

// 删除项目
export const removeitem = (key) => {
    window.localStorage.removeItem(key)
}