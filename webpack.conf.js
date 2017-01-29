var webpack = require('webpack');
var path = require('path');

var config = {
  entry: __dirname + '/src/testception.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: 'testception.js',
    library: 'expectMatcher', // expectMatcher is the only default export. We use add-module-exports plugin to export this function as default
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules)/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  }
};

module.exports = config;
