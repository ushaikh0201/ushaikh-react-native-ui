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
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var helpers_1 = require("../../helpers");
var style_1 = require("../../style");
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../view"));
var scrollBar_1 = __importDefault(require("../scrollBar"));
var TabBarItem_1 = __importDefault(require("./TabBarItem"));
var MIN_TABS_FOR_SCROLL = 1;
var DEFAULT_BACKGROUND_COLOR = style_1.Colors.white;
var DEFAULT_HEIGHT = 48;
/**
 * @description: TabBar Component
 * @modifiers: alignment, flex, padding, margin, background, typography, color (list of supported modifiers)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabBarScreen.tsx
 * @extends: ScrollBar
 * @notes: This is screen width component.
 */
var TabBar = /** @class */ (function (_super) {
    __extends(TabBar, _super);
    function TabBar(props) {
        var _this = _super.call(this, props) || this;
        _this.shouldBeMarked = function (index) {
            return _this.state.currentIndex === index && !_this.isIgnored(index) && _this.childrenCount > 1;
        };
        _this.onItemPress = function (index, props) {
            _this.updateIndicator(index);
            setTimeout(function () {
                var _a;
                if (!props.ignore) {
                    _this.onChangeIndex(index);
                }
                _this.onTabSelected(index);
                (_a = props.onPress) === null || _a === void 0 ? void 0 : _a.call(props);
            }, 0);
        };
        _this.onScroll = function (event) {
            var contentOffset = event.nativeEvent.contentOffset;
            _this.contentOffset = contentOffset;
        };
        _this.onContentSizeChange = function (width) {
            if (_this.scrollContentWidth !== width) {
                _this.scrollContentWidth = width;
                var minTabsForScroll = _this.props.minTabsForScroll;
                var minChildrenCount = minTabsForScroll || MIN_TABS_FOR_SCROLL;
                if (_this.hasOverflow() && _this.childrenCount > minChildrenCount) {
                    _this.setState({ scrollEnabled: true });
                }
            }
        };
        _this.state = {
            scrollEnabled: false,
            currentIndex: props.selectedIndex || 0
        };
        _this.contentOffset = { x: 0, y: 0 };
        _this.scrollBar = react_1.default.createRef();
        _this.itemsRefs = [];
        return _this;
    }
    TabBar.prototype.componentDidUpdate = function (prevProps, prevState) {
        var prevChildrenCount = react_1.default.Children.count(prevProps.children);
        if (this.childrenCount !== prevChildrenCount) {
            this.updateIndicator(0);
        }
        // TODO: since we're implementing an uncontrolled component here, we should verify the selectedIndex has changed
        // between this.props and nextProps (basically the meaning of selectedIndex should be initialIndex)
        var isIndexManuallyChanged = this.props.selectedIndex !== prevState.currentIndex && prevProps.selectedIndex !== this.props.selectedIndex;
        if (isIndexManuallyChanged) {
            this.updateIndicator(this.props.selectedIndex);
        }
    };
    Object.defineProperty(TabBar.prototype, "childrenCount", {
        // generateStyles() {
        //   this.styles = createStyles(this.props);
        // }
        get: function () {
            return react_1.default.Children.count(this.props.children);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "scrollContainerWidth", {
        get: function () {
            return this.props.containerWidth || helpers_1.Constants.screenWidth;
        },
        enumerable: false,
        configurable: true
    });
    TabBar.prototype.isIgnored = function (index) {
        var child = react_1.default.Children.toArray(this.props.children)[index];
        return lodash_1.default.get(child, 'props.ignore');
    };
    TabBar.prototype.hasOverflow = function () {
        return this.scrollContentWidth && this.scrollContentWidth > this.scrollContainerWidth;
    };
    TabBar.prototype.updateIndicator = function (index) {
        var _this = this;
        if (index !== undefined && !this.isIgnored(index)) {
            this.setState({ currentIndex: index }, function () {
                _this.scrollToSelected();
            });
        }
    };
    TabBar.prototype.scrollToSelected = function (animated) {
        var _a, _b, _c, _d, _e, _f;
        if (animated === void 0) { animated = true; }
        var childRef = this.itemsRefs[this.state.currentIndex];
        var childLayout = childRef.getLayout();
        if (childLayout && this.hasOverflow()) {
            if (childLayout.x + childLayout.width - this.contentOffset.x > this.scrollContainerWidth) {
                (_c = (_b = (_a = this.scrollBar) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.scrollTo) === null || _c === void 0 ? void 0 : _c.call(_b, { x: childLayout.x - this.scrollContainerWidth + childLayout.width, y: 0, animated: animated });
            }
            else if (childLayout.x - this.contentOffset.x < 0) {
                (_f = (_e = (_d = this.scrollBar) === null || _d === void 0 ? void 0 : _d.current) === null || _e === void 0 ? void 0 : _e.scrollTo) === null || _f === void 0 ? void 0 : _f.call(_e, { x: childLayout.x, y: 0, animated: animated });
            }
        }
    };
    TabBar.prototype.onChangeIndex = function (index) {
        var _a, _b;
        (_b = (_a = this.props).onChangeIndex) === null || _b === void 0 ? void 0 : _b.call(_a, index);
    };
    TabBar.prototype.onTabSelected = function (index) {
        var _a, _b;
        (_b = (_a = this.props).onTabSelected) === null || _b === void 0 ? void 0 : _b.call(_a, index);
    };
    TabBar.prototype.renderTabBar = function () {
        var _a = this.props, height = _a.height, _b = _a.backgroundColor, backgroundColor = _b === void 0 ? DEFAULT_BACKGROUND_COLOR : _b, containerView = _a.containerView, containerProps = _a.containerProps, gradientMargins = _a.gradientMargins;
        var scrollEnabled = this.state.scrollEnabled;
        var containerHeight = height || DEFAULT_HEIGHT;
        return (<scrollBar_1.default 
        // @ts-ignore
        ref={this.scrollBar} contentContainerStyle={styles.scrollBarContainer} scrollEnabled={scrollEnabled} scrollEventThrottle={16} onScroll={this.onScroll} onContentSizeChange={this.onContentSizeChange} height={containerHeight} gradientColor={backgroundColor} containerView={containerView} containerProps={containerProps} gradientMargins={gradientMargins}>
        <view_1.default row style={[
                styles.tabBar,
                {
                    height: containerHeight,
                    backgroundColor: backgroundColor
                }
            ]}>
          {this.renderChildren()}
        </view_1.default>
      </scrollBar_1.default>);
    };
    TabBar.prototype.renderChildren = function () {
        var _this = this;
        this.itemsRefs = [];
        var _a = this.props, indicatorStyle = _a.indicatorStyle, darkTheme = _a.darkTheme;
        var children = react_1.default.Children.map(this.props.children, function (child, index) {
            // @ts-ignore
            var accessLabel = (child === null || child === void 0 ? void 0 : child.props.accessibilityLabel) || child.props.label || '';
            //TODO: review it again, all types here should be correct. As from React.Children.map it gets definitely child: React.ReactNode, and React.cloneElement does not accept it.
            // But seems it's work in a real life, so maybe it is just trouble with types compatibility
            //@ts-ignore
            return react_1.default.cloneElement(child, {
                indicatorStyle: indicatorStyle,
                darkTheme: darkTheme,
                selected: _this.shouldBeMarked(index),
                onPress: function () {
                    // @ts-ignore
                    _this.onItemPress(index, child.props);
                },
                ref: function (r) {
                    _this.itemsRefs[index] = r;
                },
                accessibilityLabel: accessLabel + " " + (index + 1) + " out of " + _this.childrenCount
            });
        });
        return children;
    };
    TabBar.prototype.render = function () {
        var _a = this.props, enableShadow = _a.enableShadow, style = _a.style, _b = _a.backgroundColor, backgroundColor = _b === void 0 ? DEFAULT_BACKGROUND_COLOR : _b;
        return (
        // @ts-ignore
        <view_1.default useSafeArea style={[
                styles.container,
                enableShadow && styles.containerShadow,
                style,
                {
                    height: undefined,
                    width: this.scrollContainerWidth,
                    backgroundColor: backgroundColor
                }
            ]}>
        {this.renderTabBar()}
      </view_1.default>);
    };
    TabBar.displayName = 'TabBar';
    TabBar.defaultProps = {
        selectedIndex: 0
    };
    TabBar.Item = TabBarItem_1.default;
    return TabBar;
}(react_1.Component));
exports.default = new_1.asBaseComponent(TabBar);
var styles = react_native_1.StyleSheet.create({
    container: {
        zIndex: 100
    },
    containerShadow: __assign({}, react_native_1.Platform.select({
        ios: {
            shadowColor: style_1.Colors.dark10,
            shadowOpacity: 0.05,
            shadowRadius: 2,
            shadowOffset: { height: 6, width: 0 }
        },
        android: {
            elevation: 5,
            backgroundColor: style_1.Colors.white
        }
    })),
    tabBar: {
        flex: 1
    },
    shadowImage: {
        width: '100%'
    },
    scrollBarContainer: {
        minWidth: '100%'
    }
});
