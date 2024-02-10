import { useState, useRef, Fragment, Children, isValidElement, cloneElement, createElement } from 'react';
import type { ReactNode, ReactElement } from 'react';
import { useEvent } from 'react-dom-event';

export default function Active({ children }) {
  const state = useState<boolean>(false);
  const isActive = state[0];
  const setIsActive = state[1];
  const ref = useRef<HTMLElement>(null);
  useEvent(
    (event) => {
      if (!isActive) return;
      if (ref.current && ref.current.contains(event.target)) return;
      setIsActive(false);
    },
    [isActive, setIsActive]
  );

  return createElement(
    Fragment,
    null,
    Children.map<ReactNode, ReactNode>(children, (child) =>
      isValidElement(child)
        ? cloneElement(child as ReactElement<any>, {
            isActive,
            setIsActive,
            ref,
          })
        : child
    )
  );
}
