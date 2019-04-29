import Vue from 'vue'
import App from './app.vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import createRouter from './config/router'
import createVuex from './store'
Vue.use(Router)
Vue.use(Vuex)
const store = createVuex()
const router = createRouter()
store.registerModule('c', {
  state: {
    text: 'c'
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')

// new Vue({
//   el: '#root',
//   template: `
//     <div>
//       <p>Name: {{name}}</p>
//       <p>Name: {{getName()}}</p>
//       <p>Number: {{number}}</p>
//       <p>FullName: {{fullName}}</p>
//       <p><input type="text" v-model="number"></p>
//       <p>FirstName: <input type="text" v-model="firstName"></p>
//       <p>LastName: <input type="text" v-model="lastName"></p>
//       <p>Name: <input type="text" v-model="name"></p>
//       <p>Obj.a: <input type="text" v-model="obj.a"></p>
//     </div>
//   `,
//   data: {
//     firstName: 'Jokcy',
//     lastName: 'Lou',
//     number: 0,
//     fullName: '',
//     obj: {
//       a: 0
//     }
//   },
//   computed: {
//     name: {
//       get () {
//         console.log('new name')
//         return `${this.firstName} ${this.lastName}`
//       },
//       set (name) {
//         const names = name.split(' ')
//         this.firstName = names[0]
//         this.lastName = names[1]
//       }
//     }
//   },
//   watch: {
//     'obj.a': {
//       handler () {
//         console.log('obj.a changed')
//         this.obj.a += 1
//       },
//       immediate: true
//       // deep: true
//     }
//   },
//   methods: {
//     getName () {
//       console.log('getName invoked')
//       return `${this.firstName} ${this.lastName}`
//     }
//   }
// })
