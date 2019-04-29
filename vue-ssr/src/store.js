import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
export default () => {
  const store = new Vuex.Store({
    state: {
      username: 'Jonny',
    },
    mutations: {
      setUserName(state) {
        state.username = 'Ryan'
      }
    },
    actions: {
      setUserName({commit}){
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('setUserName')
            resolve()
          }, 1000);
        })
      }
    }
  })
  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    console.log('window.__INITIAL_STATE__', window.__INITIAL_STATE__)
    store.replaceState(window.__INITIAL_STATE__)
  }
  return store
}