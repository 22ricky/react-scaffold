const path = require( 'path' );

module.exports = {
  // 入口
  entry: path.join( __dirname, 'src/index.js' ),
  // 输出到 dist 文件夹，输出文件名字为 bundle.js
  output: {
    path: path.join( __dirname, './dist' ),
    filename: 'bundle.js'
  }
};