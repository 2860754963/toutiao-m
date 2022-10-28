import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局样式
import './styles/index.less'
// 引入 vant组件库
import Vant from 'vant'
// 引入Vant组件样式
import 'vant/lib/index.css'
// 注册使用 Vant组件库
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
