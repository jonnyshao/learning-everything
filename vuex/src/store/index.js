import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import state from './state'
import getters from './getters'
import user from './modules/user'
Vue.use(Vuex)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  actions,
  getters,
  mutations,
  modules:{
    user
  }
})