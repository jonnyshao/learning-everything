<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{count}}</p>
    <!-- <todo></todo> -->
    <router-view></router-view>
    <Footer></Footer>

  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'

export default {
  components: {
    Header,
    Footer,
    Todo
  },
  mounted () {
    this.upCount(1000)
  },
  computed: {
    ...mapGetters(['fullName']),
    ...mapState('app', ['count'])
  },
  methods: {
    ...mapMutations({upCount: 'app/upCount'})
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>


