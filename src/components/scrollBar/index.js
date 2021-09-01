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
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var helpers_1 = require("../../helpers");
var style_1 = require("../../style");
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../view"));
var image_1 = __importDefault(require("../image"));
var GRADIENT_WIDTH = 76;
var defaultImage = function () { return require('./assets/gradientOverlay.png'); };
/**
 * @description: Scrollable container with animated gradient overlay for horizontal scroll
 * @extends: ScrollView / FlatList
 */
var ScrollBar = /** @class */ (function (_super) {
    __extends(ScrollBar, _super);
    function ScrollBar(props) {
        var _this = _super.call(this, props) || this;
        _this.scrollbar = undefined;
        _this.itemsLayouts = {};
        _this.contentOffset = 0;
        _this.scrollContentWidth = 0;
        _this.containerWidth = 0;
        _this.focusIndex = function (index) {
            if (index === void 0) { index = 0; }
            var focusedItemLayout = _this.itemsLayouts[index];
            if (focusedItemLayout) {
                var x = focusedItemLayout.x, width = focusedItemLayout.width;
                if (x < _this.contentOffset) {
                    _this.scrollbar.scrollTo({ x: x - width });
                }
                else if (x + width > _this.contentOffset + _this.containerWidth) {
                    var offsetChange = Math.max(0, x - (_this.contentOffset + _this.containerWidth));
                    _this.scrollbar.scrollTo({ x: _this.contentOffset + offsetChange + width });
                }
            }
        };
        _this.animateGradientOpacity = function (offsetX, contentWidth, containerWidth) {
            var overflow = contentWidth - containerWidth;
            var newValue = offsetX > 0 && offsetX >= overflow - 1 ? 0 : 1;
            var newValueLeft = offsetX > 0 ? 1 : 0;
            react_native_1.Animated.parallel([
                react_native_1.Animated.spring(_this.state.gradientOpacity, {
                    toValue: newValue,
                    speed: 20,
                    useNativeDriver: true
                }),
                react_native_1.Animated.spring(_this.state.gradientOpacityLeft, {
                    toValue: newValueLeft,
                    speed: 20,
                    useNativeDriver: true
                })
            ]).start();
        };
        _this.onScroll = function (event) {
            var _a, _b;
            var _c = event.nativeEvent, layoutMeasurement = _c.layoutMeasurement, contentOffset = _c.contentOffset, contentSize = _c.contentSize;
            _this.contentOffset = contentOffset.x;
            var offsetX = contentOffset.x;
            var contentWidth = contentSize.width;
            var containerWidth = layoutMeasurement.width;
            _this.animateGradientOpacity(offsetX, contentWidth, containerWidth);
            (_b = (_a = _this.props).onScroll) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        };
        _this.onContentSizeChange = function (contentWidth, contentHeight) {
            var _a, _b;
            if (_this.scrollContentWidth !== contentWidth) {
                _this.scrollContentWidth = contentWidth;
                // race condition - won't pass if onLayout() was not called before
                if (contentWidth > _this.containerWidth) {
                    _this.setState({ gradientOpacity: new react_native_1.Animated.Value(1) });
                }
                (_b = (_a = _this.props).onContentSizeChange) === null || _b === void 0 ? void 0 : _b.call(_a, contentWidth, contentHeight);
            }
        };
        _this.onLayout = function (event) {
            var _a, _b;
            _this.containerWidth = event.nativeEvent.layout.width;
            (_b = (_a = _this.props).onLayout) === null || _b === void 0 ? void 0 : _b.call(_a, event);
            // 1 - for race condition, in case onContentSizeChange() is called before
            // 0 - for containerWidth change, when onContentSizeChange() is called first
            _this.setState({ gradientOpacity: new react_native_1.Animated.Value(_this.scrollContentWidth > _this.containerWidth ? 1 : 0) });
        };
        _this.onItemLayout = function (_a) {
            var layout = _a.layout, index = _a.index;
            _this.itemsLayouts[index] = layout;
            var _b = _this.props, children = _b.children, focusIndex = _b.focusIndex;
            if (children && lodash_1.default.keys(_this.itemsLayouts).length === lodash_1.default.keys(children).length) {
                _this.focusIndex(focusIndex);
            }
        };
        _this.state = {
            gradientOpacity: new react_native_1.Animated.Value(0),
            gradientOpacityLeft: new react_native_1.Animated.Value(0)
        };
        return _this;
    }
    ScrollBar.prototype.componentDidUpdate = function (prevProps) {
        var focusIndex = this.props.focusIndex;
        if (prevProps.focusIndex !== focusIndex) {
            this.focusIndex(focusIndex);
        }
    };
    ScrollBar.prototype.renderScrollable = function () {
        var _this = this;
        var _a = this.props, useList = _a.useList, forwardedRef = _a.forwardedRef, children = _a.children;
        var Component = useList ? react_native_1.FlatList : react_native_1.ScrollView;
        return (<Component scrollEventThrottle={100} {...this.props} ref={function (r) {
                _this.scrollbar = r;
                if (lodash_1.default.isFunction(forwardedRef)) {
                    forwardedRef(r);
                }
                else if (lodash_1.default.isObject(forwardedRef)) {
                    //@ts-ignore
                    forwardedRef.current = r;
                }
            }} horizontal showsHorizontalScrollIndicator={false} onScroll={this.onScroll} onContentSizeChange={this.onContentSizeChange}>
        {children &&
                react_1.default.Children.map(children, function (child, index) {
                    return (<Item onLayout={_this.onItemLayout} index={index}>
                {child}
              </Item>);
                })}
      </Component>);
    };
    ScrollBar.prototype.renderGradient = function (left) {
        var _a = this.state, gradientOpacity = _a.gradientOpacity, gradientOpacityLeft = _a.gradientOpacityLeft;
        var _b = this.props, gradientWidth = _b.gradientWidth, gradientHeight = _b.gradientHeight, gradientMargins = _b.gradientMargins, height = _b.height, gradientColor = _b.gradientColor, gradientImage = _b.gradientImage;
        var imageTransform = helpers_1.Constants.isRTL ? (left ? undefined : [{ scaleX: -1 }]) : left ? [{ scaleX: -1 }] : undefined;
        var heightToUse = gradientHeight || height || '100%';
        return (<react_native_1.Animated.View pointerEvents="none" style={{
                opacity: left ? gradientOpacityLeft : gradientOpacity,
                width: gradientWidth,
                height: heightToUse,
                position: 'absolute',
                right: !left ? gradientMargins : undefined,
                left: left ? gradientMargins : undefined
            }}>
        <image_1.default source={gradientImage || defaultImage()} style={{
                width: gradientWidth,
                height: heightToUse,
                tintColor: gradientColor,
                transform: imageTransform
            }} resizeMode={'stretch'}/>
      </react_native_1.Animated.View>);
    };
    ScrollBar.prototype.render = function () {
        var _a = this.props, containerView = _a.containerView, containerProps = _a.containerProps;
        var Container = containerView || view_1.default;
        return (<Container row {...containerProps} onLayout={this.onLayout}>
        {this.renderScrollable()}
        {this.renderGradient(false)}
        {this.renderGradient(true)}
      </Container>);
    };
    ScrollBar.displayName = 'ScrollBar';
    ScrollBar.defaultProps = {
        gradientWidth: GRADIENT_WIDTH,
        gradientMargins: 0,
        gradientColor: style_1.Colors.white,
        focusIndex: 0
    };
    return ScrollBar;
}(react_1.Component));
var Item = function (_a) {
    var children = _a.children, index = _a.index, onLayout = _a.onLayout;
    var onItemLayout = react_1.useCallback(function (_a) {
        var layout = _a.nativeEvent.layout;
        onLayout({ layout: layout, index: index });
    }, [children]);
    return (<view_1.default flexG onLayout={onItemLayout}>
      {children}
    </view_1.default>);
};
Item.displayName = 'IGNORE';
ScrollBar.Item = Item;
exports.default = new_1.asBaseComponent(new_1.forwardRef(ScrollBar));
