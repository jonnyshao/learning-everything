const express = require('express');
const app = express()
const VueServerRenderer = require('vue-server-renderer')
const Vue = require('vue')
const fs = require('fs')

const vm = new Vue({
  template: `<div>hello world</div>`
})
const template = fs.readFileSync('./index.html', 'utf8')
const render = VueServerRenderer.createRenderer({template});
app.get('/', (req, res) => {
  render.renderToString(vm, function (err, html) {
    res.send(html)
  })
})

app.listen(3000)
