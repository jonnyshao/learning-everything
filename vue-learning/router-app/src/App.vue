<template>
  <div id="app">
    <div class="nav nav-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <div class="navbar-brand">
            <span>管理</span>
          </div>
        </div>
        <ul class="navbar-nav nav">
          <li><router-link to="/home">首页</router-link></li>
          <li><router-link to="/profile">个人中心</router-link></li>
          <li><router-link to="/user">用户</router-link></li>
          <li><router-link to="/login">登录</router-link></li>
        </ul>
      </div>
    </div>
    <div class="container">
      <router-view></router-view>
      <router-view name="name"></router-view>
      <router-view name="version"></router-view>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
export default {
  name: 'app',
  data () {
    return {

    }
  },
  components: {
  },
  methods: {

  }
}
</script>

<style lang="less">
#app {

}
</style>
