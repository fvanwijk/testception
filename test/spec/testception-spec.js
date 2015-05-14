describe('the testception DSL', function () {
  var compareSpy = jasmine.createSpy('compare function').and.returnValue({
    pass: undefined,
    message: 'message'
  });
  var mockMatcher = function () {
    return {
      compare: compareSpy
    };
  };

  it('should register the matcher', function () {
    expect(expectMatcher('matcher').matcher).toBe('matcher');
  });

  it('should set the actual', function () {
    expect(expectMatcher().withActual('actual').actual).toBe('actual');
  });

  it('should set the expected', function () {
    expect(expectMatcher().andExpected('expected').expected).toBe('expected');
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
      expect(expectMatcher(mockMatcher).withMessage('message').message).toBe('message');
    });

    it('should test the matcher with given parameters', function () {
      expectMatcher(mockMatcher)
        .withActual('actual')
        .andExpected('expected')
        .withMessage('message');

      expect(compareSpy).toHaveBeenCalledWith('actual', 'expected');
    });
  });

  it('should rerun the test', function () {
    var test = expectMatcher(mockMatcher)
      .withActual('actual')
      .andExpected('expected')
      .withMessage('message');

    compareSpy.calls.reset();

    test.withSameMessage();
    expect(compareSpy).toHaveBeenCalledWith('actual', 'expected');
  });
});
