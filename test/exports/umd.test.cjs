const assert = require('assert');

const umd = require('react-dom-outside/umd');
const reactDomOutside = umd.default || umd;
const { Active, ActiveBoundary } = reactDomOutside;

describe('exports umd', () => {
  it('defaults', () => {
    assert.equal(typeof Active, 'function');
    assert.equal(typeof ActiveBoundary, 'function');
  });
});
