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
const ActiveBase = /*#__PURE__*/ React.forwardRef(({ isActive , setIsActive , children , style , ...rest }, ref)=>{
    return /*#__PURE__*/ React.createElement("div", _extends({}, rest, {
        ref: ref,
        style: {
            flex: 1,
            ...style || {}
        },
        onClick: (event)=>{
            event.stopPropagation();
            setIsActive(!isActive);
        }
    }), children);
});
export default ActiveBase;
