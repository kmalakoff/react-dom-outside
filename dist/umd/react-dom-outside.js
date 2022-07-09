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
  function ActiveComponent$1(_param) {
      var isActive = _param.isActive, setIsActive = _param.setIsActive, children = _param.children, rest = _objectWithoutProperties$1(_param, [
          "isActive",
          "setIsActive",
          "children"
      ]);
      var ref = reactRefBoundary.useRef(null);
      var boundary = reactRefBoundary.useBoundary();
      reactDomEvent.useEvent(function(event) {
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
      var state = React__default["default"].useState(false);
      var isActive = state[0];
      var setIsActive = state[1];
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
          if (!isActive) return;
          if (ref.current && ref.current.contains(event.target)) return;
          setIsActive(false);
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
