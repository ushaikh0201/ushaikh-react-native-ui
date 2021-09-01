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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: support hitSlop
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var lodash_1 = __importDefault(require("lodash"));
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var new_1 = require("../commons/new");
var Clock = react_native_reanimated_1.default.Clock, Code = react_native_reanimated_1.default.Code, cond = react_native_reanimated_1.default.cond, and = react_native_reanimated_1.default.and, or = react_native_reanimated_1.default.or, eq = react_native_reanimated_1.default.eq, neq = react_native_reanimated_1.default.neq, _interpolate = react_native_reanimated_1.default.interpolate, interpolateNode = react_native_reanimated_1.default.interpolateNode, Extrapolate = react_native_reanimated_1.default.Extrapolate, Value = react_native_reanimated_1.default.Value, call = react_native_reanimated_1.default.call, block = react_native_reanimated_1.default.block, event = react_native_reanimated_1.default.event, timing = react_native_reanimated_1.default.timing, set = react_native_reanimated_1.default.set, startClock = react_native_reanimated_1.default.startClock, stopClock = react_native_reanimated_1.default.stopClock;
var Easing = react_native_reanimated_1.EasingNode || react_native_reanimated_1.Easing;
var interpolate = interpolateNode || _interpolate;
/**
 * @description: a Better, enhanced TouchableOpacity component
 * @modifiers: flex, margin, padding, background
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/incubatorScreens/TouchableOpacityScreen.js
 */
var TouchableOpacity = /** @class */ (function (_super) {
    __extends(TouchableOpacity, _super);
    function TouchableOpacity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            pressState: new Value(-1)
        };
        _this._prevPressState = new Value(-1);
        _this.isAnimating = new Value(0);
        _this.clock = new Clock();
        _this._scale = runTiming(_this.clock, _this.pressState, _this.props.activeScale || 1, 1);
        _this._opacity = runTiming(_this.clock, _this.pressState, _this.props.activeOpacity || 0.2, 1);
        _this._color = cond(eq(_this.pressState, react_native_gesture_handler_1.State.BEGAN), 
        // @ts-expect-error
        react_native_1.processColor(_this.props.feedbackColor || _this.backgroundColor), react_native_1.processColor(_this.backgroundColor));
        _this.onStateChange = event([
            {
                nativeEvent: { state: _this.pressState }
            }
        ], { useNativeDriver: true });
        _this.onLongPress = function (event) {
            var _a, _b;
            if (event.nativeEvent.state === react_native_gesture_handler_1.State.ACTIVE) {
                (_b = (_a = _this.props).onLongPress) === null || _b === void 0 ? void 0 : _b.call(_a, _this.props);
            }
        };
        return _this;
    }
    Object.defineProperty(TouchableOpacity.prototype, "pressState", {
        get: function () {
            return this.props.pressState || this.state.pressState;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TouchableOpacity.prototype, "backgroundColor", {
        get: function () {
            var _a = this.props, modifiers = _a.modifiers, backgroundColorProp = _a.backgroundColor;
            var backgroundColor = modifiers.backgroundColor;
            return backgroundColorProp || backgroundColor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TouchableOpacity.prototype, "animatedStyle", {
        get: function () {
            var feedbackColor = this.props.feedbackColor;
            var style = {
                opacity: this._opacity,
                transform: [{ scale: this._scale }]
            };
            if (feedbackColor) {
                style.backgroundColor = this._color;
            }
            return style;
        },
        enumerable: false,
        configurable: true
    });
    TouchableOpacity.prototype.render = function () {
        var _this = this;
        var _a = this.props, modifiers = _a.modifiers, style = _a.style, _b = _a.onPress, onPress = _b === void 0 ? lodash_1.default.noop : _b, onLongPress = _a.onLongPress, disabled = _a.disabled, forwardedRef = _a.forwardedRef, others = __rest(_a, ["modifiers", "style", "onPress", "onLongPress", "disabled", "forwardedRef"]);
        var borderRadius = modifiers.borderRadius, paddings = modifiers.paddings, margins = modifiers.margins, alignments = modifiers.alignments, flexStyle = modifiers.flexStyle, backgroundColor = modifiers.backgroundColor;
        return (<react_native_gesture_handler_1.TapGestureHandler onHandlerStateChange={this.onStateChange} shouldCancelWhenOutside enabled={!disabled}>
        <react_native_reanimated_1.default.View {...others} ref={forwardedRef} style={[
                borderRadius && { borderRadius: borderRadius },
                flexStyle,
                paddings,
                margins,
                alignments,
                backgroundColor && { backgroundColor: backgroundColor },
                style,
                this.animatedStyle
            ]}>
          {this.props.children}

          <Code>
            {function () {
                return block([
                    cond(and(eq(_this.pressState, react_native_gesture_handler_1.State.END), eq(_this._prevPressState, react_native_gesture_handler_1.State.BEGAN)), [
                        call([], function () { return onPress(_this.props); })
                    ]),
                    set(_this._prevPressState, _this.pressState)
                ]);
            }}
          </Code>
          {onLongPress && (<react_native_gesture_handler_1.LongPressGestureHandler onHandlerStateChange={this.onLongPress} enabled={!disabled}>
              <react_native_reanimated_1.default.View style={react_native_1.StyleSheet.absoluteFillObject}/>
            </react_native_gesture_handler_1.LongPressGestureHandler>)}
        </react_native_reanimated_1.default.View>
      </react_native_gesture_handler_1.TapGestureHandler>);
    };
    TouchableOpacity.displayName = 'Incubator.TouchableOpacity';
    TouchableOpacity.defaultProps = {
        activeOpacity: 0.2,
        activeScale: 1,
        onPress: lodash_1.default.noop
    };
    return TouchableOpacity;
}(react_1.PureComponent));
function runTiming(clock, gestureState, initialValue, endValue) {
    var state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };
    var config = {
        duration: 150,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };
    return block([
        cond(and(eq(gestureState, react_native_gesture_handler_1.State.BEGAN), neq(config.toValue, 1)), [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.frameTime, 0),
            set(config.toValue, 1),
            startClock(clock)
        ]),
        cond(and(or(eq(gestureState, react_native_gesture_handler_1.State.END), eq(gestureState, react_native_gesture_handler_1.State.FAILED)), neq(config.toValue, 0)), [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.frameTime, 0),
            set(config.toValue, 0),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, stopClock(clock)),
        interpolate(state.position, {
            inputRange: [0, 1],
            outputRange: [endValue, initialValue],
            extrapolate: Extrapolate.CLAMP
        })
    ]);
}
exports.default = new_1.asBaseComponent(new_1.forwardRef(TouchableOpacity));
