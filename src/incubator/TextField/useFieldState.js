"use strict";
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
var react_1 = require("react");
var lodash_1 = __importDefault(require("lodash"));
var Presenter = __importStar(require("./Presenter"));
var hooks_1 = require("hooks");
function useFieldState(_a) {
    var validate = _a.validate, validateOnBlur = _a.validateOnBlur, validateOnChange = _a.validateOnChange, validateOnStart = _a.validateOnStart, onChangeValidity = _a.onChangeValidity, props = __rest(_a, ["validate", "validateOnBlur", "validateOnChange", "validateOnStart", "onChangeValidity"]);
    var _b = react_1.useState(props.value), value = _b[0], setValue = _b[1];
    var _c = react_1.useState(false), isFocused = _c[0], setIsFocused = _c[1];
    var _d = react_1.useState(true), isValid = _d[0], setIsValid = _d[1];
    var _e = react_1.useState(undefined), failingValidatorIndex = _e[0], setFailingValidatorIndex = _e[1];
    react_1.useEffect(function () {
        if (validateOnStart) {
            validateField();
        }
    }, []);
    react_1.useEffect(function () {
        if (props.value !== value) {
            setValue(props.value);
        }
        /* On purpose listen only to props.value change */
    }, [props.value]);
    hooks_1.useDidUpdate(function () {
        onChangeValidity === null || onChangeValidity === void 0 ? void 0 : onChangeValidity(isValid);
    }, [isValid]);
    var validateField = react_1.useCallback(function (valueToValidate) {
        if (valueToValidate === void 0) { valueToValidate = value; }
        var _a = Presenter.validate(valueToValidate, validate), _isValid = _a[0], _failingValidatorIndex = _a[1];
        setIsValid(_isValid);
        setFailingValidatorIndex(_failingValidatorIndex);
    }, [value, validate]);
    var onFocus = react_1.useCallback(function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        setIsFocused(true);
        //@ts-expect-error
        (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([props], args));
    }, [props.onFocus]);
    var onBlur = react_1.useCallback(function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        setIsFocused(false);
        //@ts-expect-error
        (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([props], args));
        if (validateOnBlur) {
            validateField();
        }
    }, [props.onBlur, validateOnBlur, validateField]);
    var onChangeText = react_1.useCallback(function (text) {
        var _a;
        setValue(text);
        (_a = props.onChangeText) === null || _a === void 0 ? void 0 : _a.call(props, text);
        if (validateOnChange) {
            validateField(text);
        }
    }, [props.onChangeText, validateOnChange, validateField]);
    var fieldState = react_1.useMemo(function () {
        return { value: value, hasValue: !lodash_1.default.isEmpty(value), isValid: isValid, isFocused: isFocused, failingValidatorIndex: failingValidatorIndex };
    }, [value, isFocused, isValid, failingValidatorIndex]);
    return {
        onFocus: onFocus,
        onBlur: onBlur,
        onChangeText: onChangeText,
        fieldState: fieldState,
        validateField: validateField
    };
}
exports.default = useFieldState;
