const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
module.exports = merge(base, {
   // 入口
   entry: {
     client: path.resolve(__dirname,  '../src/client-entry.js')
   },
   plugins:[
    new VueSSRClientPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 打包后文件名称
      template: path.resolve(__dirname, '../public/index.html')
    })
   ]
}) 