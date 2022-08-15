"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return Active;
    }
});
var _react = /*#__PURE__*/ _interopRequireDefault(require("react"));
var _reactDomEvent = require("react-dom-event");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function Active(param) {
    var children = param.children;
    var state = _react.default.useState(false);
    var isActive = state[0];
    var setIsActive = state[1];
    var ref = _react.default.useRef(null);
    (0, _reactDomEvent.useEvent)(function(event) {
        if (!isActive) return;
        if (ref.current && ref.current.contains(event.target)) return;
        setIsActive(false);
    }, [
        isActive,
        setIsActive
    ]);
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, _react.default.Children.map(children, function(child) {
        return /*#__PURE__*/ _react.default.isValidElement(child) ? /*#__PURE__*/ _react.default.cloneElement(child, {
            isActive: isActive,
            setIsActive: setIsActive,
            ref: ref
        }) : child;
    }));
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  for (var key in exports) exports.default[key] = exports[key];
  module.exports = exports.default;
}