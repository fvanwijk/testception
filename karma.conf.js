const path = require('path');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    preprocessors: { 'src/testception-spec.js': ['webpack'] },
    files: ['src/testception-spec.js'],
    webpack: {
      mode: 'none',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },
          {
            test: /\.js$/,
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: { esModules: true }
            },
            include: path.resolve('src/')
          }
        ]
      }
    },
    reporters: ['progress', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      dir: 'coverage',
      subdir: '.',
      reports: ['html', 'text-summary', 'lcov'],
      thresholds: {
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
    browsers: ['jsdom'],
    captureTimeout: 5000,
    singleRun: true
  });
};
