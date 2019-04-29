<template>
  <div class="user-add">
    <input type="text" v-model="username">
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: ''
    }
  }
}
</script>
