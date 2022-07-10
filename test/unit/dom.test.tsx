global.IS_REACT_ACT_ENVIRONMENT = true;
import "../lib/pollyfills.cjs"

import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot, Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import { Active, ActiveBoundary } from 'react-dom-outside';
import { EventProvider } from 'react-dom-event';
import { useRef } from 'react-ref-boundary';

describe('react-dom', function () {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;
  beforeEach(function () {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(function () {
    act(() => root.unmount());
    root = null;
    container.remove();
    container = null;
  });

  it('Active', function () {
    type ComponentProps = {
      isActive?: boolean | undefined;
      setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
    };

    const Component = React.forwardRef(function (
      { isActive, setIsActive }: ComponentProps,
      ref: React.RefObject<HTMLDivElement>,
    ) {
      return (
        <div ref={ref}>
          <div id="text">{isActive ? 'active' : 'not active'}</div>
          <button
            id="toggle"
            onClick={function () {
              setIsActive(!isActive);
            }}
          />
        </div>
      );
    });

    act(() =>
      root.render(
        <React.Fragment>
          <EventProvider>
            <Active>
              <Component />
            </Active>
          </EventProvider>
          <button id="outside" />
        </React.Fragment>,
      ),
    );

    // inside
    assert.equal(container.querySelector('#text').innerHTML, 'not active');
    act(() => (container.querySelector('#toggle') as HTMLElement).click());
    assert.equal(container.querySelector('#text').innerHTML, 'active');

    // outside
    act(() => (container.querySelector('#outside') as HTMLElement).click());
    assert.equal(container.querySelector('#text').innerHTML, 'not active');
  });

  it('ActiveBoundary', function () {
    type ComponentProps = {
      isActive?: boolean | undefined;
      setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
    };

    function PortalComponent() {
      const ref = useRef(null);
      const el = React.useRef(document.createElement('div'));
      React.useEffect(function () {
        container.appendChild(el.current);
      });
      return ReactDOM.createPortal(
        <button
          ref={ref}
          id="portal-click"
          onClick={function (event) {
            event.stopPropagation();
          }}
        />,
        el.current,
      );
    }

    const Component = React.forwardRef(function (
      { isActive, setIsActive }: ComponentProps,
      ref: React.RefObject<HTMLDivElement>,
    ) {
      return (
        <div ref={ref}>
          <div id="text">{isActive ? 'active' : 'not active'}</div>
          <button
            id="toggle"
            onClick={function () {
              setIsActive(!isActive);
            }}
          />
          <PortalComponent />
        </div>
      );
    });

    act(() =>
      root.render(
        <React.Fragment>
          <EventProvider>
            <ActiveBoundary>
              <Component />
            </ActiveBoundary>
          </EventProvider>
          <button
            id="outside"
            onClick={function (event) {
              event.stopPropagation();
            }}
          />
        </React.Fragment>,
      ),
    );

    // inside
    assert.equal(container.querySelector('#text').innerHTML, 'not active');
    act(() => (container.querySelector('#toggle') as HTMLElement).click());
    assert.equal(container.querySelector('#text').innerHTML, 'active');

    // portal
    act(() =>
      (container.querySelector('#portal-click') as HTMLElement).click(),
    );
    assert.equal(container.querySelector('#text').innerHTML, 'active');

    // outside
    act(() => (container.querySelector('#outside') as HTMLElement).click());
    assert.equal(container.querySelector('#text').innerHTML, 'not active');
  });
});
