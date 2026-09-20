import type { Dispatch, ReactElement, RefAttributes, SetStateAction } from 'react';

export interface ActiveInjectedProps {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

export type ActiveBoundaryInjectedProps = ActiveInjectedProps;

export type ActiveChildProps = Partial<ActiveInjectedProps> & RefAttributes<HTMLElement>;

export interface ActiveProps {
  children: ReactElement<ActiveChildProps>;
}

export interface ActiveBoundaryProps {
  children: ReactElement<ActiveChildProps>;
}
