"use strict";
// @ts-nocheck
// @flow
// Similarly to the DrawerLayout component this deserves to be put in a
// separate repo. Although, keeping it here for the time being will allow us
// to move faster and fix possible issues quicker
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
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: use Swipeable from react-native-gesture-handler once they support RTL
/* eslint-disable */
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var helpers_1 = require("../../helpers");
var services_1 = require("../../services");
var DRAG_TOSS = 0.05;
var LEFT_TOGGLE_THRESHOLD = 0.6;
// Math.sign polyfill for iOS 8.x
if (!Math.sign) {
    Math.sign = function (x) {
        return Number(x > 0) - Number(x < 0) || +x;
    };
}
var Swipeable = /** @class */ (function (_super) {
    __extends(Swipeable, _super);
    // _onGestureEvent: ?Animated.Event;
    // _transX: ?Animated.Interpolation;
    // _showLeftAction: ?Animated.Interpolation | ?Animated.Value;
    // _leftActionTranslate: ?Animated.Interpolation;
    // _showRightAction: ?Animated.Interpolation | ?Animated.Value;
    // _rightActionTranslate: ?Animated.Interpolation;
    function Swipeable(props) {
        var _this = _super.call(this, props) || this;
        _this._triggerHaptic = function () {
            return !_this.props.disableHaptic && services_1.HapticService.triggerHaptic(services_1.HapticType.impactMedium, 'Drawer');
        };
        _this._handleDrag = function (e) {
            var onToggleSwipeLeft = _this.props.onToggleSwipeLeft;
            if (onToggleSwipeLeft) {
                // Drag left toggle
                var _a = _this.state, rowWidth = _a.rowWidth, leftWidth = _a.leftWidth;
                var x = e.nativeEvent.translationX;
                var threshold = rowWidth * LEFT_TOGGLE_THRESHOLD;
                if (!_this.dragThresholdReached && x >= threshold && x < threshold + 10) {
                    // move item right
                    _this.dragThresholdReached = true;
                    _this._triggerHaptic();
                    onToggleSwipeLeft({ rowWidth: rowWidth, leftWidth: leftWidth, dragX: x });
                }
                if (_this.dragThresholdReached && x < threshold - 10) {
                    // move item left
                    _this.dragThresholdReached = false;
                    onToggleSwipeLeft({ rowWidth: rowWidth, leftWidth: leftWidth, dragX: x, resetItemPosition: true });
                }
            }
        };
        _this.getTransX = function () {
            var _a = _this.props, friction = _a.friction, overshootFriction = _a.overshootFriction;
            var _b = _this.state, dragX = _b.dragX, rowTranslation = _b.rowTranslation, _c = _b.leftWidth, leftWidth = _c === void 0 ? 0 : _c, _d = _b.rowWidth, rowWidth = _d === void 0 ? 0 : _d;
            var _e = _this.state.rightOffset, rightOffset = _e === void 0 ? rowWidth : _e;
            var rightWidth = Math.max(0, rowWidth - rightOffset);
            var _f = _this.props, _g = _f.overshootLeft, overshootLeft = _g === void 0 ? leftWidth > 0 : _g, _h = _f.overshootRight, overshootRight = _h === void 0 ? rightWidth > 0 : _h;
            var transX = react_native_1.Animated.add(rowTranslation, dragX.interpolate({
                inputRange: [0, friction],
                outputRange: [0, 1]
            })).interpolate({
                inputRange: [
                    -rightWidth - (overshootRight ? 1 : overshootFriction),
                    -rightWidth,
                    leftWidth,
                    leftWidth + (overshootLeft ? 1 : overshootFriction)
                ],
                outputRange: [
                    -rightWidth - (overshootRight || overshootFriction > 1 ? 1 : 0),
                    -rightWidth,
                    leftWidth,
                    leftWidth + (overshootLeft || overshootFriction > 1 ? 1 : 0)
                ],
            });
            return transX;
        };
        _this.getShowLeftAction = function () {
            var transX = _this.getTransX();
            var _a = _this.state.leftWidth, leftWidth = _a === void 0 ? 0 : _a;
            var showLeftAction = leftWidth > 0 ?
                transX.interpolate({
                    inputRange: [-1, 0, leftWidth],
                    outputRange: [0, 0, 1]
                })
                : new react_native_1.Animated.Value(0);
            return showLeftAction;
        };
        _this.getLeftActionTranslate = function () {
            var showLeftAction = _this.getShowLeftAction();
            var leftActionTranslate = showLeftAction.interpolate({
                inputRange: [0, Number.MIN_VALUE],
                outputRange: [-10000, 0],
                extrapolate: 'clamp'
            });
            return leftActionTranslate;
        };
        _this.getShowRightAction = function () {
            var transX = _this.getTransX();
            var _a = _this.state.rowWidth, rowWidth = _a === void 0 ? 0 : _a;
            var _b = _this.state.rightOffset, rightOffset = _b === void 0 ? rowWidth : _b;
            var rightWidth = Math.max(0, rowWidth - rightOffset);
            var showRightAction = rightWidth > 0 ?
                transX.interpolate({
                    inputRange: [-rightWidth, 0, 1],
                    outputRange: [1, 0, 0]
                })
                : new react_native_1.Animated.Value(0);
            return showRightAction;
        };
        _this.getRightActionTranslate = function () {
            var showRightAction = _this.getShowRightAction();
            var rightActionTranslate = showRightAction.interpolate({
                inputRange: [0, Number.MIN_VALUE],
                outputRange: [-10000, 0],
                extrapolate: 'clamp'
            });
            return rightActionTranslate;
        };
        _this._onTapHandlerStateChange = function (_a) {
            var nativeEvent = _a.nativeEvent;
            if (_this.rowState !== 0) {
                if (nativeEvent.oldState === react_native_gesture_handler_1.State.ACTIVE) {
                    _this.close();
                }
            }
        };
        _this._onHandlerStateChange = function (_a) {
            var nativeEvent = _a.nativeEvent;
            if (nativeEvent.oldState === react_native_gesture_handler_1.State.ACTIVE) {
                _this._handleRelease(nativeEvent);
            }
            if (nativeEvent.state === react_native_gesture_handler_1.State.ACTIVE) {
                _this.props.onDragStart && _this.props.onDragStart(_this.props);
            }
        };
        _this._handleRelease = function (nativeEvent) {
            var velocityX = nativeEvent.velocityX, dragX = nativeEvent.translationX;
            var _a = _this.state, _b = _a.leftWidth, leftWidth = _b === void 0 ? 0 : _b, _c = _a.rowWidth, rowWidth = _c === void 0 ? 0 : _c;
            var _d = _this.state.rightOffset, rightOffset = _d === void 0 ? rowWidth : _d;
            var rightWidth = rowWidth - rightOffset;
            var _e = _this.props, fullSwipeLeft = _e.fullSwipeLeft, fullSwipeRight = _e.fullSwipeRight, friction = _e.friction, _f = _e.leftThreshold, leftThreshold = _f === void 0 ? leftWidth / 2 : _f, _g = _e.rightThreshold, rightThreshold = _g === void 0 ? rightWidth / 2 : _g, fullLeftThreshold = _e.fullLeftThreshold, fullRightThreshold = _e.fullRightThreshold, onToggleSwipeLeft = _e.onToggleSwipeLeft;
            var startOffsetX = _this._currentOffset() + dragX / friction;
            var translationX = (dragX + DRAG_TOSS * velocityX) / friction;
            var toValue = 0;
            if (_this.rowState === 0) {
                if (onToggleSwipeLeft && translationX > rowWidth * LEFT_TOGGLE_THRESHOLD && !_this.dragThresholdReached) {
                    // Swipe left toggle
                    toValue = rowWidth * LEFT_TOGGLE_THRESHOLD;
                }
                else if (!onToggleSwipeLeft && fullSwipeLeft && translationX > rowWidth * fullLeftThreshold) {
                    _this._triggerHaptic();
                    toValue = rowWidth;
                }
                else if (fullSwipeRight && translationX < -rowWidth * fullRightThreshold) {
                    _this._triggerHaptic();
                    toValue = -rowWidth;
                }
                else if (translationX > leftThreshold) {
                    if (!onToggleSwipeLeft || onToggleSwipeLeft && translationX < rowWidth * LEFT_TOGGLE_THRESHOLD) {
                        toValue = leftWidth;
                    }
                }
                else if (translationX < -rightThreshold) {
                    toValue = -rightWidth;
                }
            }
            else if (_this.rowState === 1) {
                // swiped to left
                if (translationX > -leftThreshold) {
                    toValue = leftWidth;
                }
            }
            else {
                // swiped to right
                if (translationX < rightThreshold) {
                    toValue = -rightWidth;
                }
            }
            _this._animateRow(startOffsetX, toValue, velocityX / friction);
        };
        _this._animateRow = function (fromValue, toValue, velocityX) {
            var _a = _this.state, dragX = _a.dragX, rowTranslation = _a.rowTranslation, rowWidth = _a.rowWidth, leftWidth = _a.leftWidth;
            var _b = _this.props, useNativeAnimations = _b.useNativeAnimations, animationOptions = _b.animationOptions, onSwipeableLeftOpen = _b.onSwipeableLeftOpen, onSwipeableRightOpen = _b.onSwipeableRightOpen, onSwipeableClose = _b.onSwipeableClose, onSwipeableOpen = _b.onSwipeableOpen, onSwipeableLeftWillOpen = _b.onSwipeableLeftWillOpen, onSwipeableRightWillOpen = _b.onSwipeableRightWillOpen, onSwipeableWillClose = _b.onSwipeableWillClose, onSwipeableWillOpen = _b.onSwipeableWillOpen, onFullSwipeLeft = _b.onFullSwipeLeft, onToggleSwipeLeft = _b.onToggleSwipeLeft, onWillFullSwipeLeft = _b.onWillFullSwipeLeft, onFullSwipeRight = _b.onFullSwipeRight, onWillFullSwipeRight = _b.onWillFullSwipeRight;
            dragX.setValue(0);
            rowTranslation.setValue(fromValue);
            _this.rowState = Math.sign(toValue);
            react_native_1.Animated.spring(rowTranslation, __assign({ toValue: toValue, restSpeedThreshold: 1.7, restDisplacementThreshold: 0.4, velocity: velocityX, bounciness: 0, useNativeDriver: useNativeAnimations }, animationOptions)).start(function (_a) {
                var finished = _a.finished;
                if (finished) {
                    if (toValue === rowWidth && onFullSwipeLeft) {
                        onFullSwipeLeft();
                    }
                    else if (toValue === -rowWidth && onFullSwipeRight) {
                        onFullSwipeRight();
                    }
                    else if (toValue > 0 && onSwipeableLeftOpen) {
                        onSwipeableLeftOpen();
                    }
                    else if (toValue < 0 && onSwipeableRightOpen) {
                        onSwipeableRightOpen();
                    }
                    if (toValue === 0) {
                        onSwipeableClose && onSwipeableClose();
                    }
                    else {
                        onSwipeableOpen && onSwipeableOpen();
                    }
                }
            });
            if ((toValue === rowWidth * LEFT_TOGGLE_THRESHOLD || _this.dragThresholdReached) && onToggleSwipeLeft) {
                onToggleSwipeLeft({ rowWidth: rowWidth, leftWidth: leftWidth, released: true, triggerHaptic: !_this.dragThresholdReached });
                _this.dragThresholdReached = false;
            }
            else if (toValue === rowWidth && onWillFullSwipeLeft) {
                onWillFullSwipeLeft();
            }
            else if (toValue === -rowWidth && onWillFullSwipeRight) {
                onWillFullSwipeRight();
            }
            else if (toValue > 0 && onSwipeableLeftWillOpen) {
                onSwipeableLeftWillOpen();
            }
            else if (toValue < 0 && onSwipeableRightWillOpen) {
                onSwipeableRightWillOpen();
            }
            if (toValue === 0) {
                onSwipeableWillClose && onSwipeableWillClose();
            }
            else {
                onSwipeableWillOpen && onSwipeableWillOpen();
            }
        };
        _this._currentOffset = function () {
            var _a = _this.state, _b = _a.leftWidth, leftWidth = _b === void 0 ? 0 : _b, _c = _a.rowWidth, rowWidth = _c === void 0 ? 0 : _c;
            var _d = _this.state.rightOffset, rightOffset = _d === void 0 ? rowWidth : _d;
            var rightWidth = rowWidth - rightOffset;
            if (_this.rowState === 1) {
                return leftWidth;
            }
            else if (_this.rowState === -1) {
                return -rightWidth;
            }
            return 0;
        };
        _this.close = function () {
            _this._animateRow(_this._currentOffset(), 0);
        };
        _this.openLeft = function () {
            var _a = _this.state.leftWidth, leftWidth = _a === void 0 ? 0 : _a;
            _this._animateRow(_this._currentOffset(), leftWidth);
        };
        _this.openLeftFull = function () {
            var rowWidth = _this.state.rowWidth;
            _this._animateRow(_this._currentOffset(), rowWidth);
        };
        _this.toggleLeft = function () {
            // Programmatically left toggle
            var rowWidth = _this.state.rowWidth;
            _this._animateRow(_this._currentOffset(), rowWidth * LEFT_TOGGLE_THRESHOLD);
        };
        _this.openRight = function () {
            var _a = _this.state.rowWidth, rowWidth = _a === void 0 ? 0 : _a;
            var _b = _this.state.rightOffset, rightOffset = _b === void 0 ? rowWidth : _b;
            var rightWidth = rowWidth - rightOffset;
            _this._animateRow(_this._currentOffset(), -rightWidth);
        };
        _this.openRightFull = function () {
            var rowWidth = _this.state.rowWidth;
            _this._animateRow(_this._currentOffset(), -rowWidth);
        };
        _this._onRowLayout = function (_a) {
            var nativeEvent = _a.nativeEvent;
            return _this.handleMeasure('rowWidth', nativeEvent);
        };
        _this._onLeftLayout = function (_a) {
            var nativeEvent = _a.nativeEvent;
            return _this.handleMeasure('leftWidth', nativeEvent);
        };
        _this._onRightLayout = function (_a) {
            var nativeEvent = _a.nativeEvent;
            return _this.handleMeasure('rightOffset', nativeEvent);
        };
        _this.handleMeasure = function (name, nativeEvent) {
            var _a = nativeEvent.layout, width = _a.width, x = _a.x;
            switch (name) {
                case 'rowWidth':
                    _this.rowWidth = width;
                    break;
                case 'leftWidth':
                    _this.leftWidth = x;
                    break;
                case 'rightOffset':
                    _this.rightOffset = x;
                    break;
                default:
                    break;
            }
            var leftRender = _this.props.renderLeftActions ? _this.leftWidth : true;
            var rightRender = _this.props.renderRightActions ? _this.rightOffset : true;
            if (_this.rowWidth && leftRender && rightRender) {
                _this.setState({
                    rowWidth: _this.rowWidth,
                    leftWidth: _this.leftWidth,
                    rightOffset: _this.rightOffset,
                    measureCompleted: true
                });
            }
        };
        var dragX = new react_native_1.Animated.Value(0);
        // 0 -> open from either left/right,
        // 1 -> closing to the left
        // -1 -> closing to the right
        _this.rowState = 0;
        _this.dragThresholdReached = false;
        _this.state = {
            dragX: dragX,
            rowTranslation: new react_native_1.Animated.Value(0),
            rowWidth: helpers_1.Constants.screenWidth,
            leftWidth: undefined,
            rightOffset: undefined,
            measureCompleted: false
        };
        _this._onGestureEvent = react_native_1.Animated.event([{ nativeEvent: { translationX: dragX } }], {
            useNativeDriver: props.useNativeAnimations,
            listener: _this._handleDrag
        });
        return _this;
    }
    Swipeable.prototype.render = function () {
        var _a = this.props, children = _a.children, renderLeftActions = _a.renderLeftActions, renderRightActions = _a.renderRightActions, leftActionsContainerStyle = _a.leftActionsContainerStyle, rightActionsContainerStyle = _a.rightActionsContainerStyle, containerStyle = _a.containerStyle, childrenContainerStyle = _a.childrenContainerStyle, testID = _a.testID;
        var left = renderLeftActions && (<react_native_1.Animated.View style={[
                styles.leftActions,
                leftActionsContainerStyle,
                { transform: [{ translateX: this.getLeftActionTranslate() }] }
            ]}>
        {renderLeftActions(this.getShowLeftAction(), this.getTransX())}
        <react_native_1.View onLayout={this._onLeftLayout}/>
      </react_native_1.Animated.View>);
        var right = renderRightActions && (<react_native_1.Animated.View style={[
                styles.rightActions,
                rightActionsContainerStyle,
                { transform: [{ translateX: this.getRightActionTranslate() }] }
            ]}>
        {renderRightActions(this.getShowRightAction(), this.getTransX())}
        <react_native_1.View onLayout={this._onRightLayout}/>
      </react_native_1.Animated.View>);
        return (<react_native_gesture_handler_1.PanGestureHandler {...this.props} 
        // minDeltaX={10}
        activeOffsetX={[-10, helpers_1.Constants.isIOS ? 44 : 10]} onGestureEvent={this._onGestureEvent} onHandlerStateChange={this._onHandlerStateChange}>
        <react_native_1.Animated.View onLayout={this._onRowLayout} style={[styles.container, containerStyle]}>
          {left}
          {right}
          <react_native_gesture_handler_1.TapGestureHandler onHandlerStateChange={this._onTapHandlerStateChange}>
            <react_native_1.Animated.View testID={testID} style={[
                { transform: [{ translateX: this.getTransX() }] },
                childrenContainerStyle
            ]}>
              {children}
            </react_native_1.Animated.View>
          </react_native_gesture_handler_1.TapGestureHandler>
        </react_native_1.Animated.View>
      </react_native_gesture_handler_1.PanGestureHandler>);
    };
    Swipeable.displayName = 'IGNORE';
    Swipeable.defaultProps = {
        friction: 1,
        overshootFriction: 1,
        useNativeAnimations: false,
        fullLeftThreshold: 0.45,
        fullRightThreshold: 0.45
    };
    return Swipeable;
}(react_1.Component));
exports.default = Swipeable;
var styles = react_native_1.StyleSheet.create({
    container: {
        overflow: 'hidden'
    },
    leftActions: __assign(__assign({}, react_native_1.StyleSheet.absoluteFillObject), { flexDirection: react_native_1.I18nManager.isRTL ? 'row-reverse' : 'row' }),
    rightActions: __assign(__assign({}, react_native_1.StyleSheet.absoluteFillObject), { flexDirection: react_native_1.I18nManager.isRTL ? 'row' : 'row-reverse' })
});
