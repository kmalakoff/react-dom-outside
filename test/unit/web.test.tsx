global.IS_REACT_ACT_ENVIRONMENT = true;
import '../lib/pollyfills.cjs';

import assert from 'assert';
import React from 'react';
import { useEffect, forwardRef, Fragment } from 'react';
import { Dispatch, SetStateAction, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { createRoot, Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import { View, Text } from 'react-native-web';
import { Active, ActiveBoundary } from 'react-dom-outside';
import { EventProvider } from 'react-dom-event';
import { useRef } from 'react-ref-boundary';
import getByTestId from '../lib/getByTestId';

describe('react-native-web', function () {
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
      setIsActive?: Dispatch<SetStateAction<boolean>>;
    };

    const Component = forwardRef(function ({ isActive, setIsActive }: ComponentProps, ref: RefObject<View>) {
      return (
        <View ref={ref}>
          <Text testID="text">{isActive ? 'active' : 'not active'}</Text>
          <View
            testID="toggle"
            onClick={function () {
              setIsActive(!isActive);
            }}
          />
        </View>
      );
    });

    act(() =>
      root.render(
        <Fragment>
          <EventProvider>
            <Active>
              <Component />
            </Active>
          </EventProvider>
          <View testID="outside" />
        </Fragment>
      )
    );

    // inside
    assert.equal(getByTestId(container, 'text').innerHTML, 'not active');
    act(() => (getByTestId(container, 'toggle') as HTMLElement).click());
    assert.equal(getByTestId(container, 'text').innerHTML, 'active');

    // outside
    act(() => (getByTestId(container, 'outside') as HTMLElement).click());
    assert.equal(getByTestId(container, 'text').innerHTML, 'not active');
  });

  it('ActiveBoundary', function () {
    type ComponentProps = {
      isActive?: boolean | undefined;
      setIsActive?: Dispatch<SetStateAction<boolean>>;
    };

    function PortalComponent() {
      const ref = useRef(null);
      const el = useRef(document.createElement('View'));
      useEffect(function () {
        container.appendChild(el.current);
      });
      return createPortal(
        <View
          ref={ref}
          testID="portal-click"
          onClick={function (event) {
            event.stopPropagation();
          }}
        />,
        el.current
      );
    }

    const Component = forwardRef(function ({ isActive, setIsActive }: ComponentProps, ref: RefObject<View>) {
      return (
        <View ref={ref}>
          <Text testID="text">{isActive ? 'active' : 'not active'}</Text>
          <View
            testID="toggle"
            onClick={function () {
              setIsActive(!isActive);
            }}
          />
          <PortalComponent />
        </View>
      );
    });

    act(() =>
      root.render(
        <Fragment>
          <EventProvider>
            <ActiveBoundary>
              <Component />
            </ActiveBoundary>
          </EventProvider>
          <View
            testID="outside"
            onClick={function (event) {
              event.stopPropagation();
            }}
          />
        </Fragment>
      )
    );

    // inside
    assert.equal(getByTestId(container, 'text').innerHTML, 'not active');
    act(() => (getByTestId(container, 'toggle') as HTMLElement).click());
    assert.equal(getByTestId(container, 'text').innerHTML, 'active');

    // portal
    act(() => (getByTestId(container, 'portal-click') as HTMLElement).click());
    assert.equal(getByTestId(container, 'text').innerHTML, 'active');

    // outside
    act(() => (getByTestId(container, 'outside') as HTMLElement).click());
    assert.equal(getByTestId(container, 'text').innerHTML, 'not active');
  });
});
