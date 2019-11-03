const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const params = {
  production: {
    mode: 'production',
    output: 'testception.min',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          include: /\.min\.js$/
        })
      ]
    }
  },
  development: {
    mode: 'development',
    output: 'testception',
    devtool: 'inline-source-map'
  }
};

function getConfig(env) {
  return {
    mode: params[env].mode,
    entry: {
      [params[env].output]: path.join(__dirname, '/src/testception.js')
    },
    devtool: params[env].devtool,
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].js',
      library: 'expectMatcher', // expectMatcher is the only default export. We use add-module-exports plugin to export this function as default
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /(node_modules)/
        }
      ]
    },
    plugins: params[env].plugins
  };
}

module.exports = [getConfig('development'), getConfig('production')];
