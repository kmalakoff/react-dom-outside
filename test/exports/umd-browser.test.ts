import assert from 'assert';
import React from 'react';
import * as reactDomEvent from 'react-dom-event';
import * as reactRefBoundary from 'react-ref-boundary';

describe('browser UMD global', () => {
  it('loads the served UMD asset as a classic script', async () => {
    const globals = window as Window & {
      React?: typeof React;
      reactDomEvent?: typeof reactDomEvent;
      ReactRefBoundary?: typeof reactRefBoundary;
      reactDomOutside?: { Active?: unknown; ActiveBoundary?: unknown };
    };
    const script = document.createElement('script');
    const previous = { React: globals.React, reactDomEvent: globals.reactDomEvent, ReactRefBoundary: globals.ReactRefBoundary, reactDomOutside: globals.reactDomOutside };
    script.src = new URL('../../dist/umd/react-dom-outside.cjs', import.meta.url).href;
    script.async = false;
    globals.React = React;
    globals.reactDomEvent = reactDomEvent;
    globals.ReactRefBoundary = reactRefBoundary;

    try {
      await new Promise<void>((resolve, reject) => {
        script.addEventListener('load', () => resolve(), { once: true });
        script.addEventListener('error', () => reject(new Error(`Failed to load ${script.src}`)), { once: true });
        document.head.append(script);
      });
      assert.equal(typeof globals.reactDomOutside?.Active, 'function');
      assert.equal(typeof globals.reactDomOutside?.ActiveBoundary, 'function');
    } finally {
      script.remove();
      for (const key of Object.keys(previous) as Array<keyof typeof previous>) {
        Object.defineProperty(globals, key, { configurable: true, writable: true, value: previous[key] });
        if (previous[key] === undefined) delete globals[key];
      }
    }
  });
});
