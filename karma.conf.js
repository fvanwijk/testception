var karmaFiles = require('test-runner-config').getKarmaFiles(require('./test/testFiles'), {
  specs: function (file) { return { pattern: file, instrument: true, load: false, ignore: false }; }
});

karmaFiles.files.splice(0, 1); // remove src list because it is imported via the test file

var webpack = require('webpack');
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    preprocessors: {
      'src/**/*.js': ['webpack', 'coverage', 'sourcemap'],
      'test/spec/**/*.js': ['webpack', 'sourcemap']
    },
    files: karmaFiles.files,
    exclude: karmaFiles.exclude,
    plugins: [
      require('karma-jasmine'),
      require('karma-webpack'), // This is used (instead of karma-babel-preprocessor) to make sure that commonJS modules can be loaded
      require('karma-phantomjs2-launcher'),
      require('karma-coverage'),
      require('karma-sourcemap-loader')
    ],
    webpack: {
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel' // 'babel-loader' is also a legal name to reference
          },
          {
            test: /\.js$/,
            include: /src/,
            loader: 'isparta'
          }
        ]
      },
      /*plugins: [
        new webpack.SourceMapDevToolPlugin(
          'dist/testception.js.map', null,
          '[absolute-resource-path]', '[absolute-resource-path]')
      ]*/
      devtool: 'inline-source-map'
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'test/coverage',
      reporters: [
        { type: 'lcov' },
        { type: 'text-summary' },
        { type: 'json' }
      ]
    },
    port: 8080,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS2'],
    captureTimeout: 5000,
    singleRun: true
  });
};
