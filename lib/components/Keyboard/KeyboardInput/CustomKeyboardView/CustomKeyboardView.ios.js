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
var TextInputKeyboardManager_ios_1 = __importDefault(require("./../TextInputKeyboardManager/TextInputKeyboardManager.ios"));
var KeyboardRegistry_1 = __importDefault(require("./../KeyboardRegistry"));
var CustomKeyboardViewBase_1 = __importDefault(require("./../CustomKeyboardViewBase"));
var CustomKeyboardView = /** @class */ (function (_super) {
    __extends(CustomKeyboardView, _super);
    function CustomKeyboardView(props) {
        var _this = _super.call(this, props) || this;
        var component = props.component;
        if (component) {
            _this.registeredRequestShowKeyboard = false;
        }
        KeyboardRegistry_1.default.addListener('onToggleExpandedKeyboard', function (args) {
            var _a = _this.props, inputRef = _a.inputRef, initialProps = _a.initialProps;
            if (inputRef) {
                if (_this.keyboardExpandedToggle[args.keyboardId] === undefined) {
                    _this.keyboardExpandedToggle[args.keyboardId] = false;
                }
                _this.keyboardExpandedToggle[args.keyboardId] = !_this.keyboardExpandedToggle[args.keyboardId];
                TextInputKeyboardManager_ios_1.default.toggleExpandKeyboard(inputRef, _this.keyboardExpandedToggle[args.keyboardId], initialProps.expandWithLayoutAnimation);
            }
        });
        return _this;
    }
    CustomKeyboardView.prototype.componentWillUnmount = function () {
        KeyboardRegistry_1.default.removeListeners('onToggleExpandedKeyboard');
        _super.prototype.componentWillUnmount.call(this);
    };
    CustomKeyboardView.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, nextInputRef = _a.inputRef, nextComponent = _a.component, nextInitialProps = _a.initialProps, useSafeArea = _a.useSafeArea;
        var component = prevProps.component;
        if (nextInputRef && nextComponent !== component) {
            if (nextComponent) {
                TextInputKeyboardManager_ios_1.default.setInputComponent(nextInputRef, {
                    component: nextComponent,
                    initialProps: nextInitialProps,
                    useSafeArea: useSafeArea
                });
            }
            else {
                TextInputKeyboardManager_ios_1.default.removeInputComponent(nextInputRef);
            }
        }
        _super.prototype.componentDidUpdate.call(this, prevProps);
    };
    CustomKeyboardView.prototype.render = function () {
        return null;
    };
    CustomKeyboardView.displayName = 'IGNORE';
    CustomKeyboardView.defaultProps = {
        initialProps: {},
        useSafeArea: true
    };
    return CustomKeyboardView;
}(CustomKeyboardViewBase_1.default));
exports.default = CustomKeyboardView;
