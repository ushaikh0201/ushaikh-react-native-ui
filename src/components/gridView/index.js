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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
// TODO: we should use asBaseComponent here instead of using UIComponent directly
var style_1 = require("style");
var UIComponent_1 = __importDefault(require("../../commons/UIComponent"));
var view_1 = __importDefault(require("../view"));
var text_1 = __importDefault(require("../text"));
var helpers_1 = require("helpers");
var gridListItem_1 = __importDefault(require("../gridListItem"));
var FormattingPresenter_1 = require("../../helpers/FormattingPresenter");
/**
 * @description: A auto-generated grid view that calculate item size according to given props
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/GridViewScreen.tsx
 */
var GridView = /** @class */ (function (_super) {
    __extends(GridView, _super);
    function GridView(props) {
        var _this = _super.call(this, props) || this;
        _this.onOrientationChanged = function () {
            if (!_this.props.viewWidth) {
                _this.setState({ viewWidth: Math.floor(_this.getDefaultViewWidth()), numColumns: _this.getCalculatedNumOfColumns() });
            }
        };
        _this.renderItem = function (item, index) {
            var _a = _this.props, items = _a.items, itemSpacing = _a.itemSpacing;
            var numColumns = _this.state.numColumns;
            var itemsCount = lodash_1.default.size(items);
            var rowCount = itemsCount / numColumns;
            var isLastItemInRow = (index + 1) % numColumns === 0;
            var isLastRow = index + 1 > (rowCount - 1) * numColumns;
            var isLastItem = index === itemsCount - 1;
            var size = typeof item.itemSize === 'object'
                ? { width: _this.itemSize, height: lodash_1.default.get(item.itemSize, 'height', _this.itemSize) }
                : _this.itemSize;
            return (<gridListItem_1.default key={index} {...item} itemSize={size} containerStyle={[!isLastItemInRow && { marginRight: itemSpacing },
                    !isLastRow && { marginBottom: itemSpacing }, item.containerStyle]}>
        {isLastItem && _this.renderLastItemOverlay()}
      </gridListItem_1.default>);
        };
        _this.state = {
            viewWidth: Math.floor(props.viewWidth || _this.getDefaultViewWidth()),
            numColumns: props.numColumns
        };
        _this.itemSize = undefined;
        return _this;
    }
    GridView.getDerivedStateFromProps = function (nextProps, prevState) {
        var viewWidth;
        var numColumns;
        if (nextProps.viewWidth && Math.floor(nextProps.viewWidth) !== prevState.viewWidth) {
            viewWidth = Math.floor(nextProps.viewWidth);
        }
        if (!nextProps.keepItemSize && nextProps.numColumns !== prevState.numColumns) {
            numColumns = nextProps.numColumns;
        }
        if (viewWidth || viewWidth) {
            return { viewWidth: viewWidth, numColumns: numColumns };
        }
        else {
            return null;
        }
    };
    GridView.prototype.componentDidMount = function () {
        helpers_1.Constants.addDimensionsEventListener(this.onOrientationChanged);
    };
    GridView.prototype.componentWillUnmount = function () {
        helpers_1.Constants.removeDimensionsEventListener(this.onOrientationChanged);
    };
    GridView.prototype.shouldUpdateItemSize = function () {
        return !this.itemSize || !this.props.keepItemSize;
    };
    GridView.prototype.getDefaultViewWidth = function () {
        // @ts-ignore
        return helpers_1.Constants.screenWidth - (style_1.Spacings.page * 2);
    };
    GridView.prototype.getCalculatedNumOfColumns = function () {
        var _a = this.props, itemSpacing = _a.itemSpacing, numColumns = _a.numColumns;
        if (!this.shouldUpdateItemSize() && helpers_1.Constants.orientation === 'landscape' && this.itemSize && itemSpacing) {
            var numberOfColumns = this.getDefaultViewWidth() / (this.itemSize + itemSpacing);
            return Math.floor(numberOfColumns);
        }
        return numColumns;
    };
    GridView.prototype.getItemSize = function () {
        var itemSpacing = this.props.itemSpacing;
        var _a = this.state, viewWidth = _a.viewWidth, numColumns = _a.numColumns;
        if (this.shouldUpdateItemSize() && viewWidth && itemSpacing && numColumns) {
            return (viewWidth - itemSpacing * (numColumns - 1)) / numColumns;
        }
        return this.itemSize;
    };
    GridView.prototype.getThemeColor = function (placeColor) {
        if (lodash_1.default.toLower(placeColor) === lodash_1.default.toLower(style_1.Colors.white)) {
            return style_1.Colors.black;
        }
        else if (style_1.Colors.isDark(placeColor)) {
            return placeColor;
        }
        else {
            return style_1.Colors.getColorTint(placeColor, 30);
        }
    };
    GridView.prototype.renderLastItemOverlay = function () {
        var _a;
        var _b = this.props, lastItemLabel = _b.lastItemLabel, items = _b.items;
        var overlayColor = this.getThemeColor((_a = this.props.lastItemOverlayColor) !== null && _a !== void 0 ? _a : '');
        var formattedLabel = FormattingPresenter_1.formatLastItemLabel(lastItemLabel, { shouldAddPlus: true });
        if (!lastItemLabel) {
            return;
        }
        var imageBorderRadius = lodash_1.default.chain(items)
            .first()
            .get('imageProps.borderRadius')
            .value();
        return (<view_1.default style={[
                styles.overlayContainer,
                { backgroundColor: style_1.Colors.rgba(overlayColor, 0.6), borderRadius: imageBorderRadius }
            ]}>
        <text_1.default mainBold white>
          {formattedLabel}
        </text_1.default>
      </view_1.default>);
    };
    GridView.prototype.render = function () {
        var _a = this.props, items = _a.items, viewWidth = _a.viewWidth;
        this.itemSize = this.getItemSize();
        return (<view_1.default style={[styles.container, { width: viewWidth ? Math.floor(viewWidth) : undefined }]}>
        {this.itemSize && lodash_1.default.map(items, this.renderItem)}
      </view_1.default>);
    };
    GridView.displayName = 'GridView';
    GridView.defaultProps = {
        numColumns: 3,
        itemSpacing: style_1.Spacings.s4
    };
    return GridView;
}(UIComponent_1.default));
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap'
    },
    overlayContainer: __assign(__assign({}, react_native_1.StyleSheet.absoluteFillObject), { alignItems: 'center', justifyContent: 'center' })
});
exports.default = GridView;
