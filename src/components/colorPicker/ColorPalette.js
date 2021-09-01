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
var lodash_1 = __importDefault(require("lodash"));
var memoize_one_1 = __importDefault(require("memoize-one"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var helpers_1 = require("../../helpers");
var style_1 = require("../../style");
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../view"));
var carousel_1 = __importDefault(require("../carousel"));
var pageControl_1 = __importDefault(require("../pageControl"));
var ColorSwatch_1 = __importStar(require("./ColorSwatch"));
var scrollBar_1 = __importDefault(require("../scrollBar"));
var VERTICAL_PADDING = 16;
var HORIZONTAL_PADDING = 20;
var MINIMUM_MARGIN = 16;
var SCROLLABLE_HEIGHT = 92;
var DEFAULT_NUMBER_OF_ROWS = 3;
/**
 * @description: A color palette component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.tsx
 * @notes: This is a screen width component
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorPalette/ColorPalette.gif?raw=true
 */
var ColorPalette = /** @class */ (function (_super) {
    __extends(ColorPalette, _super);
    function ColorPalette(props) {
        var _this = _super.call(this, props) || this;
        _this.carousel = react_1.default.createRef();
        _this.scrollBar = react_1.default.createRef();
        _this.itemsRefs = undefined;
        _this.selectedColorIndex = undefined;
        _this.selectedPage = undefined;
        _this.currentColorsCount = undefined;
        _this.itemsPerRow = 0;
        _this.itemsPerPage = 0;
        _this.usePagination = undefined;
        _this.innerMargin = undefined;
        _this.swatchStyles = undefined;
        _this.onOrientationChanged = function () {
            if (_this.state.orientation !== helpers_1.Constants.orientation) {
                _this.initLocalVariables();
                _this.setState({ orientation: helpers_1.Constants.orientation }); // only to trigger render
            }
        };
        _this.getUniqueColors = memoize_one_1.default(function (colors) {
            var c = lodash_1.default.map(colors, function (color) {
                if (style_1.Colors.isTransparent(color)) {
                    return color;
                }
                return lodash_1.default.toUpper(color);
            });
            return lodash_1.default.uniq(c);
        });
        _this.onContentSizeChange = function (contentWidth) {
            _this.setState({
                scrollable: contentWidth > _this.containerWidth, contentWidth: contentWidth
            });
        };
        _this.onChangePage = function (index) {
            _this.setState({ currentPage: index });
        };
        _this.onValueChange = function (value, options) {
            var _a, _b;
            (_b = (_a = _this.props).onValueChange) === null || _b === void 0 ? void 0 : _b.call(_a, value, options);
        };
        _this.onLayout = function () {
            setTimeout(function () {
                _this.scrollToSelected();
            }, 0);
        };
        _this.getHorizontalMargins = function (index) {
            var isFirst = index === 0;
            var isOnLeft = isFirst || index % _this.itemsPerRow === 0;
            var isOnRight = index % _this.itemsPerRow === _this.itemsPerRow - 1;
            var marginLeft;
            var marginRight;
            if (_this.usePagination) {
                marginLeft = isOnLeft ? 0 : _this.innerMargin;
                marginRight = isOnRight ? 0 : _this.innerMargin;
            }
            else {
                var isLast = index === _this.colors.length - 1;
                marginLeft = isFirst ? 8 : _this.innerMargin;
                marginRight = isLast ? 20 : _this.innerMargin;
            }
            return { marginLeft: marginLeft, marginRight: marginRight };
        };
        _this.getSwatchStyle = function (index) {
            var sizeHasChanged = _this.colors.length !== _this.currentColorsCount;
            var isNextToLastIndex = index === _this.colors.length - 2;
            // Need to update the next to last item because it's margin needs to changed
            if (!lodash_1.default.isUndefined(_this.swatchStyles)) {
                if (lodash_1.default.isUndefined(_this.swatchStyles[index]) || (!_this.usePagination && sizeHasChanged && isNextToLastIndex)) {
                    _this.swatchStyles[index] = [_this.getHorizontalMargins(index), _this.props.swatchStyle];
                    if (sizeHasChanged && isNextToLastIndex) {
                        _this.currentColorsCount = _this.colors.length;
                    }
                }
                return _this.swatchStyles[index];
            }
        };
        _this.addRefByIndex = function (index, ref) {
            if (_this.itemsRefs && ref) {
                _this.itemsRefs[index] = ref;
            }
        };
        _this.state = {
            currentPage: 0,
            scrollable: false,
            orientation: undefined,
            contentWidth: undefined
        };
        _this.initLocalVariables();
        return _this;
    }
    ColorPalette.prototype.componentDidMount = function () {
        helpers_1.Constants.addDimensionsEventListener(this.onOrientationChanged);
    };
    ColorPalette.prototype.componentWillUnmount = function () {
        helpers_1.Constants.removeDimensionsEventListener(this.onOrientationChanged);
    };
    ColorPalette.prototype.initLocalVariables = function () {
        this.itemsRefs = undefined;
        this.selectedColorIndex = undefined;
        this.selectedPage = undefined;
        this.currentColorsCount = this.colors.length;
        this.itemsPerRow = this.getItemsPerRow();
        this.itemsPerPage = this.itemsPerRow * this.getNumberOfRows();
        this.usePagination = this.shouldUsePagination();
        this.innerMargin = this.getInnerMargin();
        this.swatchStyles = [];
    };
    Object.defineProperty(ColorPalette.prototype, "value", {
        get: function () {
            var value = this.props.value;
            if (style_1.Colors.isTransparent(value)) {
                return value;
            }
            return lodash_1.default.toUpper(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorPalette.prototype, "colors", {
        get: function () {
            return this.getUniqueColors(this.props.colors);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorPalette.prototype, "containerWidth", {
        get: function () {
            var containerWidth = this.props.containerWidth;
            return containerWidth || helpers_1.Constants.screenWidth;
        },
        enumerable: false,
        configurable: true
    });
    ColorPalette.prototype.getNumberOfRows = function () {
        var _a = this.props.numberOfRows, numberOfRows = _a === void 0 ? DEFAULT_NUMBER_OF_ROWS : _a;
        if (!lodash_1.default.inRange(numberOfRows, 2, 6)) {
            console.warn(numberOfRows + " is not within valid range of color rows (2 to 5);\n        defaulting to " + DEFAULT_NUMBER_OF_ROWS + ".");
            return DEFAULT_NUMBER_OF_ROWS;
        }
        return numberOfRows;
    };
    ColorPalette.prototype.getItemsPerRow = function () {
        var itemsPerRow = 1;
        // first item has the page's padding around it
        var firstItemWidth = 2 * HORIZONTAL_PADDING + ColorSwatch_1.SWATCH_SIZE;
        // additional items have the minimum width of the margin between them and the previous item's width
        var additionalItemMinimumWidth = ColorSwatch_1.SWATCH_SIZE + MINIMUM_MARGIN;
        // floor(space left / size of additional items)
        itemsPerRow += Math.floor((this.containerWidth - firstItemWidth) / additionalItemMinimumWidth);
        return itemsPerRow;
    };
    ColorPalette.prototype.shouldUsePagination = function () {
        var usePagination = this.props.usePagination;
        return usePagination && this.colors.length > this.itemsPerPage;
    };
    ColorPalette.prototype.getInnerMargin = function () {
        if (!this.usePagination) {
            return HORIZONTAL_PADDING / 2;
        }
        // Now that we have the itemsPerRow set, we can calculate the actual innerMargin
        var remainingSpace = this.containerWidth - this.itemsPerRow * ColorSwatch_1.SWATCH_SIZE - 2 * HORIZONTAL_PADDING;
        // With pagination - there's 1 less space than the number of items
        var numberOfMargins = this.itemsPerRow - 1;
        var margin = remainingSpace / numberOfMargins;
        // We have to subtract something since otherwise some Android devices will overflow into the next line
        return (margin - 0.001) / 2;
    };
    ColorPalette.prototype.scrollToSelected = function () {
        var _this = this;
        var _a, _b;
        var _c = this.state, scrollable = _c.scrollable, currentPage = _c.currentPage;
        if (scrollable && this.selectedColorIndex !== undefined && this.itemsRefs) {
            var childRef = this.itemsRefs[this.selectedColorIndex];
            if (childRef) {
                var handle = react_native_1.findNodeHandle(childRef.current);
                if (handle) {
                    //@ts-ignore
                    react_native_1.UIManager.measureLayoutRelativeToParent(handle, function (e) {
                        console.warn(e);
                    }, function (x, _y, w, _h) {
                        var _a, _b;
                        if (x + w > _this.containerWidth) {
                            (_b = (_a = _this.scrollBar) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.scrollTo({
                                x: x + w + HORIZONTAL_PADDING - _this.containerWidth,
                                y: 0,
                                animated: false
                            });
                        }
                    });
                }
            }
        }
        else if (this.usePagination) {
            (_b = (_a = this.carousel) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.goToPage(this.selectedPage || currentPage, false);
        }
    };
    ColorPalette.prototype.renderColorSwatch = function (color, index) {
        var _this = this;
        var _a = this.props, animatedIndex = _a.animatedIndex, testID = _a.testID;
        return (<ColorSwatch_1.default style={this.getSwatchStyle(index)} index={index} key={color} color={color} value={color} selected={this.value === color} animated={index === animatedIndex} onPress={this.onValueChange} ref={function (r) { return _this.addRefByIndex(index, r); }} testID={testID + "-" + color}/>);
    };
    ColorPalette.prototype.renderPalette = function (props, contentStyle, colors, pageIndex) {
        var _this = this;
        var style = props.style, others = __rest(props, ["style"]);
        this.itemsRefs = [];
        return (<view_1.default key={pageIndex} {...others} style={[styles.paletteContainer, contentStyle, style]} onLayout={this.onLayout}>
        {lodash_1.default.map(colors, function (color, i) {
                if (color === _this.value) {
                    _this.selectedColorIndex = i;
                    _this.selectedPage = pageIndex;
                }
                return _this.renderColorSwatch(color, i);
            })}
      </view_1.default>);
    };
    ColorPalette.prototype.renderScrollableContent = function () {
        var _a = this.props, containerStyle = _a.containerStyle, others = __rest(_a, ["containerStyle"]);
        var _b = this.state, scrollable = _b.scrollable, contentWidth = _b.contentWidth;
        return (<scrollBar_1.default ref={this.scrollBar} style={[containerStyle, styles.scrollContainer]} scrollEnabled={scrollable} onContentSizeChange={this.onContentSizeChange} height={SCROLLABLE_HEIGHT} containerProps={{ width: !scrollable ? contentWidth : undefined }} gradientHeight={SCROLLABLE_HEIGHT - 12}>
        {this.renderPalette(others, styles.scrollContent, this.colors, 0)}
      </scrollBar_1.default>);
    };
    ColorPalette.prototype.renderPaginationContent = function () {
        var _this = this;
        var _a = this.props, containerStyle = _a.containerStyle, loop = _a.loop, others = __rest(_a, ["containerStyle", "loop"]);
        var currentPage = this.state.currentPage;
        var colorGroups = lodash_1.default.chunk(this.colors, this.itemsPerPage);
        return (<view_1.default center style={[containerStyle, styles.paginationContainer]}>
        <carousel_1.default loop={loop} onChangePage={this.onChangePage} ref={this.carousel}>
          {lodash_1.default.map(colorGroups, function (colorsPerPage, index) {
                return _this.renderPalette(others, __assign(__assign({}, styles.page), { width: _this.containerWidth }), colorsPerPage, index);
            })}
        </carousel_1.default>
        <pageControl_1.default size={6} color={style_1.Colors.dark10} inactiveColor={style_1.Colors.dark50} spacing={8} numOfPages={colorGroups.length} currentPage={currentPage}/>
      </view_1.default>);
    };
    ColorPalette.prototype.render = function () {
        return this.usePagination ? this.renderPaginationContent() : this.renderScrollableContent();
    };
    ColorPalette.displayName = 'ColorPalette';
    ColorPalette.defaultProps = {
        numberOfRows: DEFAULT_NUMBER_OF_ROWS,
        usePagination: true,
        loop: true
    };
    return ColorPalette;
}(react_1.PureComponent));
exports.default = new_1.asBaseComponent(ColorPalette);
var styles = react_native_1.StyleSheet.create({
    paletteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: HORIZONTAL_PADDING,
        paddingVertical: VERTICAL_PADDING
    },
    paginationContainer: {
        flex: 1,
        backgroundColor: style_1.Colors.white,
        paddingBottom: VERTICAL_PADDING
    },
    scrollContainer: {
        backgroundColor: style_1.Colors.white
    },
    page: {
        flexWrap: 'wrap'
    },
    scrollContent: {
        height: SCROLLABLE_HEIGHT,
        paddingLeft: 12
    }
});
