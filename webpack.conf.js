const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'testception': __dirname + '/src/testception.js',
    'testception.min': __dirname + '/src/testception.js'
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
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
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      include: /\.min\.js$/,
      compress: { warnings: false }
    })
  ],
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  }
};
