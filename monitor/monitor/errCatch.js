export default {
  init (cb) {
    // window.addEventListener('error', fn, true) 图片 404
    // promise 不能捕获
    window.onerror = function (msg,source,lineno,colno, error) {
      let info = {
        message: error.msg,
        name: error.name,

      }
      let stack = error.stack
      let matchUrl = stack.match(/http:\/\/[^\n]*/)[0]
      info.filename = matchUrl.match(/http:\/\/(?:\S*)\.js/)[0]
      let [,row, column] = matchUrl.match(/:(\d+):(\d+)/)
      info.row = row;
      info.column = column
      cb(info)
    }
  }
}