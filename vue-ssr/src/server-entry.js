import createApp from './app';

// 每次调用返回一个不同的实例
export default (context) => {
  console.log('context', context)
  // 组件按需加载 异步组件需要 返回return
  return new Promise((resolve, reject) => {
    const {app, router, store} = createApp();
    const meta = app.$meta()
    router.push(context.url)
  // 如果服务端 启动时 直接访问 /foo 返回的永远都是 index.html 需要通过路由跳转到指定路径

  // 把当前页面中匹配到的组件 找到他的asyncData方法让他执行
    router.onReady(() => { // 等待路由加载完成后 返回uve实例
      // 获取当前路径匹配到的组件
      const matchesComponents = router.getMatchedComponents();
      Promise.all(matchesComponents.map(component => {
          if (component.asyncData) {
            return component.asyncData({store});
          }
        })).then(() => {
          // 把vuex中的状态挂载到上下文中的state上,会在window上挂载一个__INITIAL_STATE__
          context.meta = meta
          context.state = store.state
          resolve(app);
        })
    })
  })
  
}
