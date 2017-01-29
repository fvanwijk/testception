var karmaFiles = require('test-runner-config').getKarmaFiles(require('./test/testFiles'));

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    preprocessors: {
      'src/**/*.js': ['coverage']
    },
    files: karmaFiles.files,
    exclude: karmaFiles.exclude,
    reporters: ['progress', 'coverage'],
    port: 8080,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
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
