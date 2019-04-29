
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: () => import('../views/todo/todo.vue')
  },
  {
    path: '/login/:id',
    props: true,
    component: () => import('../views/login/login.vue')
  }
]
