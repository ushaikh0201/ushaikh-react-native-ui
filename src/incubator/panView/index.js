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
exports.PanViewDirections = void 0;
var lodash_1 = require("lodash");
var react_1 = __importStar(require("react"));
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var new_1 = require("../../commons/new");
var helpers_1 = require("../../helpers");
var view_1 = __importDefault(require("../../components/view"));
var panningUtil_1 = require("./panningUtil");
Object.defineProperty(exports, "PanViewDirections", { enumerable: true, get: function () { return panningUtil_1.PanViewDirections; } });
var SPRING_BACK_ANIMATION_CONFIG = { velocity: 300, damping: 20, stiffness: 300, mass: 0.8 };
var PanView = function (props) {
    var _a = props.directions, directions = _a === void 0 ? [panningUtil_1.PanViewDirections.UP, panningUtil_1.PanViewDirections.DOWN, panningUtil_1.PanViewDirections.LEFT, panningUtil_1.PanViewDirections.RIGHT] : _a, dismissible = props.dismissible, springBack = props.springBack, onDismiss = props.onDismiss, directionLock = props.directionLock, threshold = props.threshold, containerStyle = props.containerStyle, children = props.children, others = __rest(props, ["directions", "dismissible", "springBack", "onDismiss", "directionLock", "threshold", "containerStyle", "children"]);
    var waitingForDismiss = react_native_reanimated_1.useSharedValue(false);
    var translationX = react_native_reanimated_1.useSharedValue(0);
    var translationY = react_native_reanimated_1.useSharedValue(0);
    var animatedStyle = react_native_reanimated_1.useAnimatedStyle(function () {
        return {
            transform: [{ translateX: translationX.value }, { translateY: translationY.value }]
        };
    }, []);
    var getTranslationOptions = function () {
        'worklet';
        return {
            directionLock: directionLock,
            currentTranslation: { x: translationX.value, y: translationY.value }
        };
    };
    var setTranslation = function (event, initialTranslation) {
        'worklet';
        var result = panningUtil_1.getTranslation(event, initialTranslation, directions, getTranslationOptions());
        translationX.value = result.x;
        translationY.value = result.y;
    };
    var dismiss = react_1.useCallback(function (isFinished) {
        'worklet';
        if (isFinished && waitingForDismiss.value && onDismiss) {
            waitingForDismiss.value = false;
            react_native_reanimated_1.runOnJS(onDismiss)();
        }
    }, [onDismiss]);
    var shouldDismissX = react_1.useCallback(function (isFinished) {
        'worklet';
        dismiss(isFinished);
    }, [dismiss]);
    var shouldDismissY = react_1.useCallback(function (isFinished) {
        'worklet';
        dismiss(isFinished);
    }, [dismiss]);
    var springBackIfNeeded = react_1.useCallback(function () {
        'worklet';
        if (springBack) {
            translationX.value = react_native_reanimated_1.withSpring(0, SPRING_BACK_ANIMATION_CONFIG);
            translationY.value = react_native_reanimated_1.withSpring(0, SPRING_BACK_ANIMATION_CONFIG);
        }
    }, [springBack]);
    var onGestureEvent = react_native_reanimated_1.useAnimatedGestureHandler({
        onStart: function (_event, context) {
            context.initialTranslation = { x: translationX.value, y: translationY.value };
        },
        onActive: function (event, context) {
            setTranslation(event, context.initialTranslation);
        },
        onEnd: function (event) {
            if (dismissible) {
                var velocity = panningUtil_1.getDismissVelocity(event, directions, getTranslationOptions(), threshold);
                if (velocity) {
                    waitingForDismiss.value = true;
                    if (velocity.x !== 0) {
                        var toX = Math.sign(translationX.value) * (Math.abs(translationX.value) + helpers_1.Constants.screenWidth);
                        translationX.value = react_native_reanimated_1.withSpring(toX, { velocity: velocity.x, damping: 50 }, shouldDismissX);
                    }
                    if (velocity.y !== 0) {
                        var toY = Math.sign(translationY.value) * (Math.abs(translationY.value) + helpers_1.Constants.screenHeight);
                        translationY.value = react_native_reanimated_1.withSpring(toY, { velocity: velocity.y, damping: 50 }, shouldDismissY);
                    }
                }
                else {
                    springBackIfNeeded();
                }
            }
            else {
                springBackIfNeeded();
            }
        }
    }, [directions, dismissible, setTranslation, springBackIfNeeded]);
    return (
    // TODO: delete comments once completed
    // <View ref={containerRef} style={containerStyle} onLayout={onLayout}>
    <view_1.default style={containerStyle}>
      <react_native_gesture_handler_1.PanGestureHandler onGestureEvent={lodash_1.isEmpty(directions) ? undefined : onGestureEvent}>
        <react_native_reanimated_1.default.View 
    // !visible.current && styles.hidden is done to fix a bug is iOS
    //   style={[style, animatedStyle, !visible.current && styles.hidden]}
    style={animatedStyle}>
          <view_1.default {...others}>{children}</view_1.default>
        </react_native_reanimated_1.default.View>
      </react_native_gesture_handler_1.PanGestureHandler>
    </view_1.default>);
};
PanView.displayName = 'PanView';
PanView.directions = panningUtil_1.PanViewDirections;
PanView.defaultProps = {
    threshold: panningUtil_1.DEFAULT_THRESHOLD
};
exports.default = new_1.asBaseComponent(PanView);
