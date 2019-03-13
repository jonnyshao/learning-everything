import Home from '_v/Home.vue'
import Version from '_v/Version.vue'
import Name from '_v/Name.vue'
export default [
  {
    path: '/',
    redirect: {name: 'home'}
  },
  {
    path: '/home',
    name: "home",
    components: {
      default: Home,
      name: Name,
      version: Version
    }
  },
  {
    path: '/login',
    name: "login",
    component: () => import('_v/Login.vue')
  },
  {
    path: '/profile',
    name: "profile",
    component: () => import('_v/Profile.vue')
  },
  {
    path: '/user',
    name: "user",
    component: () => import('_v/User.vue'),
    children: [
      {
        path: '', 
        component: () => import('_v/UserAdd.vue'),
        beforeEnter:(to, from, next) => {
          
        }
      },
      {
        path: 'add', 
        name: 'userAdd',
        component: () => import('_v/UserAdd.vue')
      },
      {
        path: 'list', 
        name: 'userList',
        component: () => import('_v/UserList.vue')
      }
    ]
  }
]