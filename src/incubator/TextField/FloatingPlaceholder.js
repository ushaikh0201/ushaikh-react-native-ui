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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var types_1 = require("./types");
var Presenter_1 = require("./Presenter");
var style_1 = require("../../style");
var helpers_1 = require("../../helpers");
var view_1 = __importDefault(require("../../components/view"));
var text_1 = __importDefault(require("../../components/text"));
var FieldContext_1 = __importDefault(require("./FieldContext"));
var FLOATING_PLACEHOLDER_SCALE = 0.875;
var FloatingPlaceholder = function (_a) {
    var placeholder = _a.placeholder, _b = _a.floatingPlaceholderColor, floatingPlaceholderColor = _b === void 0 ? style_1.Colors.grey40 : _b, floatingPlaceholderStyle = _a.floatingPlaceholderStyle, floatOnFocus = _a.floatOnFocus, validationMessagePosition = _a.validationMessagePosition;
    var context = react_1.useContext(FieldContext_1.default);
    var _c = react_1.useState({
        top: 0,
        left: 0
    }), placeholderOffset = _c[0], setPlaceholderOffset = _c[1];
    var animation = react_1.useRef(new react_native_1.Animated.Value(Number(context.isFocused))).current;
    var hidePlaceholder = !context.isValid && validationMessagePosition === types_1.ValidationMessagePosition.TOP;
    var animatedStyle = react_1.useMemo(function () {
        return {
            transform: [
                {
                    scale: interpolateValue(animation, [1, FLOATING_PLACEHOLDER_SCALE])
                },
                {
                    translateX: interpolateValue(animation, [0, -placeholderOffset.left])
                },
                {
                    translateY: interpolateValue(animation, [0, -placeholderOffset.top])
                }
            ]
        };
    }, [placeholderOffset]);
    react_1.useEffect(function () {
        var toValue = floatOnFocus ? context.isFocused || context.hasValue : context.hasValue;
        react_native_1.Animated.timing(animation, {
            toValue: Number(toValue),
            duration: 200,
            useNativeDriver: true
        }).start();
    }, [floatOnFocus, context.isFocused, context.hasValue]);
    var onPlaceholderLayout = react_1.useCallback(function (event) {
        var _a = event.nativeEvent.layout, width = _a.width, height = _a.height;
        var translate = width / 2 - (width * FLOATING_PLACEHOLDER_SCALE) / 2;
        translate = helpers_1.Constants.isRTL ? -translate : translate;
        setPlaceholderOffset({
            left: translate / FLOATING_PLACEHOLDER_SCALE,
            top: height
        });
    }, []);
    return (<view_1.default absF style={hidePlaceholder && styles.hidden}>
      <text_1.default animated color={Presenter_1.getColorByState(floatingPlaceholderColor, context)} style={[styles.placeholder, floatingPlaceholderStyle, animatedStyle]} onLayout={onPlaceholderLayout}>
        {placeholder}
      </text_1.default>
    </view_1.default>);
};
var styles = react_native_1.StyleSheet.create({
    placeholder: __assign({}, react_native_1.Platform.select({
        android: { textAlignVertical: 'center', flex: 1 }
    })),
    hidden: {
        opacity: 0
    }
});
function interpolateValue(animatedValue, outputRange) {
    return animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: outputRange
    });
}
FloatingPlaceholder.displayName = 'Incubator.TextField';
exports.default = FloatingPlaceholder;
