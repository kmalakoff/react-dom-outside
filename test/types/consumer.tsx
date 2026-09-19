import type { Dispatch, SetStateAction } from 'react';
import React, { createRef, forwardRef } from 'react';
import { EventProvider } from 'react-dom-event';
import { Active, ActiveBoundary, type ActiveInjectedProps } from 'react-dom-outside';

type ChildProps = Partial<ActiveInjectedProps>;
const Child = forwardRef<HTMLDivElement, ChildProps>(({ isActive, setIsActive }, ref) => (
  <div ref={ref}>
    <button type="button" onClick={() => setIsActive?.((current) => !current)}>
      {isActive ? 'active' : 'inactive'}
    </button>
  </div>
));

const objectRef = createRef<HTMLDivElement>();
const callbackRef = (_element: HTMLDivElement | null) => {};
const setter: Dispatch<SetStateAction<boolean>> = (value) => value;
setter((current) => !current);
const _InvalidStateCheck = ({ setIsActive }: ChildProps) => {
  // @ts-expect-error A state setter accepts only boolean state actions.
  setIsActive?.('invalid');
  return null;
};

export const app = (
  <EventProvider>
    <Active>
      <Child ref={objectRef} />
    </Active>
    <ActiveBoundary>
      <Child ref={callbackRef} />
    </ActiveBoundary>
  </EventProvider>
);
