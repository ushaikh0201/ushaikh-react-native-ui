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
// TODO: Add support to custom hint rendering
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var style_1 = require("../../style");
var helpers_1 = require("../../helpers");
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../view"));
var text_1 = __importDefault(require("../text"));
var image_1 = __importDefault(require("../image"));
var modal_1 = __importDefault(require("../modal"));
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var sideTip = require('./assets/hintTipSide.png');
var middleTip = require('./assets/hintTipMiddle.png');
var DEFAULT_COLOR = style_1.Colors.primary;
var DEFAULT_HINT_OFFSET = style_1.Spacings.s4;
var DEFAULT_EDGE_MARGINS = style_1.Spacings.s5;
var TARGET_POSITIONS;
(function (TARGET_POSITIONS) {
    TARGET_POSITIONS["LEFT"] = "left";
    TARGET_POSITIONS["RIGHT"] = "right";
    TARGET_POSITIONS["CENTER"] = "center";
})(TARGET_POSITIONS || (TARGET_POSITIONS = {}));
var HintPositions;
(function (HintPositions) {
    HintPositions["TOP"] = "top";
    HintPositions["BOTTOM"] = "bottom";
})(HintPositions || (HintPositions = {}));
/**
 * @description: Hint component for displaying a tooltip over wrapped component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/HintsScreen.tsx
 * @notes: You can either wrap a component or pass a specific targetFrame
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Hint/Hint.gif?raw=true
 */
var Hint = /** @class */ (function (_super) {
    __extends(Hint, _super);
    function Hint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.targetRef = null;
        _this.hintRef = null;
        _this.animationDuration = 170;
        _this.state = {
            targetLayoutInWindow: undefined,
            targetLayout: _this.props.targetFrame,
            hintUnmounted: !_this.props.visible
        };
        _this.visibleAnimated = new react_native_1.Animated.Value(Number(!!_this.props.visible));
        _this.animateHint = function () {
            react_native_1.Animated.timing(_this.visibleAnimated, {
                toValue: Number(!!_this.props.visible),
                duration: _this.animationDuration,
                useNativeDriver: true
            }).start(_this.toggleAnimationEndedToRemoveHint);
        };
        _this.toggleAnimationEndedToRemoveHint = function () {
            _this.setState({ hintUnmounted: !_this.props.visible });
        };
        _this.focusAccessibilityOnHint = function () {
            var message = _this.props.message;
            var targetRefTag = react_native_1.findNodeHandle(_this.targetRef);
            var hintRefTag = react_native_1.findNodeHandle(_this.hintRef);
            if (targetRefTag && lodash_1.default.isString(message)) {
                react_native_1.AccessibilityInfo.setAccessibilityFocus(targetRefTag);
            }
            else if (hintRefTag) {
                react_native_1.AccessibilityInfo.setAccessibilityFocus(hintRefTag);
            }
        };
        _this.setTargetRef = function (ref) {
            _this.targetRef = ref;
            _this.focusAccessibilityOnHint();
        };
        _this.setHintRef = function (ref) {
            _this.hintRef = ref;
            _this.focusAccessibilityOnHint();
        };
        _this.onTargetLayout = function (_a) {
            var layout = _a.nativeEvent.layout;
            if (!lodash_1.default.isEqual(_this.state.targetLayout, layout)) {
                _this.setState({ targetLayout: layout });
            }
            if (!_this.state.targetLayoutInWindow || _this.props.onBackgroundPress) {
                setTimeout(function () {
                    var _a;
                    (_a = _this.targetRef) === null || _a === void 0 ? void 0 : _a.measureInWindow(function (x, y, width, height) {
                        var targetLayoutInWindow = { x: x, y: y, width: width, height: height };
                        _this.setState({ targetLayoutInWindow: targetLayoutInWindow });
                    });
                });
            }
        };
        _this.getHintAnimatedStyle = function () {
            var position = _this.props.position;
            var translateY = position === HintPositions.TOP ? -10 : 10;
            return {
                opacity: _this.visibleAnimated,
                transform: [
                    {
                        translateY: _this.visibleAnimated.interpolate({ inputRange: [0, 1], outputRange: [translateY, 0] })
                    }
                ]
            };
        };
        return _this;
    }
    Hint.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.visible !== this.props.visible) {
            this.animateHint();
        }
    };
    Hint.prototype.getAccessibilityInfo = function () {
        var _a = this.props, visible = _a.visible, message = _a.message;
        if (visible && lodash_1.default.isString(message)) {
            return {
                accessible: true,
                accessibilityLabel: "hint: " + message
            };
        }
    };
    Object.defineProperty(Hint.prototype, "containerWidth", {
        get: function () {
            var _a = this.props.containerWidth, containerWidth = _a === void 0 ? helpers_1.Constants.screenWidth : _a;
            return containerWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hint.prototype, "targetLayout", {
        get: function () {
            var _a = this.props, onBackgroundPress = _a.onBackgroundPress, targetFrame = _a.targetFrame;
            var _b = this.state, targetLayout = _b.targetLayout, targetLayoutInWindow = _b.targetLayoutInWindow;
            if (targetFrame) {
                return targetFrame;
            }
            return onBackgroundPress ? targetLayoutInWindow : targetLayout;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hint.prototype, "showHint", {
        get: function () {
            return !!this.targetLayout;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hint.prototype, "tipSize", {
        get: function () {
            return this.useSideTip ? { width: 14, height: 7 } : { width: 20, height: 7 };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hint.prototype, "hintOffset", {
        get: function () {
            var _a = this.props.offset, offset = _a === void 0 ? DEFAULT_HINT_OFFSET : _a;
            return offset;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hint.prototype, "edgeMargins", {
        get: function () {
            var _a = this.props.edgeMargins, edgeMargins = _a === void 0 ? DEFAULT_EDGE_MARGINS : _a;
            return edgeMargins;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hint.prototype, "useSideTip", {
        get: function () {
            var useSideTip = this.props.useSideTip;
            if (!lodash_1.default.isUndefined(useSideTip)) {
                return useSideTip;
            }
            return this.getTargetPositionOnScreen() !== TARGET_POSITIONS.CENTER;
        },
        enumerable: false,
        configurable: true
    });
    Hint.prototype.getTargetPositionOnScreen = function () {
        var _a, _b;
        if (((_a = this.targetLayout) === null || _a === void 0 ? void 0 : _a.x) && ((_b = this.targetLayout) === null || _b === void 0 ? void 0 : _b.width)) {
            var targetMidPosition = this.targetLayout.x + this.targetLayout.width / 2;
            if (targetMidPosition > this.containerWidth * (2 / 3)) {
                return TARGET_POSITIONS.RIGHT;
            }
            else if (targetMidPosition < this.containerWidth * (1 / 3)) {
                return TARGET_POSITIONS.LEFT;
            }
        }
        return TARGET_POSITIONS.CENTER;
    };
    Hint.prototype.getContainerPosition = function () {
        if (this.targetLayout) {
            return { top: this.targetLayout.y, left: this.targetLayout.x };
        }
    };
    Hint.prototype.getHintPosition = function () {
        var _a, _b;
        var position = this.props.position;
        var hintPositionStyle = { alignItems: 'center' };
        if ((_a = this.targetLayout) === null || _a === void 0 ? void 0 : _a.x) {
            hintPositionStyle.left = -this.targetLayout.x;
        }
        if (position === HintPositions.TOP) {
            hintPositionStyle.bottom = 0;
        }
        else if ((_b = this.targetLayout) === null || _b === void 0 ? void 0 : _b.height) {
            hintPositionStyle.top = this.targetLayout.height;
        }
        var targetPositionOnScreen = this.getTargetPositionOnScreen();
        if (targetPositionOnScreen === TARGET_POSITIONS.RIGHT) {
            hintPositionStyle.alignItems = helpers_1.Constants.isRTL ? 'flex-start' : 'flex-end';
        }
        else if (targetPositionOnScreen === TARGET_POSITIONS.LEFT) {
            hintPositionStyle.alignItems = helpers_1.Constants.isRTL ? 'flex-end' : 'flex-start';
        }
        return hintPositionStyle;
    };
    Hint.prototype.getHintPadding = function () {
        var _a, _b;
        var paddings = { paddingVertical: this.hintOffset, paddingHorizontal: this.edgeMargins };
        if (this.useSideTip && ((_a = this.targetLayout) === null || _a === void 0 ? void 0 : _a.x)) {
            var targetPositionOnScreen = this.getTargetPositionOnScreen();
            if (targetPositionOnScreen === TARGET_POSITIONS.LEFT) {
                paddings.paddingLeft = this.targetLayout.x;
            }
            else if (targetPositionOnScreen === TARGET_POSITIONS.RIGHT && ((_b = this.targetLayout) === null || _b === void 0 ? void 0 : _b.width)) {
                paddings.paddingRight = this.containerWidth - this.targetLayout.x - this.targetLayout.width;
            }
        }
        return paddings;
    };
    Hint.prototype.getTipPosition = function () {
        var _a, _b;
        var position = this.props.position;
        var tipPositionStyle = {};
        if (position === HintPositions.TOP) {
            tipPositionStyle.bottom = this.hintOffset - this.tipSize.height;
            !this.useSideTip ? (tipPositionStyle.bottom += 1) : undefined;
        }
        else {
            tipPositionStyle.top = this.hintOffset - this.tipSize.height;
        }
        var layoutWidth = ((_a = this.targetLayout) === null || _a === void 0 ? void 0 : _a.width) || 0;
        if ((_b = this.targetLayout) === null || _b === void 0 ? void 0 : _b.x) {
            var targetMidWidth = layoutWidth / 2;
            var tipMidWidth = this.tipSize.width / 2;
            var leftPosition = this.useSideTip ? this.targetLayout.x : this.targetLayout.x + targetMidWidth - tipMidWidth;
            var rightPosition = this.useSideTip
                ? this.containerWidth - this.targetLayout.x - layoutWidth
                : this.containerWidth - this.targetLayout.x - targetMidWidth - tipMidWidth;
            var targetPositionOnScreen = this.getTargetPositionOnScreen();
            switch (targetPositionOnScreen) {
                case TARGET_POSITIONS.LEFT:
                    tipPositionStyle.left = helpers_1.Constants.isRTL ? rightPosition : leftPosition;
                    break;
                case TARGET_POSITIONS.RIGHT:
                    tipPositionStyle.right = helpers_1.Constants.isRTL ? leftPosition : rightPosition;
                    break;
                case TARGET_POSITIONS.CENTER:
                default:
                    tipPositionStyle.left = this.targetLayout.x + targetMidWidth - tipMidWidth;
                    break;
            }
        }
        return tipPositionStyle;
    };
    // renderOverlay() {
    //   const {targetLayoutInWindow} = this.state;
    //   const {onBackgroundPress} = this.props;
    //   if (targetLayoutInWindow) {
    //     const containerPosition = this.getContainerPosition();
    //     return (
    //       <View
    //         style={[
    //           styles.overlay,
    //           {
    //             top: containerPosition.top - targetLayoutInWindow.y,
    //             left: containerPosition.left - targetLayoutInWindow.x,
    //           },
    //         ]}
    //         pointerEvents="box-none"
    //       >
    //         {onBackgroundPress && (
    //           <TouchableWithoutFeedback style={[StyleSheet.absoluteFillObject]} onPress={onBackgroundPress}>
    //             <View flex />
    //           </TouchableWithoutFeedback>
    //         )}
    //       </View>
    //     );
    //   }
    // }
    Hint.prototype.renderHintTip = function () {
        var _a = this.props, position = _a.position, _b = _a.color, color = _b === void 0 ? DEFAULT_COLOR : _b;
        var source = this.useSideTip ? sideTip : middleTip;
        var flipVertically = position === HintPositions.TOP;
        var flipHorizontally = this.getTargetPositionOnScreen() === TARGET_POSITIONS.RIGHT;
        var flipStyle = {
            transform: [{ scaleY: flipVertically ? -1 : 1 }, { scaleX: flipHorizontally ? -1 : 1 }]
        };
        return (<image_1.default tintColor={color} source={source} style={[styles.hintTip, this.getTipPosition(), flipStyle]}/>);
    };
    Hint.prototype.renderContent = function () {
        var _a = this.props, message = _a.message, messageStyle = _a.messageStyle, icon = _a.icon, iconStyle = _a.iconStyle, borderRadius = _a.borderRadius, _b = _a.color, color = _b === void 0 ? DEFAULT_COLOR : _b, customContent = _a.customContent, removePaddings = _a.removePaddings, enableShadow = _a.enableShadow, visible = _a.visible, testID = _a.testID;
        return (<view_1.default testID={testID + ".message"} row centerV style={[
                styles.hint,
                !removePaddings && styles.hintPaddings,
                visible && enableShadow && styles.containerShadow,
                { backgroundColor: color },
                !lodash_1.default.isUndefined(borderRadius) && { borderRadius: borderRadius }
            ]} ref={this.setHintRef}>
        {customContent}
        {!customContent && icon && <image_1.default source={icon} style={[styles.icon, iconStyle]}/>}
        {!customContent && <text_1.default style={[styles.hintMessage, messageStyle]}>{message}</text_1.default>}
      </view_1.default>);
    };
    Hint.prototype.renderHint = function () {
        var _a = this.props, onPress = _a.onPress, testID = _a.testID;
        var opacity = onPress ? 0.9 : 1.0;
        if (this.showHint) {
            return (<view_1.default animated style={[
                    { width: this.containerWidth },
                    styles.animatedContainer,
                    this.getHintPosition(),
                    this.getHintPadding(),
                    this.getHintAnimatedStyle()
                ]} pointerEvents="box-none" testID={testID}>
          <touchableOpacity_1.default activeOpacity={opacity} onPress={onPress}>
            {this.renderContent()}
          </touchableOpacity_1.default>
          {this.renderHintTip()}
        </view_1.default>);
        }
    };
    Hint.prototype.renderHintContainer = function () {
        var _a = this.props, style = _a.style, others = __rest(_a, ["style"]);
        return (<view_1.default {...others} 
        // this view must be collapsable, don't pass testID or backgroundColor etc'. 
        collapsable testID={undefined} style={[styles.container, style, this.getContainerPosition()]}>
        {this.renderHint()}
      </view_1.default>);
    };
    Hint.prototype.renderChildren = function () {
        var targetFrame = this.props.targetFrame;
        if (!targetFrame && react_1.isValidElement(this.props.children)) {
            return react_1.default.cloneElement(this.props.children, __assign({ collapsable: false, onLayout: this.onTargetLayout, ref: this.setTargetRef }, this.getAccessibilityInfo()));
        }
    };
    Hint.prototype.render = function () {
        var _a = this.props, onBackgroundPress = _a.onBackgroundPress, testID = _a.testID;
        if (!this.props.visible && this.state.hintUnmounted) {
            return this.props.children || null;
        }
        return (<react_1.default.Fragment>
        {onBackgroundPress ? (<modal_1.default visible={this.showHint} animationType="none" transparent onBackgroundPress={onBackgroundPress} onRequestClose={onBackgroundPress} testID={testID + ".modal"}>
            {this.renderHintContainer()}
          </modal_1.default>) : (
            // this.renderOverlay(),
            this.renderHintContainer())}
        {this.renderChildren()}
      </react_1.default.Fragment>);
    };
    Hint.displayName = 'Hint';
    Hint.defaultProps = {
        position: HintPositions.BOTTOM
    };
    Hint.positions = HintPositions;
    return Hint;
}(react_1.Component));
var styles = react_native_1.StyleSheet.create({
    container: {
        position: 'absolute'
    },
    // overlay: {
    //   position: 'absolute',
    //   width: Constants.screenWidth,
    //   height: Constants.screenHeight
    // },
    animatedContainer: {
        position: 'absolute'
    },
    hintTip: {
        position: 'absolute'
    },
    hint: {
        maxWidth: 400,
        borderRadius: style_1.BorderRadiuses.br60,
        backgroundColor: DEFAULT_COLOR
    },
    hintPaddings: {
        paddingHorizontal: style_1.Spacings.s5,
        paddingTop: style_1.Spacings.s3,
        paddingBottom: style_1.Spacings.s4
    },
    containerShadow: __assign({}, style_1.Shadows.sh30.bottom),
    hintMessage: __assign(__assign({}, style_1.Typography.text70), { color: style_1.Colors.white, flexShrink: 1 }),
    icon: {
        marginRight: style_1.Spacings.s4,
        tintColor: style_1.Colors.white
    }
});
exports.default = new_1.asBaseComponent(Hint);
