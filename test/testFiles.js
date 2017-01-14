module.exports = [
  {
    type: 'src',
    files: [
      'src/testception.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-mox/dist/mox.js',
    ]
  },
  {
    type: 'es6src',
    files: [
    ]
  },
  {
    type: 'specs',
    files: [
      'test/spec/testception-spec.js'
    ]
  }
];
