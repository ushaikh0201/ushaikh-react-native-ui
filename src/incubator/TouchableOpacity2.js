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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var new_1 = require("../commons/new");
var view_1 = __importDefault(require("../components/view"));
/**
 * @description: a Better, enhanced TouchableOpacity component
 * @modifiers: flex, margin, padding, background
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/incubatorScreens/TouchableOpacityScreen.js
 */
function TouchableOpacity(props) {
    var children = props.children, modifiers = props.modifiers, style = props.style, disabled = props.disabled, forwardedRef = props.forwardedRef, feedbackColor = props.feedbackColor, _a = props.activeOpacity, activeOpacity = _a === void 0 ? 0.2 : _a, _b = props.activeScale, activeScale = _b === void 0 ? 1 : _b, others = __rest(props, ["children", "modifiers", "style", "disabled", "forwardedRef", "feedbackColor", "activeOpacity", "activeScale"]);
    var borderRadius = modifiers.borderRadius, paddings = modifiers.paddings, margins = modifiers.margins, alignments = modifiers.alignments, flexStyle = modifiers.flexStyle;
    var isActive = react_native_reanimated_1.useSharedValue(0);
    /* This flag is for fixing an issue with long press triggering twice
    TODO: Consider revisiting this issue to see if it still occurs */
    var isLongPressed = react_native_reanimated_1.useSharedValue(false);
    var backgroundColor = react_1.useMemo(function () {
        return props.backgroundColor || modifiers.backgroundColor;
    }, [props.backgroundColor, modifiers.backgroundColor]);
    var onPress = react_1.useCallback(function () {
        var _a;
        (_a = props.onPress) === null || _a === void 0 ? void 0 : _a.call(props, props);
    }, [props.onPress, props.customValue]);
    var onLongPress = react_1.useCallback(function () {
        var _a;
        (_a = props.onLongPress) === null || _a === void 0 ? void 0 : _a.call(props, props);
    }, [props.onLongPress, props.customValue]);
    var toggleActive = function (value) {
        'worklet';
        isActive.value = react_native_reanimated_1.withTiming(value, { duration: 200 });
    };
    var tapGestureHandler = react_native_reanimated_1.useAnimatedGestureHandler({
        onStart: function () {
            toggleActive(1);
        },
        onEnd: function () {
            toggleActive(0);
            react_native_reanimated_1.runOnJS(onPress)();
        },
        onFail: function () {
            if (!isLongPressed.value) {
                toggleActive(0);
            }
        }
    });
    var longPressGestureHandler = react_native_reanimated_1.useAnimatedGestureHandler({
        onActive: function () {
            if (!isLongPressed.value) {
                isLongPressed.value = true;
                react_native_reanimated_1.runOnJS(onLongPress)();
            }
        },
        onFinish: function () {
            toggleActive(0);
            isLongPressed.value = false;
        }
    });
    var animatedStyle = react_native_reanimated_1.useAnimatedStyle(function () {
        var activeColor = feedbackColor || backgroundColor;
        var opacity = react_native_reanimated_1.interpolate(isActive.value, [0, 1], [1, activeOpacity]);
        var scale = react_native_reanimated_1.interpolate(isActive.value, [0, 1], [1, activeScale]);
        return {
            backgroundColor: react_native_reanimated_1.interpolateColor(isActive.value, [0, 1], [backgroundColor, activeColor]),
            opacity: opacity,
            transform: [{ scale: scale }]
        };
    }, [backgroundColor, feedbackColor]);
    var Container = props.onLongPress ? react_native_gesture_handler_1.LongPressGestureHandler : view_1.default;
    return (<react_native_gesture_handler_1.TapGestureHandler 
    // @ts-expect-error
    onGestureEvent={tapGestureHandler} shouldCancelWhenOutside enabled={!disabled}>
      <react_native_reanimated_1.default.View>
        {/* @ts-expect-error */}
        <Container onGestureEvent={longPressGestureHandler} shouldCancelWhenOutside>
          <react_native_reanimated_1.default.View {...others} ref={forwardedRef} style={[
            borderRadius && { borderRadius: borderRadius },
            flexStyle,
            paddings,
            margins,
            alignments,
            backgroundColor && { backgroundColor: backgroundColor },
            style,
            animatedStyle
        ]}>
            {children}
          </react_native_reanimated_1.default.View>
        </Container>
      </react_native_reanimated_1.default.View>
    </react_native_gesture_handler_1.TapGestureHandler>);
}
TouchableOpacity.displayName = 'Incubator.TouchableOpacity';
exports.default = new_1.asBaseComponent(new_1.forwardRef(TouchableOpacity));
