import Vue from 'vue'
import Router from 'vue-router'
import Bar from './components/Bar.vue'
// import Meta from 'vue-meta'
// Vue.sue(Meta)
Vue.use(Router)
export default () => {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        path:'/',
        name: 'Bar',
        component: Bar
      },
      {
        path:'/foo',
        name: 'Bar',
        component: () => import('./components/Foo.vue')
      }
    ]
  })
  return router;
}