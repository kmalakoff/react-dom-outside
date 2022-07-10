(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom-event'), require('react-ref-boundary')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom-event', 'react-ref-boundary'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.reactDomOutside = {}, global.React, global.reactDomEvent, global.ReactRefBoundary));
})(this, (function (exports, React, reactDomEvent, reactRefBoundary) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function Component(param) {
      var children = param.children, isActive = param.isActive, setIsActive = param.setIsActive;
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
      return /*#__PURE__*/ React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].Children.map(children, function(child) {
          return /*#__PURE__*/ React__default["default"].isValidElement(child) ? /*#__PURE__*/ React__default["default"].cloneElement(child, {
              isActive: isActive,
              setIsActive: setIsActive,
              ref: ref
          }) : child;
      }));
  }
  function ActiveBoundary(param) {
      var children = param.children;
      var state = React__default["default"].useState(false);
      var isActive = state[0];
      var setIsActive = state[1];
      return /*#__PURE__*/ React__default["default"].createElement(reactRefBoundary.BoundaryProvider, null, /*#__PURE__*/ React__default["default"].createElement(Component, {
          isActive: isActive,
          setIsActive: setIsActive
      }, children));
  }

  function Active(param) {
      var children = param.children;
      var state = React__default["default"].useState(false);
      var isActive = state[0];
      var setIsActive = state[1];
      var ref = React__default["default"].useRef(null);
      reactDomEvent.useEvent(function(event) {
          if (!isActive) return;
          if (ref.current && ref.current.contains(event.target)) return;
          setIsActive(false);
      }, [
          isActive,
          setIsActive
      ]);
      return /*#__PURE__*/ React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].Children.map(children, function(child) {
          return /*#__PURE__*/ React__default["default"].isValidElement(child) ? /*#__PURE__*/ React__default["default"].cloneElement(child, {
              isActive: isActive,
              setIsActive: setIsActive,
              ref: ref
          }) : child;
      }));
  }

  exports.Active = Active;
  exports.ActiveBoundary = ActiveBoundary;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=react-dom-outside.js.map
