const base = require('./webpack.base');
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const externals = require('webpack-node-externals')
module.exports = merge(base, {
  target: 'node',  // 打包出的结果给node用
  entry: {
    server: path.resolve(__dirname, '../src/server-entry.js')
  },
  externals: [externals()], // 第三方模块不需要打包, node 默认可以用package
  output: {
    libraryTarget: 'commonjs2'    // 支持 require 引入 module.exports
  },
  plugins: [
    new VueSSRServerPlugin(),
    // 把public目录下的index.ssr内容拷贝到dist目录
    new HtmlWebpackPlugin({
      filename: 'index.ssr.html',
      template: path.resolve(__dirname, '../public/index.ssr.html'),
      excludeChunks: ['server'] // 排除当前server端的JS
    })
  ]
})
