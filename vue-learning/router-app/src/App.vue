<template>
  <div id="app">
    <ScrollBall color="deepkink" v-model="pos4" :target="600" ref="stop">红球</ScrollBall>
    <ScrollBall color="deepkink" v-model="pos3" :target="500" ref="stop">红球</ScrollBall>
    <ScrollBall color="red" :value="pos1" :target="500" @input="val => pos1 = val">红球</ScrollBall>
    <ScrollBall color="green" :value="pos2" :target="500">绿球</ScrollBall>
    <button @click="getPosition">获取球1的位置</button>
    <button @click="stop">STOP</button>
  </div>
</template>

<script>
import ScrollBall from '+/ScrollBall.vue'

export default {
  name: 'app',
  data () {
    return {
      pos1: 50,
      pos2: 100,
      pos3: 60,
      pos4: 150
    }
  },
  components: {
    ScrollBall
  },
  methods: {
    getPosition () {

    },
    stop () {
      this.$refs.stop.stop()
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
