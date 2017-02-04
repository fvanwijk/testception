const wallabyWebpack = require('wallaby-webpack');

module.exports = function (wallaby) {
  return {
    files: [{ pattern: 'src/testception.js', load: false }],
    tests: [{ pattern: 'src/testception-spec.js', load: false }],
    compilers: {
      'src/*.js': wallaby.compilers.babel()
    },
    postprocessor: wallabyWebpack(),
    bootstrap() {
      window.__moduleBundler.loadTests();
    }
  };
};
