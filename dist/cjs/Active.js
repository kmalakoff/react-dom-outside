"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
module.exports = Active;
var _react = _interopRequireDefault(require("react"));
var _reactDomEvent = require("react-dom-event");
var _activeBaseTsx = _interopRequireDefault(require("./lib/ActiveBase.js"));
function Active(_param) {
    var children = _param.children, rest = _objectWithoutProperties(_param, [
        "children"
    ]);
    var state = _react.default.useState(false);
    var isActive = state[0];
    var setIsActive = state[1];
    var Component = isActive ? ActiveComponent : _activeBaseTsx.default;
    return /*#__PURE__*/ _react.default.createElement(Component, _extends({}, rest, {
        isActive: isActive,
        setIsActive: setIsActive
    }), _react.default.Children.map(children, function(child) {
        return /*#__PURE__*/ _react.default.isValidElement(child) ? /*#__PURE__*/ _react.default.cloneElement(child, {
            isActive: isActive,
            setIsActive: setIsActive
        }) : child;
    }));
}
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
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function ActiveComponent(_param) {
    var isActive = _param.isActive, setIsActive = _param.setIsActive, children = _param.children, rest = _objectWithoutProperties(_param, [
        "isActive",
        "setIsActive",
        "children"
    ]);
    var ref = _react.default.useRef(null);
    (0, _reactDomEvent).useEvent(function(event) {
        if (isActive && !(ref.current && ref.current.contains(event.target))) setIsActive(false);
    }, [
        isActive,
        setIsActive
    ]);
    return /*#__PURE__*/ _react.default.createElement(_activeBaseTsx.default, _extends({
        isActive: isActive,
        setIsActive: setIsActive,
        ref: ref
    }, rest), children);
}
