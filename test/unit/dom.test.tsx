import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot, Root } from 'react-dom/client';

import { Active, ActiveBoundary } from 'react-dom-outside';
import { EventProvider } from 'react-dom-event';
import { useRef } from 'react-ref-boundary';

function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

describe('react-dom', function () {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;
  beforeEach(function () {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(function () {
    root.unmount();
    root = null;
    container.remove();
    container = null;
  });

  it('Active', async function () {
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

    root.render(
      <React.Fragment>
        <EventProvider>
          <Active>
            <Component />
          </Active>
        </EventProvider>
        <button id="outside" />
      </React.Fragment>,
    );
    await sleep(5); // wait for useEffect to resolve

    // inside
    assert.equal(container.querySelector('#text').innerHTML, 'not active');
    (container.querySelector('#toggle') as HTMLElement).click();
    await sleep(5); // wait for useEffect to resolve
    assert.equal(container.querySelector('#text').innerHTML, 'active');

    // outside
    (container.querySelector('#outside') as HTMLElement).click();
    await sleep(5); // wait for useEffect to resolve
    assert.equal(container.querySelector('#text').innerHTML, 'not active');
  });

  it('ActiveBoundary', async function () {
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
    );
    await sleep(5); // wait for useEffect to resolve

    // inside
    assert.equal(container.querySelector('#text').innerHTML, 'not active');
    (container.querySelector('#toggle') as HTMLElement).click();
    await sleep(5); // wait for useEffect to resolve
    assert.equal(container.querySelector('#text').innerHTML, 'active');

    // portal
    (container.querySelector('#portal-click') as HTMLElement).click();
    await sleep(5); // wait for useEffect to resolve
    assert.equal(container.querySelector('#text').innerHTML, 'active');

    // outside
    (container.querySelector('#outside') as HTMLElement).click();
    await sleep(5); // wait for useEffect to resolve
    assert.equal(container.querySelector('#text').innerHTML, 'not active');
  });
});
