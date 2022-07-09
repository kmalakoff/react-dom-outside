import React from 'react';

import { useEvent } from 'react-dom-event';
import { BoundaryProvider, useBoundary, useRef } from 'react-ref-boundary';

// @ts-ignore
import ActiveBase from './lib/ActiveBase.tsx';

function ActiveComponent({ isActive, setIsActive, children, ...rest }) {
  const ref = useRef<HTMLElement>(null);
  const boundary = useBoundary();

  useEvent(
    (event) => {
      if (!isActive) return;
      for (let i = 0; i < boundary.refs.length; i++) {
        const x = boundary.refs[i] as React.RefObject<HTMLElement>;
        if (x.current && x.current.contains(event.target)) return;
      }
      setIsActive(false);
    },
    [isActive, setIsActive],
  );

  return (
    <ActiveBase
      isActive={isActive}
      setIsActive={setIsActive}
      ref={ref}
      {...rest}
    >
      {children}
    </ActiveBase>
  );
}

export default function ActiveBoundaryNative({ children, ...rest }) {
  const state = React.useState<boolean>(false);
  const isActive = state[0];
  const setIsActive = state[1];
  const Component = isActive ? ActiveComponent : ActiveBase;
  return (
    <BoundaryProvider>
      <Component {...rest} isActive={isActive} setIsActive={setIsActive}>
        {React.Children.map<React.ReactNode, React.ReactNode>(
          children,
          (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child, { isActive, setIsActive })
              : child,
        )}
      </Component>
    </BoundaryProvider>
  );
}
