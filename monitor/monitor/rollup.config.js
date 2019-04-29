import babel from 'rollup-plugin-babel'
export default {
  input: './index.js',
  output: {
    file: '../website/client/bundle.js',
    format: 'umd' // 告诉浏览器统一使用umd 模块化
  },
  watch: {
    exlued: 'node_modules/**'
  },
  plugins: [
    babel({
      babelrc: false,
      presets: [
        "@babel/preset-env"
      ]
    })
  ]
}