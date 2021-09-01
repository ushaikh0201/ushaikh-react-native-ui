"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConstants = exports.orientations = void 0;
var react_native_1 = require("react-native");
var orientations;
(function (orientations) {
    orientations["PORTRAIT"] = "portrait";
    orientations["LANDSCAPE"] = "landscape";
})(orientations = exports.orientations || (exports.orientations = {}));
var isAndroid = react_native_1.Platform.OS === 'android';
var isIOS = react_native_1.Platform.OS === 'ios';
var isTablet;
var statusBarHeight;
var screenHeight = react_native_1.Dimensions.get('screen').height;
var screenWidth = react_native_1.Dimensions.get('screen').width;
var windowHeight = react_native_1.Dimensions.get('window').height;
var windowWidth = react_native_1.Dimensions.get('window').width;
//@ts-ignore
isTablet = react_native_1.Platform.isPad || (getAspectRatio() < 1.6 && Math.max(screenWidth, screenHeight) >= 900);
function setStatusBarHeight() {
    var StatusBarManager = react_native_1.NativeModules.StatusBarManager;
    statusBarHeight = (StatusBarManager === null || StatusBarManager === void 0 ? void 0 : StatusBarManager.HEIGHT) || 0; // So there will be a value for any case
    // statusBarHeight = isIOS ? 20 : StatusBarManager.HEIGHT;
    // if (isIOS) {
    //   // override guesstimate height with the actual height from StatusBarManager
    //   StatusBarManager.getHeight((data: any) => (statusBarHeight = data.height));
    // }
}
function getAspectRatio() {
    return screenWidth < screenHeight ? screenHeight / screenWidth : screenWidth / screenHeight;
}
function getOrientation(height, width) {
    return width < height ? orientations.PORTRAIT : orientations.LANDSCAPE;
}
function updateConstants(dimensions) {
    screenHeight = dimensions.screen.height;
    screenWidth = dimensions.screen.width;
    windowWidth = dimensions.window.width;
    windowHeight = dimensions.window.height;
    setStatusBarHeight();
}
exports.updateConstants = updateConstants;
var accessibility = {
    isScreenReaderEnabled: false
};
function handleScreenReaderChanged(isScreenReaderEnabled) {
    accessibility.isScreenReaderEnabled = isScreenReaderEnabled;
}
react_native_1.AccessibilityInfo.addEventListener('screenReaderChanged', handleScreenReaderChanged);
function setAccessibility() {
    react_native_1.AccessibilityInfo.isScreenReaderEnabled().then(function (isScreenReaderEnabled) {
        accessibility.isScreenReaderEnabled = isScreenReaderEnabled;
    });
}
setAccessibility();
var constants = {
    /* Platform */
    orientations: orientations,
    isAndroid: isAndroid,
    isIOS: isIOS,
    getAndroidVersion: function () {
        return isAndroid ? parseInt(react_native_1.Platform.Version, 10) : undefined;
    },
    /* Navigation */
    get statusBarHeight() {
        return statusBarHeight;
    },
    /* Layout */
    isRTL: react_native_1.I18nManager.isRTL,
    get orientation() {
        return getOrientation(screenHeight, screenWidth);
    },
    get isLandscape() {
        return getOrientation(screenHeight, screenWidth) === orientations.LANDSCAPE;
    },
    get screenWidth() {
        return screenWidth;
    },
    get screenHeight() {
        return screenHeight;
    },
    get windowWidth() {
        return windowWidth;
    },
    get windowHeight() {
        return windowHeight;
    },
    get isSmallScreen() {
        return screenWidth <= 340;
    },
    get isShortScreen() {
        return screenHeight <= 600;
    },
    get screenAspectRatio() {
        return getAspectRatio();
    },
    get isTablet() {
        return isTablet;
    },
    set isTablet(value) {
        isTablet = value;
    },
    getSafeAreaInsets: function () {
        var orientation = getOrientation(screenHeight, screenWidth);
        return orientation === orientations.LANDSCAPE
            ? { left: 44, right: 44, bottom: 24, top: 0 }
            : { left: 0, right: 0, bottom: 34, top: 44 };
    },
    /* Devices */
    get isIphoneX() {
        return isIOS &&
            //@ts-ignore
            !react_native_1.Platform.isPad &&
            //@ts-ignore
            !react_native_1.Platform.isTVOS &&
            (screenHeight >= 812 || screenWidth >= 812);
    },
    /* Orientation */
    addDimensionsEventListener: function (callback) {
        react_native_1.Dimensions.addEventListener('change', callback);
    },
    /* Dimensions */
    removeDimensionsEventListener: function (callback) {
        react_native_1.Dimensions.removeEventListener('change', callback);
    },
    /* Accessibility */
    get accessibility() {
        return accessibility;
    },
    /* Keyboard */
    backspaceKey: 'Backspace',
    enterKey: 'Enter'
};
setStatusBarHeight();
react_native_1.Dimensions.addEventListener('change', updateConstants);
exports.default = constants;
