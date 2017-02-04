const webpack = require('webpack');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    preprocessors: {
      'src/**/*.js': ['webpack', 'coverage', 'sourcemap'],
      'test/spec/**/*.js': ['webpack', 'sourcemap']
    },
    files: ['src/testception-spec.js'],
    webpack: {
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel' // 'babel-loader' is also a legal name to reference
          },
          {
            test: /^(?!.*spec\.js?$).*\.js?$/,
            include: /src\//,
            loader: 'isparta'
          }
        ]
      },
      devtool: 'inline-source-map'
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html' },
        { type: 'lcov' },
        { type: 'text-summary' }
      ]
    },
    port: 8080,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    captureTimeout: 5000,
    singleRun: true
  });
};
