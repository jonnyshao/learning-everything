import Vue from 'vue'
import App from './App.vue'
import router from './permissions'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.config.productionTip = false
import Test from './components/Test'
new Vue({
  router,
  store,
  render: h => {
    return h(Test,{
      props:{
        msg: 'Jonny'
      },
      nativeOn: {
        click(){
          alert(1)
        }
      }
    },'内容')
    // return <h1
    // on-click={() => alert(1)}
    // style={{color: 'red'}}>你好 </h1>
    // return h('h1',{ // jsx语法
    //   attrs: {
    //     id: 1
    //   },
    //   style: {
    //     color: 'red'
    //   },
    //   class: ['a','b'],
    //   on: {
    //     click(){
    //       alert(1)
    //     }
    //   },
    //   domProps: {
    //     innerHTML: 'Hello'
    //   }
    // },'内容')
  }
}).$mount('#app')
