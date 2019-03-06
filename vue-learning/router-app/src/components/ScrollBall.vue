<template>
  <div class="ball" :style="style" :id="ballId">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ScrollBall',
  props: {
    color: {
      type: String,
      default: 'white'
    },
    value:{
      type: Number,
      default: 0
    },
    target: {
      type: Number,
      target: 300
    }
  },
  data () {
    return {
    }
  },
  methods: {
    stop () {
      console.log('stop')
      window.cancelAnimationFrame(this.timer)
    }
  },
  mounted () {
    // 单向数据流 子组件通知父组件当前自己的位置，父亲更新位置 在传递给子组件
    let ball = document.getElementById(this.ballId);
    this.timer;
    let fn = () => {
      let left = this.value;
      if (left >= this.target) {
        window.cancelAnimationFrame(this.timer)
        return;
      }
      this.$emit('input', left + 2)
      ball.style.transform = `translate(${this.value}px)`;
      this.timer = window.requestAnimationFrame(fn)
    }
    window.requestAnimationFrame(fn)
  },
  computed: {
    style () {
      return {background: this.color}
    },
    ballId () {
      return 'ball' + this._uid
    }
  }
}
</script>
<style lang="less" scoped>
  .ball{
    width: 100px;
    height: 100px;
    border-radius:50%;
    text-align: center;
    line-height: 100px;
    border:1px solid red
  }
</style>
