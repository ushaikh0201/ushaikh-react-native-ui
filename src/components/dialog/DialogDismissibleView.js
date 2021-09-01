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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var helpers_1 = require("../../helpers");
var view_1 = __importDefault(require("../view"));
var panningContext_1 = __importDefault(require("../panningViews/panningContext"));
var panningProvider_1 = __importDefault(require("../panningViews/panningProvider"));
var panResponderView_1 = __importDefault(require("../panningViews/panResponderView"));
var MAXIMUM_DRAGS_AFTER_SWIPE = 2;
var DEFAULT_DIRECTION = panningProvider_1.default.Directions.DOWN;
var DialogDismissibleView = function (props) {
    var _a = props.direction, direction = _a === void 0 ? DEFAULT_DIRECTION : _a, propsVisible = props.visible, containerStyle = props.containerStyle, style = props.style, children = props.children, onDismiss = props.onDismiss;
    // @ts-expect-error
    var _b = react_1.useContext(panningContext_1.default), isPanning = _b.isPanning, dragDeltas = _b.dragDeltas, swipeDirections = _b.swipeDirections;
    var width = react_1.useRef(helpers_1.Constants.screenWidth);
    var height = react_1.useRef(helpers_1.Constants.screenHeight);
    var TOP_INSET = react_1.useRef(helpers_1.Constants.isIphoneX ? helpers_1.Constants.getSafeAreaInsets().top : helpers_1.Constants.isIOS ? 20 : 0);
    var BOTTOM_INSET = react_1.useRef(helpers_1.Constants.isIphoneX ? helpers_1.Constants.getSafeAreaInsets().bottom : helpers_1.Constants.isIOS ? 20 : 0);
    var thresholdX = react_1.useRef(0);
    var thresholdY = react_1.useRef(0);
    var dragsCounter = react_1.useRef(0);
    var containerRef = react_1.useRef();
    var animatedValue = react_1.useRef(new react_native_1.Animated.Value(0));
    var mutableSwipeDirections = react_1.useRef({});
    var prevDragDeltas = react_1.useRef();
    var prevSwipeDirections = react_1.useRef();
    var visible = react_1.useRef(Boolean(propsVisible));
    var getHiddenLocation = react_1.useCallback(function (left, top) {
        var result = { left: 0, top: 0 };
        switch (direction) {
            case panningProvider_1.default.Directions.LEFT:
                result.left = -left - width.current;
                break;
            case panningProvider_1.default.Directions.RIGHT:
                result.left = helpers_1.Constants.screenWidth - left;
                break;
            case panningProvider_1.default.Directions.UP:
                result.top = -top - height.current - TOP_INSET.current;
                break;
            case panningProvider_1.default.Directions.DOWN:
            default:
                result.top = helpers_1.Constants.screenHeight - top + BOTTOM_INSET.current;
                break;
        }
        return result;
    }, [direction]);
    var hiddenLocation = react_1.useRef(getHiddenLocation(0, 0));
    var animateTo = react_1.useCallback(function (toValue, animationEndCallback) {
        react_native_1.Animated.timing(animatedValue.current, {
            toValue: toValue,
            duration: 300,
            easing: react_native_1.Easing.bezier(0.2, 0, 0.35, 1),
            useNativeDriver: true
        }).start(animationEndCallback);
    }, []);
    var isSwiping = react_1.useCallback(function () {
        return !lodash_1.default.isUndefined(mutableSwipeDirections.current.x) || !lodash_1.default.isUndefined(mutableSwipeDirections.current.y);
    }, []);
    var resetSwipe = react_1.useCallback(function () {
        dragsCounter.current = 0;
        mutableSwipeDirections.current = {};
    }, []);
    var onDrag = react_1.useCallback(function () {
        if (isSwiping()) {
            if (dragsCounter.current < MAXIMUM_DRAGS_AFTER_SWIPE) {
                dragsCounter.current += 1;
            }
            else {
                resetSwipe();
            }
        }
    }, [isSwiping, resetSwipe]);
    var hide = react_1.useCallback(function () {
        // TODO: test we're not animating?
        animateTo(0, function () {
            visible.current = false;
            onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
        });
    }, [animateTo, onDismiss]);
    react_1.useEffect(function () {
        var _a, _b;
        if (isPanning &&
            (dragDeltas.x || dragDeltas.y) &&
            (dragDeltas.x !== ((_a = prevDragDeltas.current) === null || _a === void 0 ? void 0 : _a.x) || dragDeltas.y !== ((_b = prevDragDeltas.current) === null || _b === void 0 ? void 0 : _b.y))) {
            onDrag();
            prevDragDeltas.current = dragDeltas;
        }
    }, [isPanning, dragDeltas, onDrag, hide]);
    react_1.useEffect(function () {
        var _a, _b;
        if (isPanning &&
            (swipeDirections.x || swipeDirections.y) &&
            (swipeDirections.x !== ((_a = prevSwipeDirections.current) === null || _a === void 0 ? void 0 : _a.x) || swipeDirections.y !== ((_b = prevSwipeDirections.current) === null || _b === void 0 ? void 0 : _b.y))) {
            mutableSwipeDirections.current = swipeDirections;
        }
    }, [isPanning, swipeDirections, hide]);
    react_1.useEffect(function () {
        if (visible.current && !propsVisible) {
            hide();
        }
    }, [propsVisible, hide]);
    var onLayout = react_1.useCallback(function (event) {
        // DO NOT move the width\height into the measureInWindow - it causes errors with orientation change
        var layout = event.nativeEvent.layout;
        width.current = layout.width;
        height.current = layout.height;
        thresholdX.current = width.current / 2;
        thresholdY.current = height.current / 2;
        if (containerRef.current) {
            // @ts-ignore TODO: can we fix this on ViewProps \ View?
            containerRef.current.measureInWindow(function (x, y) {
                hiddenLocation.current = getHiddenLocation(x, y);
                animateTo(1);
            });
        }
    }, [getHiddenLocation, animateTo]);
    var getAnimationStyle = react_1.useCallback(function () {
        return {
            transform: [
                {
                    translateX: animatedValue.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [hiddenLocation.current.left, 0]
                    })
                },
                {
                    translateY: animatedValue.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [hiddenLocation.current.top, 0]
                    })
                }
            ]
        };
    }, []);
    var resetToShown = react_1.useCallback(function (left, top, direction) {
        var toValue = [panningProvider_1.default.Directions.LEFT, panningProvider_1.default.Directions.RIGHT].includes(direction)
            ? 1 + left / hiddenLocation.current.left
            : 1 + top / hiddenLocation.current.top;
        animateTo(toValue);
    }, [animateTo]);
    var onPanLocationChanged = react_1.useCallback(function (_a) {
        var _b = _a.left, left = _b === void 0 ? 0 : _b, _c = _a.top, top = _c === void 0 ? 0 : _c;
        var endValue = { x: Math.round(left), y: Math.round(top) };
        if (isSwiping()) {
            hide();
        }
        else {
            resetSwipe();
            if ((direction === panningProvider_1.default.Directions.LEFT && endValue.x <= -thresholdX.current) ||
                (direction === panningProvider_1.default.Directions.RIGHT && endValue.x >= thresholdX.current) ||
                (direction === panningProvider_1.default.Directions.UP && endValue.y <= -thresholdY.current) ||
                (direction === panningProvider_1.default.Directions.DOWN && endValue.y >= thresholdY.current)) {
                hide();
            }
            else {
                resetToShown(left, top, direction);
            }
        }
    }, [isSwiping, hide, resetSwipe, direction, resetToShown]);
    return (
    // @ts-ignore
    <view_1.default ref={containerRef} style={containerStyle} onLayout={onLayout}>
      <panResponderView_1.default 
    // !visible.current && styles.hidden is done to fix a bug is iOS
    style={[style, getAnimationStyle(), !visible.current && styles.hidden]} isAnimated onPanLocationChanged={onPanLocationChanged}>
        {children}
      </panResponderView_1.default>
    </view_1.default>);
};
DialogDismissibleView.displayName = 'IGNORE';
DialogDismissibleView.defaultProps = {
    direction: DEFAULT_DIRECTION,
    onDismiss: function () { }
};
exports.default = DialogDismissibleView;
var styles = react_native_1.StyleSheet.create({
    hidden: {
        opacity: 0
    }
});
