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
var style_1 = require("../../style");
var view_1 = __importDefault(require("../view"));
var modifiers_1 = require("../../commons/modifiers");
var TRACK_SIZE = 6;
var THUMB_SIZE = 24;
var BORDER_WIDTH = 6;
var SHADOW_RADIUS = 4;
var DEFAULT_COLOR = style_1.Colors.dark50;
var ACTIVE_COLOR = style_1.Colors.violet30;
var INACTIVE_COLOR = style_1.Colors.dark60;
var defaultProps = {
    value: 0,
    minimumValue: 0,
    maximumValue: 1,
    step: 0
};
/**
 * @description: A Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Slider/Slider.gif?raw=true
 */
var Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    function Slider(props) {
        var _this = _super.call(this, props) || this;
        _this.thumb = undefined;
        _this._thumbStyles = {};
        _this.minTrack = undefined;
        _this._minTrackStyles = {};
        _this._x = 0;
        _this._dx = 0;
        _this._thumbAnimationConstants = {
            duration: 100,
            defaultScaleFactor: 1.5
        };
        _this.initialValue = _this.getRoundedValue(_this.props.value);
        _this.lastValue = _this.initialValue;
        _this.initialThumbSize = { width: THUMB_SIZE, height: THUMB_SIZE };
        /* Gesture Recognizer */
        _this.handleMoveShouldSetPanResponder = function () {
            return true;
        };
        _this.handlePanResponderGrant = function () {
            _this.updateThumbStyle(true);
            _this._dx = 0;
            _this.onSeekStart();
        };
        _this.handlePanResponderMove = function (_e, gestureState) {
            if (_this.props.disabled) {
                return;
            }
            var dx = gestureState.dx * (helpers_1.Constants.isRTL ? -1 : 1);
            _this.update(dx - _this._dx);
            _this._dx = dx;
        };
        _this.handlePanResponderEnd = function () {
            _this.updateThumbStyle(false);
            _this.bounceToStep();
            _this.onSeekEnd();
        };
        _this.scaleThumb = function (start) {
            var scaleFactor = start ? _this.calculatedThumbActiveScale() : 1;
            _this.thumbAnimationAction(scaleFactor);
        };
        _this.thumbAnimationAction = function (toValue) {
            var thumbActiveAnimation = _this.state.thumbActiveAnimation;
            var duration = _this._thumbAnimationConstants.duration;
            react_native_1.Animated.timing(thumbActiveAnimation, {
                toValue: toValue,
                duration: duration,
                useNativeDriver: true
            }).start();
        };
        _this.setMinTrackRef = function (ref) {
            _this.minTrack = ref;
        };
        _this.setThumbRef = function (ref) {
            _this.thumb = ref;
        };
        _this.calculatedThumbActiveScale = function () {
            var _a = _this.props, activeThumbStyle = _a.activeThumbStyle, thumbStyle = _a.thumbStyle, disabled = _a.disabled, disableActiveStyling = _a.disableActiveStyling;
            if (disabled || disableActiveStyling) {
                return 1;
            }
            var defaultScaleFactor = _this._thumbAnimationConstants.defaultScaleFactor;
            if (!activeThumbStyle || !thumbStyle) {
                return defaultScaleFactor;
            }
            var scaleRatioFromSize = Number(activeThumbStyle.height) / Number(thumbStyle.height);
            return scaleRatioFromSize || defaultScaleFactor;
        };
        _this.updateTrackStepAndStyle = function (_a) {
            var nativeEvent = _a.nativeEvent;
            _this._x = nativeEvent.locationX;
            _this.updateValue(_this._x);
            if (_this.props.step > 0) {
                _this.bounceToStep();
            }
            else {
                _this.updateStyles(_this._x);
            }
        };
        _this.onOrientationChanged = function () {
            _this.initialValue = _this.lastValue;
            _this.setState({ measureCompleted: false });
        };
        /* Events */
        _this.onValueChange = function (value) {
            _this.lastValue = value;
            lodash_1.default.invoke(_this.props, 'onValueChange', value);
        };
        _this.onContainerLayout = function (nativeEvent) {
            _this.handleMeasure('containerSize', nativeEvent);
        };
        _this.onTrackLayout = function (nativeEvent) {
            _this.setState({ measureCompleted: false });
            _this.handleMeasure('trackSize', nativeEvent);
        };
        _this.onThumbLayout = function (nativeEvent) {
            _this.handleMeasure('thumbSize', nativeEvent);
        };
        _this.handleTrackPress = function (event) {
            if (_this.props.disabled) {
                return;
            }
            _this.onSeekStart();
            _this.updateTrackStepAndStyle(event);
            _this.onSeekEnd();
        };
        _this.handleMeasure = function (name, _a) {
            var nativeEvent = _a.nativeEvent;
            var _b = nativeEvent.layout, width = _b.width, height = _b.height;
            var size = { width: width, height: height };
            var currentSize = _this[name];
            if (currentSize && width === currentSize.width && height === currentSize.height) {
                return;
            }
            _this[name] = size;
            if (_this.containerSize && _this.thumbSize && _this.trackSize) {
                // console.warn('post return');
                _this.setState({
                    containerSize: _this.containerSize,
                    trackSize: _this.trackSize,
                    thumbSize: _this.thumbSize
                }, function () {
                    _this.setState({ measureCompleted: true });
                });
            }
        };
        _this.onAccessibilityAction = function (event) {
            var _a = _this.props, maximumValue = _a.maximumValue, minimumValue = _a.minimumValue, step = _a.step;
            var value = _this.getValueForX(_this._x);
            var newValue;
            switch (event.nativeEvent.actionName) {
                case 'increment':
                    newValue = value !== maximumValue ? value + step : value;
                    break;
                case 'decrement':
                    newValue = value !== minimumValue ? value - step : value;
                    break;
                default:
                    newValue = value;
                    break;
            }
            _this._x = _this.getXForValue(newValue);
            _this.updateValue(_this._x);
            _this.updateStyles(_this._x);
            lodash_1.default.invoke(react_native_1.AccessibilityInfo, 'announceForAccessibility', "New value " + newValue);
        };
        _this.thumbHitSlop = { top: 10, bottom: 10, left: 24, right: 24 };
        /* Renders */
        _this.renderThumb = function () {
            var _a = _this.props, thumbStyle = _a.thumbStyle, disabled = _a.disabled, thumbTintColor = _a.thumbTintColor;
            return (<react_native_1.Animated.View hitSlop={_this.thumbHitSlop} ref={_this.setThumbRef} onLayout={_this.onThumbLayout} {..._this._panResponder.panHandlers} style={[
                    styles.thumb,
                    thumbStyle,
                    {
                        backgroundColor: disabled
                            ? DEFAULT_COLOR
                            : thumbTintColor || ACTIVE_COLOR
                    },
                    {
                        transform: [
                            {
                                scale: _this.state.thumbActiveAnimation
                            }
                        ]
                    }
                ]}/>);
        };
        _this.state = {
            containerSize: { width: 0, height: 0 },
            trackSize: { width: 0, height: 0 },
            thumbSize: { width: 0, height: 0 },
            thumbActiveAnimation: new react_native_1.Animated.Value(1),
            measureCompleted: false
        };
        _this.checkProps(props);
        _this._panResponder = react_native_1.PanResponder.create({
            onMoveShouldSetPanResponder: _this.handleMoveShouldSetPanResponder,
            onPanResponderGrant: _this.handlePanResponderGrant,
            onPanResponderMove: _this.handlePanResponderMove,
            onPanResponderRelease: _this.handlePanResponderEnd,
            onStartShouldSetPanResponder: function () { return true; },
            onPanResponderEnd: function () { return true; },
            onPanResponderTerminationRequest: function () { return false; }
        });
        return _this;
    }
    Slider.prototype.checkProps = function (props) {
        if (props.minimumValue >= props.maximumValue) {
            console.warn('Slider minimumValue must be lower than maximumValue');
        }
        if (props.value < props.minimumValue || props.value > props.maximumValue) {
            console.warn('Slider value is not in range');
        }
    };
    Slider.prototype.getAccessibilityProps = function () {
        var disabled = this.props.disabled;
        return __assign({ accessibilityLabel: 'Slider', accessible: true, accessibilityRole: 'adjustable', accessibilityStates: disabled ? ['disabled'] : [], accessibilityActions: [{ name: 'increment', label: 'increment' }, { name: 'decrement', label: 'decrement' }] }, modifiers_1.extractAccessibilityProps(this.props));
    };
    Slider.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            this.initialValue = this.getRoundedValue(this.props.value);
            // set position for new value
            this._x = this.getXForValue(this.initialValue);
            this.updateStyles(this._x);
        }
        if (prevState.measureCompleted !== this.state.measureCompleted) {
            this.initialThumbSize = this.state.thumbSize; // for thumb enlargement
            // set initial position
            this._x = this.getXForValue(this.initialValue);
            this.updateStyles(this._x);
        }
    };
    Slider.prototype.componentDidMount = function () {
        helpers_1.Constants.addDimensionsEventListener(this.onOrientationChanged);
    };
    Slider.prototype.componentWillUnmount = function () {
        helpers_1.Constants.removeDimensionsEventListener(this.onOrientationChanged);
    };
    /* Actions */
    Slider.prototype.update = function (dx) {
        // calc x in range (instead of: this._x += dx)
        var x = this._x;
        x += dx;
        x = Math.max(Math.min(x, this.state.trackSize.width), 0);
        this._x = x;
        this.updateStyles(this._x);
        this.updateValue(this._x);
    };
    Slider.prototype.bounceToStep = function () {
        if (this.props.step > 0) {
            var v = this.getValueForX(this._x);
            var round = this.getRoundedValue(v);
            var x = this.getXForValue(round);
            this._x = x;
            this.updateStyles(x);
        }
    };
    Slider.prototype.updateStyles = function (x) {
        if (this.thumb) {
            var trackSize = this.state.trackSize;
            var position = x - this.initialThumbSize.width / 2;
            var deviation = 3;
            if (position + deviation < 0) {
                this._thumbStyles.left = 0;
            }
            else if (position - deviation > trackSize.width - this.initialThumbSize.width) {
                this._thumbStyles.left = trackSize.width - this.initialThumbSize.width;
            }
            else {
                this._thumbStyles.left = position;
            }
            this.thumb.setNativeProps(this._thumbStyles);
        }
        if (this.minTrack) {
            this._minTrackStyles.width = Math.min(this.state.trackSize.width, x);
            this.minTrack.setNativeProps(this._minTrackStyles);
        }
    };
    Slider.prototype.updateValue = function (x) {
        var value = this.getValueForX(x);
        this.onValueChange(value);
    };
    Slider.prototype.updateThumbStyle = function (start) {
        if (this.thumb && !this.props.disableActiveStyling) {
            var _a = this.props, thumbStyle = _a.thumbStyle, activeThumbStyle = _a.activeThumbStyle;
            var style = thumbStyle || styles.thumb;
            var activeStyle = activeThumbStyle || styles.activeThumb;
            var activeOrInactiveStyle = !this.props.disabled ? (start ? activeStyle : style) : {};
            this._thumbStyles.style = lodash_1.default.omit(activeOrInactiveStyle, 'height', 'width');
            this.thumb.setNativeProps(this._thumbStyles);
            this.scaleThumb(start);
        }
    };
    Slider.prototype.getRoundedValue = function (value) {
        var step = this.props.step;
        var v = this.getValueInRange(value);
        return step > 0 ? Math.round(v / step) * step : v;
    };
    Slider.prototype.getValueInRange = function (value) {
        var _a = this.props, minimumValue = _a.minimumValue, maximumValue = _a.maximumValue;
        var v = value < minimumValue ? minimumValue : value > maximumValue ? maximumValue : value;
        return v;
    };
    Slider.prototype.getXForValue = function (v) {
        var minimumValue = this.props.minimumValue;
        var range = this.getRange();
        var relativeValue = minimumValue - v;
        var value = minimumValue < 0 ? Math.abs(relativeValue) : v - minimumValue; // for negatives
        var ratio = value / range;
        var x = ratio * this.state.trackSize.width;
        return x;
    };
    Slider.prototype.getValueForX = function (x) {
        var _a = this.props, maximumValue = _a.maximumValue, minimumValue = _a.minimumValue, step = _a.step;
        var ratio = x / (this.state.trackSize.width - this.initialThumbSize.width / 2);
        var range = this.getRange();
        if (step) {
            return Math.max(minimumValue, Math.min(maximumValue, minimumValue + Math.round((ratio * range) / step) * step));
        }
        else {
            return Math.max(minimumValue, Math.min(maximumValue, ratio * range + minimumValue));
        }
    };
    Slider.prototype.getRange = function () {
        var _a = this.props, minimumValue = _a.minimumValue, maximumValue = _a.maximumValue;
        var range = maximumValue - minimumValue;
        return range;
    };
    Slider.prototype.onSeekStart = function () {
        lodash_1.default.invoke(this.props, 'onSeekStart');
    };
    Slider.prototype.onSeekEnd = function () {
        lodash_1.default.invoke(this.props, 'onSeekEnd');
    };
    Slider.prototype.render = function () {
        var _a = this.props, containerStyle = _a.containerStyle, trackStyle = _a.trackStyle, renderTrack = _a.renderTrack, disabled = _a.disabled, _b = _a.minimumTrackTintColor, minimumTrackTintColor = _b === void 0 ? ACTIVE_COLOR : _b, _c = _a.maximumTrackTintColor, maximumTrackTintColor = _c === void 0 ? DEFAULT_COLOR : _c, testID = _a.testID;
        return (<view_1.default style={[styles.container, containerStyle]} onLayout={this.onContainerLayout} onAccessibilityAction={this.onAccessibilityAction} testID={testID} {...this.getAccessibilityProps()}>
        {lodash_1.default.isFunction(renderTrack) ? (<view_1.default style={[styles.track, { backgroundColor: maximumTrackTintColor }, trackStyle]} onLayout={this.onTrackLayout}>
            {renderTrack()}
          </view_1.default>) : (<view_1.default>
            <view_1.default style={[
                    styles.track,
                    trackStyle,
                    {
                        backgroundColor: disabled ? INACTIVE_COLOR : maximumTrackTintColor
                    }
                ]} onLayout={this.onTrackLayout}/>
            <view_1.default ref={this.setMinTrackRef} style={[
                    styles.track,
                    trackStyle,
                    styles.minimumTrack,
                    {
                        backgroundColor: disabled ? DEFAULT_COLOR : minimumTrackTintColor
                    }
                ]}/>
          </view_1.default>)}
        
        <view_1.default style={styles.touchArea} onTouchEnd={this.handleTrackPress}/>
        {this.renderThumb()}
      </view_1.default>);
    };
    Slider.displayName = 'Slider';
    Slider.defaultProps = defaultProps;
    return Slider;
}(react_1.PureComponent));
exports.default = Slider;
var styles = react_native_1.StyleSheet.create({
    container: {
        height: THUMB_SIZE + SHADOW_RADIUS,
        justifyContent: 'center'
    },
    track: {
        height: TRACK_SIZE,
        borderRadius: TRACK_SIZE / 2,
        overflow: 'hidden'
    },
    minimumTrack: {
        position: 'absolute'
    },
    thumb: {
        position: 'absolute',
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: THUMB_SIZE / 2,
        borderWidth: BORDER_WIDTH,
        borderColor: style_1.Colors.white,
        shadowColor: style_1.Colors.rgba(style_1.Colors.black, 0.3),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: SHADOW_RADIUS,
        elevation: 2
    },
    activeThumb: {
        width: THUMB_SIZE + 16,
        height: THUMB_SIZE + 16,
        borderRadius: (THUMB_SIZE + 16) / 2,
        borderWidth: BORDER_WIDTH
    },
    touchArea: __assign(__assign({}, react_native_1.StyleSheet.absoluteFillObject), { backgroundColor: 'transparent' })
});
