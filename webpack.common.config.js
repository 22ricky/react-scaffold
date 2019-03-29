const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: [
      path.join( __dirname, 'src/index.js' )
    ],
    vendor: ['react', 'react-dom', 'react-router-dom', 'react-redux', 'redux']
  },
  output: {
    publicPath: '/',
    path: path.join( __dirname, './dist' ),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  // src 文件夹下面的以 .js 结尾的文件，要使用 babel 解析
  // cacheDirectory 是用来缓存编译的结果，下次编译加速
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader?cacheDirectory=true'],
      include: path.join( __dirname, 'src' )
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join( __dirname, 'src/index.html' )
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  ],
  resolve: {
    alias: {
      pages: path.join( __dirname, 'src/pages' ),
      components: path.join( __dirname, 'src/components' ),
      router: path.join( __dirname, 'src/router' ),
      actions: path.join( __dirname, 'src/redux/actions' ),
      reducers: path.join( __dirname, 'src/redux/reducers' )
    }
  }
}