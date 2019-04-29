<template>
  <div class="sub-menu">
    <div class="title" @click="change">
      <slot name="title"> </slot>
    </div>
    <ul class="sub-menu-item" v-show="flag">
      <slot></slot>
    </ul>
  </div>
</template>
<script>
export default {
  name: "subMenu",
  data () {
    return {
      flag: false
    }
  },
  methods:{
    change () {
      this.flag = !this.flag
    }
  }
}
</script>
<style>
.sub-menu-item{
  padding-left:20px
}
</style>
