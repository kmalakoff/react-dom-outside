import React from 'react';
declare type ActiveBaseProps = {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
    style?: object;
};
declare const ActiveBase: React.ForwardRefExoticComponent<ActiveBaseProps & React.RefAttributes<HTMLDivElement>>;
export default ActiveBase;
