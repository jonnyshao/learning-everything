<template>
  <div class="home">
    当前登陆用户名{{$store.state.username}}
  </div>
</template>

<script>
// @ is an alias to /src
import {getUser} from "../api/user";

export default {
  name: 'home',
  components: {
  },
  async mounted () {
  }
}
</script>
