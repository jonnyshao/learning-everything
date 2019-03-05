<template>
  <sub-menu>
    <template #title>
      {{data.title}}
    </template>
    <template v-for="item of data.children">
      <re-sub-menu :key="item.title" v-if="item.children" :data="item"></re-sub-menu>
      <menu-item  :key="item.title" v-else>{{item.title}}</menu-item>
    </template>
    
  </sub-menu>
</template>
<script>
import SubMenu from './SubMenu'
import MenuItem from './MenuItem'
export default {
  name: "re-sub-menu", //名字可以使用递归组件
  props: {
    data: {
      type: Object,
      default:()=>({})
    }
  },
  components:{
    MenuItem,
    SubMenu
  }
}
</script>
