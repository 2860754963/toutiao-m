import Vue from 'vue'
import Vuex from 'vuex'
import { setitem, getitem } from "@/utils/storage";
Vue.use(Vuex)
//  d定义一个变量  写错了会提示
const user_token = 'yuxi_user_token'
export default new Vuex.Store({
  state: {
    user: getitem(user_token)
  },
  getters: {
  },
  mutations: {
    setuser(state, user) {
      state.user = user
      setitem(user_token, state.user)

    }
  },
  actions: {
  },
  modules: {
  }
})
