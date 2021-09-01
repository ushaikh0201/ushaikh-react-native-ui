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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: support commented props
var react_1 = __importStar(require("react"));
var lodash_1 = __importDefault(require("lodash"));
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_redash_1 = require("react-native-redash");
var helpers_1 = require("../../helpers");
var new_1 = require("../../commons/new");
var TabBarContext_1 = __importDefault(require("./TabBarContext"));
var TabBar_1 = __importDefault(require("./TabBar"));
var TabBarItem_1 = __importDefault(require("./TabBarItem"));
var TabPage_1 = __importDefault(require("./TabPage"));
var PageCarousel_1 = __importDefault(require("./PageCarousel"));
var and = react_native_reanimated_1.default.and, abs = react_native_reanimated_1.default.abs, cond = react_native_reanimated_1.default.cond, call = react_native_reanimated_1.default.call, Code = react_native_reanimated_1.default.Code, Clock = react_native_reanimated_1.default.Clock, clockRunning = react_native_reanimated_1.default.clockRunning, diff = react_native_reanimated_1.default.diff, eq = react_native_reanimated_1.default.eq, floor = react_native_reanimated_1.default.floor, greaterThan = react_native_reanimated_1.default.greaterThan, lessThan = react_native_reanimated_1.default.lessThan, neq = react_native_reanimated_1.default.neq, not = react_native_reanimated_1.default.not, set = react_native_reanimated_1.default.set, Value = react_native_reanimated_1.default.Value, block = react_native_reanimated_1.default.block, onChange = react_native_reanimated_1.default.onChange, _interpolate = react_native_reanimated_1.default.interpolate, interpolateNode = react_native_reanimated_1.default.interpolateNode, round = react_native_reanimated_1.default.round, multiply = react_native_reanimated_1.default.multiply;
var Easing = react_native_reanimated_1.EasingNode || react_native_reanimated_1.Easing;
var interpolate = interpolateNode || _interpolate;
/**
 * @description: A performant solution for a tab controller with lazy load mechanism
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: This component is based on react-native-gesture-handler
 * @important: On Android, if using react-native-navigation, make sure to wrap your screen with gestureHandlerRootHOC
 * @importantLink: https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html#with-wix-react-native-navigation-https-githubcom-wix-react-native-navigation
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/TabController/Default.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/TabController/PageCarousel.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/TabController/CenterSelected.gif?raw=true
 */
var TabController = /** @class */ (function (_super) {
    __extends(TabController, _super);
    function TabController(props) {
        var _this = _super.call(this, props) || this;
        _this.registerTabItems = function (tabItemsCount, ignoredItems) {
            var itemStates = lodash_1.default.times(tabItemsCount, function () { return new Value(react_native_gesture_handler_1.State.UNDETERMINED); });
            _this.setState({ itemStates: itemStates, ignoredItems: ignoredItems });
        };
        _this.onPageChange = function (_a) {
            var _b, _c;
            var index = _a[0];
            (_c = (_b = _this.props).onChangeIndex) === null || _c === void 0 ? void 0 : _c.call(_b, index);
        };
        _this.renderCodeBlock = lodash_1.default.memoize(function () {
            var _a = _this.state, itemStates = _a.itemStates, ignoredItems = _a.ignoredItems, currentPage = _a.currentPage, targetPage = _a.targetPage, carouselOffset = _a.carouselOffset, containerWidth = _a.containerWidth;
            var selectedIndex = _this.props.selectedIndex;
            var clock = new Clock();
            var fromPage = new Value(selectedIndex);
            var toPage = new Value(selectedIndex);
            var isAnimating = new Value(0);
            var isScrolling = new Value(0);
            // temps
            var _carouselOffsetDiff = new Value(0);
            return (<Code>
        {function () {
                    return block(__spreadArray(__spreadArray([], lodash_1.default.map(itemStates, function (state, index) {
                        var ignoredItem = lodash_1.default.includes(ignoredItems, index);
                        return [
                            onChange(state, 
                            // @ts-ignore TODO: typescript?
                            cond(and(eq(state, react_native_gesture_handler_1.State.END), !ignoredItem), [
                                set(fromPage, toPage),
                                set(toPage, index),
                                set(targetPage, index)
                            ]))
                        ];
                    })), [
                        // Animate currentPage to its target
                        cond(neq(currentPage, toPage), [
                            set(isAnimating, 1),
                            set(currentPage, 
                            // @ts-ignore reanimated2
                            react_native_redash_1.timing({ clock: clock, from: fromPage, to: toPage, duration: 280, easing: Easing.bezier(0.34, 1.3, 0.64, 1) }))
                        ]),
                        // Set isAnimating flag off
                        cond(and(eq(isAnimating, 1), not(clockRunning(clock))), set(isAnimating, 0)),
                        /* Page change by Carousel scroll */
                        onChange(carouselOffset, [
                            set(_carouselOffsetDiff, round(abs(diff(carouselOffset)))),
                            set(isScrolling, and(lessThan(_carouselOffsetDiff, round(containerWidth)), greaterThan(_carouselOffsetDiff, 0))),
                            cond(not(isAnimating), [
                                set(currentPage, interpolate(round(carouselOffset), {
                                    inputRange: itemStates.map(function (_v, i) { return round(multiply(i, containerWidth)); }),
                                    outputRange: itemStates.map(function (_v, i) { return i; })
                                })),
                                set(toPage, currentPage)
                            ])
                        ]),
                        // Update/Sync target page when scrolling is done
                        cond(and(eq(isScrolling, 1), eq(floor(abs(diff(carouselOffset))), 0)), [
                            set(isScrolling, 0),
                            cond(not(react_native_redash_1.between(react_native_redash_1.fract(currentPage), 0.1, 0.9, true)), set(targetPage, round(currentPage)))
                        ]),
                        /* Invoke index change */
                        onChange(targetPage, call([targetPage], _this.onPageChange))
                    ]));
                }}
      </Code>);
        });
        var itemStates = []; // TODO: typescript?
        var ignoredItems = []; // TODO: typescript?
        if (props.items) {
            var itemsCount = lodash_1.default.chain(props.items)
                .filter(function (item) { return !item.ignore; })
                .size()
                .value();
            itemStates = lodash_1.default.times(itemsCount, function () { return new Value(react_native_gesture_handler_1.State.UNDETERMINED); });
            ignoredItems = lodash_1.default.filter(props.items, function (item) { return item.ignore; });
        }
        _this.state = {
            selectedIndex: _this.props.selectedIndex,
            asCarousel: _this.props.asCarousel,
            pageWidth: _this.pageWidth,
            // items
            items: props.items,
            itemStates: itemStates,
            ignoredItems: ignoredItems,
            // animated values
            targetPage: new Value(_this.props.selectedIndex),
            currentPage: new Value(_this.props.selectedIndex),
            carouselOffset: new Value(_this.props.selectedIndex * Math.round(_this.pageWidth)),
            containerWidth: new Value(_this.pageWidth),
            // callbacks
            registerTabItems: _this.registerTabItems,
            onChangeIndex: _this.props.onChangeIndex
        };
        return _this;
    }
    TabController.getDerivedStateFromProps = function (nextProps, prevState) {
        if (!lodash_1.default.isUndefined(nextProps.carouselPageWidth) && nextProps.carouselPageWidth !== prevState.pageWidth) {
            return {
                pageWidth: nextProps.carouselPageWidth
            };
        }
        return null;
    };
    TabController.prototype.componentDidUpdate = function (_prevProps, prevState) {
        if (prevState.pageWidth !== this.state.pageWidth) {
            this.state.containerWidth.setValue(this.state.pageWidth);
        }
    };
    Object.defineProperty(TabController.prototype, "pageWidth", {
        get: function () {
            return this.props.carouselPageWidth || helpers_1.Constants.screenWidth;
        },
        enumerable: false,
        configurable: true
    });
    TabController.prototype.render = function () {
        var itemStates = this.state.itemStates;
        return (<TabBarContext_1.default.Provider value={this.state}>
        {this.props.children}
        {!lodash_1.default.isEmpty(itemStates) && this.renderCodeBlock()}
      </TabBarContext_1.default.Provider>);
    };
    TabController.displayName = 'TabController';
    TabController.contextType = TabBarContext_1.default;
    TabController.defaultProps = {
        selectedIndex: 0,
        activeOpacity: 0.2
    };
    return TabController;
}(react_1.Component));
TabController.TabBar = TabBar_1.default;
TabController.TabBarItem = TabBarItem_1.default;
TabController.TabPage = TabPage_1.default;
TabController.PageCarousel = PageCarousel_1.default;
exports.default = new_1.asBaseComponent(TabController);
