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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var new_1 = require("../../commons/new");
var TouchableOpacity_1 = __importDefault(require("../../incubator/TouchableOpacity"));
/**
 * @description: A wrapper for TouchableOpacity component. Support onPress, throttling and activeBackgroundColor
 * @modifiers: margins, paddings, alignments, background, borderRadius
 * @extends: TouchableOpacity
 * @extendsLink: https://reactnative.dev/docs/touchableopacity
 * @gif: https://media.giphy.com/media/xULW8AMIgw7l31zjm8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/src/components/touchableOpacity/index.tsx
 */
var TouchableOpacity = /** @class */ (function (_super) {
    __extends(TouchableOpacity, _super);
    function TouchableOpacity(props) {
        var _this = _super.call(this, props) || this;
        _this.onPressIn = function () {
            var _a, _b;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.setState({ active: true });
            //@ts-expect-error
            (_b = (_a = _this.props).onPressIn) === null || _b === void 0 ? void 0 : _b.call.apply(_b, __spreadArray([_a], args));
        };
        _this.onPressOut = function () {
            var _a, _b;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.setState({ active: false });
            //@ts-expect-error
            (_b = (_a = _this.props).onPressOut) === null || _b === void 0 ? void 0 : _b.call.apply(_b, __spreadArray([_a], args));
        };
        _this.state = {
            active: false
        };
        var _a = props.throttleTime, throttleTime = _a === void 0 ? 0 : _a, _b = props.throttleOptions, throttleOptions = _b === void 0 ? { leading: true, trailing: false } : _b;
        _this.onPress = lodash_1.default.throttle(_this.onPress.bind(_this), throttleTime, throttleOptions);
        return _this;
    }
    TouchableOpacity.prototype.getAccessibilityInfo = function () {
        var disabled = this.props.disabled;
        return {
            accessibilityRole: 'button',
            accessibilityStates: disabled ? ['disabled'] : []
        };
    };
    Object.defineProperty(TouchableOpacity.prototype, "backgroundColorStyle", {
        get: function () {
            var _a = this.props, propsBackgroundColor = _a.backgroundColor, modifiers = _a.modifiers;
            var backgroundColor = propsBackgroundColor || modifiers.backgroundColor;
            if (backgroundColor) {
                return { backgroundColor: backgroundColor };
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TouchableOpacity.prototype, "activeBackgroundStyle", {
        get: function () {
            var active = this.state.active;
            var activeBackgroundColor = this.props.activeBackgroundColor;
            if (active && activeBackgroundColor) {
                return { backgroundColor: activeBackgroundColor };
            }
        },
        enumerable: false,
        configurable: true
    });
    TouchableOpacity.prototype.render = function () {
        var _a = this.props, useNative = _a.useNative, style = _a.style, modifiers = _a.modifiers, forwardedRef = _a.forwardedRef, others = __rest(_a, ["useNative", "style", "modifiers", "forwardedRef"]);
        var borderRadius = modifiers.borderRadius, paddings = modifiers.paddings, margins = modifiers.margins, alignments = modifiers.alignments, flexStyle = modifiers.flexStyle;
        if (useNative) {
            // @ts-ignore
            return <TouchableOpacity_1.default {...this.props}/>;
        }
        return (
        // @ts-ignore
        <react_native_1.TouchableOpacity {...this.getAccessibilityInfo()} {...others} onPress={this.onPress} onPressIn={this.onPressIn} onPressOut={this.onPressOut} style={[
                this.backgroundColorStyle,
                borderRadius && { borderRadius: borderRadius },
                flexStyle,
                paddings,
                margins,
                alignments,
                style,
                this.activeBackgroundStyle
            ]} ref={forwardedRef}/>);
    };
    TouchableOpacity.prototype.onPress = function () {
        var _a, _b;
        (_b = (_a = this.props).onPress) === null || _b === void 0 ? void 0 : _b.call(_a, this.props);
    };
    TouchableOpacity.displayName = 'TouchableOpacity';
    return TouchableOpacity;
}(react_1.PureComponent));
exports.default = new_1.asBaseComponent(new_1.forwardRef(TouchableOpacity));
