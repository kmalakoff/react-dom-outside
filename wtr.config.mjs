import { importMapsPlugin } from '@web/dev-server-import-maps';
import createConfig from 'tsds-web-test-runner/createConfig.mjs';

const reactVersion = process.env.REACT_TEST_VERSION || '19.3.0';

export default createConfig({
  port: 9009,
  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            react: `https://esm.sh/react@${reactVersion}?dev`,
            'react-dom': `https://esm.sh/react-dom@${reactVersion}?dev`,
            'react-dom/client': `https://esm.sh/react-dom@${reactVersion}/client.js?dev`,
          },
        },
      },
    }),
  ],
});
