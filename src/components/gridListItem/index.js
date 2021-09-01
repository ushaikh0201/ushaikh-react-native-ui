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
var lodash_1 = __importDefault(require("lodash"));
var Modifiers = __importStar(require("../../commons/modifiers"));
var style_1 = require("style");
var view_1 = __importDefault(require("../view"));
var text_1 = __importDefault(require("../text"));
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var image_1 = __importDefault(require("../image"));
/**
 * @description: A single grid view/list item component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/GridViewScreen.tsx
 */
var GridListItem = /** @class */ (function (_super) {
    __extends(GridListItem, _super);
    function GridListItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.onItemPress = function () {
            var _a, _b;
            (_b = (_a = _this.props).onPress) === null || _b === void 0 ? void 0 : _b.call(_a, _this.props);
        };
        return _this;
    }
    GridListItem.prototype.getItemSizeObj = function () {
        var itemSize = this.props.itemSize;
        if (lodash_1.default.isPlainObject(itemSize)) {
            return itemSize;
        }
        return { width: itemSize, height: itemSize };
    };
    GridListItem.prototype.renderContent = function (_a) {
        var text = _a.text, typography = _a.typography, color = _a.color, _b = _a.numberOfLines, numberOfLines = _b === void 0 ? 1 : _b, style = _a.style, testID = _a.testID;
        var alignToStart = this.props.alignToStart;
        if (text) {
            return (<text_1.default testID={testID} 
            // @ts-ignore
            style={[style, style_1.Typography[typography], color && { color: color }, alignToStart && styles.contentAlignedToStart]} numberOfLines={numberOfLines}>
          {text}
        </text_1.default>);
        }
    };
    GridListItem.prototype.render = function () {
        var _a = this.props, testID = _a.testID, imageProps = _a.imageProps, alignToStart = _a.alignToStart, containerStyle = _a.containerStyle, containerProps = _a.containerProps, renderCustomItem = _a.renderCustomItem, children = _a.children, title = _a.title, titleTypography = _a.titleTypography, titleColor = _a.titleColor, titleLines = _a.titleLines, overlayText = _a.overlayText, overlayTextContainerStyle = _a.overlayTextContainerStyle, subtitle = _a.subtitle, subtitleTypography = _a.subtitleTypography, subtitleColor = _a.subtitleColor, subtitleLines = _a.subtitleLines, description = _a.description, descriptionTypography = _a.descriptionTypography, descriptionColor = _a.descriptionColor, descriptionLines = _a.descriptionLines, onPress = _a.onPress, renderOverlay = _a.renderOverlay;
        var hasPress = lodash_1.default.isFunction(onPress);
        var hasOverlay = lodash_1.default.isFunction(renderOverlay);
        var Container = hasPress ? touchableOpacity_1.default : view_1.default;
        var imageStyle = __assign({}, this.getItemSizeObj());
        var width = lodash_1.default.get(imageStyle, 'width');
        var TextContainer = overlayText ? view_1.default : react_1.default.Fragment;
        var textContainerStyle = overlayText ? { style: [styles.overlayText, overlayTextContainerStyle] } : null;
        var imageBorderRadius = imageProps === null || imageProps === void 0 ? void 0 : imageProps.borderRadius;
        return (<Container style={[styles.container, alignToStart && styles.containerAlignedToStart, { width: width }, containerStyle]} {...containerProps} onPress={hasPress ? this.onItemPress : undefined} accessible={renderCustomItem ? true : undefined} {...Modifiers.extractAccessibilityProps(this.props)}>
        {imageProps && (<view_1.default style={[{ borderRadius: imageBorderRadius }, imageStyle]}>
            <image_1.default {...imageProps} style={[imageStyle, imageProps === null || imageProps === void 0 ? void 0 : imageProps.style]}/>
            {children}
          </view_1.default>)}
        {!lodash_1.default.isNil(renderCustomItem) && <view_1.default style={{ width: width }}>{renderCustomItem()}</view_1.default>}
        {hasOverlay && <view_1.default style={[styles.overlay, this.getItemSizeObj()]}>{renderOverlay === null || renderOverlay === void 0 ? void 0 : renderOverlay()}</view_1.default>}
        <TextContainer {...textContainerStyle}>
          {this.renderContent({
                testID: testID + ".title",
                text: title,
                typography: titleTypography,
                color: titleColor,
                numberOfLines: titleLines,
                style: styles.title
            })}
          {this.renderContent({
                testID: testID + ".subtitle",
                text: subtitle,
                typography: subtitleTypography,
                color: subtitleColor,
                numberOfLines: subtitleLines,
                style: styles.subtitle
            })}
          {this.renderContent({
                testID: testID + ".description",
                text: description,
                typography: descriptionTypography,
                color: descriptionColor,
                numberOfLines: descriptionLines,
                style: styles.description
            })}
        </TextContainer>
      </Container>);
    };
    GridListItem.displayName = 'GridListItem';
    GridListItem.defaultProps = {
        itemSize: 48
    };
    return GridListItem;
}(react_1.Component));
var styles = react_native_1.StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        alignItems: 'center'
    },
    containerAlignedToStart: {
        alignItems: 'flex-start'
    },
    title: __assign({ marginTop: style_1.Spacings.s1, textAlign: 'center' }, style_1.Typography.bodySmallBold),
    subtitle: __assign({ textAlign: 'center' }, style_1.Typography.subtext),
    description: __assign(__assign({ textAlign: 'center' }, style_1.Typography.subtext), { color: style_1.Colors.grey30 }),
    contentAlignedToStart: {
        textAlign: 'left'
    },
    overlay: {
        position: 'absolute',
        left: 0,
        top: 0
    },
    overlayText: {
        position: 'absolute',
        bottom: 10,
        left: 10
    }
});
exports.default = GridListItem;
