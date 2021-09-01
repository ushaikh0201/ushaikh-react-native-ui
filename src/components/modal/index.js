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
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_1 = require("react-native");
var optionalDependencies_1 = require("../../optionalDependencies");
var helpers_1 = require("../../helpers");
var new_1 = require("../../commons/new");
var TopBar_1 = __importDefault(require("./TopBar"));
var view_1 = __importDefault(require("../../components/view"));
var BlurView = optionalDependencies_1.BlurViewPackage === null || optionalDependencies_1.BlurViewPackage === void 0 ? void 0 : optionalDependencies_1.BlurViewPackage.BlurView;
/**
 * @description: Component that present content on top of the invoking screen
 * @extends: Modal
 * @extendsLink: https://reactnative.dev/docs/modal
 * @gif: https://media.giphy.com/media/3oFzmfSX8KgvctI4Ks/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ModalScreen.tsx
 */
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal(props) {
        var _this = _super.call(this, props) || this;
        if (props.enableModalBlur && !BlurView) {
            console.error("RNUILib Modal's \"enableModalBlur\" prop requires installing \"@react-native-community/blur\" dependency");
        }
        return _this;
    }
    Modal.prototype.renderTouchableOverlay = function () {
        var _a = this.props, testID = _a.testID, overlayBackgroundColor = _a.overlayBackgroundColor, onBackgroundPress = _a.onBackgroundPress, _b = _a.accessibilityLabel, accessibilityLabel = _b === void 0 ? 'Dismiss' : _b;
        if (lodash_1.default.isFunction(onBackgroundPress) || !!overlayBackgroundColor) {
            var isScreenReaderEnabled = helpers_1.Constants.accessibility.isScreenReaderEnabled;
            var accessibilityProps = isScreenReaderEnabled
                ? { accessible: true, accessibilityLabel: accessibilityLabel, accessibilityRole: 'button' }
                : undefined;
            return (
            // @ts-ignore
            <view_1.default useSafeArea={isScreenReaderEnabled} style={!isScreenReaderEnabled && [styles.touchableOverlay, { backgroundColor: overlayBackgroundColor }]} testID={testID}>
          {/*
                  // @ts-ignore */}
          <react_native_1.TouchableWithoutFeedback {...accessibilityProps} onPress={onBackgroundPress}>
            <view_1.default style={isScreenReaderEnabled ? styles.accessibleOverlayView : styles.fill}/>
          </react_native_1.TouchableWithoutFeedback>
        </view_1.default>);
        }
    };
    Modal.prototype.render = function () {
        var _a = this.props, blurView = _a.blurView, enableModalBlur = _a.enableModalBlur, visible = _a.visible, useGestureHandlerRootView = _a.useGestureHandlerRootView, others = __rest(_a, ["blurView", "enableModalBlur", "visible", "useGestureHandlerRootView"]);
        var defaultContainer = enableModalBlur && helpers_1.Constants.isIOS && BlurView ? BlurView : view_1.default;
        var useGestureHandler = useGestureHandlerRootView && helpers_1.Constants.isAndroid;
        var GestureContainer = useGestureHandler ? react_native_gesture_handler_1.GestureHandlerRootView : react_1.default.Fragment;
        var gestureContainerProps = useGestureHandler ? { style: styles.fill } : {};
        var Container = blurView ? blurView : defaultContainer;
        return (<react_native_1.Modal visible={Boolean(visible)} {...others}>
        <GestureContainer {...gestureContainerProps}>
          <Container style={styles.fill} blurType="light">
            {this.renderTouchableOverlay()}
            {this.props.children}
          </Container>
        </GestureContainer>
      </react_native_1.Modal>);
    };
    Modal.displayName = 'Modal';
    return Modal;
}(react_1.Component));
var styles = react_native_1.StyleSheet.create({
    touchableOverlay: __assign({}, react_native_1.StyleSheet.absoluteFillObject),
    fill: {
        flex: 1
    },
    accessibleOverlayView: {
        height: 50,
        width: '100%'
    }
});
Modal.TopBar = TopBar_1.default;
exports.default = new_1.asBaseComponent(Modal);
