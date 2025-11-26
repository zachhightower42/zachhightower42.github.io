(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _wsClient = _interopRequireDefault(require("./ws-client"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var ChatApp = /*#__PURE__*/_createClass(function ChatApp() {
  _classCallCheck(this, ChatApp);
  _wsClient["default"].init('ws://localhost:3001');
});
var ChatMessage = /*#__PURE__*/function () {
  function ChatMessage(_ref) {
    var m = _ref.message,
      _ref$user = _ref.user,
      u = _ref$user === void 0 ? 'batman' : _ref$user,
      _ref$timestamp = _ref.timestamp,
      t = _ref$timestamp === void 0 ? new Date().getTime() : _ref$timestamp;
    _classCallCheck(this, ChatMessage);
    this.message = m;
    this.user = u;
    this.timestamp = t;
  }
  _createClass(ChatMessage, [{
    key: "serialize",
    value: function serialize() {
      return {
        user: this.user,
        message: this.message,
        timestamp: this.timestamp
      };
    }
  }]);
  return ChatMessage;
}();
var _default = exports["default"] = ChatApp;

},{"./ws-client":3}],2:[function(require,module,exports){
"use strict";

var _app = _interopRequireDefault(require("./app"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
new _app["default"]();

},{"./app":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var socket;
function init(url) {
  socket = new WebSocket(url);
  console.log('connecting...');
}
var _default = exports["default"] = {
  init: init
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21haW4uanMiLCJhcHAvc2NyaXB0cy9zcmMvd3MtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0NBLElBQUEsU0FBQSxHQUFBLHNCQUFBLENBQUEsT0FBQTtBQUFpQyxTQUFBLHVCQUFBLEdBQUEsV0FBQSxHQUFBLElBQUEsR0FBQSxDQUFBLFVBQUEsR0FBQSxHQUFBLGdCQUFBLEdBQUE7QUFBQSxTQUFBLGtCQUFBLE1BQUEsRUFBQSxLQUFBLGFBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsVUFBQSxVQUFBLEdBQUEsS0FBQSxDQUFBLENBQUEsR0FBQSxVQUFBLENBQUEsVUFBQSxHQUFBLFVBQUEsQ0FBQSxVQUFBLFdBQUEsVUFBQSxDQUFBLFlBQUEsd0JBQUEsVUFBQSxFQUFBLFVBQUEsQ0FBQSxRQUFBLFNBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxNQUFBLEVBQUEsY0FBQSxDQUFBLFVBQUEsQ0FBQSxHQUFBLEdBQUEsVUFBQTtBQUFBLFNBQUEsYUFBQSxXQUFBLEVBQUEsVUFBQSxFQUFBLFdBQUEsUUFBQSxVQUFBLEVBQUEsaUJBQUEsQ0FBQSxXQUFBLENBQUEsU0FBQSxFQUFBLFVBQUEsT0FBQSxXQUFBLEVBQUEsaUJBQUEsQ0FBQSxXQUFBLEVBQUEsV0FBQSxHQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsV0FBQSxpQkFBQSxRQUFBLG1CQUFBLFdBQUE7QUFBQSxTQUFBLGVBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxZQUFBLENBQUEsQ0FBQSxnQ0FBQSxPQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsQ0FBQTtBQUFBLFNBQUEsYUFBQSxDQUFBLEVBQUEsQ0FBQSxvQkFBQSxPQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsU0FBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsV0FBQSxrQkFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsZ0NBQUEsT0FBQSxDQUFBLENBQUEsVUFBQSxDQUFBLFlBQUEsU0FBQSx5RUFBQSxDQUFBLEdBQUEsTUFBQSxHQUFBLE1BQUEsRUFBQSxDQUFBO0FBQUEsU0FBQSxnQkFBQSxRQUFBLEVBQUEsV0FBQSxVQUFBLFFBQUEsWUFBQSxXQUFBLGVBQUEsU0FBQTtBQUFBLElBRzNCLE9BQU8sZ0JBQUEsWUFBQSxDQUNULFNBQUEsUUFBQSxFQUFjO0VBQUEsZUFBQSxPQUFBLE9BQUE7RUFDVixvQkFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztBQUN0QyxDQUFDO0FBQUEsSUFHRyxXQUFXO0VBQ2YsU0FBQSxZQUFBLElBQUEsRUFJRztJQUFBLElBSFEsQ0FBQyxHQUFBLElBQUEsQ0FBVixPQUFPO01BQUEsU0FBQSxHQUFBLElBQUEsQ0FDUCxJQUFJO01BQUUsQ0FBQyxHQUFBLFNBQUEsY0FBQyxRQUFRLEdBQUEsU0FBQTtNQUFBLGNBQUEsR0FBQSxJQUFBLENBQ2hCLFNBQVM7TUFBRSxDQUFDLEdBQUEsY0FBQSxjQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBRSxPQUFPLENBQUMsQ0FBQyxHQUFBLGNBQUE7SUFBQSxlQUFBLE9BQUEsV0FBQTtJQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUM7SUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDO0lBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDO0VBQ3BCO0VBQUMsWUFBQSxDQUFBLFdBQUE7SUFBQSxHQUFBO0lBQUEsS0FBQSxFQUNELFNBQUEsVUFBQSxFQUFZO01BQ1YsT0FBTztRQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtRQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztRQUNyQixTQUFTLEVBQUUsSUFBSSxDQUFDO01BQ2xCLENBQUM7SUFDSDtFQUFDO0VBQUEsT0FBQSxXQUFBO0FBQUE7QUFBQSxJQUFBLFFBQUEsR0FBQSxPQUFBLGNBR1UsT0FBTzs7Ozs7QUM1QnhCLElBQUEsSUFBQSxHQUFBLHNCQUFBLENBQUEsT0FBQTtBQUE0QixTQUFBLHVCQUFBLEdBQUEsV0FBQSxHQUFBLElBQUEsR0FBQSxDQUFBLFVBQUEsR0FBQSxHQUFBLGdCQUFBLEdBQUE7QUFDNUIsSUFBSSxlQUFPLENBQUMsQ0FBQzs7Ozs7Ozs7O0FDRGIsSUFBSSxNQUFNO0FBRVYsU0FBUyxJQUFJLENBQUMsR0FBRyxFQUFFO0VBQ2pCLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUM7RUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7QUFDOUI7QUFBQyxJQUFBLFFBQUEsR0FBQSxPQUFBLGNBRWM7RUFDYixJQUFJLEVBQUo7QUFDRixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG5pbXBvcnQgc29ja2V0IGZyb20gJy4vd3MtY2xpZW50JztcblxuXG5jbGFzcyBDaGF0QXBwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc29ja2V0LmluaXQoJ3dzOi8vbG9jYWxob3N0OjMwMDEnKTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBDaGF0TWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioe1xuICAgICAgbWVzc2FnZTogbSxcbiAgICAgIHVzZXI6IHU9J2JhdG1hbicsXG4gICAgICB0aW1lc3RhbXA6IHQ9KG5ldyBEYXRlKCkpLmdldFRpbWUoKVxuICAgIH0pIHsgdGhpcy5tZXNzYWdlID0gbTtcbiAgICAgICAgdGhpcy51c2VyID0gdTtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0O1xuICAgICAgfVxuICAgICAgc2VyaWFsaXplKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHVzZXI6IHRoaXMudXNlcixcbiAgICAgICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICAgICAgdGltZXN0YW1wOiB0aGlzLnRpbWVzdGFtcFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgXG4gIGV4cG9ydCBkZWZhdWx0IENoYXRBcHA7XG5cblxuICAiLCJpbXBvcnQgQ2hhdEFwcCBmcm9tICcuL2FwcCc7XG5uZXcgQ2hhdEFwcCgpOyIsImxldCBzb2NrZXQ7XG5cbmZ1bmN0aW9uIGluaXQodXJsKSB7XG4gIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcbiAgY29uc29sZS5sb2coJ2Nvbm5lY3RpbmcuLi4nKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0LFxufSJdfQ==
