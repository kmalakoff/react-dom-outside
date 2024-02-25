// @ts-ignore
global.IS_REACT_ACT_ENVIRONMENT = true;
import '../lib/polyfills.cjs';

import assert from 'assert';

import React, { Fragment, forwardRef, useEffect, useRef as useRefReact } from 'react';
import { Dispatch, RefObject, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import { Root, createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import { EventProvider } from 'react-dom-event';
// @ts-ignore
import { Active, ActiveBoundary } from 'react-dom-outside';
import { useRef } from 'react-ref-boundary';

describe('react-dom', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    root = null;
    container.remove();
    container = null;
  });

  it('Active', () => {
    type ComponentProps = {
      isActive?: boolean | undefined;
      setIsActive?: Dispatch<SetStateAction<boolean>>;
    };

    const Component = forwardRef(({ isActive, setIsActive }: ComponentProps, ref: RefObject<HTMLDivElement>) => (
      <div ref={ref}>
        <div id="text">{isActive ? 'active' : 'not active'}</div>
        <button
          type="button"
          id="toggle"
          onClick={() => {
            setIsActive(!isActive);
          }}
        />
      </div>
    ));

    act(() =>
      root.render(
        <Fragment>
          <EventProvider>
            <Active>
              <Component />
            </Active>
          </EventProvider>
          <button type="button" id="outside" />
        </Fragment>
      )
    );

    // inside
    assert.equal(container.querySelector('#text').innerHTML, 'not active');
    act(() => (container.querySelector('#toggle') as HTMLElement).click());
    assert.equal(container.querySelector('#text').innerHTML, 'active');

    // outside
    act(() => (container.querySelector('#outside') as HTMLElement).click());
    assert.equal(container.querySelector('#text').innerHTML, 'not active');
  });

  it('ActiveBoundary', () => {
    type ComponentProps = {
      isActive?: boolean | undefined;
      setIsActive?: Dispatch<SetStateAction<boolean>>;
    };

    function PortalComponent() {
      const ref = useRef(null);
      const el = useRefReact(document.createElement('div'));
      useEffect(() => {
        container.appendChild(el.current);
      });
      return createPortal(
        <button
          ref={ref}
          type="button"
          id="portal-click"
          onClick={(event) => {
            event.stopPropagation();
          }}
        />,
        el.current
      );
    }

    const Component = forwardRef(({ isActive, setIsActive }: ComponentProps, ref: RefObject<HTMLDivElement>) => (
      <div ref={ref}>
        <div id="text">{isActive ? 'active' : 'not active'}</div>
        <button
          type="button"
          id="toggle"
          onClick={() => {
            setIsActive(!isActive);
          }}
        />
        <PortalComponent />
      </div>
    ));

    act(() =>
      root.render(
        <Fragment>
          <EventProvider>
            <ActiveBoundary>
              <Component />
            </ActiveBoundary>
          </EventProvider>
          <button
            type="button"
            id="outside"
            onClick={(event) => {
              event.stopPropagation();
            }}
          />
        </Fragment>
      )
    );

    // inside
    assert.equal(container.querySelector('#text').innerHTML, 'not active');
    act(() => (container.querySelector('#toggle') as HTMLElement).click());
    assert.equal(container.querySelector('#text').innerHTML, 'active');

    // portal
    act(() => (container.querySelector('#portal-click') as HTMLElement).click());
    assert.equal(container.querySelector('#text').innerHTML, 'active');

    // outside
    act(() => (container.querySelector('#outside') as HTMLElement).click());
    assert.equal(container.querySelector('#text').innerHTML, 'not active');
  });
});
