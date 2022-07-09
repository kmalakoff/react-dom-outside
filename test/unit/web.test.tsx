/**
 * @jest-environment jsdom
 */

import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';

import { View, Text } from 'react-native-web';
import { Active, ActiveBoundary } from 'react-dom-outside';
import { EventProvider } from 'react-dom-event';
import findByTestID from '../lib/findByTestID';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

describe('react-native-web', function () {
  let container: HTMLDivElement | null = null;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('Active', async function () {
    type ComponentProps = {
      isActive?: boolean | undefined;
      setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
      onClick: React.MouseEventHandler<HTMLElement>;
    };

    const Component = ({ isActive, setIsActive, onClick }: ComponentProps) => {
      return (
        <View testID="component">
          <Text testID="text">{isActive ? 'active' : 'not active'}</Text>
          <View
            testID="click"
            onClick={(event) => {
              onClick(event);
              setIsActive(!isActive);
            }}
          />
        </View>
      );
    };

    let clickValue;
    const onClick = (x) => (clickValue = x);
    ReactDOM.render(
      <React.Fragment>
        <EventProvider>
          <Active>
            <Component onClick={onClick} />
          </Active>
        </EventProvider>
        <View testID="outside"/>
      </React.Fragment>,
    container);
    await sleep(1); // wait for useEffect to resolve
    assert.equal(clickValue, undefined);
    
    // inside
    clickValue = undefined;
    assert.equal(findByTestID(container, 'text').innerHTML, 'not active');
    (findByTestID(container, 'click') as HTMLElement).click();
    await sleep(1); // wait for useEffect to resolve
    assert.ok(clickValue.target);
    assert.equal(findByTestID(container, 'text').innerHTML, 'active');

    // outside
    (findByTestID(container, 'outside') as HTMLElement).click();
    await sleep(1); // wait for useEffect to resolve
    assert.equal(findByTestID(container, 'text').innerHTML, 'not active');
  });
});
