import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'

// 为了兼容服务端 要把这个方法改选成函数

export default function createApp() {
  const router = createRouter()
  const app = new Vue({
    router,
    render: h => h(App)
  })
  return {app, router};
}

