import createApp from './app';

// 每次调用返回一个不同的实例
export default (context) => {
  // 组件按需加载 异步组件需要 返回return
  return new Promise((resolve, reject) => {
    const {app, router} = createApp()
  router.push(context.url)
  // 如果服务端 启动时 直接访问 /foo 返回的永远都是 index.html 需要通过路由跳转到指定路径
    router.onReady(() => { // 等待路由加载完成后 返回uve实例
      return resolve(app);
    })
  })
  
}
