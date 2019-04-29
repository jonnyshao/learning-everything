const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRender = require('vue-server-renderer')
const fs = require('fs')
const serverConfig = require('../../build/webpack.config.server.js')

const serverCompiler = webpack(serverConfig)

const mfs = new MemoryFS()
// 指定输出目录 输出到内存中
serverCompiler.outputFileSystem = mfs
let bundle;
serverCompiler.watch({},(err, status) => {
  if (err) throw err
  status = status.toJson()
  status.hasErrors.forEach(err => console.log(err))
  status.hasWarnings.forEach(warn => console.log(warn))

  const bundlePath = path.join(serverConfig.output.path,'vue-ssr-server-bundle.json')
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = 'wating....'
    return
  }
  const { data: clientManifest } = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
  )
  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'))
  const renderer = VueServerRender.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })
}
