(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom-event'), require('react-ref-boundary')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom-event', 'react-ref-boundary'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.reactDomOutside = {}, global.React, global.reactDomEvent, global.ReactRefBoundary));
})(this, (function (exports, React, reactDomEvent, reactRefBoundary) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _defineProperty(obj, key, value) {
      if (key in obj) {
          Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
          });
      } else {
          obj[key] = value;
      }
      return obj;
  }
  function _extends$2() {
      _extends$2 = Object.assign || function(target) {
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
      return _extends$2.apply(this, arguments);
  }
  function _objectSpread(target) {
      for(var i = 1; i < arguments.length; i++){
          var source = arguments[i] != null ? arguments[i] : {};
          var ownKeys = Object.keys(source);
          if (typeof Object.getOwnPropertySymbols === "function") {
              ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                  return Object.getOwnPropertyDescriptor(source, sym).enumerable;
              }));
          }
          ownKeys.forEach(function(key) {
              _defineProperty(target, key, source[key]);
          });
      }
      return target;
  }
  function _objectWithoutProperties$2(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose$2(source, excluded);
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
  function _objectWithoutPropertiesLoose$2(source, excluded) {
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
  var ActiveBase = /*#__PURE__*/ React__default["default"].forwardRef(function(_param, ref) {
      var isActive = _param.isActive, setIsActive = _param.setIsActive, children = _param.children, style = _param.style, rest = _objectWithoutProperties$2(_param, [
          "isActive",
          "setIsActive",
          "children",
          "style"
      ]);
      return /*#__PURE__*/ React__default["default"].createElement("div", _extends$2({}, rest, {
          ref: ref,
          style: _objectSpread({
              flex: 1
          }, style || {}),
          onClick: function(event) {
              event.stopPropagation();
              setIsActive(!isActive);
          }
      }), children);
  });

  function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
      return arr2;
  }
  function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
  }
  function _extends$1() {
      _extends$1 = Object.assign || function(target) {
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
      return _extends$1.apply(this, arguments);
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
  function _objectWithoutProperties$1(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose$1(source, excluded);
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
  function _objectWithoutPropertiesLoose$1(source, excluded) {
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
  function ActiveComponent$1(_param) {
      var isActive = _param.isActive, setIsActive = _param.setIsActive, children = _param.children, rest = _objectWithoutProperties$1(_param, [
          "isActive",
          "setIsActive",
          "children"
      ]);
      var ref = reactRefBoundary.useRef(null);
      var boundary = reactRefBoundary.useBoundary();
      reactDomEvent.useEvent(function(event) {
          if (isActive && !boundary.refs.some(function(x) {
              return x.current && x.current.contains(event.target);
          })) setIsActive(false);
      }, [
          isActive,
          setIsActive
      ]);
      return /*#__PURE__*/ React__default["default"].createElement(ActiveBase, _extends$1({
          isActive: isActive,
          setIsActive: setIsActive,
          ref: ref
      }, rest), children);
  }
  function ActiveBoundaryNative(_param) {
      var children = _param.children, rest = _objectWithoutProperties$1(_param, [
          "children"
      ]);
      var ref = _slicedToArray(React__default["default"].useState(false), 2), isActive = ref[0], setIsActive = ref[1];
      var Component = isActive ? ActiveComponent$1 : ActiveBase;
      return /*#__PURE__*/ React__default["default"].createElement(reactRefBoundary.BoundaryProvider, null, /*#__PURE__*/ React__default["default"].createElement(Component, _extends$1({}, rest, {
          isActive: isActive,
          setIsActive: setIsActive
      }), React__default["default"].Children.map(children, function(child) {
          return /*#__PURE__*/ React__default["default"].isValidElement(child) ? /*#__PURE__*/ React__default["default"].cloneElement(child, {
              isActive: isActive,
              setIsActive: setIsActive
          }) : child;
      })));
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
      var ref = React__default["default"].useRef(null);
      reactDomEvent.useEvent(function(event) {
          if (isActive && !(ref.current && ref.current.contains(event.target))) setIsActive(false);
      }, [
          isActive,
          setIsActive
      ]);
      return /*#__PURE__*/ React__default["default"].createElement(ActiveBase, _extends({
          isActive: isActive,
          setIsActive: setIsActive,
          ref: ref
      }, rest), children);
  }
  function Active(_param) {
      var children = _param.children, rest = _objectWithoutProperties(_param, [
          "children"
      ]);
      var state = React__default["default"].useState(false);
      var isActive = state[0];
      var setIsActive = state[1];
      var Component = isActive ? ActiveComponent : ActiveBase;
      return /*#__PURE__*/ React__default["default"].createElement(Component, _extends({}, rest, {
          isActive: isActive,
          setIsActive: setIsActive
      }), React__default["default"].Children.map(children, function(child) {
          return /*#__PURE__*/ React__default["default"].isValidElement(child) ? /*#__PURE__*/ React__default["default"].cloneElement(child, {
              isActive: isActive,
              setIsActive: setIsActive
          }) : child;
      }));
  }

  exports.Active = Active;
  exports.ActiveBoundary = ActiveBoundaryNative;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=react-dom-outside.js.map
