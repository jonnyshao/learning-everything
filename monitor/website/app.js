let Koa = require('koa');
let path = require('path')
let Server = require('koa-static');

let app = new Koa();
app.use(async (ctx, next) => {
  if(ctx.path == '/api/list') {
    ctx.body = {name:'Jonny'}
  } else {
    return next()
  }
})
app.use(Server(path.join(__dirname, 'client')))
app.use(Server(path.join(__dirname, 'node_modules')))
app.listen(9999, function () {
  console.log('server start 9999')
})