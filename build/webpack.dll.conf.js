// 单独配置在一个文件中
// webpack.dll.conf.js
const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    // 想统一打包的类库(但是也不能一味地把所有东西都打包，这样会影响首屏)
    vendor: ['vue', 'vuex', 'vue-router', 'echarts', 'axios']
  },
  output: {
    path: resolve('static/js'),
    filename: '[name].dll.js',
    library: '[name]_library'       // vendor.dll.js中暴露出的全局变量名
  },
  plugins: [
    new webpack.DllPlugin({
      // name 必须和 output.library 一致
      name: '[name]_library',
      // 该属性需要与 DllReferencePlugin 中一致
      context: __dirname,
      path: path.join(__dirname, '.', '[name]-manifest.json')
    })
  ]
}