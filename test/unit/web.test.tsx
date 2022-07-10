/**
 * @jest-environment jsdom
 */

import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot, Root } from 'react-dom/client';

import { View, Text } from 'react-native-web';
import { Active, ActiveBoundary } from 'react-dom-outside';
import { EventProvider } from 'react-dom-event';
import { useRef } from 'react-ref-boundary';
import findByTestID from '../lib/findByTestID';

function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

describe('react-native-web', function () {
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

    root.render(
      <React.Fragment>
        <EventProvider>
          <Active>
            <Component />
          </Active>
        </EventProvider>
        <View testID="outside" />
      </React.Fragment>,
    );
    await sleep(5); // wait for useEffect to resolve

    // inside
    assert.equal(findByTestID(container, 'text').innerHTML, 'not active');
    (findByTestID(container, 'toggle') as HTMLElement).click();
    await sleep(5); // wait for useEffect to resolve
    assert.equal(findByTestID(container, 'text').innerHTML, 'active');

    // outside
    (findByTestID(container, 'outside') as HTMLElement).click();
    await sleep(5); // wait for useEffect to resolve
    assert.equal(findByTestID(container, 'text').innerHTML, 'not active');
  });

  it('ActiveBoundary', async function () {
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
    );
    await sleep(5); // wait for useEffect to resolve

    // inside
    assert.equal(findByTestID(container, 'text').innerHTML, 'not active');
    (findByTestID(container, 'toggle') as HTMLElement).click();
    await sleep(5); // wait for useEffect to resolve
    assert.equal(findByTestID(container, 'text').innerHTML, 'active');

    // portal
    (findByTestID(container, 'portal-click') as HTMLElement).click();
    await sleep(5); // wait for useEffect to resolve
    assert.equal(findByTestID(container, 'text').innerHTML, 'active');

    // outside
    (findByTestID(container, 'outside') as HTMLElement).click();
    await sleep(5); // wait for useEffect to resolve
    assert.equal(findByTestID(container, 'text').innerHTML, 'not active');
  });
});
