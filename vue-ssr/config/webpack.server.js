const base = require('./webpack.base');
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = merge(base, {
  target: 'node',  // 打包出的结果给node用
  entry: {
    server: path.resolve(__dirname, '../src/server-entry.js')
  },
  output: {
    libraryTarget: 'commonjs2'    // 支持 require 引入 module.exports
  },
  plugins: [
    // 把public目录下的index.ssr内容拷贝到dist目录
    new HtmlWebpackPlugin({
      filename: 'index.ssr.html',
      template: path.resolve(__dirname, '../public/index.ssr.html'),
      excludeChunks: ['server'] // 排除当前server端的JS
    })
  ]
})