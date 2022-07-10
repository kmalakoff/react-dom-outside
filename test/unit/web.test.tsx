global.IS_REACT_ACT_ENVIRONMENT = true;

import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
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
      setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
    };

    const Component = React.forwardRef(function (
      { isActive, setIsActive }: ComponentProps,
      ref: React.RefObject<View>,
    ) {
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
        <React.Fragment>
          <EventProvider>
            <Active>
              <Component />
            </Active>
          </EventProvider>
          <View testID="outside" />
        </React.Fragment>,
      ),
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
      setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
    };

    function PortalComponent() {
      const ref = useRef(null);
      const el = React.useRef(document.createElement('View'));
      React.useEffect(function () {
        container.appendChild(el.current);
      });
      return ReactDOM.createPortal(
        <View
          ref={ref}
          testID="portal-click"
          onClick={function (event) {
            event.stopPropagation();
          }}
        />,
        el.current,
      );
    }

    const Component = React.forwardRef(function (
      { isActive, setIsActive }: ComponentProps,
      ref: React.RefObject<View>,
    ) {
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
        <React.Fragment>
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
        </React.Fragment>,
      ),
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
