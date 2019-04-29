// 监控页面的性能 - 算时间差 Performance Api
import perf from './performance'
import resource from './resource'
import xhr from './xhr'
// 传给服务端 1.ajax 2.image
let formatObj = (data) => {
  let arr = [];
  for (let key in data) {
    arr.push(`${key}=${data[key]}`)
  }
  return arr.join('&')
}
perf.init((data) => {
  // new Image().src = 'p.git?'+ formatObj(data)
  // console.log(data)
})

// 监控页面静态资源的加载情况
resource.init(data => {
  // console.log(data)
})
// 监控ajax 发送情况
xhr.init((data) => {
  console.log(data)
})
// 页面的错误捕获

// 监控用户的行为

