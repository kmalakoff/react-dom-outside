import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { safeRmSync } from 'fs-remove-compat';
import { installPackedPackage } from './consumer-package.ts';

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const require = createRequire(import.meta.url);
mkdirSync(join(repository, '.tmp'), { recursive: true });
const fixture = mkdtempSync(join(repository, '.tmp', 'node-floor-'));
try {
  cpSync(join(repository, 'test/engines/package.json'), join(fixture, 'package.json'));
  cpSync(join(repository, 'test/engines/package-lock.json'), join(fixture, 'package-lock.json'));
  const npmCli = process.env.npm_execpath;
  if (!npmCli) throw new Error('Run this fixture through npm run test:engines.');
  const install = spawnSync(process.execPath, [npmCli, 'ci', '--prefix', fixture, '--ignore-scripts', '--no-audit', '--no-fund'], { stdio: 'inherit', timeout: 120_000 });
  if (install.error) throw install.error;
  if (install.status !== 0) throw new Error('Node consumer installation failed.');
  for (const name of ['react-dom-outside', 'react-dom-event', 'react-ref-boundary']) {
    const from = name === 'react-dom-outside' ? repository : join(repository, 'node_modules', name);
    const consumerPackage = join(fixture, 'node_modules', name);
    installPackedPackage(from, consumerPackage, fixture);
  }
  cpSync(join(repository, 'test/exports/floor.mjs'), join(fixture, 'floor.mjs'));
  const result = spawnSync(process.execPath, [require.resolve('node-version-use/bin/cli.js'), '16.0.0', 'node', join(fixture, 'floor.mjs')], {
    stdio: 'inherit',
    timeout: 120_000,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Node floor check failed with status ${result.status}.`);
} finally {
  safeRmSync(fixture, { recursive: true, force: true });
}
