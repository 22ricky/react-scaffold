const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: [
      path.join( __dirname, 'src/index.js' )
    ],
    vendor: ['react', 'react-dom', 'react-redux', 'react-router-dom', 'redux']
  },
  output: {
    publicPath: '/',
    path: path.join( __dirname, './dist' ),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      include: path.join( __dirname, 'src' )
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    new CleanWebpackPlugin(['dist'])
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