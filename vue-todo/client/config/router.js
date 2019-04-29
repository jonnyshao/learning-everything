import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    mode: 'history',
    routes,
    // base: '/base/'
    // scrollBehavior (to, from, position) {
    //   if (position) {
    //     return position
    //   }
    //   return { x: 0, y: 0}
    // },
    // 浏览器不支持history模式的时候自动切换成hash
    fallback: true
  })
}
