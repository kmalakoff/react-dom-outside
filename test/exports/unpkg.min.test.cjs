const assert = require('assert');
const { Active, ActiveBoundary } = require('react-dom-outside/dist/umd/react-dom-outside.min.cjs');

describe('exports react-dom-outside/dist/umd/react-dom-outside.min.cjs', () => {
  it('defaults', () => {
    assert.equal(typeof Active, 'function');
    assert.equal(typeof ActiveBoundary, 'function');
  });
});
