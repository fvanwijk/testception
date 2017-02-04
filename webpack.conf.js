const path = require('path');
const webpack = require('webpack');

const params = {
  production: {
    output: 'testception.min',
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        include: /\.min\.js$/,
        compress: { warnings: false }
      })
    ]
  },
  development: {
    output: 'testception',
    devtool: 'inline-source-map'
  }
};

function getConfig(env) {
  return {
    entry: {
      [params[env].output]: path.resolve(__dirname, '/src/testception.js')
    },
    devtool: params[env].devtool,
    output: {
      path: path.resolve(__dirname, '/dist'),
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
    plugins: params[env].plugins,
    resolve: {
      root: path.resolve('./src'),
      extensions: ['', '.bjs']
    }
  };
}

module.exports = [
  getConfig('development'),
  getConfig('production')
];
