let processData = (_) => {
  let data = {
    name: _.name,
    initiatorType: _.initiatorType,
    duration: _.duration
  }
  return data
}
export default {
  init (cb) {
    // 获取资源相关的信息
    if (window.PerformanceObserver) { // mutationObserver
      let observer = new PerformanceObserver((list) => {
        let data = list.getEntries();
        cb(processData(data[0]));
      })
      observer.observe({entryTypes: ['resource']})
    } else {
      window.onload = function () {
        let resourceData = performance.getEntriesByType('resource')
        let data = resourceData.map(_ =>processData(_))
        cb(data)
      }
    }
    
  }
}