<template>
    <div class="login">
      <i-input type="text" v-model="username" placeholder="输入用户名"></i-input>
      <i-button type="primary" @click="login">登录</i-button>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "Login",
  data () {
    return {
      username: ''
    }
  },
  methods: {
    ...mapActions(['doLogin']),
    login () {
      this['doLogin'](this.username).then(res => {
        this.$router.push({path: '/'})
      }, err => {
        this.$Message.error(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
