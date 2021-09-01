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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestureDirections = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var helpers_1 = require("../../helpers");
var new_1 = require("../../commons/new");
var GestureDirections;
(function (GestureDirections) {
    // VERTICAL
    GestureDirections["UP"] = "up";
    GestureDirections["DOWN"] = "down";
})(GestureDirections = exports.GestureDirections || (exports.GestureDirections = {}));
var SWIPE_VELOCITY = 1.8;
var SPEED = 20;
var BOUNCINESS = 6;
/**
 * @description: PanGestureView component for drag and swipe gestures (supports only vertical gestures at the moment)
 */
var PanGestureView = /** @class */ (function (_super) {
    __extends(PanGestureView, _super);
    function PanGestureView(props) {
        var _this = _super.call(this, props) || this;
        _this.handleMoveShouldSetPanResponder = function (_e, gestureState) {
            // return true if user is swiping, return false if it's a single click
            var dy = gestureState.dy;
            return dy > 5 || dy < -5;
        };
        _this.handlePanResponderGrant = function () {
            _this.swipe = false;
        };
        _this.handlePanResponderMove = function (_e, gestureState) {
            var direction = _this.props.direction;
            var newValue = 0;
            // VERTICAL
            var up = (direction === GestureDirections.UP);
            var panDeltaY = gestureState.dy;
            var panVelocityY = gestureState.vy;
            if (Math.abs(panVelocityY) >= SWIPE_VELOCITY) {
                if ((up && panVelocityY < 0) || (!up && panVelocityY > 0)) {
                    // Swipe
                    _this.swipe = true;
                }
            }
            else if ((up && panDeltaY < 0) || (!up && panDeltaY > 0)) {
                // Drag
                newValue = panDeltaY;
                _this.animateDeltaY(Math.round(newValue));
            }
        };
        _this.handlePanResponderEnd = function () {
            if (!_this.swipe) {
                var direction = _this.props.direction;
                // VERTICAL
                var up = (direction === GestureDirections.UP);
                var deltaY = _this.state.deltaY;
                // @ts-ignore
                var threshold = _this.layout.height / 2;
                // @ts-ignore
                var endValue = Math.round(deltaY._value);
                if ((up && endValue <= -threshold) || (!up && endValue >= threshold)) {
                    _this.animateDismiss();
                }
                else {
                    // back to initial position
                    _this.animateDeltaY(0);
                }
            }
            else {
                _this.animateDismiss();
            }
        };
        _this.onAnimatedFinished = function (_a) {
            var finished = _a.finished;
            if (finished) {
                _this.onDismiss();
            }
        };
        _this.onDismiss = function () {
            var _a, _b;
            _this.initPositions();
            (_b = (_a = _this.props).onDismiss) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        _this.onLayout = function (event) {
            _this.layout = event.nativeEvent.layout;
        };
        _this.state = {
            deltaY: new react_native_1.Animated.Value(0)
        };
        _this.panResponder = react_native_1.PanResponder.create({
            onMoveShouldSetPanResponder: _this.handleMoveShouldSetPanResponder,
            onPanResponderGrant: _this.handlePanResponderGrant,
            onPanResponderMove: _this.handlePanResponderMove,
            onPanResponderRelease: _this.handlePanResponderEnd,
            onPanResponderTerminate: _this.handlePanResponderEnd
        });
        return _this;
    }
    PanGestureView.prototype.animateDeltaY = function (toValue) {
        var deltaY = this.state.deltaY;
        react_native_1.Animated.spring(deltaY, {
            toValue: toValue,
            useNativeDriver: true,
            speed: SPEED,
            bounciness: BOUNCINESS
        }).start();
    };
    PanGestureView.prototype.animateDismiss = function () {
        var direction = this.props.direction;
        // VERTICAL
        var up = (direction === GestureDirections.UP);
        var deltaY = this.state.deltaY;
        // @ts-ignore
        var newValue = up ? -this.layout.height - helpers_1.Constants.statusBarHeight : deltaY._value + helpers_1.Constants.screenHeight;
        react_native_1.Animated.timing(deltaY, {
            toValue: Math.round(newValue),
            useNativeDriver: true,
            duration: 280
        }).start(this.onAnimatedFinished);
    };
    PanGestureView.prototype.initPositions = function () {
        this.setState({
            deltaY: new react_native_1.Animated.Value(0)
        });
    };
    PanGestureView.prototype.render = function () {
        var style = this.props.style;
        // VERTICAL
        var deltaY = this.state.deltaY;
        return (<react_native_1.Animated.View style={[
                style,
                {
                    transform: [{
                            translateY: deltaY
                        }]
                }
            ]} {...this.panResponder.panHandlers} onLayout={this.onLayout}>
        {this.props.children}
      </react_native_1.Animated.View>);
    };
    PanGestureView.displayName = 'PanGestureView';
    PanGestureView.defaultProps = {
        direction: GestureDirections.DOWN
    };
    PanGestureView.directions = GestureDirections;
    return PanGestureView;
}(react_1.Component));
exports.default = new_1.asBaseComponent(PanGestureView);
