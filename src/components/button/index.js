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
exports.Button = exports.ButtonAnimationDirection = exports.ButtonSize = void 0;
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var new_1 = require("../../commons/new");
var helpers_1 = require("helpers");
var style_1 = require("style");
// @ts-ignore need to migrate to commonsNew
var commons_1 = require("commons");
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var text_1 = __importDefault(require("../text"));
var image_1 = __importDefault(require("../image"));
var ButtonTypes_1 = require("./ButtonTypes");
Object.defineProperty(exports, "ButtonSize", { enumerable: true, get: function () { return ButtonTypes_1.ButtonSize; } });
Object.defineProperty(exports, "ButtonAnimationDirection", { enumerable: true, get: function () { return ButtonTypes_1.ButtonAnimationDirection; } });
var ButtonConstants_1 = require("./ButtonConstants");
var extractColorValue = commons_1.modifiers.extractColorValue, extractTypographyValue = commons_1.modifiers.extractTypographyValue;
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    // This redundant constructor for some reason fix tests :/
    // eslint-disable-next-line
    function Button(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            size: undefined
        };
        _this.styles = createStyles();
        _this.onOrientationChanged = function () {
            if (helpers_1.Constants.isTablet && _this.props.fullWidth) {
                // only to trigger re-render
                _this.setState({ isLandscape: helpers_1.Constants.isLandscape });
            }
        };
        // This method will be called more than once in case of layout change!
        _this.onLayout = function (event) {
            var height = event.nativeEvent.layout.height;
            if (_this.props.round) {
                var width = event.nativeEvent.layout.width;
                var size = height >= width ? height : width;
                _this.setState({ size: size });
            }
            if (helpers_1.Constants.isAndroid && react_native_1.Platform.Version <= 17) {
                _this.setState({ borderRadius: height / 2 });
            }
        };
        return _this;
    }
    Button.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.animateLayout && !lodash_1.default.isEqual(prevProps, this.props)) {
            react_native_1.LayoutAnimation.configureNext(react_native_1.LayoutAnimation.Presets.easeInEaseOut);
        }
    };
    Button.prototype.componentDidMount = function () {
        helpers_1.Constants.addDimensionsEventListener(this.onOrientationChanged);
    };
    Button.prototype.componentWillUnmount = function () {
        helpers_1.Constants.removeDimensionsEventListener(this.onOrientationChanged);
    };
    Object.defineProperty(Button.prototype, "isOutline", {
        get: function () {
            var _a = this.props, outline = _a.outline, outlineColor = _a.outlineColor;
            return Boolean(outline || outlineColor);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "isFilled", {
        get: function () {
            var link = this.props.link;
            return !this.isOutline && !link;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "isIconButton", {
        get: function () {
            var _a = this.props, iconSource = _a.iconSource, label = _a.label;
            return iconSource && !label;
        },
        enumerable: false,
        configurable: true
    });
    Button.prototype.getBackgroundColor = function () {
        var _a = this.props, themeBackgroundColor = _a.backgroundColor, modifiers = _a.modifiers;
        var _b = this.props, disabled = _b.disabled, outline = _b.outline, link = _b.link, disabledBackgroundColor = _b.disabledBackgroundColor, propsBackgroundColor = _b.backgroundColor;
        var stateBackgroundColor = modifiers.backgroundColor;
        if (!outline && !link) {
            if (disabled) {
                return disabledBackgroundColor || ButtonConstants_1.DISABLED_COLOR;
            }
            return propsBackgroundColor || stateBackgroundColor || themeBackgroundColor || style_1.Colors.primary;
        }
        return 'transparent';
    };
    Button.prototype.getActiveBackgroundColor = function () {
        var getActiveBackgroundColor = this.props.getActiveBackgroundColor;
        if (getActiveBackgroundColor) {
            return getActiveBackgroundColor(this.getBackgroundColor(), this.props);
        }
    };
    Button.prototype.getLabelColor = function () {
        var _a = this.props, link = _a.link, linkColor = _a.linkColor, outline = _a.outline, outlineColor = _a.outlineColor, disabled = _a.disabled, propsColor = _a.color;
        var color = style_1.Colors.white;
        if (link) {
            color = linkColor || style_1.Colors.primary;
        }
        else if (outline) {
            color = outlineColor || style_1.Colors.primary;
        }
        else if (this.isIconButton) {
            color = undefined; // Colors.dark10;
        }
        if (disabled && (link || outline)) {
            return ButtonConstants_1.DISABLED_COLOR;
        }
        color = propsColor || extractColorValue(this.props) || color;
        return color;
    };
    Button.prototype.getLabelSizeStyle = function () {
        var size = this.props.size || ButtonConstants_1.DEFAULT_SIZE;
        var LABEL_STYLE_BY_SIZE = {};
        LABEL_STYLE_BY_SIZE[Button.sizes.xSmall] = __assign({}, style_1.Typography.text80);
        LABEL_STYLE_BY_SIZE[Button.sizes.small] = __assign({}, style_1.Typography.text80);
        LABEL_STYLE_BY_SIZE[Button.sizes.medium] = __assign({}, style_1.Typography.text80);
        LABEL_STYLE_BY_SIZE[Button.sizes.large] = {};
        var labelSizeStyle = LABEL_STYLE_BY_SIZE[size];
        return labelSizeStyle;
    };
    Button.prototype.getContainerSizeStyle = function () {
        var _a = this.props, outline = _a.outline, link = _a.link, avoidMinWidth = _a.avoidMinWidth, avoidInnerPadding = _a.avoidInnerPadding, round = _a.round;
        var size = this.props.size || ButtonConstants_1.DEFAULT_SIZE;
        var outlineWidth = this.props.outlineWidth || 1;
        var CONTAINER_STYLE_BY_SIZE = {};
        CONTAINER_STYLE_BY_SIZE[Button.sizes.xSmall] = round
            ? { height: this.state.size, width: this.state.size, padding: ButtonConstants_1.PADDINGS.XSMALL }
            : {
                paddingVertical: ButtonConstants_1.PADDINGS.XSMALL,
                paddingHorizontal: ButtonConstants_1.HORIZONTAL_PADDINGS.XSMALL,
                minWidth: ButtonConstants_1.MIN_WIDTH.XSMALL
            };
        CONTAINER_STYLE_BY_SIZE[Button.sizes.small] = round
            ? { height: this.state.size, width: this.state.size, padding: ButtonConstants_1.PADDINGS.SMALL }
            : {
                paddingVertical: ButtonConstants_1.PADDINGS.SMALL,
                paddingHorizontal: ButtonConstants_1.HORIZONTAL_PADDINGS.SMALL,
                minWidth: ButtonConstants_1.MIN_WIDTH.SMALL
            };
        CONTAINER_STYLE_BY_SIZE[Button.sizes.medium] = round
            ? { height: this.state.size, width: this.state.size, padding: ButtonConstants_1.PADDINGS.MEDIUM }
            : {
                paddingVertical: ButtonConstants_1.PADDINGS.MEDIUM,
                paddingHorizontal: ButtonConstants_1.HORIZONTAL_PADDINGS.MEDIUM,
                minWidth: ButtonConstants_1.MIN_WIDTH.MEDIUM
            };
        CONTAINER_STYLE_BY_SIZE[Button.sizes.large] = round
            ? { height: this.state.size, width: this.state.size, padding: ButtonConstants_1.PADDINGS.LARGE }
            : {
                paddingVertical: ButtonConstants_1.PADDINGS.LARGE,
                paddingHorizontal: ButtonConstants_1.HORIZONTAL_PADDINGS.LARGE,
                minWidth: ButtonConstants_1.MIN_WIDTH.LARGE
            };
        if (outline) {
            lodash_1.default.forEach(CONTAINER_STYLE_BY_SIZE, function (style) {
                if (round) {
                    style.padding -= outlineWidth; // eslint-disable-line
                }
                else {
                    style.paddingVertical -= outlineWidth; // eslint-disable-line
                    style.paddingHorizontal -= outlineWidth; // eslint-disable-line
                }
            });
        }
        var containerSizeStyle = CONTAINER_STYLE_BY_SIZE[size];
        if (link || (this.isIconButton && !round)) {
            containerSizeStyle.paddingVertical = undefined;
            containerSizeStyle.paddingHorizontal = undefined;
            containerSizeStyle.minWidth = undefined;
        }
        if (avoidMinWidth) {
            containerSizeStyle.minWidth = undefined;
        }
        if (avoidInnerPadding) {
            containerSizeStyle.paddingVertical = undefined;
            containerSizeStyle.paddingHorizontal = undefined;
        }
        return containerSizeStyle;
    };
    Button.prototype.getOutlineStyle = function () {
        var _a = this.props, outline = _a.outline, outlineColor = _a.outlineColor, outlineWidth = _a.outlineWidth, link = _a.link, disabled = _a.disabled;
        var outlineStyle;
        if ((outline || outlineColor) && !link) {
            outlineStyle = {
                borderWidth: outlineWidth || 1,
                borderColor: outlineColor || style_1.Colors.primary
            };
            if (disabled) {
                outlineStyle.borderColor = style_1.Colors.dark70;
            }
        }
        return outlineStyle;
    };
    Button.prototype.getBorderRadiusStyle = function () {
        var _a = this.props, link = _a.link, fullWidth = _a.fullWidth, borderRadiusFromProps = _a.borderRadius, modifiers = _a.modifiers;
        if (link || fullWidth || borderRadiusFromProps === 0) {
            return { borderRadius: 0 };
        }
        var borderRadiusFromState = modifiers.borderRadius;
        var borderRadius = borderRadiusFromProps || borderRadiusFromState || style_1.BorderRadiuses.br100;
        return { borderRadius: borderRadius };
    };
    Button.prototype.getShadowStyle = function () {
        var backgroundColor = this.getBackgroundColor();
        var enableShadow = this.props.enableShadow;
        if (enableShadow) {
            return [this.styles.shadowStyle, backgroundColor && { shadowColor: backgroundColor }];
        }
    };
    Button.prototype.getIconStyle = function () {
        var _a = this.props, disabled = _a.disabled, propsIconStyle = _a.iconStyle, iconOnRight = _a.iconOnRight;
        var size = this.props.size || ButtonConstants_1.DEFAULT_SIZE;
        var iconStyle = {
            tintColor: this.getLabelColor()
        };
        var marginSide = [Button.sizes.large, Button.sizes.medium].includes(size) ? 8 : 4;
        if (!this.isIconButton) {
            if (iconOnRight) {
                iconStyle.marginLeft = marginSide;
            }
            else {
                iconStyle.marginRight = marginSide;
            }
        }
        if (disabled && !this.isFilled) {
            iconStyle.tintColor = style_1.Colors.dark60;
        }
        return [iconStyle, propsIconStyle];
    };
    Button.prototype.getAnimationDirectionStyle = function () {
        var animateTo = this.props.animateTo;
        var style;
        switch (animateTo) {
            case 'left':
                style = { alignSelf: 'flex-start' };
                break;
            case 'right':
                style = { alignSelf: 'flex-end' };
                break;
            default:
                // 'center' is the default
                break;
        }
        return style;
    };
    Button.prototype.renderIcon = function () {
        var _a = this.props, iconSource = _a.iconSource, supportRTL = _a.supportRTL;
        if (iconSource) {
            var iconStyle = this.getIconStyle();
            if (typeof iconSource === 'function') {
                return iconSource(iconStyle);
            }
            else {
                return <image_1.default source={iconSource} supportRTL={supportRTL} style={iconStyle}/>;
            }
        }
        return null;
    };
    Button.prototype.renderLabel = function () {
        var _a = this.props, label = _a.label, labelStyle = _a.labelStyle, labelProps = _a.labelProps;
        var typography = extractTypographyValue(this.props);
        var color = this.getLabelColor();
        var labelSizeStyle = this.getLabelSizeStyle();
        if (label) {
            return (<text_1.default style={[this.styles.text, !!color && { color: color }, labelSizeStyle, __assign({}, typography), labelStyle]} numberOfLines={1} {...labelProps}>
          {label}
        </text_1.default>);
        }
        return null;
    };
    Button.prototype.render = function () {
        var _a = this.props, onPress = _a.onPress, disabled = _a.disabled, link = _a.link, style = _a.style, testID = _a.testID, animateLayout = _a.animateLayout, modifiers = _a.modifiers, forwardedRef = _a.forwardedRef, others = __rest(_a, ["onPress", "disabled", "link", "style", "testID", "animateLayout", "modifiers", "forwardedRef"]);
        var shadowStyle = this.getShadowStyle();
        var margins = modifiers.margins;
        var backgroundColor = this.getBackgroundColor();
        var outlineStyle = this.getOutlineStyle();
        var containerSizeStyle = this.getContainerSizeStyle();
        var borderRadiusStyle = this.getBorderRadiusStyle();
        return (<touchableOpacity_1.default row centerV style={[
                this.styles.container,
                animateLayout && this.getAnimationDirectionStyle(),
                containerSizeStyle,
                link && this.styles.innerContainerLink,
                shadowStyle,
                margins,
                backgroundColor && { backgroundColor: backgroundColor },
                borderRadiusStyle,
                outlineStyle,
                style
            ]} activeOpacity={0.6} activeBackgroundColor={this.getActiveBackgroundColor()} onLayout={this.onLayout} onPress={onPress} disabled={disabled} testID={testID} {...others} ref={forwardedRef}>
        {this.props.children}
        {this.props.iconOnRight ? this.renderLabel() : this.renderIcon()}
        {this.props.iconOnRight ? this.renderIcon() : this.renderLabel()}
      </touchableOpacity_1.default>);
    };
    Button.displayName = 'Button';
    Button.defaultProps = ButtonTypes_1.DEFAULT_PROPS;
    Button.sizes = ButtonTypes_1.ButtonSize;
    Button.animationDirection = ButtonTypes_1.ButtonAnimationDirection;
    return Button;
}(react_1.PureComponent));
exports.Button = Button;
function createStyles() {
    return react_native_1.StyleSheet.create({
        container: {
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center'
        },
        containerDisabled: {
            backgroundColor: style_1.Colors.dark60
        },
        innerContainerLink: {
            minWidth: undefined,
            paddingHorizontal: undefined,
            paddingVertical: undefined,
            borderRadius: style_1.BorderRadiuses.br0,
            backgroundColor: undefined
        },
        shadowStyle: {
            shadowColor: style_1.Colors.blue10,
            shadowOffset: { height: 5, width: 0 },
            shadowOpacity: 0.35,
            shadowRadius: 9.5,
            elevation: 2
        },
        text: __assign({ backgroundColor: 'transparent', flex: 0, flexDirection: 'row' }, style_1.Typography.text70)
    });
}
exports.default = new_1.asBaseComponent(new_1.forwardRef(Button));
