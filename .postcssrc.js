// npm install postcss-pxtorem@5.1.1 -D 
// 这是postcss的配置文件，这个是node.js编写的，基于node.js运行的
// PostCSS是处理css的工具本身，只是解析代码，将代码交给其插件进行处理
// 他的插件体系非常强大

// 将px转化为rem，注意：行内样式的 大小不会转
module.exports = {

    plugins: {
        // 因为 在vue-cli中已经配置过了，所以再次进行配置的话，就会红色警告
        // 'autoprefixer': {
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        // },
        'postcss-pxtorem': {
            // lib-flexible 的 REM 适配方案：把一行分为 10 份，每份就是十分之一
            // 所以 rootValue 应该设置为你的设计稿宽度的十分之一
            // 我们的设计稿是 750，所以应该设置为 750 / 10 = 75
            // 但是 Vant 建议设置为 37.5，为什么？因为 Vant 是基于 375 写的
            // 所以必须设置为 37.5，唯一的缺点就是使用我们设计稿的尺寸都必须 / 2
            // 有没有更好的办法？
            //   如果是 Vant 的样式，就按照 37.5 来转换
            //   如果是 我们自己 的样式，就按照 75 来转换
            // 通过查阅文档，我们发现 rootValue 支持两种类型：
            //    数字：固定的数值
            //    函数：可以动态处理返回
            //          postcss-pxtorem 处理每个 CSS 文件的时候都会来调用这个函数
            //          它会把被处理的 CSS 文件相关的信息通过参数传递给该函数
            // file ： vant-button.css
            // file :  login.vue


            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            rootValue(obj) {
                //如果vant的索引不等于-1，说明包含vant字眼，就是vant的样式，返回37.5
                return obj.file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            // 配置要转换的css属性
            propList: ['*'],
            // 配置不做单位转换的资源文件名
            exclude: 'github-markdown'
        }
    }
}
