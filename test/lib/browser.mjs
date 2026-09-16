import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const tsds = createRequire(import.meta.url).resolve('ts-dev-stack/bin/cli.js');
for (const version of ['18.3.1', '19.3.0']) {
  console.log(`Browser ref lifecycle: React ${version}`);
  execFileSync(process.execPath, [tsds, 'test:browser', '--config', 'wtr.config.mjs'], {
    stdio: 'inherit',
    env: { ...process.env, REACT_TEST_VERSION: version },
  });
}
