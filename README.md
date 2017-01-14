Testception
================

[![Build Status](https://travis-ci.org/fvanwijk/testception.svg?branch=master)](https://travis-ci.org/fvanwijk/testception)
[![Test Coverage](https://codeclimate.com/github/fvanwijk/testception/badges/coverage.svg)](https://codeclimate.com/github/fvanwijk/testception)
[![Code Climate](https://codeclimate.com/github/fvanwijk/testception/badges/gpa.svg)](https://codeclimate.com/github/fvanwijk/testception)
[![devDependency Status](https://david-dm.org/fvanwijk/testception/dev-status.svg)](https://david-dm.org/fvanwijk/testception#info=devDependencies)

Most people test their custom Jasmine matchers by setting up test suite with mock data.
The matcher is used with the mock data and if the matcher is implemented correctly, no test fails.

```javascript
it('should pass when the actual and expected are equal', function () {
  expect({}).toEqual({});
});
```

However, with this approach, the cases where the matcher fails are not covered.
The trivial way to do this is to prepend `.not` to the matcher.
Still the generated error messages for a failing test are not verified.

Therefore, you need to test a matcher by testing the matcher function itself.
This a already done with the matchers of Jasmine itself.

This DSL helps you with testing Jasmine 1 and 2 matchers by just using one statement.

# Installing

`npm install testception --save-dev` or `bower install testception --save-dev`

Include dist/testception.min.js file in the files list of your test runner config file.
Testception only has an `addMatchers` method which is available on the global `testception` variable.

If you prefer CommonJS, you could require testception by calling `var testception = require('testception');`
Last but not least, testception is available as an ES6 module: `import {addMatchers} from 'testception';`

# Documentation

First of all, you need the matcher in your test file. This is the object that is passed to Jasmine's `addMatchers` method.
It is the `matcher` in `addMatchers({ matcherName: matcher })`.

Then test the matcher by using the DSL:

```javascript
// Test subject is a custom toEqual matcher
var test = expectMatcher(matcher)
  .withActual({})
  .andExpected({})
  .toPass()
  .withMessage('Expected Object({  }) not to equal Object({  })');

expectMatcher(matcher)
  .withActual({})
  .andExpected('')
  .toFail()
  .withMessage('Expected Object({  }) to equal \'\'');
```

Modify your test and rerun it:

```javascript
test
  .withActual([])
  .andExpected([])
  .withSameMessage();
```

Testception expects your matcher to be a Jasmine 2 matcher by default. When you want to test a Jasmine 1 matcher,
call:

```javascript
expectMatcher.jasmineVersion = 1;
```

# TODO

- Injecting util and customEqualityTesters in tested matcher
- Test custom negative comparators

# Development

* `npm install`
* `bower install`

Run `grunt -h` to see available tasks.