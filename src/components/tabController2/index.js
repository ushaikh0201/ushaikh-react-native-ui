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
// TODO: support commented props
var react_1 = __importStar(require("react"));
var lodash_1 = __importDefault(require("lodash"));
var react_native_reanimated_1 = require("react-native-reanimated");
var helpers_1 = require("../../helpers");
var new_1 = require("../../commons/new");
var services_1 = require("../../services");
var TabBarContext_1 = __importDefault(require("./TabBarContext"));
var TabBar_1 = __importDefault(require("./TabBar"));
var TabBarItem_1 = __importDefault(require("./TabBarItem"));
var TabPage_1 = __importDefault(require("./TabPage"));
var PageCarousel_1 = __importDefault(require("./PageCarousel"));
/**
 * @description: A performant solution for a tab controller with lazy load mechanism
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: This component is based on react-native-gesture-handler
 * @important: On Android, if using react-native-navigation, make sure to wrap your screen with gestureHandlerRootHOC
 * @importantLink: https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html#with-wix-react-native-navigation-https-githubcom-wix-react-native-navigation
 */
function TabController(_a) {
    var _b = _a.initialIndex, initialIndex = _b === void 0 ? 0 : _b, selectedIndex = _a.selectedIndex, _c = _a.asCarousel, asCarousel = _c === void 0 ? false : _c, items = _a.items, _d = _a.onChangeIndex, onChangeIndex = _d === void 0 ? lodash_1.default.noop : _d, carouselPageWidth = _a.carouselPageWidth, children = _a.children;
    var pageWidth = react_1.useMemo(function () {
        return carouselPageWidth || helpers_1.Constants.screenWidth;
    }, [carouselPageWidth]);
    var ignoredItems = react_1.useMemo(function () {
        return lodash_1.default.filter(items, function (item) { return item.ignore; });
    }, [items]);
    /* backwards compatibility for `selectedIndex` prop. this line eventually should be removed */
    initialIndex = selectedIndex || initialIndex;
    /* currentPage - static page index */
    var currentPage = react_native_reanimated_1.useSharedValue(initialIndex);
    /* targetPage - transitioned page index (can be a fraction when transitioning between pages) */
    var targetPage = react_native_reanimated_1.useSharedValue(initialIndex);
    var carouselOffset = react_native_reanimated_1.useSharedValue(initialIndex * Math.round(pageWidth));
    var containerWidth = react_native_reanimated_1.useSharedValue(pageWidth);
    react_1.useEffect(function () {
        if (!lodash_1.default.isUndefined(selectedIndex)) {
            services_1.LogService.deprecationWarn({ component: 'TabController2', oldProp: 'selectedIndex', newProp: 'initialIndex' });
        }
    }, [selectedIndex]);
    react_1.useEffect(function () {
        currentPage.value = initialIndex;
    }, [initialIndex]);
    react_native_reanimated_1.useAnimatedReaction(function () {
        return currentPage.value;
    }, function (value, prevValue) {
        if (value !== prevValue) {
            targetPage.value = react_native_reanimated_1.withTiming(value);
            prevValue !== null && react_native_reanimated_1.runOnJS(onChangeIndex)(value, prevValue);
        }
    });
    var context = react_1.useMemo(function () {
        return {
            /* Pass Props */
            initialIndex: initialIndex,
            asCarousel: asCarousel,
            pageWidth: pageWidth,
            /* Items */
            items: items,
            ignoredItems: ignoredItems,
            /* Animated Values */
            targetPage: targetPage,
            currentPage: currentPage,
            carouselOffset: carouselOffset,
            containerWidth: containerWidth,
            /* Callbacks */
            onChangeIndex: onChangeIndex
        };
    }, [/* initialIndex,*/ initialIndex, asCarousel, items, onChangeIndex]);
    return <TabBarContext_1.default.Provider value={context}>{children}</TabBarContext_1.default.Provider>;
}
TabController.TabBar = TabBar_1.default;
TabController.TabBarItem = TabBarItem_1.default;
TabController.TabPage = TabPage_1.default;
TabController.PageCarousel = PageCarousel_1.default;
exports.default = new_1.asBaseComponent(TabController);
