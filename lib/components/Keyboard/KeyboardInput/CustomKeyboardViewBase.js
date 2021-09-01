"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var KeyboardRegistry_1 = __importDefault(require("./KeyboardRegistry"));
var CustomKeyboardViewBase = /** @class */ (function (_super) {
    __extends(CustomKeyboardViewBase, _super);
    function CustomKeyboardViewBase(props) {
        var _this = _super.call(this, props) || this;
        _this.registeredRequestShowKeyboard = false;
        _this.keyboardEventListeners = [];
        var component = props.component, onItemSelected = props.onItemSelected;
        if (component) {
            _this.addOnItemSelectListener(onItemSelected, component);
        }
        _this.keyboardExpandedToggle = {};
        return _this;
    }
    CustomKeyboardViewBase.prototype.shouldComponentUpdate = function (nextProps) {
        return nextProps.component !== this.props.component;
    };
    CustomKeyboardViewBase.prototype.componentWillUnmount = function () {
        var component = this.props.component;
        KeyboardRegistry_1.default.removeListeners('onRequestShowKeyboard');
        if (this.keyboardEventListeners) {
            this.keyboardEventListeners.forEach(function (eventListener) { return eventListener.remove(); });
        }
        if (component) {
            KeyboardRegistry_1.default.removeListeners(component + ".onItemSelected");
        }
    };
    CustomKeyboardViewBase.prototype.addOnItemSelectListener = function (onItemSelected, component) {
        if (onItemSelected) {
            KeyboardRegistry_1.default.addListener(component + ".onItemSelected", function (args) {
                onItemSelected(component, args);
            });
        }
    };
    CustomKeyboardViewBase.prototype.componentDidUpdate = function (prevProps) {
        var onRequestShowKeyboard = this.props.onRequestShowKeyboard;
        if (onRequestShowKeyboard && !this.registeredRequestShowKeyboard) {
            this.registeredRequestShowKeyboard = true;
            KeyboardRegistry_1.default.addListener('onRequestShowKeyboard', function (args) {
                onRequestShowKeyboard(args.keyboardId);
            });
        }
        this.registerListener(prevProps, this.props);
    };
    CustomKeyboardViewBase.prototype.registerListener = function (props, nextProps) {
        var component = nextProps.component, onItemSelected = nextProps.onItemSelected;
        if (component && props.component !== component) {
            if (props.component) {
                KeyboardRegistry_1.default.removeListeners(props.component + ".onItemSelected");
            }
            KeyboardRegistry_1.default.removeListeners(component + ".onItemSelected");
            this.addOnItemSelectListener(onItemSelected, component);
        }
    };
    CustomKeyboardViewBase.defaultProps = {
        initialProps: {}
    };
    return CustomKeyboardViewBase;
}(react_1.Component));
exports.default = CustomKeyboardViewBase;
