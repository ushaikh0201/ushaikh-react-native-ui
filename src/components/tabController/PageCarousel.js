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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var lodash_1 = __importDefault(require("lodash"));
var TabBarContext_1 = __importDefault(require("./TabBarContext"));
var react_native_reanimated_1 = __importDefault(require("react-native-reanimated"));
var helpers_1 = require("../../helpers");
var Code = react_native_reanimated_1.default.Code, block = react_native_reanimated_1.default.block, call = react_native_reanimated_1.default.call;
/**
 * @description: TabController's Page Carousel
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: You must pass `asCarousel` flag to TabController and render your TabPages inside a PageCarousel
 */
var PageCarousel = /** @class */ (function (_super) {
    __extends(PageCarousel, _super);
    function PageCarousel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.carousel = react_1.default.createRef();
        _this.onScroll = react_native_reanimated_1.default.event([{ nativeEvent: { contentOffset: { x: _this.context.carouselOffset } } }], {
            useNativeDriver: true
        });
        _this.onTabChange = function (_a) {
            var index = _a[0];
            _this.scrollToPage(index);
        };
        _this.scrollToPage = function (pageIndex) {
            var _a, _b;
            var pageWidth = _this.context.pageWidth;
            var node = (_b = (_a = _this.carousel.current) === null || _a === void 0 ? void 0 : _a.getNode) === null || _b === void 0 ? void 0 : _b.call(_a);
            if (node) {
                node.scrollTo({ x: pageIndex * pageWidth, animated: false });
            }
        };
        _this.renderCodeBlock = lodash_1.default.memoize(function () {
            var _a = _this.context, targetPage = _a.targetPage, containerWidth = _a.containerWidth;
            return (<Code>
        {function () {
                    return block([
                        react_native_reanimated_1.default.onChange(targetPage, [call([targetPage], _this.onTabChange)]),
                        react_native_reanimated_1.default.onChange(containerWidth, [call([targetPage], _this.onTabChange)])
                    ]);
                }}
      </Code>);
        });
        return _this;
    }
    PageCarousel.prototype.componentDidMount = function () {
        var _this = this;
        if (helpers_1.Constants.isAndroid) {
            setTimeout(function () {
                _this.scrollToPage(_this.context.selectedIndex);
            }, 0);
        }
    };
    PageCarousel.prototype.render = function () {
        var _a = this.context, selectedIndex = _a.selectedIndex, pageWidth = _a.pageWidth;
        return (<>
        <react_native_reanimated_1.default.ScrollView {...this.props} ref={this.carousel} horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={this.onScroll} scrollEventThrottle={16} contentOffset={{ x: selectedIndex * pageWidth, y: 0 }} // iOS only
        />

        {this.renderCodeBlock()}
      </>);
    };
    PageCarousel.displayName = 'TabController.PageCarousel';
    PageCarousel.contextType = TabBarContext_1.default;
    return PageCarousel;
}(react_1.PureComponent));
exports.default = PageCarousel;
