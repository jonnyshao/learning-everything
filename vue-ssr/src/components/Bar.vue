<template>
  <div class="bar" @click="show">
    Bar component {{$store.state.username}}
  </div>
</template>
<script>
export default {
  name: 'Bar',
  // 异步数据 只在服务端执行 客户端运行不会执行的 因为异步 全部采用Pormise
  // 一般规定 只有页面级组件才能使用
  asyncData ({store}) {
    return store.dispatch('setUserName')
  },
  mounted() {
    this.$store.dispatch('setUserName')
  },
  methods: {
    show () {
      console.log(1213)
    }
  }
}
</script>
<style>
.bar{
  color: darkblue
}
</style>
