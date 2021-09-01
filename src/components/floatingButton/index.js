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
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var helpers_1 = require("../../helpers");
var new_1 = require("../../commons/new");
var style_1 = require("../../style");
var view_1 = __importDefault(require("../view"));
var button_1 = __importDefault(require("../button"));
var image_1 = __importDefault(require("../image"));
var gradientImage = function () { return require('./gradient.png'); };
/**
 * @description: Hovering button with gradient background
 * @modifiers: margin, background, color
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FloatingButtonScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/FloatingButton/FloatingButton.gif?raw=true
 */
var FloatingButton = /** @class */ (function (_super) {
    __extends(FloatingButton, _super);
    function FloatingButton(props) {
        var _this = _super.call(this, props) || this;
        _this.getAnimatedStyle = function () {
            return {
                opacity: _this.visibleAnimated,
                transform: [{ translateY: _this.visibleAnimated.interpolate({
                            inputRange: [0, 1],
                            outputRange: [helpers_1.Constants.screenHeight / 2, 0]
                        }) }]
            };
        };
        _this.renderOverlay = function () {
            if (!_this.props.hideBackgroundOverlay) {
                return (<view_1.default pointerEvents={'none'} style={styles.image}>
          <image_1.default style={styles.image} source={gradientImage()} resizeMode={'stretch'}/>
        </view_1.default>);
            }
        };
        _this.initialVisibility = props.visible;
        _this.firstLoad = true;
        _this.visibleAnimated = new react_native_1.Animated.Value(Number(!!props.visible));
        return _this;
    }
    FloatingButton.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, visible = _a.visible, duration = _a.duration;
        if (prevProps.visible !== visible) {
            react_native_1.Animated.timing(this.visibleAnimated, {
                toValue: Number(!!visible),
                duration: duration,
                useNativeDriver: true
            }).start();
        }
    };
    FloatingButton.prototype.renderButton = function () {
        var _a = this.props, bottomMargin = _a.bottomMargin, button = _a.button, secondaryButton = _a.secondaryButton, testID = _a.testID;
        var bottom = secondaryButton ? style_1.Spacings.s4 : bottomMargin || style_1.Spacings.s8;
        return (<button_1.default size={button_1.default.sizes.large} style={[styles.shadow, { marginTop: 16, marginBottom: bottom }]} testID={testID + ".button"} {...button}/>);
    };
    FloatingButton.prototype.renderSecondaryButton = function () {
        var _a = this.props, secondaryButton = _a.secondaryButton, bottomMargin = _a.bottomMargin, testID = _a.testID;
        return (<button_1.default link size={button_1.default.sizes.large} testID={testID + ".secondaryButton"} {...secondaryButton} style={{ marginBottom: bottomMargin || style_1.Spacings.s7 }} enableShadow={false}/>);
    };
    FloatingButton.prototype.render = function () {
        var _a = this.props, withoutAnimation = _a.withoutAnimation, secondaryButton = _a.secondaryButton, visible = _a.visible, testID = _a.testID;
        // NOTE: keep this.firstLoad as true as long as the visibility changed to true
        this.firstLoad && !visible ? this.firstLoad = true : this.firstLoad = false;
        // NOTE: On first load, don't show if it should not be visible
        if (this.firstLoad === true && !this.initialVisibility) {
            return false;
        }
        if (!visible && withoutAnimation) {
            return false;
        }
        return (<view_1.default pointerEvents="box-none" animated style={[styles.container, this.getAnimatedStyle()]} testID={testID}>
        {this.renderOverlay()}
        {this.renderButton()}
        {secondaryButton && this.renderSecondaryButton()}
      </view_1.default>);
    };
    FloatingButton.displayName = 'FloatingButton';
    FloatingButton.defaultProps = {
        duration: 300
    };
    return FloatingButton;
}(react_1.PureComponent));
var styles = react_native_1.StyleSheet.create({
    container: __assign(__assign({}, react_native_1.StyleSheet.absoluteFillObject), { top: undefined, alignItems: 'center', zIndex: helpers_1.Constants.isAndroid ? 99 : undefined }),
    image: __assign(__assign({}, react_native_1.StyleSheet.absoluteFillObject), { width: '100%', height: '100%' }),
    shadow: {
        shadowColor: style_1.Colors.dark40,
        shadowOffset: { height: 5, width: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 2
    }
});
exports.default = new_1.asBaseComponent(FloatingButton);
