const path = require( 'path' );
const webpack = require( 'webpack' );

module.exports = {
  devtool: 'inline-source-map',
  // 入口
  entry: [
    'react-hot-loader/patch',
    path.join( __dirname, 'src/index.js' )
  ],
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
  },
  devServer: {
    contentBase: path.join( __dirname, './dist' ),
    historyApiFallback: true,
    // 服务器外部可访问 https://webpack.docschina.org/configuration/dev-server
    // host: '0.0.0.0',
    hot: true,
    port: 8080
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      pages: path.join( __dirname, 'src/pages' ),
      component: path.join( __dirname, 'src/component' ),
      router: path.join( __dirname, 'src/router' ),
      actions: path.join( __dirname, 'src/redux/actions' ),
      reducers: path.join( __dirname, 'src/redux/reducers' )
    }
  }
};