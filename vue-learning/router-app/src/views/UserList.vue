<template>
  <div>用户列表</div>
</template>
<script>
export default {
  beforeRouteEnter(to,from, next) {
    if(from.name === 'userAdd') {
      alert(1)
    }
    next(vm =>{
      console.log(vm) // 组件渲染完成后才会执行beforeRouteEnter方法
    })
  }
}
</script>
