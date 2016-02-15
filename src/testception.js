'use strict';

/**
 * DSL for testing Jasmine 2 matchers.
 * @param {Object} matcher to test
 * @returns {Object} test
 */
export function expectMatcher(matcher) {
  let test = {
    matcher: matcher
  };

  function runTest() {
    if (expectMatcher.jasmineVersion === 2) {
      let args = [test.actual].concat(test.expected);
      expect(test.matcher().compare.apply(this, args))
        .toEqual({ pass: test.pass, message: test.expectedMessage });
    } else if (expectMatcher.jasmineVersion === 1) {
      expect(test.matcher.apply(test, test.expected)).toEqual(test.pass);
      // Jasmine 1 adds the message to 'this' (the test in this case)
      expect(test.message()[test.pass ? 1 : 0]).toEqual(test.expectedMessage);
    } else {
      throw Error('Incorrect Jasmine version specified: ' + expectMatcher.jasmineVersion);
    }
  }

  test.withActual = actual => {
    test.actual = actual;
    return test;
  };

  test.andExpected = function (expected) {
    test.expected = Array.prototype.slice.call(arguments, 0);
    return test;
  };

  test.toPass = () => {
    test.pass = true;
    return test;
  };

  test.toFail = () => {
    test.pass = false;
    return test;
  };

  test.withMessage = message => {
    test.expectedMessage = message;

    runTest();

    return test;
  };

  test.withSameMessage = () => {
    runTest();
    return test;
  };

  return test;
}

expectMatcher.jasmineVersion = 2;
