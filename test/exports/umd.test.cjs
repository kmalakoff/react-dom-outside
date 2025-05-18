const assert = require('assert');

let umd = null;
try {
  umd = require('react-dom-outside/umd');
} catch (_) {
  umd = require('react-dom-outside/dist/umd/react-dom-outside.cjs');
}
const reactDomOutside = typeof window !== 'undefined' ? window.reactDomOutside : umd.default || umd;
const { Active, ActiveBoundary } = reactDomOutside;

describe('exports umd', () => {
  it('defaults', () => {
    assert.equal(typeof Active, 'function');
    assert.equal(typeof ActiveBoundary, 'function');
  });
});
