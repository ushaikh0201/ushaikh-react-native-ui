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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var KeyboardTrackingView_1 = __importDefault(require("../KeyboardTracking/KeyboardTrackingView"));
var CustomKeyboardView_1 = __importDefault(require("./CustomKeyboardView"));
var KeyboardUtils_1 = __importDefault(require("./utils/KeyboardUtils"));
var IsIOS = react_native_1.Platform.OS === 'ios';
var IsAndroid = react_native_1.Platform.OS === 'android';
var IOS_SCROLL_BEHAVIORS = IsIOS
    ? {
        NONE: react_native_1.NativeModules.KeyboardTrackingViewTempManager.KeyboardTrackingScrollBehaviorNone,
        SCROLL_TO_BOTTOM_INVERTED_ONLY: react_native_1.NativeModules.KeyboardTrackingViewTempManager.KeyboardTrackingScrollBehaviorScrollToBottomInvertedOnly,
        FIXED_OFFSET: react_native_1.NativeModules.KeyboardTrackingViewTempManager.KeyboardTrackingScrollBehaviorFixedOffset
    }
    : {};
/**
 * @description: View that allows replacing the default keyboard with other components
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/nativeComponentScreens/keyboardInput/KeyboardInputViewScreen.js
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/KeyboardAccessoryView/KeyboardAccessoryView.gif?raw=true
 */
var KeyboardAccessoryView = /** @class */ (function (_super) {
    __extends(KeyboardAccessoryView, _super);
    function KeyboardAccessoryView(props) {
        var _this = _super.call(this, props) || this;
        _this.onContainerComponentHeightChanged = _this.onContainerComponentHeightChanged.bind(_this);
        _this.processInitialProps = _this.processInitialProps.bind(_this);
        _this.registerForKeyboardResignedEvent = _this.registerForKeyboardResignedEvent.bind(_this);
        _this.registerAndroidBackHandler = _this.registerAndroidBackHandler.bind(_this);
        _this.onAndroidBackPressed = _this.onAndroidBackPressed.bind(_this);
        _this.registerForKeyboardResignedEvent();
        _this.registerAndroidBackHandler();
        return _this;
    }
    KeyboardAccessoryView.prototype.componentWillUnmount = function () {
        if (this.customInputControllerEventsSubscriber) {
            this.customInputControllerEventsSubscriber.remove();
        }
        if (IsAndroid) {
            react_native_1.BackHandler.removeEventListener('hardwareBackPress', this.onAndroidBackPressed);
        }
    };
    KeyboardAccessoryView.prototype.onContainerComponentHeightChanged = function (event) {
        var onHeightChanged = this.props.onHeightChanged;
        if (onHeightChanged) {
            onHeightChanged(event.nativeEvent.layout.height);
        }
    };
    KeyboardAccessoryView.prototype.onAndroidBackPressed = function () {
        var kbComponent = this.props.kbComponent;
        if (kbComponent) {
            KeyboardUtils_1.default.dismiss();
            return true;
        }
        return false;
    };
    KeyboardAccessoryView.prototype.getIOSTrackingScrollBehavior = function () {
        var iOSScrollBehavior = this.props.iOSScrollBehavior;
        var scrollBehavior = iOSScrollBehavior;
        if (IsIOS && scrollBehavior === -1) {
            scrollBehavior = KeyboardAccessoryView.iosScrollBehaviors.FIXED_OFFSET;
        }
        return scrollBehavior;
    };
    KeyboardAccessoryView.prototype.getNativeProps = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.trackingViewRef) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.trackingViewRef.getNativeProps()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, {}];
                }
            });
        });
    };
    KeyboardAccessoryView.prototype.registerForKeyboardResignedEvent = function () {
        var onKeyboardResigned = this.props.onKeyboardResigned;
        var eventEmitter = null;
        if (IsIOS) {
            if (react_native_1.NativeModules.CustomInputControllerTemp) {
                eventEmitter = new react_native_1.NativeEventEmitter(react_native_1.NativeModules.CustomInputControllerTemp);
            }
        }
        else {
            eventEmitter = react_native_1.DeviceEventEmitter;
        }
        if (eventEmitter !== null) {
            this.customInputControllerEventsSubscriber = eventEmitter.addListener('kbdResigned', function () {
                if (onKeyboardResigned) {
                    onKeyboardResigned();
                }
            });
        }
    };
    KeyboardAccessoryView.prototype.registerAndroidBackHandler = function () {
        if (IsAndroid) {
            react_native_1.BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPressed);
        }
    };
    KeyboardAccessoryView.prototype.processInitialProps = function () {
        var kbInitialProps = this.props.kbInitialProps;
        if (IsIOS && kbInitialProps && kbInitialProps.backgroundColor) {
            var processedProps = Object.assign({}, kbInitialProps);
            processedProps.backgroundColor = react_native_1.processColor(processedProps.backgroundColor);
            return processedProps;
        }
        return kbInitialProps;
    };
    KeyboardAccessoryView.prototype.scrollToStart = function () {
        if (this.trackingViewRef) {
            this.trackingViewRef.scrollToStart();
        }
    };
    KeyboardAccessoryView.prototype.render = function () {
        var _this = this;
        var _a = this.props, revealKeyboardInteractive = _a.revealKeyboardInteractive, manageScrollView = _a.manageScrollView, requiresSameParentToManageScrollView = _a.requiresSameParentToManageScrollView, addBottomView = _a.addBottomView, allowHitsOutsideBounds = _a.allowHitsOutsideBounds, renderContent = _a.renderContent, kbInputRef = _a.kbInputRef, kbComponent = _a.kbComponent, onItemSelected = _a.onItemSelected, onRequestShowKeyboard = _a.onRequestShowKeyboard, useSafeArea = _a.useSafeArea;
        return (<KeyboardTrackingView_1.default ref={function (r) { return (_this.trackingViewRef = r); }} style={styles.trackingToolbarContainer} 
        // @ts-ignore
        onLayout={this.onContainerComponentHeightChanged} scrollBehavior={this.getIOSTrackingScrollBehavior()} revealKeyboardInteractive={revealKeyboardInteractive} manageScrollView={manageScrollView} requiresSameParentToManageScrollView={requiresSameParentToManageScrollView} addBottomView={addBottomView} allowHitsOutsideBounds={allowHitsOutsideBounds}>
        <>
          {renderContent === null || renderContent === void 0 ? void 0 : renderContent()}
        </>
        <CustomKeyboardView_1.default inputRef={kbInputRef} component={kbComponent} initialProps={this.processInitialProps()} onItemSelected={onItemSelected} onRequestShowKeyboard={onRequestShowKeyboard} useSafeArea={useSafeArea}/>
      </KeyboardTrackingView_1.default>);
    };
    KeyboardAccessoryView.iosScrollBehaviors = IOS_SCROLL_BEHAVIORS;
    KeyboardAccessoryView.defaultProps = {
        iOSScrollBehavior: -1,
        revealKeyboardInteractive: false,
        manageScrollView: true,
        requiresSameParentToManageScrollView: false,
        addBottomView: false,
        allowHitsOutsideBounds: false
    };
    return KeyboardAccessoryView;
}(react_1.Component));
var styles = react_native_1.StyleSheet.create({
    trackingToolbarContainer: __assign({}, react_native_1.Platform.select({
        ios: __assign(__assign({}, react_native_1.StyleSheet.absoluteFillObject), { top: undefined })
    }))
});
exports.default = KeyboardAccessoryView;
