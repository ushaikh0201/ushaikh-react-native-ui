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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var style_1 = require("../../../style");
var colorByState = {
    focus: style_1.Colors.primary,
    error: style_1.Colors.error,
    disabled: style_1.Colors.grey40
};
var styles = react_native_1.StyleSheet.create({
    field: {
        borderBottomWidth: 1,
        borderBottomColor: style_1.Colors.grey50,
        paddingBottom: style_1.Spacings.s2
    },
    input: __assign(__assign({}, style_1.Typography.text70), { lineHeight: undefined, height: (_a = style_1.Typography === null || style_1.Typography === void 0 ? void 0 : style_1.Typography.text70) === null || _a === void 0 ? void 0 : _a.lineHeight }),
    floatingPlaceholder: __assign({}, style_1.Typography.text70)
});
exports.default = {
    enableErrors: true,
    validateOnBlur: true,
    floatingPlaceholderColor: colorByState,
    labelColor: colorByState,
    fieldStyle: styles.field,
    style: styles.input,
    floatingPlaceholderStyle: styles.floatingPlaceholder
};
