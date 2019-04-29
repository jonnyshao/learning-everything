
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default () => {
  const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
      app: {
        namespaced: true,
        state: {
          count: 0
        },
        mutations: {
          upCount (state, paylaod) {
            console.log('upCount')
            state.count = paylaod
          }
        }
      }
    }
  })
  if (module.hot) {
    module.hot.accept([
      './mutations.js',
      './state.js',
      './actions.js',
      './getters.js'
    ], () => {
      const newState = require('./state').default
      const newMutations = require('./mutations').default
      const newAction = require('./actions').default
      const newGetters = require('./getters').default
      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newAction
      })
    })
  }
  return store
}
