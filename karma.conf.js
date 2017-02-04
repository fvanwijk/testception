module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    preprocessors: {
      'src/**/testception.js': ['coverage'],
      'src/**/testception-spec.js': ['webpack']
    },
    files: ['src/testception-spec.js'],
    webpack: {
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
          },
          {
            test: /testception\.js$/,
            include: /src/,
            loader: 'isparta'
          }
        ]
      }
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ],
      check: {
        each: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100
        }
      }
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
