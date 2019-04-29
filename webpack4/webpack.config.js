
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssEtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true // set to true if you want JS source maps
          }),
          new OptimizeCSSAssetsPlugin({})
        ]
    },
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'build[hash:8].js', //build[hash].js
        path: path.resolve(__dirname, 'build') // 当前目录输出到dist目录
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',//静态文件入口
            filename: 'index.html' // 打包后的文件名,

        }),
        new MiniCssEtractPlugin({
            filename: 'main.css'
        })
    ],
    module: {
        rules:[
            // css-loader @import 语法支持
            // style-loader 他是把css 插入到head的标签中
            // loader 的顺序从右向左执行 从上到下
            // loader 还可以写成对象 传入options
            {test:/\.css$/, use: [
                MiniCssEtractPlugin.loader, //抽离成单独的一个文件形式
                'css-loader',
                'postcss-loader' // 自动补全
        ]},
            {test:/\.less$/, use: [
                MiniCssEtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'less-loader'
        ]}
        ]
    }
    // devServer: { // 开发环境
    //     port: 3100,
    //     progress: true,
    //     contentBase: './build', //以哪个目录做为静态目录
    //     compress: true  // gzip 压缩
    // }
}