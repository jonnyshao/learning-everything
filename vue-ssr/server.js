const express = require('express');
const app = express()
const VueServerRenderer = require('vue-server-renderer')
const Vue = require('vue')
const fs = require('fs')
const path = require('path')
const serverBundle = fs.readFileSync('./dist/server.bundle.js', 'utf8');
const template = fs.readFileSync('./dist/index.ssr.html', 'utf8')

const render = VueServerRenderer.createBundleRenderer(serverBundle, {
  template
});
app.get('/', (req, res) => {
  // 把渲染成功的字符串扔给客户端,只是返回一个字符串 并没有vue实现客户端
  const context = {url: req.url}
  render.renderToString(context,function (err, html) {
    res.send(html)
  })
})
app.get('*', (req,res) => {
  const context = {url: req.url}
  // 如果访问的路径不存在 默认渲染index.ssr.html 并且把路由定向到当前请求的路径
  render.renderToString(context,function (err, html) {
    res.send(html)
  })
})
app.use(express.static(path.resolve(__dirname, 'dist')))
app.listen(3000)
