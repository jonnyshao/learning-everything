<template>
  <div class="bar" @click="show">
    Bar COMPONENTS
  </div>
</template>
<script>
export default {
  name: 'Bar',
  methods: {
    show () {
      alert(1)
    }
  }
}
</script>
<style>
.bar{
  color: darkblue
}
</style>
