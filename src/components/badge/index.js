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
exports.Badge = exports.BADGE_SIZES = void 0;
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_animatable_1 = require("react-native-animatable");
var modifiers_1 = require("../../commons/modifiers");
var new_1 = require("../../commons/new");
var style_1 = require("../../style");
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var image_1 = __importDefault(require("../image"));
var view_1 = __importDefault(require("../view"));
var LABEL_FORMATTER_VALUES = [1, 2, 3, 4];
// TODO: depreciate enum badge sizes, use only number for size
var BADGE_SIZES;
(function (BADGE_SIZES) {
    BADGE_SIZES[BADGE_SIZES["pimpleSmall"] = 6] = "pimpleSmall";
    BADGE_SIZES[BADGE_SIZES["pimpleBig"] = 10] = "pimpleBig";
    BADGE_SIZES[BADGE_SIZES["pimpleHuge"] = 14] = "pimpleHuge";
    BADGE_SIZES[BADGE_SIZES["small"] = 16] = "small";
    BADGE_SIZES[BADGE_SIZES["default"] = 20] = "default";
    BADGE_SIZES[BADGE_SIZES["large"] = 24] = "large";
})(BADGE_SIZES = exports.BADGE_SIZES || (exports.BADGE_SIZES = {}));
/**
 * @description: Round colored badge, typically used to show a number
 * @extends: Animatable.View
 * @extendsLink: https://github.com/oblador/react-native-animatable
 * @image: https://user-images.githubusercontent.com/33805983/34480753-df7a868a-efb6-11e7-9072-80f5c110a4f3.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BadgesScreen.tsx
 */
var Badge = /** @class */ (function (_super) {
    __extends(Badge, _super);
    function Badge(props) {
        var _this = _super.call(this, props) || this;
        _this.styles = createStyles(props);
        if (props.testId) {
            console.warn('Badge prop \'testId\' is deprecated. Please use RN \'testID\' prop instead.');
        }
        return _this;
    }
    Object.defineProperty(Badge.prototype, "size", {
        get: function () {
            return this.props.size || 'default';
        },
        enumerable: false,
        configurable: true
    });
    Badge.prototype.getAccessibilityProps = function () {
        var _a = this.props, onPress = _a.onPress, icon = _a.icon, label = _a.label, accessibilityLabel = _a.accessibilityLabel;
        return __assign(__assign({ accessibilityLabel: accessibilityLabel || label ? label + " new items" : 'badge' }, modifiers_1.extractAccessibilityProps(this.props)), { accessible: !lodash_1.default.isUndefined(label), accessibilityRole: onPress ? 'button' : icon ? 'image' : 'text' });
    };
    Badge.prototype.isSmallBadge = function () {
        return this.size === 'small';
    };
    Badge.prototype.getBadgeSizeStyle = function () {
        var _a = this.props, borderWidth = _a.borderWidth, icon = _a.icon, customElement = _a.customElement;
        var label = this.getFormattedLabel();
        var badgeHeight = lodash_1.default.isNumber(this.size) ? this.size : BADGE_SIZES[this.size];
        var style = {
            paddingHorizontal: this.isSmallBadge() ? 4 : 6,
            height: badgeHeight,
            minWidth: badgeHeight
        };
        if (icon && label) {
            style.paddingRight = 6;
            style.paddingLeft = 4;
            style.height = style_1.Spacings.s5;
            if (borderWidth) {
                style.height += borderWidth * 2;
            }
            return style;
        }
        if (customElement) {
            return style;
        }
        var isPimple = label === undefined;
        if (isPimple || icon) {
            style.paddingHorizontal = 0;
            style.minWidth = undefined;
            style.width = style.height;
            if (borderWidth) {
                style.height += borderWidth * 2;
                style.width += borderWidth * 2;
            }
            return style;
        }
        if (borderWidth) {
            style.height += borderWidth * 2;
            style.minWidth += borderWidth * 2;
        }
        return style;
    };
    Badge.prototype.getFormattedLabel = function () {
        var _a = this.props, labelFormatterLimit = _a.labelFormatterLimit, label = _a.label;
        if (lodash_1.default.isNaN(label)) {
            return label;
        }
        if (LABEL_FORMATTER_VALUES.includes(labelFormatterLimit)) {
            var maxLabelNumber = Math.pow(10, labelFormatterLimit) - 1;
            var formattedLabel = label;
            if (formattedLabel > maxLabelNumber) {
                formattedLabel = maxLabelNumber + "+";
            }
            return formattedLabel;
        }
        else {
            return label;
        }
    };
    Badge.prototype.getBorderStyling = function () {
        var _a = this.props, borderWidth = _a.borderWidth, borderColor = _a.borderColor, borderRadius = _a.borderRadius;
        var style = {};
        if (borderWidth) {
            style.borderWidth = borderWidth;
            style.borderColor = borderColor;
        }
        if (borderRadius) {
            style.borderRadius = borderRadius;
        }
        return style;
    };
    Badge.prototype.renderLabel = function () {
        var _a = this.props, labelStyle = _a.labelStyle, label = _a.label;
        if (label) {
            return (<react_native_1.Text style={[this.styles.label, this.isSmallBadge() && this.styles.labelSmall, labelStyle]} allowFontScaling={false} numberOfLines={1} testID="badge">
          {this.getFormattedLabel()}
        </react_native_1.Text>);
        }
    };
    Badge.prototype.renderCustomElement = function () {
        var customElement = this.props.customElement;
        return customElement;
    };
    Badge.prototype.renderIcon = function () {
        var _a = this.props, icon = _a.icon, iconStyle = _a.iconStyle, iconProps = _a.iconProps, borderColor = _a.borderColor, label = _a.label;
        var flex = label ? 0 : 1;
        return (icon && (<image_1.default source={icon} resizeMode="contain" 
        //@ts-ignore
        borderColor={borderColor} {...iconProps} style={__assign({ flex: flex }, iconStyle)}/>));
    };
    Badge.prototype.render = function () {
        // TODO: remove testId after deprecation
        var _a = this.props, activeOpacity = _a.activeOpacity, backgroundColor = _a.backgroundColor, containerStyle = _a.containerStyle, hitSlop = _a.hitSlop, onPress = _a.onPress, testId = _a.testId, testID = _a.testID, others = __rest(_a, ["activeOpacity", "backgroundColor", "containerStyle", "hitSlop", "onPress", "testId", "testID"]);
        var backgroundStyle = backgroundColor && { backgroundColor: backgroundColor };
        var sizeStyle = this.getBadgeSizeStyle();
        var borderStyle = this.getBorderStyling();
        var animationProps = modifiers_1.extractAnimationProps();
        var Container = !lodash_1.default.isEmpty(animationProps) ? react_native_animatable_1.View : onPress ? touchableOpacity_1.default : view_1.default;
        if (!lodash_1.default.isEmpty(animationProps)) {
            console.warn('Badge component will soon stop supporting animationProps.' +
                'Please wrap your Badge component with your own animation component, such as Animatable.View');
        }
        return (
        // The extra View wrapper is to break badge's flex-ness
        // @ts-ignore
        <view_1.default style={containerStyle} {...others} backgroundColor={undefined} 
        // @ts-expect-error
        borderWidth={undefined} {...this.getAccessibilityProps()}>
        <Container testID={testID || testId} pointerEvents={'none'} style={[sizeStyle, this.styles.badge, borderStyle, backgroundStyle]} onPress={onPress} activeOpacity={activeOpacity} hitSlop={hitSlop} {...animationProps} row>
          {this.renderCustomElement()}
          {this.renderIcon()}
          {this.renderLabel()}
        </Container>
      </view_1.default>);
    };
    Badge.displayName = 'Badge';
    return Badge;
}(react_1.PureComponent));
exports.Badge = Badge;
function createStyles(props) {
    var styles = react_native_1.StyleSheet.create({
        badge: {
            alignSelf: 'flex-start',
            borderRadius: style_1.BorderRadiuses.br100,
            backgroundColor: (!props.icon || props.customElement) ? style_1.Colors.primary : undefined,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        },
        label: __assign(__assign({}, style_1.Typography.text90), { color: style_1.Colors.white, backgroundColor: 'transparent' }),
        labelSmall: __assign(__assign({}, style_1.Typography.text100), { lineHeight: undefined })
    });
    return styles;
}
exports.default = new_1.asBaseComponent(Badge);
