import React from 'react';

type ActiveBaseProps = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  style?: object;
};

const ActiveBase = React.forwardRef(
  (
    { isActive, setIsActive, children, style, ...rest }: ActiveBaseProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <div
        {...rest}
        ref={ref}
        style={{ flex: 1, ...(style || {}) }}
        onClick={(event) => {
          event.stopPropagation();
          setIsActive(!isActive);
        }}
      >
        {children}
      </div>
    );
  },
);
export default ActiveBase;
