var karmaFiles = require('test-runner-config').getKarmaFiles(require('./test/testFiles'), {
  specs: function (file) { return { pattern: file, instrument: true, load: false, ignore: false }; }
});

karmaFiles.files.splice(0, 1); // remove src list because it is imported via the test file

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    preprocessors: {
      'src/**/*.js': ['webpack', 'coverage', 'sourcemap'],
      'test/spec/**/*.js': ['webpack', 'sourcemap']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015']
      }
    },
    files: karmaFiles.files,
    exclude: karmaFiles.exclude,
    plugins: [
      require('karma-jasmine'),
      require('karma-phantomjs2-launcher'),
      require('karma-coverage'),
      require('karma-webpack'), // This is used (instead of karma-babel-preprocessor) to make sure that commonJS modules can be loaded
      require('karma-sourcemap-loader')
    ],
    webpack: {
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel' // 'babel-loader' is also a legal name to reference
          }
        ]
      },
      devtool: 'inline-source-map'
    },

    port: 8080,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS2'],
    captureTimeout: 5000,
    singleRun: true,
    coverageReporter: {
      dir: 'test/coverage',
      reporters: [
        { type: 'lcov' },
        { type: 'text-summary' },
        { type: 'json' }
      ]
    }
  });
};
