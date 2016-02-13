var wallabyFiles = require('test-runner-config').getWallabyFiles(require('./test/testFiles'));

module.exports = function () {
  return {
    files: wallabyFiles.files,
    tests: wallabyFiles.tests
  };
};
