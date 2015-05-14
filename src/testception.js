/**
 * DSL for testing Jasmine 2 matchers.
 * @param {Object} matcher to test
 * @returns {Object} test
 */
function expectMatcher(matcher) {
  function runTest() {
    expect(test.matcher().compare(test.actual, test.expected))
      .toEqual({ pass: test.pass, message: test.message });
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
    test.message = message;

    runTest();

    return test;
  };

  test.withSameMessage = function () {
    runTest();
    return test;
  };

  return test;
}
