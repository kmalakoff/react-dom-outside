import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom'
import { Active, ActiveBoundary } from 'react-dom-outside';
import { EventProvider } from 'react-dom-event';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

describe('react-dom', function () {
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
    ReactDOM.render(
      <React.Fragment>
        <EventProvider>
          <Active>
            <Component onClick={onClick} />
          </Active>
        </EventProvider>
        <button id="outside"/>
      </React.Fragment>,
    container);
    await sleep(1); // wait for useEffect to resolve
    assert.equal(clickValue, undefined);

    // inside
    clickValue = undefined;
    assert.equal(container.querySelector('#text').innerHTML, 'not active');
    (container.querySelector('#click') as HTMLElement).click();
    await sleep(1); // wait for useEffect to resolve
    assert.ok(clickValue.target);
    assert.equal(container.querySelector('#text').innerHTML, 'active');

    // outside
    (container.querySelector('#outside') as HTMLElement).click();
    await sleep(1); // wait for useEffect to resolve
    assert.equal(container.querySelector('#text').innerHTML, 'not active');
  });
});
