function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
import React from 'react';
import { useEvent } from 'react-dom-event';
import { BoundaryProvider, useBoundary, useRef } from 'react-ref-boundary';
// @ts-ignore
import ActiveBase from './lib/ActiveBase.mjs';
function ActiveComponent({ isActive , setIsActive , children , ...rest }) {
    const ref = useRef(null);
    const boundary = useBoundary();
    useEvent((event)=>{
        if (!isActive) return;
        for(let i = 0; i < boundary.refs.length; i++){
            const x = boundary.refs[i];
            if (x.current && x.current.contains(event.target)) return;
        }
        setIsActive(false);
    }, [
        isActive,
        setIsActive
    ]);
    return /*#__PURE__*/ React.createElement(ActiveBase, _extends({
        isActive: isActive,
        setIsActive: setIsActive,
        ref: ref
    }, rest), children);
}
export default function ActiveBoundaryNative({ children , ...rest }) {
    const state = React.useState(false);
    const isActive = state[0];
    const setIsActive = state[1];
    const Component = isActive ? ActiveComponent : ActiveBase;
    return /*#__PURE__*/ React.createElement(BoundaryProvider, null, /*#__PURE__*/ React.createElement(Component, _extends({}, rest, {
        isActive: isActive,
        setIsActive: setIsActive
    }), React.Children.map(children, (child)=>/*#__PURE__*/ React.isValidElement(child) ? /*#__PURE__*/ React.cloneElement(child, {
            isActive,
            setIsActive
        }) : child)));
};
