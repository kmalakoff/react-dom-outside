/**
 * @jest-environment jsdom
 */

import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import {createRoot, Root} from 'react-dom/client';

import { View, Text } from 'react-native-web';
import { Active, ActiveBoundary } from 'react-dom-outside';
import { EventProvider } from 'react-dom-event';
import findByTestID from '../lib/findByTestID';

function sleep(ms) {
  return new Promise(function(resolve) { setTimeout(resolve, ms) });
}

describe('react-native-web', function () {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;
  beforeEach(function () {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container)
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

    function Component({ isActive, setIsActive }: ComponentProps) {
      return (
        <View>
          <Text testID="text">{isActive ? 'active' : 'not active'}</Text>
          <View testID="toggle" onClick={function () {setIsActive(!isActive)}} />
        </View>
      );
    };

    root.render(
      <React.Fragment>
        <EventProvider>
          <Active>
            <Component />
          </Active>
        </EventProvider>
        <View testID="outside" />
      </React.Fragment>
    );
    await sleep(1); // wait for useEffect to resolve

    // inside
    assert.equal(findByTestID(container, 'text').innerHTML, 'not active');
    (findByTestID(container, 'toggle') as HTMLElement).click();
    await sleep(1); // wait for useEffect to resolve
    assert.equal(findByTestID(container, 'text').innerHTML, 'active');

    // outside
    (findByTestID(container, 'outside') as HTMLElement).click();
    await sleep(1); // wait for useEffect to resolve
    assert.equal(findByTestID(container, 'text').innerHTML, 'not active');
  });
});
