// 页面性能监控
let processData = (p) => {
  let data = {
    prevPage: p.fetchStart - p.navigationStart, // 上一个页面到这个页面的时长
    redirect: p.redirectEnd - p.redirectStart,  // 重定向的时长
    dns: p.domainLookupEnd - p.domainLookupStart, // dns解析时长
    connect: p.connectEnd - p.connectStart, // tcp连接的时长
    send: p.responseEnd - p.requestStart, // 响应结束到请求对事 
    ttfb: p.responseStart - p.navigationStart, // 首字节接收到的时长
    domready: p.domInteractive - p.domLoading, // dom准备时长
    whiteScreen: p.domLoading - p.navigationStart, // 白屏
    dom: p.domComplete - p.domLoading,  // dom 解析时间
    load: p.loadEventEnd - p.loadEventStart, // dom 执行时间
    total: p.loadEventEnd - p.navigationStart
  }
  return data
}
let load = (cb) => {
  let timer;
  let check = () => {
    if (performance.timing.loadEventEnd) {
      clearTimeout(timer)
      cb()
    } else {
      timer = setTimeout(check, 100);
    }
  }
  window.addEventListener('load', check, false)
}
let domread = (cb) => {
  let timer;
  let check = () => {
    if (performance.timing.domInteractive) {
      clearTimeout(timer)
      cb()
    } else {
      timer = setTimeout(check, 100);
    }
  }
  window.addEventListener('DOMContentLoaded', check, false)
}
export default{
  init (cb) {
    domread(() => { // dom解析完成后先统计一下，可能用户没加载完就关闭页面
      let perf = performance.timing;
      let data = processData(perf)
      data.type = 'domready'
      cb(data)
    })
    load(() => {
      let perf = performance.timing;
      let data = processData(perf)
      data.type = 'loaded'
      cb(data)
    })
  }
}