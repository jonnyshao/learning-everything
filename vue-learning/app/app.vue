<template>
  <div class="red">
    <Menu>
      <template v-for="item of list">
        <re-sub-menu 
        :key="item.title" 
        v-if="item.children"
        :data="item"
        >
        </re-sub-menu>
        <menu-item :key="item.title" v-else>{{item.title}}</menu-item>
      </template>
      
    </Menu>
  </div>
</template>
<script>
import Menu from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'
import ReSubMenu from './ReSubMenu'
export default {
  name: "app",
  data () {
    return {
      list: [
        {
          title:'菜单1',
          children:[
            {title: '菜单1-1',
            children: [
                {title: '菜单1-1-1'},
                {title: '菜单1-1-2'},
                {title: '菜单1-1-3'},
              ]},
            {title: '菜单1-2'},
            {title: '菜单1-3'},
          ]
        },
        {title:'菜单2'},
        {title:'菜单3'},
      ]
    }
  },
  components:{
    Menu,
    MenuItem,
    SubMenu,
    ReSubMenu
  }
};
</script>
<style>
.red {
  color: red;
}
</style>
