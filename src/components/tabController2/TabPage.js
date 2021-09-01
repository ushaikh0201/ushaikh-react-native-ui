"use strict";
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
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var TabBarContext_1 = __importDefault(require("./TabBarContext"));
var helpers_1 = require("helpers");
/**
 * @description: TabController's TabPage
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 */
function TabPage(_a) {
    var testID = _a.testID, index = _a.index, lazy = _a.lazy, renderLoading = _a.renderLoading, props = __rest(_a, ["testID", "index", "lazy", "renderLoading"]);
    var _b = react_1.useContext(TabBarContext_1.default), currentPage = _b.currentPage, targetPage = _b.targetPage, asCarousel = _b.asCarousel, containerWidth = _b.containerWidth;
    var _c = react_1.useState(!lazy), shouldLoad = _c[0], setLoaded = _c[1];
    var lazyLoad = react_1.useCallback(function () {
        if (lazy && !shouldLoad) {
            setLoaded(true);
        }
    }, [lazy, shouldLoad]);
    react_native_reanimated_1.useAnimatedReaction(function () {
        return targetPage.value === index;
    }, function (isActive) {
        if (isActive) {
            react_native_reanimated_1.runOnJS(lazyLoad)();
        }
    });
    var animatedPageStyle = react_native_reanimated_1.useAnimatedStyle(function () {
        var isActive = Math.round(currentPage.value) === index;
        return {
            opacity: isActive || asCarousel ? 1 : 0,
            zIndex: isActive || asCarousel ? 1 : 0,
            width: asCarousel ? containerWidth.value || helpers_1.Constants.screenWidth : undefined
        };
    });
    return (<react_native_reanimated_1.default.View style={[!asCarousel && styles.page, animatedPageStyle]} testID={testID}>
      {!shouldLoad && (renderLoading === null || renderLoading === void 0 ? void 0 : renderLoading())}
      {shouldLoad && props.children}
    </react_native_reanimated_1.default.View>);
}
exports.default = TabPage;
var styles = react_native_1.StyleSheet.create({
    page: __assign({}, react_native_1.StyleSheet.absoluteFillObject)
});
