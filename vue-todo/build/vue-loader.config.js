// const docsLoader = require('./doc-loader')
module.exports = isDev => {
  return {
    // 去除空格
    preserveWhitepace: true,
    // 抽离组件的css
    extractCSS: !isDev,
    cssModules: {
      // resources/[name]-[hash:8].[ext] 指定变量
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    },
    // hotReload: false 根据环境变量生成
    // loaders: { 自定义模块
    //   'docs': 
    // }
    preLoader: { // 再用typescript时 先用tsloader解析一遍 再用babel-loader解析一遍

    }
  }
}