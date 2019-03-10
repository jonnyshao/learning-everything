const path = require('path')
module.exports = {
  // baseURL
  publicPath: process.env.NODE_ENV === 'production' ? "http://www.baidu.com" : "/",
  assetsDir: 'static', // 当前打包输出到指定静态目录
  outputDir: 'myProject', //输出路径
  runtimeCompiler: false, // 为true时启用template模板,一般不使用，开启会多100k
  productionSourceMap: false,
  chainWebpack: config => {
    // 可以获取到webpack的配置 在增加一些自己的配置
    config.resolve.alias.set('_c', path.resolve(__dirname, 'src/components/'))
    config.resolve.alias.set('_v', path.resolve(__dirname, 'src/views/'))
  },
  configureWebpack:{ // webpack-merge
    
  },
  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/common.less')
      ]
    }
  },
  devServer: {
    proxy: {
      '/getUser': {
        target: 'http://localhost:3001'
      }
    }
  }
}
