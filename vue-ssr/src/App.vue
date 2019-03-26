<template>
  <div class="app">
    <Bar></Bar>
    <Foo></Foo>
  </div>
</template>
<script>
import Foo from './components/Foo'
import Bar from './components/Bar'
export default {
  name: 'App',
  components: {
    Foo,
    Bar
  }
}
</script>
