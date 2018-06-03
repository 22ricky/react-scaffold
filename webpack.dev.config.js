const path = require( 'path' );

module.exports = {
  // 入口
  entry: path.join( __dirname, 'src/index.js' ),
  // 输出到 dist 文件夹，输出文件名字为 bundle.js
  output: {
    path: path.join( __dirname, './dist' ),
    filename: 'bundle.js'
  },
  // src 文件夹下面的以 .js 结尾的文件，要使用 babel 解析
  // cacheDirectory 是用来缓存编译的结果，下次编译加速
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader?cacheDirectory=true'],
      include: path.join( __dirname, 'src' )
    }]
  }
};