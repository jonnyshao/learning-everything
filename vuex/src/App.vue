<template>
  <div id="app">
    {{name}}
    {{userName}}
    {{u}}
    <button @click="change">add</button>
    <div>
      increment
      {{count}}
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name: 'app',
  components: {

  },
  mounted () {
    console.log(this.$store)
  },
  computed: {
    // 等价于 this.$store.state.name
    ...mapState(['name','count']),
    // 取出modules 下的 user 中的userName state
    ...mapState('user',['userName']),
    ...mapState('user',{u: state => state.userName})
  },
  methods:{
    ...mapMutations(['increment']),
    change () {
      this['increment'](10)
    }
  }
}
// 在vuex中如何想使用模块 最好使用辅助方法，限制模块作用域
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
