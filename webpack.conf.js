var webpack = require('webpack');
var path = require('path');
var libraryName = 'testception';
var outputFile = libraryName + '.js';

var config = {
  entry: __dirname + '/src/testception.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  }
};

module.exports = config;
