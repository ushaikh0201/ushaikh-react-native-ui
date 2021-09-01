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
var react_1 = __importStar(require("react"));
var view_1 = __importDefault(require("../view"));
var react_native_1 = require("react-native");
var OverlayFadingBackground = function (_a) {
    var testID = _a.testID, dialogVisibility = _a.dialogVisibility, modalVisibility = _a.modalVisibility, overlayBackgroundColor = _a.overlayBackgroundColor, propsOnFadeDone = _a.onFadeDone, fadeOut = _a.fadeOut;
    var fadeAnimation = react_1.useRef(new react_native_1.Animated.Value(0)).current;
    var isAnimating = react_1.useRef(false);
    var onFadeDone = react_1.useCallback(function () {
        isAnimating.current = false;
        propsOnFadeDone === null || propsOnFadeDone === void 0 ? void 0 : propsOnFadeDone();
    }, [propsOnFadeDone]);
    var animateFading = react_1.useCallback(function (toValue) {
        isAnimating.current = true;
        react_native_1.Animated.timing(fadeAnimation, {
            toValue: toValue,
            duration: 400,
            useNativeDriver: true
        }).start(onFadeDone);
    }, [fadeAnimation, onFadeDone]);
    react_1.useEffect(function () {
        if (!isAnimating.current && (!dialogVisibility || fadeOut)) {
            animateFading(0);
        }
    }, [dialogVisibility, animateFading, fadeOut]);
    react_1.useEffect(function () {
        if (modalVisibility) {
            animateFading(1);
        }
    }, [modalVisibility, animateFading]);
    var style = react_1.useMemo(function () {
        return {
            opacity: fadeAnimation,
            backgroundColor: overlayBackgroundColor
        };
    }, [overlayBackgroundColor, fadeAnimation]);
    return <view_1.default testID={testID} absF animated style={style} pointerEvents="none"/>;
};
OverlayFadingBackground.displayName = 'IGNORE';
exports.default = OverlayFadingBackground;
