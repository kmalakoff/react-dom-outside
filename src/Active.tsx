import React from 'react';

import { useEvent } from 'react-dom-event';

// @ts-ignore
import ActiveBase from './lib/ActiveBase.tsx';

function ActiveComponent({ isActive, setIsActive, children, ...rest }) {
  const ref = React.useRef<HTMLElement>(null);

  useEvent(
    (event) => {
      if (isActive && !(ref.current && ref.current.contains(event.target)))
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

export default function Active({ children, ...rest }) {
  const state = React.useState<boolean>(false);
  const isActive = state[0];
  const setIsActive = state[1];
  const Component = isActive ? ActiveComponent : ActiveBase;
  return (
    <Component {...rest} isActive={isActive} setIsActive={setIsActive}>
      {React.Children.map<React.ReactNode, React.ReactNode>(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { isActive, setIsActive })
          : child,
      )}
    </Component>
  );
}
