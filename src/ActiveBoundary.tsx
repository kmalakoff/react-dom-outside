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
      if (
        isActive &&
        !boundary.refs.some(
          (x: React.RefObject<HTMLElement>) =>
            x.current && x.current.contains(event.target),
        )
      )
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
  const [isActive, setIsActive] = React.useState(false);
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
