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
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var helpers_1 = require("../../helpers");
var asPanViewConsumer_1 = __importDefault(require("./asPanViewConsumer"));
var panningProvider_1 = __importDefault(require("./panningProvider"));
var DEFAULT_DIRECTIONS = [
    panningProvider_1.default.Directions.UP,
    panningProvider_1.default.Directions.DOWN,
    panningProvider_1.default.Directions.LEFT,
    panningProvider_1.default.Directions.RIGHT
];
var DEFAULT_SPEED = 20;
var DEFAULT_BOUNCINESS = 6;
var DEFAULT_DISMISS_ANIMATION_DURATION = 280;
var DEFAULT_ANIMATION_OPTIONS = {
    speed: DEFAULT_SPEED,
    bounciness: DEFAULT_BOUNCINESS,
    duration: DEFAULT_DISMISS_ANIMATION_DURATION
};
var MAXIMUM_DRAGS_AFTER_SWIPE = 2;
/**
 * @description: PanDismissibleView component created to making listening to swipe and drag events easier,
 * @notes: Has to be used as a child of a PanningProvider that also has a PanListenerView.
 *         The PanListenerView is the one that sends the drag\swipe events.
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/PanDismissibleView/PanDismissibleView.gif?raw=true
 */
var PanDismissibleView = /** @class */ (function (_super) {
    __extends(PanDismissibleView, _super);
    function PanDismissibleView(props) {
        var _this = _super.call(this, props) || this;
        _this.shouldDismissAfterReset = false;
        _this.ref = react_1.default.createRef();
        _this.animTranslateX = new react_native_1.Animated.Value(0);
        _this.animTranslateY = new react_native_1.Animated.Value(0);
        _this.left = 0;
        _this.top = 0;
        _this.width = 0;
        _this.height = 0;
        _this.thresholdX = 0;
        _this.thresholdY = 0;
        _this.swipe = {};
        _this.counter = 0;
        _this.onLayout = function (event) {
            if (_this.height === 0) {
                var layout = event.nativeEvent.layout;
                var threshold = _this.props.threshold;
                _this.height = layout.height;
                _this.thresholdY = lodash_1.default.get(threshold, 'y', layout.height / 2);
                _this.width = layout.width;
                _this.thresholdX = lodash_1.default.get(threshold, 'x', layout.width / 2);
                _this.initPositions();
            }
        };
        _this.initPositions = function (extraDataForSetState, runAfterSetState) {
            _this.setNativeProps(0, 0);
            _this.animTranslateX = new react_native_1.Animated.Value(0);
            _this.animTranslateY = new react_native_1.Animated.Value(0);
            _this.setState(__assign({}, extraDataForSetState), runAfterSetState);
        };
        _this.onPanStart = function () {
            _this.swipe = {};
            _this.counter = 0;
        };
        _this.onDrag = function (deltas) {
            var left = deltas.x ? Math.round(deltas.x) : 0;
            var top = deltas.y ? Math.round(deltas.y) : 0;
            _this.setNativeProps(left, top);
            if (_this.swipe.x || _this.swipe.y) {
                if (_this.counter < MAXIMUM_DRAGS_AFTER_SWIPE) {
                    _this.counter += 1;
                }
                else {
                    _this.swipe = {};
                }
            }
        };
        _this.setNativeProps = function (left, top) {
            if (_this.ref.current) {
                _this.ref.current.setNativeProps({ style: { left: left, top: top } });
                _this.left = left;
                _this.top = top;
            }
        };
        _this.onSwipe = function (swipeDirections) {
            _this.swipe = swipeDirections;
        };
        _this.onPanEnd = function () {
            var _a = _this.props.directions, directions = _a === void 0 ? DEFAULT_DIRECTIONS : _a;
            if (_this.swipe.x || _this.swipe.y) {
                var _b = _this.getDismissAnimationDirection(), isRight = _b.isRight, isDown = _b.isDown;
                _this._animateDismiss(isRight, isDown);
            }
            else {
                var endValue = { x: Math.round(_this.left), y: Math.round(_this.top) };
                if ((directions.includes(panningProvider_1.default.Directions.LEFT) && endValue.x <= -_this.thresholdX) ||
                    (directions.includes(panningProvider_1.default.Directions.RIGHT) && endValue.x >= _this.thresholdX) ||
                    (directions.includes(panningProvider_1.default.Directions.UP) && endValue.y <= -_this.thresholdY) ||
                    (directions.includes(panningProvider_1.default.Directions.DOWN) && endValue.y >= _this.thresholdY)) {
                    var _c = _this.getDismissAnimationDirection(), isRight = _c.isRight, isDown = _c.isDown;
                    _this._animateDismiss(isRight, isDown);
                }
                else {
                    _this.resetPosition();
                }
            }
        };
        _this.resetPosition = function () {
            var animationOptions = _this.props.animationOptions;
            var _a = animationOptions || DEFAULT_ANIMATION_OPTIONS, speed = _a.speed, bounciness = _a.bounciness;
            var toX = -_this.left;
            var toY = -_this.top;
            var animations = [];
            if (!lodash_1.default.isUndefined(toX)) {
                animations.push(react_native_1.Animated.spring(_this.animTranslateX, {
                    toValue: Math.round(toX),
                    useNativeDriver: true,
                    speed: speed,
                    bounciness: bounciness
                }));
            }
            if (!lodash_1.default.isUndefined(toY)) {
                animations.push(react_native_1.Animated.spring(_this.animTranslateY, {
                    toValue: Math.round(toY),
                    useNativeDriver: true,
                    speed: speed,
                    bounciness: bounciness
                }));
            }
            _this.setState({ isAnimating: true }, function () {
                react_native_1.Animated.parallel(animations).start(_this.onResetPositionFinished);
            });
        };
        _this.onResetPositionFinished = function () {
            var runAfterSetState = _this.shouldDismissAfterReset ? _this.animateDismiss : undefined;
            _this.shouldDismissAfterReset = false;
            _this.initPositions({ isAnimating: false }, runAfterSetState);
        };
        _this.getDismissAnimationDirection = function () {
            var allowDiagonalDismiss = _this.props.allowDiagonalDismiss;
            var _a = _this.props.context, swipeDirections = _a.swipeDirections, swipeVelocities = _a.swipeVelocities, dragDirections = _a.dragDirections, dragDeltas = _a.dragDeltas;
            var hasHorizontalSwipe = !lodash_1.default.isUndefined(swipeDirections.x);
            var hasVerticalSwipe = !lodash_1.default.isUndefined(swipeDirections.y);
            var isRight;
            var isDown;
            if (hasHorizontalSwipe || hasVerticalSwipe) {
                if (!allowDiagonalDismiss && hasHorizontalSwipe && hasVerticalSwipe) {
                    // @ts-ignore
                    if (Math.abs(swipeVelocities.y) > Math.abs(swipeVelocities.x)) {
                        isDown = swipeDirections.y === panningProvider_1.default.Directions.DOWN;
                    }
                    else {
                        isRight = swipeDirections.x === panningProvider_1.default.Directions.RIGHT;
                    }
                    return { isRight: isRight, isDown: isDown };
                }
                if (hasHorizontalSwipe) {
                    isRight = swipeDirections.x === panningProvider_1.default.Directions.RIGHT;
                }
                if (hasVerticalSwipe) {
                    isDown = swipeDirections.y === panningProvider_1.default.Directions.DOWN;
                }
            }
            else {
                // got here from a drag beyond threshold
                var hasHorizontalDrag = !lodash_1.default.isUndefined(dragDirections.x);
                var hasVerticalDrag = !lodash_1.default.isUndefined(dragDirections.y);
                if (!allowDiagonalDismiss && hasHorizontalDrag && hasVerticalDrag) {
                    // @ts-ignore
                    if (Math.abs(dragDeltas.y) > Math.abs(dragDeltas.x)) {
                        isDown = dragDirections.y === panningProvider_1.default.Directions.DOWN;
                    }
                    else {
                        isRight = dragDirections.x === panningProvider_1.default.Directions.RIGHT;
                    }
                    return { isRight: isRight, isDown: isDown };
                }
                if (hasHorizontalDrag) {
                    isRight = dragDirections.x === panningProvider_1.default.Directions.RIGHT;
                }
                if (hasVerticalDrag) {
                    isDown = dragDirections.y === panningProvider_1.default.Directions.DOWN;
                }
            }
            return { isRight: isRight, isDown: isDown };
        };
        // Send undefined to not animate in the horizontal\vertical direction
        // isRight === true --> animate to the right
        // isRight === false --> animate to the left
        // isDown === true --> animate to the bottom
        // isDown === false --> animate to the top
        _this.animateDismiss = function () {
            var isAnimating = _this.state.isAnimating;
            if (isAnimating) {
                _this.shouldDismissAfterReset = true;
            }
            else {
                var _a = _this.props.directions, directions = _a === void 0 ? [] : _a;
                var hasUp = directions.includes(panningProvider_1.default.Directions.UP);
                var hasRight = directions.includes(panningProvider_1.default.Directions.RIGHT);
                var hasLeft = directions.includes(panningProvider_1.default.Directions.LEFT);
                var hasDown = !hasUp && !hasLeft && !hasRight; // default
                var verticalDismiss = hasDown ? true : hasUp ? false : undefined;
                var horizontalDismiss = hasRight ? true : hasLeft ? false : undefined;
                _this._animateDismiss(horizontalDismiss, verticalDismiss);
            }
        };
        _this._animateDismiss = function (isRight, isDown) {
            var animationOptions = _this.props.animationOptions;
            var duration = (animationOptions || DEFAULT_ANIMATION_OPTIONS).duration;
            var animations = [];
            var toX;
            var toY;
            if (!lodash_1.default.isUndefined(isRight)) {
                var maxSize = helpers_1.Constants.screenWidth + _this.width;
                toX = isRight ? maxSize : -maxSize;
            }
            if (!lodash_1.default.isUndefined(isDown)) {
                var maxSize = helpers_1.Constants.screenHeight + _this.height;
                toY = isDown ? maxSize : -maxSize;
            }
            if (!lodash_1.default.isUndefined(toX)) {
                animations.push(react_native_1.Animated.timing(_this.animTranslateX, {
                    toValue: Math.round(toX),
                    useNativeDriver: true,
                    duration: duration
                }));
            }
            if (!lodash_1.default.isUndefined(toY)) {
                animations.push(react_native_1.Animated.timing(_this.animTranslateY, {
                    toValue: Math.round(toY),
                    useNativeDriver: true,
                    duration: duration
                }));
            }
            _this.setState({ isAnimating: true }, function () {
                react_native_1.Animated.parallel(animations).start(_this.onDismissAnimationFinished);
            });
        };
        _this.onDismissAnimationFinished = function (_a) {
            var _b, _c;
            var finished = _a.finished;
            if (finished) {
                (_c = (_b = _this.props).onDismiss) === null || _c === void 0 ? void 0 : _c.call(_b);
            }
        };
        _this.state = {
            isAnimating: false
        };
        return _this;
    }
    PanDismissibleView.prototype.componentDidUpdate = function (prevProps) {
        var isAnimating = this.state.isAnimating;
        var _a = this.props.context, isPanning = _a.isPanning, dragDeltas = _a.dragDeltas, swipeDirections = _a.swipeDirections;
        var _b = prevProps.context, prevIsPanning = _b.isPanning, prevDragDeltas = _b.dragDeltas, prevSwipeDirections = _b.swipeDirections;
        if (isPanning !== prevIsPanning) {
            if (isPanning && !isAnimating) {
                // do not start a new pan if we're still animating
                this.onPanStart();
            }
            else {
                this.onPanEnd();
            }
        }
        if (isPanning &&
            (dragDeltas.x || dragDeltas.y) &&
            (dragDeltas.x !== prevDragDeltas.x || dragDeltas.y !== prevDragDeltas.y)) {
            this.onDrag(dragDeltas);
        }
        if (isPanning &&
            (swipeDirections.x || swipeDirections.y) &&
            (swipeDirections.x !== prevSwipeDirections.x || swipeDirections.y !== prevSwipeDirections.y)) {
            this.onSwipe(swipeDirections);
        }
    };
    PanDismissibleView.prototype.render = function () {
        var style = this.props.style;
        var isAnimating = this.state.isAnimating;
        var transform = isAnimating ? [{ translateX: this.animTranslateX }, { translateY: this.animTranslateY }] : [];
        return (<react_native_1.Animated.View 
        // @ts-ignore
        ref={this.ref} style={[
                style,
                {
                    transform: transform
                }
            ]} onLayout={this.onLayout}>
        {this.props.children}
      </react_native_1.Animated.View>);
    };
    PanDismissibleView.displayName = 'PanDismissibleView';
    PanDismissibleView.defaultProps = {
        directions: DEFAULT_DIRECTIONS,
        animationOptions: DEFAULT_ANIMATION_OPTIONS,
        onDismiss: lodash_1.default.noop,
        allowDiagonalDismiss: false
    };
    return PanDismissibleView;
}(react_1.PureComponent));
exports.default = asPanViewConsumer_1.default(PanDismissibleView);
