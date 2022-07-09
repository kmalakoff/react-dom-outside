"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
module.exports = ActiveBoundaryNative;
var _react = _interopRequireDefault(require("react"));
var _reactDomEvent = require("react-dom-event");
var _reactRefBoundary = require("react-ref-boundary");
var _activeBaseTsx = _interopRequireDefault(require("./lib/ActiveBase.js"));
function ActiveBoundaryNative(_param) {
    var children = _param.children, rest = _objectWithoutProperties(_param, [
        "children"
    ]);
    var ref = _slicedToArray(_react.default.useState(false), 2), isActive = ref[0], setIsActive = ref[1];
    var Component = isActive ? ActiveComponent : _activeBaseTsx.default;
    return /*#__PURE__*/ _react.default.createElement(_reactRefBoundary.BoundaryProvider, null, /*#__PURE__*/ _react.default.createElement(Component, _extends({}, rest, {
        isActive: isActive,
        setIsActive: setIsActive
    }), _react.default.Children.map(children, function(child) {
        return /*#__PURE__*/ _react.default.isValidElement(child) ? /*#__PURE__*/ _react.default.cloneElement(child, {
            isActive: isActive,
            setIsActive: setIsActive
        }) : child;
    })));
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
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
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function ActiveComponent(_param) {
    var isActive = _param.isActive, setIsActive = _param.setIsActive, children = _param.children, rest = _objectWithoutProperties(_param, [
        "isActive",
        "setIsActive",
        "children"
    ]);
    var ref = (0, _reactRefBoundary).useRef(null);
    var boundary = (0, _reactRefBoundary).useBoundary();
    (0, _reactDomEvent).useEvent(function(event) {
        if (isActive && !boundary.refs.some(function(x) {
            return x.current && x.current.contains(event.target);
        })) setIsActive(false);
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
