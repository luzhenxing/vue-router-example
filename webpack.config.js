const webpack = require('webpack'),
  path = require('path'),
  glob = require('glob'),
  CleanPlugin = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  OpenBrowserPlugin = require('open-browser-webpack-plugin'),

  entrys = {},
  entrys_arr = glob.sync(path.join(__dirname, 'src/entry/*.js'));

const getEntry = entryName => {
  const entry = entryName.replace(/.*\/entry\/(\w+)\.js/, '$1');
  entrys[entry] = entryName;
};

entrys_arr.forEach(getEntry);

const config = {
  entry: entrys,
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
      'vue$': path.join(__dirname, 'node_modules/vue/dist/vue.common.js')
    }
  },
  plugins: [
    new CleanPlugin(['dist']),
    // 提供公共代码
    new webpack.optimize.CommonsChunkPlugin('common.js'), // 默认会把所有入口节点的公共代码提取出来,生成一个common.js
    // new HtmlWebpackPlugin({
    //   filename: './index.html',
    //   template: path.join(__dirname, 'index.html'),
    //   inject: 'body'
    // }),
    // new OpenBrowserPlugin({ url: 'http://localhost:8080/dist/index.html' })
  ]
}

for (let entry in entrys) {
  console.log(entry);
  config.plugins.push(new HtmlWebpackPlugin({
    filename: `${entry}.html`,
    template: path.join(__dirname, 'src/tpl/', `${entry}.html`),
    chunks: ['common.js', entry],
    inject: true
  }));
}

module.exports = config;
