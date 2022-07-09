/**
 * @jest-environment jsdom
 */

import assert from 'assert';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Active, ActiveBoundary } from 'react-dom-outside';
import { EventProvider } from 'react-dom-event';

describe('react-dom', function () {
  it('Active', function () {
    type ComponentProps = {
      isActive?: boolean | undefined;
      setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
      onClick: React.MouseEventHandler<HTMLButtonElement>;
    };

    const Component = ({ isActive, setIsActive, onClick }: ComponentProps) => {
      return (
        <div id="component">
          <div id="text">{isActive ? 'active' : 'not active'}</div>
          <button
            id="click"
            onClick={(event) => {
              onClick(event);
              setIsActive(!isActive);
            }}
          />
        </div>
      );
    };

    let clickValue;
    const onClick = (x) => (clickValue = x);
    const { container } = render(
      <React.Fragment>
        <EventProvider>
          <Active>
            <Component onClick={onClick} />
          </Active>
          <button id="outside"></button>
        </EventProvider>
      </React.Fragment>,
    );
    assert.equal(clickValue, undefined);

    // inside
    clickValue = undefined;
    assert.equal(container.querySelector('#text').innerHTML, 'not active');
    fireEvent.click(container.querySelector('#click'));
    assert.ok(clickValue.target);
    assert.equal(container.querySelector('#text').innerHTML, 'active');

    // outside
    fireEvent.click(container.querySelector('#outside'));
    assert.equal(container.querySelector('#text').innerHTML, 'not active');
  });
});
