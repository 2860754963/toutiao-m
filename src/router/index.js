import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
    // #这里是路由懒加载的写法
    // # 默认情况下，vue脚手架打包会将所有vue文件打包到一个文件中，那么此时访问/ login，就会把打包之后的总文件加载到内存中，这样做浪费空间，访问界面效率比较低
    // # 路由懒加载处理之后，就不会合并打包，默认一个vue文件，打包一个对应的文件

  }, {
    path: '/',
    // name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',///孩子这里的path如果不写的话 默认就是 默认子路由，只能有一个
        name: 'shouye',
        component: () => import('@/views/shouye')
      }, {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      }, {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }, {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
    ]

  }, {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  }, {
    path: '/article/:articleid',
    name: 'article',
    component: () => import('@/views/article'),
    props: true ////这里就是开启 组件传参， 把路由参数 映射到组件当中去，当然组件中需要props接收
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
  }
]

const router = new VueRouter({
  routes
})

export default router
