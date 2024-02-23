"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return ActiveBoundary;
    }
});
var _react = require("react");
var _reactdomevent = require("react-dom-event");
var _reactrefboundary = require("react-ref-boundary");
function Component(param) {
    var children = param.children, isActive = param.isActive, setIsActive = param.setIsActive;
    var ref = (0, _reactrefboundary.useRef)(null);
    var boundary = (0, _reactrefboundary.useBoundary)();
    (0, _reactdomevent.useEvent)(function(event) {
        if (!isActive) return;
        for(var i = 0; i < boundary.refs.length; i++){
            var x = boundary.refs[i];
            if (x.current && x.current.contains(event.target)) return;
        }
        setIsActive(false);
    }, [
        isActive,
        setIsActive
    ]);
    return (0, _react.createElement)(_react.Fragment, null, _react.Children.map(children, function(child) {
        return (0, _react.isValidElement)(child) ? (0, _react.cloneElement)(child, {
            isActive: isActive,
            setIsActive: setIsActive,
            ref: ref
        }) : child;
    }));
}
function ActiveBoundary(param) {
    var children = param.children;
    var state = (0, _react.useState)(false);
    var isActive = state[0];
    var setIsActive = state[1];
    return (0, _react.createElement)(_reactrefboundary.BoundaryProvider, null, (0, _react.createElement)(Component, {
        isActive: isActive,
        setIsActive: setIsActive
    }, children));
}
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }