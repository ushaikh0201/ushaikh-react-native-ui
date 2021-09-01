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
exports.Carousel = exports.PageControlPosition = void 0;
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var helpers_1 = require("../../helpers");
var style_1 = require("../../style");
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../view"));
var text_1 = __importDefault(require("../text"));
var pageControl_1 = __importDefault(require("../pageControl"));
var presenter = __importStar(require("./CarouselPresenter"));
var types_1 = require("./types");
Object.defineProperty(exports, "PageControlPosition", { enumerable: true, get: function () { return types_1.PageControlPosition; } });
/**
 * @description: Carousel for scrolling pages horizontally
 * @gif: https://user-images.githubusercontent.com/1780255/107120258-40b5bc80-6895-11eb-9596-8065d3a940ff.gif, https://user-images.githubusercontent.com/1780255/107120257-3eebf900-6895-11eb-9800-402e9e0dc692.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CarouselScreen.tsx
 * @extends: ScrollView
 * @extendsLink: https://reactnative.dev/docs/scrollview
 * @notes: This is a screen width Component
 */
var Carousel = /** @class */ (function (_super) {
    __extends(Carousel, _super);
    function Carousel(props) {
        var _a, _b, _c, _d, _e;
        var _this = _super.call(this, props) || this;
        _this.carousel = react_1.default.createRef();
        _this.onOrientationChanged = function () {
            var _a = _this.props, pageWidth = _a.pageWidth, loop = _a.loop;
            if (!pageWidth || loop) {
                _this.orientationChange = true;
                // HACK: setting to containerWidth for Android's call when view disappear
                _this.setState({
                    pageWidth: _this.state.containerWidth || helpers_1.Constants.screenWidth
                });
            }
        };
        _this.getContainerMarginHorizontal = function () {
            var _a = _this.props.containerMarginHorizontal, containerMarginHorizontal = _a === void 0 ? 0 : _a;
            return containerMarginHorizontal;
        };
        // TODO: RN 61.5 - try to remove this from the children and move to the ScrollView's contentContainerStyle
        // style={{overflow: 'visible'}} does not work in ScrollView on Android, maybe it will be fixed in the future
        _this.getContainerPaddingVertical = function () {
            var _a = _this.props.containerPaddingVertical, containerPaddingVertical = _a === void 0 ? 0 : _a;
            return containerPaddingVertical;
        };
        _this.updateOffset = function (animated) {
            var _a;
            if (animated === void 0) { animated = false; }
            var _b = presenter.calcOffset(_this.props, _this.state), x = _b.x, y = _b.y;
            if ((_a = _this.carousel) === null || _a === void 0 ? void 0 : _a.current) {
                _this.carousel.current.scrollTo({ x: x, y: y, animated: animated });
                if (helpers_1.Constants.isAndroid) {
                    // this is done to handle onMomentumScrollEnd not being called in Android:
                    // https://github.com/facebook/react-native/issues/11693
                    // https://github.com/facebook/react-native/issues/19246
                    _this.onMomentumScrollEnd();
                }
            }
        };
        _this.getSnapToOffsets = function () {
            var _a = _this.state, containerWidth = _a.containerWidth, pageWidth = _a.pageWidth;
            if (_this.shouldEnablePagination()) {
                return undefined;
            }
            if (containerWidth) {
                var spacings = pageWidth === containerWidth ? 0 : _this.getItemSpacings(_this.props);
                var initialBreak_1 = pageWidth - (containerWidth - pageWidth - spacings) / 2;
                var snapToOffsets = lodash_1.default.times(presenter.getChildrenLength(_this.props), function (index) { return initialBreak_1 + index * pageWidth + _this.getContainerMarginHorizontal(); });
                return snapToOffsets;
            }
        };
        _this.onContainerLayout = function (_a) {
            var _b = _a.nativeEvent.layout, containerWidth = _b.width, containerHeight = _b.height;
            var _c = _this.props, _d = _c.pageWidth, pageWidth = _d === void 0 ? containerWidth : _d, _e = _c.pageHeight, pageHeight = _e === void 0 ? containerHeight : _e;
            var initialOffset = presenter.calcOffset(_this.props, {
                currentPage: _this.state.currentPage,
                pageWidth: pageWidth,
                pageHeight: pageHeight
            });
            _this.setState({ containerWidth: containerWidth, pageWidth: pageWidth, pageHeight: pageHeight, initialOffset: initialOffset });
        };
        _this.onContentSizeChange = function () {
            // this is to handle initial scroll position (content offset)
            if (helpers_1.Constants.isAndroid) {
                _this.updateOffset();
            }
        };
        _this.onMomentumScrollEnd = function () {
            var _a, _b;
            // finished full page scroll
            var _c = _this.state, _d = _c.currentStandingPage, currentStandingPage = _d === void 0 ? 0 : _d, currentPage = _c.currentPage;
            var index = _this.getCalcIndex(currentPage);
            var pagesCount = presenter.getChildrenLength(_this.props);
            if (index < pagesCount) {
                _this.setState({ currentStandingPage: index });
                if (currentStandingPage !== index) {
                    (_b = (_a = _this.props).onChangePage) === null || _b === void 0 ? void 0 : _b.call(_a, index, currentStandingPage);
                }
            }
        };
        _this.onScroll = function (event) {
            var _a, _b;
            if (!_this.skippedInitialScroll) {
                _this.skippedInitialScroll = true;
                return;
            }
            var _c = _this.props, loop = _c.loop, autoplay = _c.autoplay, horizontal = _c.horizontal;
            var _d = _this.state, pageWidth = _d.pageWidth, pageHeight = _d.pageHeight;
            var offsetX = event.nativeEvent.contentOffset.x;
            var offsetY = event.nativeEvent.contentOffset.y;
            var offset = horizontal ? offsetX : offsetY;
            var pageSize = horizontal ? pageWidth : pageHeight;
            if (offset >= 0) {
                if (!_this.orientationChange) {
                    // Avoid new calculation on orientation change
                    var newPage = presenter.calcPageIndex(offset, _this.props, pageSize);
                    _this.setState({ currentPage: newPage });
                }
                _this.orientationChange = false;
            }
            if (loop && presenter.isOutOfBounds(offsetX, _this.props, pageWidth)) {
                _this.updateOffset();
            }
            if (autoplay) {
                // reset the timer to avoid auto scroll immediately after manual one
                _this.resetAutoPlay();
            }
            (_b = (_a = _this.props).onScroll) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        };
        // @ts-ignore
        _this.onScrollEvent = react_native_1.Animated.event([{ nativeEvent: { contentOffset: { y: (_b = (_a = _this.props) === null || _a === void 0 ? void 0 : _a.animatedScrollOffset) === null || _b === void 0 ? void 0 : _b.y, x: (_d = (_c = _this.props) === null || _c === void 0 ? void 0 : _c.animatedScrollOffset) === null || _d === void 0 ? void 0 : _d.x } } }], {
            useNativeDriver: true,
            listener: _this.onScroll
        });
        _this.renderChild = function (child, key) {
            if (child) {
                var _a = _this.state, pageWidth = _a.pageWidth, pageHeight = _a.pageHeight;
                var horizontal = _this.props.horizontal;
                var paddingLeft = horizontal ? _this.shouldUsePageWidth() ? _this.getItemSpacings(_this.props) : undefined : 0;
                var index = Number(key);
                var length_1 = presenter.getChildrenLength(_this.props);
                var containerMarginHorizontal = _this.getContainerMarginHorizontal();
                var marginLeft = index === 0 ? containerMarginHorizontal : 0;
                var marginRight = index === length_1 - 1 ? containerMarginHorizontal : 0;
                var paddingVertical = _this.getContainerPaddingVertical();
                return (<view_1.default style={{
                        width: pageWidth,
                        height: !horizontal ? pageHeight : undefined,
                        paddingLeft: paddingLeft,
                        marginLeft: marginLeft,
                        marginRight: marginRight,
                        paddingVertical: paddingVertical
                    }} key={key} collapsable={false}>
          {_this.shouldAllowAccessibilityLayout() && !Number.isNaN(index) && (<view_1.default style={styles.hiddenText}>
              <text_1.default>{"page " + (index + 1) + " out of " + length_1}</text_1.default>
            </view_1.default>)}
          {child}
        </view_1.default>);
            }
        };
        var defaultPageWidth = props.loop || !props.pageWidth ? helpers_1.Constants.screenWidth : props.pageWidth;
        var pageHeight = (_e = props.pageHeight) !== null && _e !== void 0 ? _e : helpers_1.Constants.screenHeight;
        _this.state = {
            containerWidth: undefined,
            // @ts-ignore (defaultProps)
            currentPage: _this.shouldUsePageWidth() ? _this.getCalcIndex(props.initialPage) : props.initialPage,
            currentStandingPage: props.initialPage,
            pageWidth: defaultPageWidth,
            pageHeight: pageHeight,
            initialOffset: presenter.calcOffset(props, {
                // @ts-ignore (defaultProps)
                currentPage: props.initialPage,
                pageWidth: defaultPageWidth,
                pageHeight: pageHeight
            }),
            prevProps: props
        };
        return _this;
    }
    Carousel.getDerivedStateFromProps = function (nextProps, prevState) {
        var currentPage = prevState.currentPage, prevProps = prevState.prevProps;
        var pageWidth = prevProps.pageWidth, pageHeight = prevProps.pageHeight;
        var nextPageWidth = nextProps.pageWidth, nextPageHeight = nextProps.pageHeight;
        if ((!lodash_1.default.isUndefined(nextPageWidth) && pageWidth !== nextPageWidth)
            || (!lodash_1.default.isUndefined(nextPageHeight) && pageHeight !== nextPageHeight)) {
            var pageWidth_1 = nextPageWidth;
            var pageHeight_1 = nextPageHeight;
            return {
                pageWidth: pageWidth_1,
                initialOffset: presenter.calcOffset(prevProps, {
                    currentPage: currentPage,
                    pageWidth: pageWidth_1,
                    pageHeight: pageHeight_1
                }),
                prevProps: nextProps
            };
        }
        // for presenter.calcOffset() props parameter
        if (prevProps.containerMarginHorizontal !== nextProps.containerMarginHorizontal ||
            prevProps.loop !== nextProps.loop) {
            return {
                prevProps: nextProps
            };
        }
        return null;
    };
    Carousel.prototype.componentDidMount = function () {
        helpers_1.Constants.addDimensionsEventListener(this.onOrientationChanged);
        if (this.props.autoplay) {
            this.startAutoPlay();
        }
    };
    Carousel.prototype.componentWillUnmount = function () {
        helpers_1.Constants.removeDimensionsEventListener(this.onOrientationChanged);
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
        }
    };
    Carousel.prototype.componentDidUpdate = function (prevProps) {
        var autoplay = this.props.autoplay;
        if (autoplay && !prevProps.autoplay) {
            this.startAutoPlay();
        }
        else if (!autoplay && prevProps.autoplay) {
            this.stopAutoPlay();
        }
    };
    Carousel.prototype.getItemSpacings = function (props) {
        var _a = props.itemSpacings, itemSpacings = _a === void 0 ? 16 : _a;
        return itemSpacings;
    };
    Carousel.prototype.startAutoPlay = function () {
        var _this = this;
        this.autoplayTimer = setInterval(function () {
            _this.goToNextPage();
        }, this.props.autoplayInterval);
    };
    Carousel.prototype.stopAutoPlay = function () {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
        }
    };
    Carousel.prototype.resetAutoPlay = function () {
        this.stopAutoPlay();
        this.startAutoPlay();
    };
    Carousel.prototype.goToPage = function (pageIndex, animated) {
        var _this = this;
        if (animated === void 0) { animated = true; }
        this.setState({ currentPage: this.getCalcIndex(pageIndex) }, function () { return _this.updateOffset(animated); });
    };
    Carousel.prototype.getCalcIndex = function (index) {
        // to handle scrollView index issue in Android's RTL layout
        if (helpers_1.Constants.isRTL && helpers_1.Constants.isAndroid) {
            var length_2 = presenter.getChildrenLength(this.props) - 1;
            return length_2 - index;
        }
        return index;
    };
    Carousel.prototype.shouldUsePageWidth = function () {
        var _a = this.props, loop = _a.loop, pageWidth = _a.pageWidth;
        return !loop && pageWidth;
    };
    Carousel.prototype.shouldEnablePagination = function () {
        var _a = this.props, pagingEnabled = _a.pagingEnabled, horizontal = _a.horizontal;
        return horizontal ? (pagingEnabled && !this.shouldUsePageWidth()) : true;
    };
    Carousel.prototype.shouldAllowAccessibilityLayout = function () {
        var allowAccessibleLayout = this.props.allowAccessibleLayout;
        return allowAccessibleLayout && helpers_1.Constants.accessibility.isScreenReaderEnabled;
    };
    Carousel.prototype.goToNextPage = function () {
        var currentPage = this.state.currentPage;
        var pagesCount = presenter.getChildrenLength(this.props);
        var loop = this.props.loop;
        var nextPageIndex;
        if (loop) {
            nextPageIndex = currentPage + 1;
        }
        else {
            nextPageIndex = Math.min(pagesCount - 1, currentPage + 1);
        }
        this.goToPage(nextPageIndex, true);
        // in case of a loop, after we advanced right to the cloned first page,
        // we return silently to the real first page
        if (loop && currentPage === pagesCount) {
            this.goToPage(0, false);
        }
    };
    Carousel.prototype.renderChildren = function () {
        var _this = this;
        var _a = this.props, children = _a.children, loop = _a.loop;
        var length = presenter.getChildrenLength(this.props);
        var childrenArray = react_1.default.Children.map(children, function (child, index) {
            return _this.renderChild(child, "" + index);
        });
        if (loop && childrenArray) {
            // @ts-ignore
            childrenArray.unshift(this.renderChild(children[length - 1], length - 1 + "-clone"));
            // @ts-ignore
            childrenArray.push(this.renderChild(children[0], 0 + "-clone"));
        }
        return childrenArray;
    };
    Carousel.prototype.renderPageControl = function () {
        var _a = this.props, pageControlPosition = _a.pageControlPosition, _b = _a.pageControlProps, pageControlProps = _b === void 0 ? {} : _b;
        if (pageControlPosition) {
            var _c = pageControlProps.size, size = _c === void 0 ? 6 : _c, _d = pageControlProps.spacing, spacing = _d === void 0 ? 8 : _d, _e = pageControlProps.color, color = _e === void 0 ? style_1.Colors.dark20 : _e, _f = pageControlProps.inactiveColor, inactiveColor = _f === void 0 ? style_1.Colors.dark60 : _f, others = __rest(pageControlProps, ["size", "spacing", "color", "inactiveColor"]);
            var pagesCount = presenter.getChildrenLength(this.props);
            var containerStyle = pageControlPosition === types_1.PageControlPosition.UNDER
                ? { marginVertical: 16 - this.getContainerPaddingVertical() }
                : styles.pageControlContainerStyle;
            return (<pageControl_1.default size={size} spacing={spacing} containerStyle={containerStyle} inactiveColor={inactiveColor} color={color} {...others} numOfPages={pagesCount} currentPage={this.getCalcIndex(this.state.currentPage)}/>);
        }
    };
    Carousel.prototype.renderCounter = function () {
        var _a = this.props, pageWidth = _a.pageWidth, showCounter = _a.showCounter, counterTextStyle = _a.counterTextStyle;
        var currentPage = this.state.currentPage;
        var pagesCount = presenter.getChildrenLength(this.props);
        if (showCounter && !pageWidth) {
            return (<view_1.default center style={styles.counter}>
          <text_1.default dark80 text90 style={[{ fontWeight: 'bold' }, counterTextStyle]}>
            {currentPage + 1}/{pagesCount}
          </text_1.default>
        </view_1.default>);
        }
    };
    Carousel.prototype.renderAccessibleLayout = function () {
        var _this = this;
        var _a = this.props, containerStyle = _a.containerStyle, children = _a.children;
        return (<view_1.default style={containerStyle} onLayout={this.onContainerLayout}>
        <react_native_1.ScrollView ref={this.carousel} showsVerticalScrollIndicator={false} pagingEnabled onContentSizeChange={this.onContentSizeChange} onScroll={this.onScroll} onMomentumScrollEnd={this.onMomentumScrollEnd}>
          {react_1.default.Children.map(children, function (child, index) {
                return _this.renderChild(child, "" + index);
            })}
        </react_native_1.ScrollView>
      </view_1.default>);
    };
    Carousel.prototype.renderCarousel = function () {
        var _a = this.props, containerStyle = _a.containerStyle, animated = _a.animated, horizontal = _a.horizontal, animatedScrollOffset = _a.animatedScrollOffset, others = __rest(_a, ["containerStyle", "animated", "horizontal", "animatedScrollOffset"]);
        var initialOffset = this.state.initialOffset;
        var scrollContainerStyle = this.shouldUsePageWidth()
            ? { paddingRight: this.getItemSpacings(this.props) }
            : undefined;
        var snapToOffsets = this.getSnapToOffsets();
        var marginBottom = Math.max(0, this.getContainerPaddingVertical() - 16);
        var ScrollContainer = animatedScrollOffset ? react_native_1.Animated.ScrollView : react_native_1.ScrollView;
        return (<view_1.default animated={animated} style={[{ marginBottom: marginBottom }, containerStyle]} onLayout={this.onContainerLayout}>
        <ScrollContainer showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} decelerationRate="fast" scrollEventThrottle={200} {...others} ref={this.carousel} onScroll={animatedScrollOffset ? this.onScrollEvent : this.onScroll} contentContainerStyle={scrollContainerStyle} horizontal={horizontal} pagingEnabled={this.shouldEnablePagination()} snapToOffsets={snapToOffsets} contentOffset={initialOffset} // iOS only
         onContentSizeChange={this.onContentSizeChange} onMomentumScrollEnd={this.onMomentumScrollEnd}>
          {this.renderChildren()}
        </ScrollContainer>
        {this.renderPageControl()}
        {this.renderCounter()}
      </view_1.default>);
    };
    Carousel.prototype.render = function () {
        return this.shouldAllowAccessibilityLayout() ? this.renderAccessibleLayout() : this.renderCarousel();
    };
    Carousel.displayName = 'Carousel';
    Carousel.defaultProps = {
        initialPage: 0,
        pagingEnabled: true,
        autoplay: false,
        autoplayInterval: 4000,
        horizontal: true
    };
    Carousel.pageControlPositions = types_1.PageControlPosition;
    return Carousel;
}(react_1.Component));
exports.Carousel = Carousel;
exports.default = new_1.asBaseComponent(Carousel);
var styles = react_native_1.StyleSheet.create({
    counter: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 20,
        backgroundColor: style_1.Colors.rgba(style_1.Colors.black, 0.6),
        position: 'absolute',
        top: 12,
        right: 12
    },
    pageControlContainerStyle: {
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center'
    },
    hiddenText: {
        position: 'absolute',
        width: 1
    }
});
