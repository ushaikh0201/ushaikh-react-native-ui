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
var new_1 = require("../../commons/new");
var style_1 = require("../../style");
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var view_1 = __importDefault(require("../view"));
var MAX_SHOWN_PAGES = 7;
var NUM_LARGE_INDICATORS = 3;
var DEFAULT_INDICATOR_COLOR = style_1.Colors.primary;
function getColorStyle(isCurrentPage, color, inactiveColor) {
    var activeColor = color || DEFAULT_INDICATOR_COLOR;
    return {
        borderColor: isCurrentPage ? activeColor : inactiveColor || activeColor,
        backgroundColor: isCurrentPage ? activeColor : inactiveColor || 'transparent'
    };
}
function getSizeStyle(size, index, currentPage, enlargeActive) {
    var temp = enlargeActive ? (index === currentPage ? size + 2 : size) : size;
    return { width: temp, height: temp, borderRadius: temp / 2 };
}
function getNumberOfPagesShown(props) {
    return Math.min(MAX_SHOWN_PAGES, props.numOfPages);
}
/**
 * @description: Page indicator, typically used in paged scroll-views
 * @gif: https://user-images.githubusercontent.com/1780255/107114259-2e278d00-686d-11eb-866c-59f3d410d6c3.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PageControlScreen.tsx
 */
var PageControl = /** @class */ (function (_super) {
    __extends(PageControl, _super);
    function PageControl(props) {
        var _this = _super.call(this, props) || this;
        _this.onPagePress = function (_a) {
            var _b, _c;
            var index = _a.customValue;
            PageControl.animate(_this.props);
            (_c = (_b = _this.props).onPagePress) === null || _c === void 0 ? void 0 : _c.call(_b, index);
        };
        _this.state = {
            numOfPagesShown: getNumberOfPagesShown(props),
            largeIndicatorsOffset: 0,
            pagesOffset: 0,
            prevPage: undefined
        };
        if (Array.isArray(props.size)) {
            if (props.size[0] >= props.size[1] || props.size[1] >= props.size[2]) {
                console.warn('It is recommended that largeSize > mediumSize > smallSize, currently: smallSize=', props.size[0], 'mediumSize=', props.size[1], 'largeSize=', props.size[2]);
            }
        }
        return _this;
    }
    PageControl.getDerivedStateFromProps = function (nextProps, prevState) {
        var currentPage = nextProps.currentPage;
        var prevLargeIndicatorsOffset = prevState.largeIndicatorsOffset, prevPage = prevState.prevPage;
        var newState = {};
        if (currentPage !== prevPage) {
            newState.prevPage = currentPage;
            if (currentPage >= prevLargeIndicatorsOffset + NUM_LARGE_INDICATORS) {
                PageControl.animate(nextProps);
                newState.pagesOffset = Math.max(0, currentPage - NUM_LARGE_INDICATORS - 1);
                newState.largeIndicatorsOffset = currentPage - NUM_LARGE_INDICATORS + 1;
            }
            else if (currentPage < prevLargeIndicatorsOffset) {
                PageControl.animate(nextProps);
                newState.pagesOffset = Math.max(0, currentPage - 2);
                newState.largeIndicatorsOffset = currentPage;
            }
        }
        return lodash_1.default.isEmpty(newState) ? null : newState;
    };
    PageControl.animate = function (props) {
        if (PageControl.showLimitedVersion(props)) {
            react_native_1.LayoutAnimation.configureNext(__assign(__assign({}, react_native_1.LayoutAnimation.Presets.linear), { duration: 100 }));
        }
    };
    PageControl.showLimitedVersion = function (_a) {
        var limitShownPages = _a.limitShownPages, numOfPages = _a.numOfPages;
        return limitShownPages && numOfPages > 5;
    };
    PageControl.prototype.getSize = function (index) {
        var largeIndicatorsOffset = this.state.largeIndicatorsOffset;
        var numOfPages = this.props.numOfPages;
        var mediumSize, smallSize, _a = this.props.size, size = _a === void 0 ? PageControl.DEFAULT_SIZE : _a;
        if (Array.isArray(size)) {
            smallSize = size[0];
            mediumSize = size[1];
            size = size[2];
        }
        else {
            mediumSize = (size * 2) / 3;
            smallSize = size / 3;
        }
        if (index < 0 || index > numOfPages - 1) {
            return undefined;
        }
        else if (index >= largeIndicatorsOffset && index < largeIndicatorsOffset + NUM_LARGE_INDICATORS) {
            return size;
        }
        else if (index === largeIndicatorsOffset - 1 || index === largeIndicatorsOffset + NUM_LARGE_INDICATORS) {
            return mediumSize;
        }
        else if (index === largeIndicatorsOffset - 2 || index === largeIndicatorsOffset + NUM_LARGE_INDICATORS + 1) {
            return smallSize;
        }
    };
    PageControl.prototype.renderIndicator = function (index, size, enlargeActive) {
        var _a = this.props, currentPage = _a.currentPage, color = _a.color, inactiveColor = _a.inactiveColor, onPagePress = _a.onPagePress, _b = _a.spacing, spacing = _b === void 0 ? PageControl.DEFAULT_SPACING : _b;
        return (<touchableOpacity_1.default customValue={index} onPress={onPagePress && this.onPagePress} key={index} style={[
                styles.pageIndicator,
                { marginHorizontal: spacing / 2 },
                getColorStyle(index === currentPage, color, inactiveColor),
                getSizeStyle(size, index, currentPage, enlargeActive)
            ]}/>);
    };
    PageControl.prototype.renderDifferentSizeIndicators = function () {
        var _this = this;
        var _a = this.state, numOfPagesShown = _a.numOfPagesShown, pagesOffset = _a.pagesOffset;
        return lodash_1.default.map(lodash_1.default.times(numOfPagesShown), function (index) {
            var adjustedIndex = index + pagesOffset;
            var adjustedSize = _this.getSize(adjustedIndex);
            if (adjustedSize) {
                return _this.renderIndicator(adjustedIndex, adjustedSize, false);
            }
            else {
                return null;
            }
        });
    };
    PageControl.prototype.renderSameSizeIndicators = function () {
        var _this = this;
        var _a = this.props, numOfPages = _a.numOfPages, _b = _a.size, sizeFromProps = _b === void 0 ? PageControl.DEFAULT_SIZE : _b, enlargeActive = _a.enlargeActive;
        var size = Array.isArray(sizeFromProps) ? sizeFromProps[2] : sizeFromProps;
        return lodash_1.default.map(lodash_1.default.times(numOfPages), function (index) { return _this.renderIndicator(index, size, enlargeActive); });
    };
    PageControl.prototype.render = function () {
        var _a = this.props, containerStyle = _a.containerStyle, testID = _a.testID;
        return (<view_1.default style={[styles.container, containerStyle]} inaccessible testID={testID}>
        {PageControl.showLimitedVersion(this.props)
                ? this.renderDifferentSizeIndicators()
                : this.renderSameSizeIndicators()}
      </view_1.default>);
    };
    PageControl.displayName = 'PageControl';
    PageControl.DEFAULT_SIZE = 10;
    PageControl.DEFAULT_SPACING = 4;
    PageControl.defaultProps = {
        enlargeActive: false
    };
    return PageControl;
}(react_1.PureComponent));
exports.default = new_1.asBaseComponent(new_1.forwardRef(PageControl));
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pageIndicator: {
        backgroundColor: 'transparent',
        borderWidth: 1
    }
});
