/**
 * DSL for testing Jasmine 2 matchers.
 * @param {Object} matcher to test
 * @returns {Object} test
 */
var expectMatcher = function expectMatcher(matcher) {
  function runTest() {
    if (expectMatcher.jasmineVersion === 2) {
      var args = [test.actual].concat(test.expected);
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

  var test = {
    matcher: matcher
  };

  test.withActual = function (actual) {
    test.actual = actual;
    return test;
  };

  test.andExpected = function (expected) {
    test.expected = Array.prototype.slice.call(arguments, 0);
    return test;
  };

  test.toPass = function () {
    test.pass = true;
    return test;
  };

  test.toFail = function () {
    test.pass = false;
    return test;
  };

  test.withMessage = function (message) {
    test.expectedMessage = message;

    runTest();

    return test;
  };

  test.withSameMessage = function () {
    runTest();
    return test;
  };

  return test;
};

expectMatcher.jasmineVersion = 2;
