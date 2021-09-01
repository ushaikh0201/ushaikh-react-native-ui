"use strict";
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
// TODO: use this component inside ScrollBar
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var style_1 = require("../../style");
var helpers_1 = require("../../helpers");
var view_1 = __importDefault(require("../view"));
var image_1 = __importDefault(require("../image"));
var AnimatedImage = react_native_1.Animated.createAnimatedComponent(image_1.default);
var ScrollBarGradient = function (_a) {
    var visible = _a.visible, left = _a.left, _b = _a.gradientWidth, gradientWidth = _b === void 0 ? 76 : _b, gradientHeight = _a.gradientHeight, _c = _a.gradientMargins, gradientMargins = _c === void 0 ? 0 : _c, height = _a.height, _d = _a.gradientColor, gradientColor = _d === void 0 ? style_1.Colors.white : _d, _e = _a.gradientImage, gradientImage = _e === void 0 ? require('./assets/gradientOverlay.png') : _e;
    var gradientOpacity = react_1.useRef(new react_native_1.Animated.Value(0)).current;
    react_1.useEffect(function () {
        react_native_1.Animated.timing(gradientOpacity, {
            toValue: Number(!!visible),
            duration: 100,
            useNativeDriver: true
        }).start();
    }, [visible]);
    var imageTransform = react_1.useMemo(function () {
        return helpers_1.Constants.isRTL ? (left ? undefined : [{ scaleX: -1 }]) : left ? [{ scaleX: -1 }] : undefined;
    }, [left]);
    var heightToUse = gradientHeight || height || '100%';
    return (<view_1.default animated pointerEvents="none" style={{
            opacity: gradientOpacity,
            width: gradientWidth,
            height: heightToUse,
            position: 'absolute',
            right: !left ? gradientMargins : undefined,
            left: left ? gradientMargins : undefined
        }}>
      <AnimatedImage source={gradientImage} style={{
            width: gradientWidth,
            height: heightToUse,
            tintColor: gradientColor,
            transform: imageTransform
        }} resizeMode={'stretch'}/>
    </view_1.default>);
};
ScrollBarGradient.displayName = 'IGNORE';
exports.default = ScrollBarGradient;
