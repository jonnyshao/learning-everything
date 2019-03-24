import router from './router'
import store from './store'
let whiteList = ['/xxx']
router.beforeEach(async (to, from, next) => {
  if (whiteList.includes(to.path)) {
    return next()
  }
  let isLogin = await store.dispatch('validate')
  let needLogin = to.matched.some(match => match.meta.login)
  if (needLogin) {
    if (isLogin) {
      next()
    } else {
      next('/login')
    }
  } else {
    if (isLogin && to.name === 'login') {
      next('/')
    } else {
      next()
    }
  }
})

export default router
