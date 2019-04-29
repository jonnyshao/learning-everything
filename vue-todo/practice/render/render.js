import Vue from 'vue'

const childComponent = {
  name: 'childComponent',
  inject: ['data'],
  template: `<div>
  childComponent {{data.value}}

  </div>`,
  mounted () {
    console.log(this.data.value)
  }
}
const parentComponent = {
  name: 'parentComponent',
  template: `<childComponent></childComponent>`,
  components: {
    childComponent
  }
}

new Vue({
  el: '#root',
  provide () {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
    return {
      data
    }
  },
  data () {
    return {
      value: 1
    }
  },
  template: `
  <div>
  <parentComponent></parentComponent>
  <input type="text" v-model="value"/>
  </div>`,
  // render (h) {
  //   return h('div', {},
  //   [h('parentComponent',{},)])
  // },
  components: {
    parentComponent
  }
})
