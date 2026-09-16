import '../lib/polyfills.cjs';

import assert from 'assert';
import type { Ref } from 'react';
import React, { act, Fragment, forwardRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { EventProvider } from 'react-dom-event';
import { Active, ActiveBoundary, type ActiveInjectedProps, type ActiveProps } from 'react-dom-outside';
import { useBoundary, useRef as useBoundaryRef } from 'react-ref-boundary';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
const suite = typeof document === 'undefined' ? describe.skip : describe;
const Child = forwardRef<HTMLDivElement, Partial<ActiveInjectedProps> & { name?: string }>(({ isActive, setIsActive, name = 'one' }, ref) => (
  <div ref={ref} data-child={name}>
    <span data-status={name}>{isActive ? 'active' : 'inactive'}</span>
    <button type="button" data-toggle={name} onClick={() => setIsActive?.((current) => !current)}>
      Toggle
    </button>
  </div>
));

suite('react-dom', () => {
  let container: HTMLDivElement;
  let root: Root | undefined;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });
  afterEach(() => {
    if (root) act(() => root?.unmount());
    root = undefined;
    container.remove();
  });
  function render(children: React.ReactNode) {
    assert.ok(root);
    act(() => root?.render(<EventProvider>{children}</EventProvider>));
  }
  function click(selector: string, parent: ParentNode = container) {
    const element = parent.querySelector<HTMLElement>(selector);
    assert.ok(element, `Missing interaction target: ${selector}`);
    act(() => element.click());
  }
  function status(name = 'one') {
    return container.querySelector(`[data-status="${name}"]`)?.textContent;
  }

  for (const Wrapper of [Active, ActiveBoundary]) {
    describe(Wrapper.name, () => {
      it('preserves inside clicks, dismisses outside, and composes object refs', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
          <>
            <Wrapper>
              <Child ref={ref} />
            </Wrapper>
            <button type="button" id="outside" />
          </>
        );
        assert.equal(ref.current, container.querySelector('[data-child="one"]'));
        assert.equal(status(), 'inactive');
        click('[data-toggle="one"]');
        assert.equal(status(), 'active');
        click('[data-status="one"]');
        assert.equal(status(), 'active');
        click('#outside');
        assert.equal(status(), 'inactive');
        act(() => root?.unmount());
        root = undefined;
        assert.equal(ref.current, null);
      });

      it('preserves callback refs through replacement and unmount', () => {
        const received: string[] = [];
        const cleanupSupported = Number.parseInt(React.version, 10) >= 19;
        function callback(name: string): Ref<HTMLDivElement> {
          return (element) => {
            received.push(`${name}:${element ? 'attach' : 'detach'}`);
            if (element && cleanupSupported)
              return () => {
                received.push(`${name}:cleanup`);
              };
          };
        }
        const first = callback('first');
        const second = callback('second');
        render(
          <Wrapper>
            <Child ref={first} />
          </Wrapper>
        );
        click('[data-toggle="one"]');
        assert.deepEqual(received, ['first:attach']);
        render(
          <Wrapper>
            <Child ref={second} />
          </Wrapper>
        );
        assert.equal(status(), 'active');
        act(() => root?.unmount());
        root = undefined;
        const release = cleanupSupported ? 'cleanup' : 'detach';
        assert.deepEqual(received, ['first:attach', `first:${release}`, 'second:attach', `second:${release}`]);
      });

      it('keeps two components independent', () => {
        render(
          <>
            <Wrapper>
              <Child name="one" />
            </Wrapper>
            <Wrapper>
              <Child name="two" />
            </Wrapper>
          </>
        );
        click('[data-toggle="one"]');
        assert.equal(status('one'), 'active');
        assert.equal(status('two'), 'inactive');
        click('[data-toggle="two"]');
        assert.equal(status('one'), 'inactive');
        assert.equal(status('two'), 'active');
      });

      it('rejects fragments and multiple children', () => {
        assert.throws(() => Wrapper({ children: <Fragment /> }), /non-Fragment child/);
        assert.throws(() => Wrapper({ children: [<div key="a" />, <div key="b" />] as unknown as ActiveProps['children'] }), /single React element child/);
      });
    });
  }

  it('includes registered portals, unregisters removed portals, and dismisses unrelated portals', () => {
    const registeredHost = document.createElement('div');
    const unrelatedHost = document.createElement('div');
    document.body.append(registeredHost, unrelatedHost);
    let refs: ReturnType<typeof useBoundary>['refs'] = [];
    function Portal() {
      const ref = useBoundaryRef<HTMLButtonElement | null>(null);
      return createPortal(
        <button type="button" id="registered" ref={ref} onClick={(event) => event.stopPropagation()}>
          Portal
        </button>,
        registeredHost
      );
    }
    function Probe() {
      refs = useBoundary().refs;
      return null;
    }
    const PortalChild = forwardRef<HTMLDivElement, Partial<ActiveInjectedProps>>(({ isActive, setIsActive }, ref) => {
      const [showPortal, setShowPortal] = useState(true);
      return (
        <div ref={ref}>
          <span data-status="one">{isActive ? 'active' : 'inactive'}</span>
          <button type="button" data-toggle="one" onClick={() => setIsActive?.((value) => !value)}>
            Toggle
          </button>
          <button type="button" id="remove" onClick={() => setShowPortal(false)}>
            Remove portal
          </button>
          <Probe />
          {showPortal && <Portal />}
          {createPortal(
            <button type="button" id="unrelated" onClick={(event) => event.stopPropagation()}>
              Unrelated
            </button>,
            unrelatedHost
          )}
        </div>
      );
    });
    try {
      render(
        <ActiveBoundary>
          <PortalChild />
        </ActiveBoundary>
      );
      assert.equal(refs.length, 2);
      click('[data-toggle="one"]');
      click('#registered', registeredHost);
      assert.equal(status(), 'active');
      click('#remove');
      assert.equal(registeredHost.children.length, 0);
      assert.equal(refs.length, 1);
      assert.equal(status(), 'active');
      click('#unrelated', unrelatedHost);
      assert.equal(status(), 'inactive');
    } finally {
      act(() => root?.unmount());
      root = undefined;
      registeredHost.remove();
      unrelatedHost.remove();
    }
  });
});
