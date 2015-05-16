/**
 * DSL for testing Jasmine 2 matchers.
 * @param {Object} matcher to test
 * @returns {Object} test
 */
var expectMatcher = function expectMatcher(matcher) {
  function runTest() {
    if (expectMatcher.jasmineVersion === 2) {
      expect(test.matcher().compare(test.actual, test.expected))
        .toEqual({ pass: test.pass, message: test.expectedMessage });
    } else if (expectMatcher.jasmineVersion === 1) {
      expect(test.matcher(test.expected)).toEqual(test.pass);
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
    test.expected = expected;
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
