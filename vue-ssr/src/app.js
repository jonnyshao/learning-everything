import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'
// 为了兼容服务端 要把这个方法改选成函数

export default function createApp() {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return {app, router, store};
}

