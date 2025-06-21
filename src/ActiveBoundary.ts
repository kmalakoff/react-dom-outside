import type { Attributes, Dispatch, FC, ReactNode, RefObject } from 'react';
import { Children, cloneElement, createElement, Fragment, isValidElement, useState } from 'react';
import { useEvent } from 'react-dom-event';
import { BoundaryProvider, useBoundary, useRef } from 'react-ref-boundary';

interface ComponentProps {
  children?: React.ReactNode;
  isActive: boolean;
  setIsActive: Dispatch<boolean>;
}

function Component({ children, isActive, setIsActive }: ComponentProps) {
  const ref = useRef<HTMLElement>(null);
  const boundary = useBoundary();
  useEvent(
    (event) => {
      if (!isActive) return;
      for (let i = 0; i < boundary.refs.length; i++) {
        const x = boundary.refs[i] as RefObject<HTMLElement>;
        if (x.current && x.current.contains(event.target as Node)) return;
      }
      setIsActive(false);
    },
    [isActive, setIsActive]
  );

  return createElement(
    Fragment,
    null,
    Children.map<ReactNode, ReactNode>(children, (child) =>
      isValidElement(child)
        ? cloneElement(child, {
            isActive,
            setIsActive,
            ref,
          } as Attributes)
        : child
    )
  );
}

import type { ActiveBoundaryProps } from './types.ts';

export default function ActiveBoundary({ children }: ActiveBoundaryProps) {
  const state = useState<boolean>(false);
  const isActive = state[0];
  const setIsActive = state[1];

  return createElement(BoundaryProvider, null, createElement<ComponentProps>(Component as FC, { isActive, setIsActive }, children));
}
