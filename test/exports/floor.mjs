import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { Active, ActiveBoundary } from 'react-dom-outside';

assert.equal(process.versions.node, '16.0.0');
assert.equal(typeof Active, 'function');
assert.equal(typeof ActiveBoundary, 'function');
const require = createRequire(import.meta.url);
for (const name of ['react-dom-outside', 'react-dom-outside/umd']) {
  const loaded = require(name);
  assert.equal(typeof loaded.Active, 'function');
  assert.equal(typeof loaded.ActiveBoundary, 'function');
}
console.log('Node 16.0.0: ESM, CommonJS and UMD package loading passed.');
