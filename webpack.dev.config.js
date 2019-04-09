const path = require( 'path' );
const webpack = require( 'webpack' );
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.config');

const devConfig = {
  devtool: 'inline-source-map',
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      path.join( __dirname, 'src/index.js' )
    ]
  },
  output: {
    /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和raect-hot-loader不兼容。只能妥协*/
    filename: '[name].[hash].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      MOCK: true
    })
  ]
};

module.exports = merge({
  customizeArray(a, b, key) {
    /*entry.app不合并，全替换*/
    if (key === 'entry.app') {
      return b;
    }
    return undefined;
  }
})(commonConfig, devConfig);