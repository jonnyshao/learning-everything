<template>
  <div class="app" id="app">
    <router-link to="/">bar</router-link>
    <router-link to="/foo">foo</router-link>
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'App',
   metaInfo: {
      title: 'My Example App', // set a title
      titleTemplate: '%s - Yay!', // title is now "My Example App - Yay!"
      htmlAttrs: {
        lang: 'en' // "amp" has no value
      }
    }
}
</script>
