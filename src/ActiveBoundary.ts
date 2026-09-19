import type { Dispatch, ReactElement, SetStateAction } from 'react';
import React from 'react';
import { useEvent } from 'react-dom-event';
import { BoundaryProvider, useBoundary, useRef as useBoundaryRef } from 'react-ref-boundary';
import { getElementRef, useComposedRefs } from './lib/composeRefs.ts';
import type { ActiveBoundaryProps, ActiveChildProps } from './types.ts';

const { Children, cloneElement, createElement, Fragment, useState } = React;

interface ComponentProps {
  child: ReactElement<ActiveChildProps>;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

function Component({ child, isActive, setIsActive }: ComponentProps) {
  const ref = useBoundaryRef<HTMLElement | null>(null);
  const childRef = getElementRef<HTMLElement>(child);
  const composedRef = useComposedRefs(childRef, ref);
  const boundary = useBoundary();
  useEvent(
    (event) => {
      if (!isActive) return;
      for (let i = 0; i < boundary.refs.length; i++) {
        const x = boundary.refs[i];
        if (typeof x === 'object' && x !== null && 'current' in x) {
          const current = x.current;
          if (current && typeof current === 'object' && 'contains' in current && typeof current.contains === 'function' && current.contains(event.target)) return;
        }
      }
      setIsActive(false);
    },
    [isActive, setIsActive]
  );

  const injectedProps: Partial<ActiveChildProps> = { isActive, setIsActive, ref: composedRef };
  return cloneElement(child, injectedProps);
}

export default function ActiveBoundary({ children }: ActiveBoundaryProps) {
  const child = Children.only(children);
  if ((child.type as unknown) === Fragment) {
    throw new Error('ActiveBoundary requires one non-Fragment child that forwards its ref');
  }

  const state = useState<boolean>(false);
  const isActive = state[0];
  const setIsActive = state[1];

  return createElement(BoundaryProvider, null, createElement<ComponentProps>(Component, { child, isActive, setIsActive }));
}
