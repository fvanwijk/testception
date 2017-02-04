import expectMatcher from '../../src/testception';

/**
 * For the specs to pass, simple incomplete examples are sufficient,
 * but since the DSL does expectations itself after calling withMessage() or withSameMessage(),
 * all specs need to be full working examples.
 */
describe('the Testception DSL', () => {
  // These mock matchers pass when expected is true
  const mockMatcher1 = jasmine.createSpy('Jasmine 1 matcher').and.callFake(function andCallFake(pass) {
    this.message = () => ['jasmine 1 fail message', 'jasmine 1 pass message'];
    return pass;
  });

  const compareSpy = jasmine.createSpy('Compare function for jasmine 2 matcher').and.callFake((actual, pass) => ({
    pass,
    message: 'jasmine 2 pass message'
  }));
  const mockMatcher2 = () => ({ compare: compareSpy });

  describe('the jasmine version', () => {
    it('should test matchers for jasmine 2 by default', () => {
      expect(expectMatcher.jasmineVersion).toBe(2);
    });

    it('should throw an error when the jasmine version is not 1 or 2', () => {
      expectMatcher.jasmineVersion = 0;
      expect(expectMatcher().withSameMessage).toThrowError(Error, 'Incorrect Jasmine version specified: 0');
      expectMatcher.jasmineVersion = 2;
    });
  });

  it('should register the matcher', () => {
    expect(expectMatcher('matcher').matcher).toBe('matcher');
  });

  it('should set the actual', () => {
    expect(expectMatcher().withActual('actual').actual).toBe('actual');
  });

  it('should set the expected', () => {
    expect(expectMatcher().andExpected('expected', 'more-args').expected).toEqual(['expected', 'more-args']);
  });

  describe('when you expect a pass or fail', () => {
    it('should set pass to true', () => {
      expect(expectMatcher().toPass().pass).toBe(true);
    });

    it('should set pass to false', () => {
      expect(expectMatcher().toFail().pass).toBe(false);
    });
  });

  describe('when passing the message', () => {
    it('should set the message', () => {
      expect(expectMatcher(mockMatcher2)
        .andExpected(true)
        .toPass()
        .withMessage('jasmine 2 pass message').expectedMessage).toBe('jasmine 2 pass message');
    });

    describe('and when the matcher is for Jasmine 1', () => {
      beforeAll(() => {
        expectMatcher.jasmineVersion = 1;
      });

      it('should test the matcher with given parameters', () => {
        const expected = true;
        expectMatcher(mockMatcher1)
          .withActual('actual')
          .andExpected(expected)
          .toPass()
          .withMessage('jasmine 1 pass message');

        expect(mockMatcher1).toHaveBeenCalledWith(expected);
      });

      afterAll(() => {
        expectMatcher.jasmineVersion = 2;
      });
    });

    describe('and when the matcher is for Jasmine 2', () => {
      it('should test the matcher with given parameters', () => {
        const expected = true;
        expectMatcher(mockMatcher2)
          .withActual('actual')
          .andExpected(expected)
          .toPass()
          .withMessage('jasmine 2 pass message');

        expect(compareSpy).toHaveBeenCalledWith('actual', expected);
      });
    });
  });

  describe('when requesting a new test with the same message', () => {
    describe('and when the matcher is for Jasmine 1', () => {
      beforeAll(() => {
        expectMatcher.jasmineVersion = 1;
      });

      it('should return the pass message when it passes', () => {
        const expected = true;
        const test = expectMatcher(mockMatcher1)
          .withActual('actual')
          .andExpected(expected)
          .toPass()
          .withMessage('jasmine 1 pass message');

        compareSpy.calls.reset();

        test.withSameMessage();
        expect(mockMatcher1).toHaveBeenCalledWith(expected);
      });

      it('should return the fail message when it fails', () => {
        const expected = false;
        const test = expectMatcher(mockMatcher1)
          .withActual('actual')
          .andExpected(expected)
          .toFail()
          .withMessage('jasmine 1 fail message');

        compareSpy.calls.reset();

        test.withSameMessage();
        expect(mockMatcher1).toHaveBeenCalledWith(expected);
      });

      afterAll(() => {
        expectMatcher.jasmineVersion = 2;
      });
    });

    describe('and when the matcher is for Jasmine 2', () => {
      it('should rerun the test', () => {
        const expected = true;
        const test = expectMatcher(mockMatcher2)
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
