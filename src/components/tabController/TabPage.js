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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_reanimated_1 = __importDefault(require("react-native-reanimated"));
var lodash_1 = __importDefault(require("lodash"));
var TabBarContext_1 = __importDefault(require("./TabBarContext"));
var helpers_1 = require("../../helpers");
var Code = react_native_reanimated_1.default.Code, Value = react_native_reanimated_1.default.Value, cond = react_native_reanimated_1.default.cond, set = react_native_reanimated_1.default.set, and = react_native_reanimated_1.default.and, call = react_native_reanimated_1.default.call, block = react_native_reanimated_1.default.block, eq = react_native_reanimated_1.default.eq;
/**
 * @description: TabController's TabPage
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 */
var TabPage = /** @class */ (function (_super) {
    __extends(TabPage, _super);
    function TabPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loaded: !_this.props.lazy
        };
        _this._loaded = new Value(Number(!_this.props.lazy));
        _this._opacity = new Value(0);
        _this._zIndex = new Value(0);
        _this._pageStyle = [
            { opacity: _this._opacity },
            _this.context.asCarousel ? styles.carouselPage : styles.page,
            _this.context.asCarousel ? { width: _this.context.containerWidth } : undefined,
            { zIndex: _this._zIndex }
        ];
        _this.lazyLoad = function () {
            setTimeout(function () {
                _this.setState({
                    loaded: true
                });
            }, _this.props.lazyLoadTime); // tab bar indicator transition time
        };
        _this.renderCodeBlock = lodash_1.default.memoize(function () {
            var targetPage = _this.context.targetPage;
            var _a = _this.props, index = _a.index, lazy = _a.lazy;
            return (<Code>
        {function () {
                    return block([
                        cond(and(eq(targetPage, index), Number(lazy), eq(_this._loaded, 0)), [
                            set(_this._loaded, 1),
                            call([], _this.lazyLoad)
                        ]),
                        cond(eq(targetPage, index), [set(_this._opacity, 1), set(_this._zIndex, 1)], [set(_this._opacity, 0), set(_this._zIndex, 0)])
                    ]);
                }}
      </Code>);
        });
        return _this;
    }
    TabPage.prototype.render = function () {
        var _a = this.props, renderLoading = _a.renderLoading, testID = _a.testID;
        var loaded = this.state.loaded;
        return (<react_native_reanimated_1.default.View style={this._pageStyle} testID={testID}>
        {!loaded && (renderLoading === null || renderLoading === void 0 ? void 0 : renderLoading())}
        {loaded && this.props.children}
        {this.renderCodeBlock()}
      </react_native_reanimated_1.default.View>);
    };
    TabPage.displayName = 'TabController.TabPage';
    TabPage.contextType = TabBarContext_1.default;
    TabPage.defaultProps = {
        lazy: false,
        activeOpacity: 0.6,
        lazyLoadTime: 300,
        renderLoading: lodash_1.default.noop
    };
    return TabPage;
}(react_1.PureComponent));
exports.default = TabPage;
var styles = react_native_1.StyleSheet.create({
    page: __assign({}, react_native_1.StyleSheet.absoluteFillObject),
    carouselPage: {
        width: helpers_1.Constants.screenWidth,
        flex: 1,
        opacity: 1
    }
});
