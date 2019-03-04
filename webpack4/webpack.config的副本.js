
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build[hash:8].js', //build[hash].js
        path: path.resolve(__dirname, 'build') // 当前目录输出到dist目录
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',//静态文件入口
            filename: 'index.html', // 打包后的文件名,
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true
        })
    ],
    module: {
        rules:[
            // css-loader @import 语法支持
            // style-loader 他是把css 插入到head的标签中
            // loader 的顺序从右向左执行 从上到下
            // loader 还可以写成对象 传入options
            {test:/\.css$/, use: [
                {
                    loader:'style-loader',
                    options: {
                        insertAt: 'top' // style 标签插入到顶部
                    }
                },
            'css-loader']},
            {test:/\.less$/, use: [
                {
                    loader:'style-loader',
                    options: {
                        insertAt: 'top' // style 标签插入到顶部
                    }
                },
            'css-loader','less-loader']}
        ]
    }
    // devServer: { // 开发环境
    //     port: 3100,
    //     progress: true,
    //     contentBase: './build', //以哪个目录做为静态目录
    //     compress: true  // gzip 压缩
    // }
}