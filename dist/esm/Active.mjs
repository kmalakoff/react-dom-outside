import { Children, Fragment, cloneElement, createElement, isValidElement, useRef, useState } from 'react';
import { useEvent } from 'react-dom-event';
export default function Active({ children }) {
    const state = useState(false);
    const isActive = state[0];
    const setIsActive = state[1];
    const ref = useRef(null);
    useEvent((event)=>{
        if (!isActive) return;
        if (ref.current && ref.current.contains(event.target)) return;
        setIsActive(false);
    }, [
        isActive,
        setIsActive
    ]);
    return createElement(Fragment, null, Children.map(children, (child)=>isValidElement(child) ? cloneElement(child, {
            isActive,
            setIsActive,
            ref
        }) : child));
}
