"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var Presenter_1 = require("./Presenter");
var style_1 = require("../../style");
var helpers_1 = require("../../helpers");
var FieldContext_1 = __importDefault(require("./FieldContext"));
var useImperativeInputHandle_1 = __importDefault(require("./useImperativeInputHandle"));
var DEFAULT_INPUT_COLOR = {
    default: style_1.Colors.grey10,
    disabled: style_1.Colors.grey40
};
var Input = function (_a) {
    var style = _a.style, hint = _a.hint, _b = _a.color, color = _b === void 0 ? DEFAULT_INPUT_COLOR : _b, forwardedRef = _a.forwardedRef, props = __rest(_a, ["style", "hint", "color", "forwardedRef"]);
    var inputRef = useImperativeInputHandle_1.default(forwardedRef);
    var context = react_1.useContext(FieldContext_1.default);
    var placeholder = !context.isFocused ? props.placeholder : hint || props.placeholder;
    var inputColor = Presenter_1.getColorByState(color, context);
    var placeholderTextColor = Presenter_1.getColorByState(props.placeholderTextColor, context);
    return (<react_native_1.TextInput style={[styles.input, !!inputColor && { color: inputColor }, style]} {...props} placeholder={placeholder} placeholderTextColor={placeholderTextColor} 
    // @ts-expect-error
    ref={inputRef} underlineColorAndroid="transparent" accessibilityState={{ disabled: props.editable === false }}/>);
};
var styles = react_native_1.StyleSheet.create({
    input: __assign({ textAlign: helpers_1.Constants.isRTL ? 'right' : 'left', 
        // Setting paddingTop/Bottom separately fix height issues on iOS with multiline
        paddingTop: 0, paddingBottom: 0 }, react_native_1.Platform.select({
        // This reset android input inner spacing
        android: {
            padding: 0,
            textAlignVertical: 'center'
        }
    }))
});
Input.displayName = 'Incubator.TextField';
exports.default = Input;
