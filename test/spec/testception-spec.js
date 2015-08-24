/**
 * For the specs to pass, simple incomplete examples are sufficient,
 * but since the DSL does expectations itself after calling withMessage() or withSameMessage(),
 * all specs need to be full working examples.
 */
describe('the Testception DSL', function () {

  // These mock matchers pass when expected is true
  var mockMatcher1 = jasmine.createSpy('Jasmine 1 matcher').and.callFake(function (pass) {
    this.message = function () {
      return ['jasmine 1 fail message', 'jasmine 1 pass message'];
    };
    return pass;
  });

  var compareSpy = jasmine.createSpy('Compare function for jasmine 2 matcher').and.callFake(function (actual, pass) {
    return {
      pass: pass,
      message: 'jasmine 2 pass message'
    };
  });
  var mockMatcher2 = function () {
    return {
      compare: compareSpy
    };
  };

  describe('the jasmine version', function () {

    it('should test matchers for jasmine 2 by default', function () {
      expect(expectMatcher.jasmineVersion).toBe(2);
    });

    it('should throw an error when the jasmine version is not 1 or 2', function () {
      expectMatcher.jasmineVersion = 0;
      expect(expectMatcher().withSameMessage).toThrowError(Error, 'Incorrect Jasmine version specified: ' + 0);
      expectMatcher.jasmineVersion = 2;
    });
  });

  it('should register the matcher', function () {
    expect(expectMatcher('matcher').matcher).toBe('matcher');
  });

  it('should set the actual', function () {
    expect(expectMatcher().withActual('actual').actual).toBe('actual');
  });

  it('should set the expected', function () {
    expect(expectMatcher().andExpected('expected', 'more-args').expected).toEqual(['expected', 'more-args']);
  });

  describe('when you expect a pass or fail', function () {
    it('should set pass to true', function () {
      expect(expectMatcher().toPass().pass).toBe(true);
    });

    it('should set pass to false', function () {
      expect(expectMatcher().toFail().pass).toBe(false);
    });
  });

  describe('when passing the message', function () {

    it('should set the message', function () {
      expect(expectMatcher(mockMatcher2)
        .andExpected(true)
        .toPass()
        .withMessage('jasmine 2 pass message').expectedMessage).toBe('jasmine 2 pass message');
    });

    describe('and when the matcher is for Jasmine 1', function () {
      beforeAll(function () {
        expectMatcher.jasmineVersion = 1;
      });

      it('should test the matcher with given parameters', function () {
        var expected = true;
        expectMatcher(mockMatcher1)
          .withActual('actual')
          .andExpected(expected)
          .toPass()
          .withMessage('jasmine 1 pass message');

        expect(mockMatcher1).toHaveBeenCalledWith(expected);
      });

      afterAll(function () {
        expectMatcher.jasmineVersion = 2;
      });
    });

    describe('and when the matcher is for Jasmine 2', function () {

      it('should test the matcher with given parameters', function () {
        var expected = true;
        expectMatcher(mockMatcher2)
          .withActual('actual')
          .andExpected(expected)
          .toPass()
          .withMessage('jasmine 2 pass message');

        expect(compareSpy).toHaveBeenCalledWith('actual', expected);
      });
    });
  });

  describe('when requesting a new test with the same message', function () {

    describe('and when the matcher is for Jasmine 1', function () {
      beforeAll(function () {
        expectMatcher.jasmineVersion = 1;
      });

      it('should return the pass message when it passes', function () {
        var expected = true;
        var test = expectMatcher(mockMatcher1)
          .withActual('actual')
          .andExpected(expected)
          .toPass()
          .withMessage('jasmine 1 pass message');

        compareSpy.calls.reset();

        test.withSameMessage();
        expect(mockMatcher1).toHaveBeenCalledWith(expected);
      });

      it('should return the fail message when it fails', function () {
        var expected = false;
        var test = expectMatcher(mockMatcher1)
          .withActual('actual')
          .andExpected(expected)
          .toFail()
          .withMessage('jasmine 1 fail message');

        compareSpy.calls.reset();

        test.withSameMessage();
        expect(mockMatcher1).toHaveBeenCalledWith(expected);
      });

      afterAll(function () {
        expectMatcher.jasmineVersion = 2;
      });
    });

    describe('and when the matcher is for Jasmine 2', function () {

      it('should rerun the test', function () {
        var expected = true;
        var test = expectMatcher(mockMatcher2)
          .withActual('actual')
          .andExpected(expected)
          .toPass()
          .withMessage('jasmine 2 pass message');

        compareSpy.calls.reset();

        test.withSameMessage();
        expect(compareSpy).toHaveBeenCalledWith('actual', expected);
      });
    });

  });

});
