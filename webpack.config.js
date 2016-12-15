const webpack = require('webpack'),
  path = require('path'),
  CleanPlugin = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: ['./src/main.js'],
  output: {
    publicPath: '/dist/',
    path: './dist',
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [{
      test: /.\js$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  },
  babel: {
    presets: ['es2015']
  },
  resolve: {
    alias: {
      'vue$': '../node_modules/vue/dist/vue.common.js'
    }
  },
  plugins: [
    new CleanPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: path.join(__dirname, 'index.html'),
      inject: 'body'
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:8080/dist/index.html' })
  ]
}
