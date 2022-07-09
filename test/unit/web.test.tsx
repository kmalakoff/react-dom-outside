/**
 * @jest-environment jsdom
 */

import assert from 'assert';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { View, Text } from 'react-native-web';
import { Active, ActiveBoundary } from 'react-dom-outside';
import { EventProvider } from 'react-dom-event';

describe('react-native-web', function () {
  it('inside -> outside', async function () {
    type ComponentProps = {
      isActive?: boolean | undefined;
      setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
      onClick: React.MouseEventHandler<HTMLElement>;
    };

    const Component = ({ isActive, setIsActive, onClick }: ComponentProps) => {
      return (
        <View testID="component">
          <View testID="text">
            <Text>{isActive ? 'active' : 'not active'}</Text>
          </View>
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
    const { findByTestId } = render(
      <React.Fragment>
        <EventProvider>
          <Active>
            <Component onClick={onClick} />
          </Active>
          <View testID="outside"></View>
        </EventProvider>
      </React.Fragment>,
    );
    assert.equal(clickValue, undefined);

    // inside
    clickValue = undefined;
    assert.equal(
      (await findByTestId('text')).children[0].innerHTML,
      'not active',
    );
    fireEvent.click(await findByTestId('click'));
    assert.ok(clickValue.target);
    assert.equal((await findByTestId('text')).children[0].innerHTML, 'active');

    // outside
    fireEvent.click(await findByTestId('outside'));
    assert.equal(
      (await findByTestId('text')).children[0].innerHTML,
      'not active',
    );
  });
});
