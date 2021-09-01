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
var TabBarContext_1 = __importDefault(require("./TabBarContext"));
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var helpers_1 = require("helpers");
/**
 * @description: TabController's Page Carousel
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: You must pass `asCarousel` flag to TabController and render your TabPages inside a PageCarousel
 */
function PageCarousel(_a) {
    var props = __rest(_a, []);
    var carousel = react_native_reanimated_1.useAnimatedRef();
    var _b = react_1.useContext(TabBarContext_1.default), currentPage = _b.currentPage, targetPage = _b.targetPage, _c = _b.selectedIndex, selectedIndex = _c === void 0 ? 0 : _c, _d = _b.pageWidth, pageWidth = _d === void 0 ? helpers_1.Constants.screenWidth : _d, carouselOffset = _b.carouselOffset;
    var contentOffset = react_1.useMemo(function () { return ({ x: selectedIndex * pageWidth, y: 0 }); }, [selectedIndex, pageWidth]);
    var wasScrolledByPress = react_native_reanimated_1.useSharedValue(false);
    var scrollHandler = react_native_reanimated_1.useAnimatedScrollHandler({
        onScroll: function (e) {
            carouselOffset.value = e.contentOffset.x;
            var newIndex = e.contentOffset.x / pageWidth;
            if (wasScrolledByPress.value) {
                /* Round is for android when offset value has fraction */
                targetPage.value = react_native_reanimated_1.withTiming(Math.round(newIndex));
                wasScrolledByPress.value = false;
            }
            else {
                targetPage.value = newIndex;
            }
        },
        onMomentumEnd: function (e) {
            var newPage = Math.round(e.contentOffset.x / pageWidth);
            currentPage.value = newPage;
        }
    });
    var scrollToItem = react_1.useCallback(function (index) {
        var _a;
        wasScrolledByPress.value = true;
        // @ts-expect-error
        (_a = carousel.current) === null || _a === void 0 ? void 0 : _a.scrollTo({ x: index * pageWidth, animated: false });
    }, [pageWidth]);
    react_native_reanimated_1.useAnimatedReaction(function () {
        return currentPage.value;
    }, function (currIndex, prevIndex) {
        if (currIndex !== prevIndex) {
            react_native_reanimated_1.runOnJS(scrollToItem)(currIndex);
        }
    });
    return (<react_native_reanimated_1.default.ScrollView {...props} ref={carousel} horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={scrollHandler} scrollEventThrottle={16} contentOffset={contentOffset} // iOS only
    />);
}
exports.default = PageCarousel;
