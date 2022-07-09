const assert = require('assert');
const { Active, ActiveBoundary } = require('react-dom-outside');

describe('exports .ts', function () {
  it('defaults', function () {
    assert.equal(typeof Active, 'function');
    assert.equal(typeof ActiveBoundary, 'function');
  });
});
