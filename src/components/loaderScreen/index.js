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
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var style_1 = require("../../style");
var helpers_1 = require("../../helpers");
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../../components/view"));
var text_1 = __importDefault(require("../../components/text"));
var LoaderScreen = /** @class */ (function (_super) {
    __extends(LoaderScreen, _super);
    function LoaderScreen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoaderScreen.prototype.render = function () {
        var _a = this.props, message = _a.message, messageStyle = _a.messageStyle, loaderColor = _a.loaderColor, overlay = _a.overlay, backgroundColor = _a.backgroundColor, customLoader = _a.customLoader, containerStyle = _a.containerStyle, others = __rest(_a, ["message", "messageStyle", "loaderColor", "overlay", "backgroundColor", "customLoader", "containerStyle"]);
        return (<view_1.default style={[overlay ? [styles.overlayContainer, { backgroundColor: backgroundColor }] : styles.container, containerStyle]}>
        <view_1.default flex center>
          {customLoader || (<react_native_1.ActivityIndicator size={'large'} animating color={loaderColor || (helpers_1.Constants.isIOS ? style_1.Colors.dark60 : style_1.Colors.primary)} {...others}/>)}
          {message && <text_1.default style={[styles.message, messageStyle]}>{message}</text_1.default>}
        </view_1.default>
      </view_1.default>);
    };
    LoaderScreen.displayName = 'LoaderScreen';
    return LoaderScreen;
}(react_1.Component));
exports.default = new_1.asBaseComponent(LoaderScreen);
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    },
    overlayContainer: __assign(__assign({}, react_native_1.StyleSheet.absoluteFillObject), { backgroundColor: style_1.Colors.rgba(style_1.Colors.white, 0.85), zIndex: 100 }),
    message: __assign(__assign({}, style_1.Typography.text70), { marginTop: 18, color: style_1.Colors.dark10 })
});
