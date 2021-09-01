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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.testable = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var style_1 = require("../../style");
var helpers_1 = require("../../helpers");
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../view"));
var text_1 = __importDefault(require("../text"));
var button_1 = __importStar(require("../button"));
var pageControl_1 = __importDefault(require("../pageControl"));
//@ts-expect-error
var nativeComponents_1 = require("../../nativeComponents");
var defaultOverlayColor = style_1.Colors.rgba(style_1.Colors.black, 0.82);
var defaultTextColor = style_1.Colors.white;
var defaultStrokeColor = style_1.Colors.rgba(style_1.Colors.white, 0.12);
var defaultStrokeWidth = 12;
var contentViewPadding = 32;
var contentViewRightMargin = helpers_1.Constants.isIOS ? 45 : 46;
var titleBottomMargin = 12;
var messageBottomMargin = 24;
var messageLineHeight = 24;
var defaultButtonLabel = 'Got it';
var contentViewHeight = helpers_1.Constants.isAndroid ? 268 : 282;
/*eslint-disable*/
/**
 * @description: FeatureHighlight component for feature discovery
 * @notes: 1) FeatureHighlight component must be a direct child of the root view returned in render().; 2) If the element to be highlighted doesn't have a style attribute add 'style={{opacity: 1}}' so the Android OS can detect it.
 * @important: FeatureHighlight uses a native library. You MUST add and link the native library to both iOS and Android projects. For instruction please see
 * @importantLink: https://facebook.github.io/react-native/docs/linking-libraries-ios.html
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/FeatureHighlight/FeatureHighlight.gif?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FeatureHighlightScreen.tsx
 */
/*eslint-enable*/
var FeatureHighlight = /** @class */ (function (_super) {
    __extends(FeatureHighlight, _super);
    function FeatureHighlight(props) {
        var _this = _super.call(this, props) || this;
        _this.contentHeight = contentViewHeight;
        _this.shouldSetTargetPosition = function (nextProps) {
            var _a, _b, _c;
            return (((_a = nextProps.getTarget) === null || _a === void 0 ? void 0 : _a.call(nextProps)) !== ((_c = (_b = _this.props).getTarget) === null || _c === void 0 ? void 0 : _c.call(_b)) ||
                nextProps.title !== _this.props.title ||
                nextProps.visible !== _this.props.visible);
        };
        _this.onPress = function () {
            var _a;
            _this.animate(0);
            _this.contentHeight = contentViewHeight;
            _this.targetPosition = undefined;
            var confirmButtonProps = _this.props.confirmButtonProps;
            (_a = confirmButtonProps === null || confirmButtonProps === void 0 ? void 0 : confirmButtonProps.onPress) === null || _a === void 0 ? void 0 : _a.call(confirmButtonProps);
        };
        _this.getComponentDimensions = _this.getComponentDimensions.bind(_this);
        _this.setTargetPosition = _this.setTargetPosition.bind(_this);
        _this.state = {
            fadeAnim: new react_native_1.Animated.Value(0),
            contentTopPosition: undefined
        };
        return _this;
    }
    FeatureHighlight.prototype.componentDidMount = function () {
        this.setTargetPosition();
    };
    FeatureHighlight.getDerivedStateFromProps = function (nextProps, prevState) {
        var _a;
        if ((prevState === null || prevState === void 0 ? void 0 : prevState.getTarget) === (nextProps === null || nextProps === void 0 ? void 0 : nextProps.getTarget)) {
            return null;
        }
        var target = (_a = nextProps === null || nextProps === void 0 ? void 0 : nextProps.getTarget) === null || _a === void 0 ? void 0 : _a.call(nextProps);
        var node = FeatureHighlight.findTargetNode(target);
        if (node && node !== (prevState === null || prevState === void 0 ? void 0 : prevState.node)) {
            return { getTarget: nextProps === null || nextProps === void 0 ? void 0 : nextProps.getTarget, node: node };
        }
        return null;
    };
    FeatureHighlight.prototype.componentDidUpdate = function (nextProps) {
        if (this.shouldSetTargetPosition(nextProps)) {
            this.setTargetPosition();
        }
        if (this.viewRef) {
            this.setAccessibilityFocus(this.viewRef);
        }
    };
    FeatureHighlight.prototype.setAccessibilityFocus = function (ref) {
        var reactTag = react_native_1.findNodeHandle(ref);
        reactTag && react_native_1.AccessibilityInfo.setAccessibilityFocus(reactTag);
    };
    FeatureHighlight.findTargetNode = function (target) {
        return react_native_1.findNodeHandle(target);
    };
    FeatureHighlight.prototype.animate = function (toValue) {
        react_native_1.Animated.timing(
        // Animate over time
        this.state.fadeAnim, // The animated value to drive
        {
            toValue: toValue,
            duration: toValue ? 100 : 0,
            useNativeDriver: true
        }).start(); // Starts the animation
    };
    FeatureHighlight.prototype.setTargetPosition = function (props) {
        var _this = this;
        if (props === void 0) { props = this.props; }
        if (props.getTarget !== undefined) {
            var target_1 = props.getTarget();
            if (target_1) {
                setTimeout(function () {
                    target_1.measureInWindow(function (x, y, width, height) {
                        _this.targetPosition = { left: x, top: y, width: width, height: height };
                        _this.setContentPosition();
                    });
                }, 0);
            }
        }
        else {
            var frame = props.highlightFrame;
            if (frame) {
                this.targetPosition = { left: frame.x, top: frame.y, width: frame.width, height: frame.height };
                this.setContentPosition();
            }
        }
    };
    FeatureHighlight.prototype.getContentPosition = function () {
        var _a = this.props, highlightFrame = _a.highlightFrame, _b = _a.minimumRectSize, minimumRectSize = _b === void 0 ? { height: 0 } : _b, _c = _a.innerPadding, innerPadding = _c === void 0 ? 0 : _c;
        var _d = this.targetPosition || { top: 0, height: 0 }, top = _d.top, height = _d.height;
        var screenVerticalCenter = helpers_1.Constants.screenHeight / 2;
        var targetCenter = top + height / 2;
        var isAlignedTop = targetCenter > screenVerticalCenter;
        var topPosition = isAlignedTop ? top - this.contentHeight : top + height;
        if (!highlightFrame && !isAlignedTop) {
            var minRectHeight = minimumRectSize.height;
            var isUnderMin = height >= minRectHeight;
            topPosition = isUnderMin ? topPosition + innerPadding : targetCenter + minRectHeight / 2 + innerPadding / 2;
        }
        if (topPosition < 0 || topPosition + this.contentHeight > helpers_1.Constants.screenHeight) {
            console.warn("Content is too long and might appear off screen. Please adjust the message length for better results.");
        }
        return topPosition;
    };
    FeatureHighlight.prototype.setContentPosition = function () {
        var top = this.getContentPosition();
        this.setState({ contentTopPosition: top });
        this.animate(1);
    };
    // This method will be called more than once in case of layout change!
    FeatureHighlight.prototype.getComponentDimensions = function (event) {
        this.contentHeight = event.nativeEvent.layout.height;
        if (this.targetPosition !== undefined) {
            this.setContentPosition();
        }
    };
    FeatureHighlight.prototype.renderHighlightMessage = function () {
        var _this = this;
        var _a = this.props, title = _a.title, message = _a.message, titleStyle = _a.titleStyle, messageStyle = _a.messageStyle, confirmButtonProps = _a.confirmButtonProps, textColor = _a.textColor, titleNumberOfLines = _a.titleNumberOfLines, messageNumberOfLines = _a.messageNumberOfLines, pageControlProps = _a.pageControlProps;
        var color = textColor || defaultTextColor;
        return (<react_native_1.Animated.View style={[styles.highlightContent, { opacity: this.state.fadeAnim, top: this.state.contentTopPosition }]} onLayout={this.getComponentDimensions} pointerEvents="box-none" ref={!pageControlProps
                ? function (r) {
                    _this.viewRef = r;
                }
                : undefined}>
        {title && (<text_1.default text60 style={[
                    styles.title,
                    {
                        color: color,
                        marginBottom: message ? titleBottomMargin : messageBottomMargin
                    },
                    titleStyle
                ]} numberOfLines={titleNumberOfLines} 
            // @ts-expect-error
            pointerEvents={'none'}>
            {title}
          </text_1.default>)}
        {message && (<text_1.default text70 style={[styles.message, { color: color }, messageStyle]} numberOfLines={messageNumberOfLines} 
            // @ts-expect-error
            pointerEvents={'none'}>
            {message}
          </text_1.default>)}
        <button_1.default label={defaultButtonLabel} size={button_1.ButtonSize.medium} labelStyle={__assign(__assign({}, style_1.Typography.text80), { fontWeight: '700' })} outline outlineColor={color} activeBackgroundColor={style_1.Colors.rgba(color, 0.3)} {...confirmButtonProps} onPress={this.onPress}/>
      </react_native_1.Animated.View>);
    };
    FeatureHighlight.prototype.render = function () {
        var _this = this;
        var _a = this.state, node = _a.node, contentTopPosition = _a.contentTopPosition;
        if (contentTopPosition === undefined) {
            return null;
        }
        var _b = this.props, testID = _b.testID, visible = _b.visible, highlightFrame = _b.highlightFrame, overlayColor = _b.overlayColor, borderColor = _b.borderColor, borderWidth = _b.borderWidth, minimumRectSize = _b.minimumRectSize, innerPadding = _b.innerPadding, onBackgroundPress = _b.onBackgroundPress, borderRadius = _b.borderRadius, pageControlProps = _b.pageControlProps;
        return (<nativeComponents_1.HighlighterOverlayView testID={testID} highlightViewTag={node} highlightFrame={highlightFrame} visible={visible} overlayColor={overlayColor || defaultOverlayColor} strokeColor={borderColor || defaultStrokeColor} strokeWidth={borderWidth || defaultStrokeWidth} minimumRectSize={minimumRectSize} innerPadding={innerPadding} borderRadius={borderRadius} accessible={false}>
        <react_native_1.TouchableWithoutFeedback style={styles.touchableOverlay} onPress={onBackgroundPress}>
          {pageControlProps ? (<view_1.default flex bottom>
              <pageControl_1.default {...pageControlProps} containerStyle={{ marginBottom: 24 }} ref={function (r) { return (_this.viewRef = r); }}/>
              <view_1.default accessible accessibilityLabel={'dismiss button'}/>
            </view_1.default>) : (<view_1.default flex accessible accessibilityLabel={'dismiss'} accessibilityRole={'button'}/>)}
        </react_native_1.TouchableWithoutFeedback>
        {this.renderHighlightMessage()}
      </nativeComponents_1.HighlighterOverlayView>);
    };
    FeatureHighlight.displayName = 'FeatureHighlight';
    FeatureHighlight.defaultProps = {
        minimumRectSize: { width: 56, height: 56 },
        innerPadding: 10
    };
    return FeatureHighlight;
}(react_1.Component));
exports.testable = FeatureHighlight;
var styles = react_native_1.StyleSheet.create({
    highlightContent: {
        position: 'absolute',
        padding: contentViewPadding,
        marginRight: contentViewRightMargin,
        alignItems: 'flex-start'
    },
    title: {
        lineHeight: (_a = style_1.Typography.text60) === null || _a === void 0 ? void 0 : _a.lineHeight,
        fontWeight: '900'
    },
    message: __assign(__assign({ marginBottom: messageBottomMargin }, style_1.Typography.text70), { lineHeight: messageLineHeight }),
    touchableOverlay: __assign({}, react_native_1.StyleSheet.absoluteFillObject)
});
//@ts-ignore typescript - will be fixed when moved to functional component
exports.default = new_1.asBaseComponent(FeatureHighlight);
