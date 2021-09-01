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
exports.Avatar = exports.BadgePosition = exports.StatusModes = void 0;
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var memoize_one_1 = __importDefault(require("memoize-one"));
var style_1 = require("../../style");
var new_1 = require("../../commons/new");
var modifiers_1 = require("../../commons/modifiers");
//@ts-ignore
var badge_1 = __importStar(require("../badge"));
var view_1 = __importDefault(require("../view"));
var text_1 = __importDefault(require("../text"));
var image_1 = __importDefault(require("../image"));
// @ts-ignore
var animatedImage_1 = __importDefault(require("../animatedImage"));
var AvatarHelper = __importStar(require("../../helpers/AvatarHelper"));
var deprecatedProps = [
    { old: 'isOnline', new: 'badgeProps.backgroundColor' },
    { old: 'status', new: 'badgeProps.backgroundColor' },
    { old: 'imageSource', new: 'source' }
];
var StatusModes;
(function (StatusModes) {
    StatusModes["ONLINE"] = "ONLINE";
    StatusModes["OFFLINE"] = "OFFLINE";
    StatusModes["AWAY"] = "AWAY";
    StatusModes["NONE"] = "NONE";
})(StatusModes = exports.StatusModes || (exports.StatusModes = {}));
var BadgePosition;
(function (BadgePosition) {
    BadgePosition["TOP_RIGHT"] = "TOP_RIGHT";
    BadgePosition["TOP_LEFT"] = "TOP_LEFT";
    BadgePosition["BOTTOM_RIGHT"] = "BOTTOM_RIGHT";
    BadgePosition["BOTTOM_LEFT"] = "BOTTOM_LEFT";
})(BadgePosition = exports.BadgePosition || (exports.BadgePosition = {}));
var DEFAULT_BADGE_SIZE = 'pimpleBig';
/**
 * @description: Avatar component for displaying user profile images
 * @extends: TouchableOpacity, Image
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Avatar/Avarat_1.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Avatar/Avarat_2.png?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/AvatarsScreen.tsx
 */
var Avatar = /** @class */ (function (_super) {
    __extends(Avatar, _super);
    function Avatar(props) {
        var _this = _super.call(this, props) || this;
        _this.getBadgeBorderWidth = function () { return lodash_1.default.get(_this.props, 'badgeProps.borderWidth', 0); };
        _this.getBadgeSize = function () {
            var _a, _b, _c;
            var badgeSize = (_c = (_b = (_a = _this.props) === null || _a === void 0 ? void 0 : _a.badgeProps) === null || _b === void 0 ? void 0 : _b.size) !== null && _c !== void 0 ? _c : DEFAULT_BADGE_SIZE;
            if (lodash_1.default.isString(badgeSize)) {
                return badge_1.BADGE_SIZES[badgeSize] || badge_1.BADGE_SIZES[DEFAULT_BADGE_SIZE];
            }
            return badgeSize;
        };
        _this.getBadgePosition = function () {
            var _a;
            var _b = _this.props, size = _b.size, badgePosition = _b.badgePosition;
            var radius = size / 2;
            var x = Math.sqrt(Math.pow(radius, 2) * 2);
            var y = x - radius;
            var shift = Math.sqrt(Math.pow(y, 2) / 2) - (_this.getBadgeSize() + _this.getBadgeBorderWidth() * 2) / 2;
            var badgeLocation = lodash_1.default.split(lodash_1.default.toLower(badgePosition), '_', 2);
            var badgeAlignment = (_a = { position: 'absolute' }, _a[badgeLocation[0]] = shift, _a[badgeLocation[1]] = shift, _a);
            return badgeAlignment;
        };
        _this.getText = memoize_one_1.default(function (label, name) {
            var text = label;
            if (lodash_1.default.isNil(label) && !lodash_1.default.isNil(name)) {
                text = AvatarHelper.getInitials(name);
            }
            return text;
        });
        _this.getBackgroundColor = memoize_one_1.default(function (text, avatarColors, hashFunction, defaultColor) {
            return AvatarHelper.getBackgroundColor(text, avatarColors, hashFunction, defaultColor);
        });
        _this.styles = createStyles(props);
        deprecatedProps.forEach(function (prop) {
            //@ts-ignore
            if (props[prop.old]) {
                console.warn("\"Avatar's " + prop.old + "\" property is deprecated, please use \"" + prop.new + "\"");
            }
        });
        return _this;
    }
    Avatar.prototype.getContainerStyle = function () {
        var size = this.props.size;
        return {
            width: size,
            height: size,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: size / 2
        };
    };
    Avatar.prototype.getInitialsContainer = function () {
        var size = this.props.size;
        return __assign(__assign({}, react_native_1.StyleSheet.absoluteFillObject), { alignItems: 'center', justifyContent: 'center', borderRadius: size / 2 });
    };
    Avatar.prototype.getRibbonStyle = function () {
        var size = this.props.size;
        return {
            position: 'absolute',
            top: '10%',
            left: size / 1.7,
            borderRadius: size / 2
        };
    };
    Avatar.prototype.getStatusBadgeColor = function (status) {
        switch (status) {
            case Avatar.modes.AWAY:
                return style_1.Colors.yellow30;
            case Avatar.modes.ONLINE:
                return style_1.Colors.green30;
            case Avatar.modes.OFFLINE:
                return style_1.Colors.dark60;
            case Avatar.modes.NONE:
            default:
                return null;
        }
    };
    Avatar.prototype.getBadgeColor = function () {
        var _a = this.props, isOnline = _a.isOnline, status = _a.status;
        var statusColor = this.getStatusBadgeColor(status);
        var onlineColor = isOnline ? style_1.Colors.green30 : undefined;
        return lodash_1.default.get(this.props, 'badgeProps.backgroundColor') || statusColor || onlineColor;
    };
    Avatar.prototype.renderBadge = function () {
        var _a = this.props, testID = _a.testID, badgeProps = _a.badgeProps;
        if (badgeProps || this.getBadgeColor()) {
            return (<badge_1.default backgroundColor={this.getBadgeColor()} size={this.getBadgeSize()} {...badgeProps} containerStyle={this.getBadgePosition()} testID={testID + ".onlineBadge"}/>);
        }
    };
    Avatar.prototype.renderRibbon = function () {
        var _a = this.props, ribbonLabel = _a.ribbonLabel, ribbonStyle = _a.ribbonStyle, ribbonLabelStyle = _a.ribbonLabelStyle, customRibbon = _a.customRibbon;
        if (ribbonLabel) {
            return customRibbon ? (<view_1.default style={this.getRibbonStyle()}>{customRibbon}</view_1.default>) : (<view_1.default style={[this.getRibbonStyle(), this.styles.ribbon, ribbonStyle]}>
          <text_1.default numberOfLines={1} text100 white style={[ribbonLabelStyle]}>
            {ribbonLabel}
          </text_1.default>
        </view_1.default>);
        }
    };
    Avatar.prototype.renderImage = function () {
        var _a = this.props, animate = _a.animate, source = _a.source, 
        // @ts-ignore
        imageSource = _a.imageSource, onImageLoadStart = _a.onImageLoadStart, onImageLoadEnd = _a.onImageLoadEnd, onImageLoadError = _a.onImageLoadError, testID = _a.testID, imageProps = _a.imageProps, imageStyle = _a.imageStyle;
        var hasImage = !lodash_1.default.isUndefined(imageSource) || !lodash_1.default.isUndefined(source);
        var ImageContainer = animate ? animatedImage_1.default : image_1.default;
        var avatarImageSource = imageSource || source;
        if (hasImage) {
            return (<ImageContainer animate={animate} style={[this.getContainerStyle(), react_native_1.StyleSheet.absoluteFillObject, imageStyle]} source={avatarImageSource} onLoadStart={onImageLoadStart} onLoadEnd={onImageLoadEnd} onError={onImageLoadError} testID={testID + ".image"} containerStyle={this.getContainerStyle()} {...imageProps}/>);
        }
    };
    Object.defineProperty(Avatar.prototype, "text", {
        get: function () {
            var _a = this.props, label = _a.label, name = _a.name;
            return this.getText(label, name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Avatar.prototype, "backgroundColor", {
        get: function () {
            var _a = this.props, backgroundColor = _a.backgroundColor, useAutoColors = _a.useAutoColors, autoColorsConfig = _a.autoColorsConfig, name = _a.name;
            if (backgroundColor) {
                return backgroundColor;
            }
            var _b = autoColorsConfig || {}, _c = _b.avatarColors, avatarColors = _c === void 0 ? AvatarHelper.getAvatarColors() : _c, _d = _b.hashFunction, hashFunction = _d === void 0 ? AvatarHelper.hashStringToNumber : _d, _e = _b.defaultColor, defaultColor = _e === void 0 ? style_1.Colors.grey80 : _e;
            if (useAutoColors) {
                return this.getBackgroundColor(name, avatarColors, hashFunction, defaultColor);
            }
            else {
                return defaultColor;
            }
        },
        enumerable: false,
        configurable: true
    });
    Avatar.prototype.render = function () {
        var _a = this.props, color = _a.labelColor, source = _a.source, 
        //@ts-ignore
        imageSource = _a.imageSource, onPress = _a.onPress, containerStyle = _a.containerStyle, children = _a.children, size = _a.size, testID = _a.testID, 
        //@ts-ignore
        forwardedRef = _a.forwardedRef;
        var Container = onPress ? react_native_1.TouchableOpacity : view_1.default;
        var hasImage = !lodash_1.default.isUndefined(imageSource) || !lodash_1.default.isUndefined(source);
        var fontSizeToImageSizeRatio = 0.32;
        var fontSize = size * fontSizeToImageSizeRatio;
        var text = this.text;
        return (<Container style={[this.getContainerStyle(), containerStyle]} ref={forwardedRef} testID={testID} onPress={onPress} accessible={!lodash_1.default.isUndefined(onPress)} accessibilityLabel={'Avatar'} accessibilityRole={onPress ? 'button' : 'image'} {...modifiers_1.extractAccessibilityProps(this.props)}>
        <view_1.default style={[
                this.getInitialsContainer(),
                { backgroundColor: this.backgroundColor },
                hasImage && this.styles.initialsContainerWithInset
            ]}>
          {!lodash_1.default.isUndefined(text) && (<text_1.default numberOfLines={1} style={[{ fontSize: fontSize }, this.styles.initials, { color: color }]} testID={testID + ".label"}>
              {text}
            </text_1.default>)}
        </view_1.default>
        {this.renderImage()}
        {this.renderBadge()}
        {this.renderRibbon()}
        {children}
      </Container>);
    };
    Avatar.displayName = 'Avatar';
    Avatar.modes = StatusModes;
    Avatar.badgePosition = BadgePosition;
    Avatar.defaultProps = {
        animate: false,
        size: 50,
        labelColor: style_1.Colors.dark10,
        badgePosition: BadgePosition.TOP_RIGHT
    };
    return Avatar;
}(react_1.PureComponent));
exports.Avatar = Avatar;
function createStyles(props) {
    var labelColor = props.labelColor;
    var styles = react_native_1.StyleSheet.create({
        initialsContainerWithInset: {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1
        },
        initials: {
            color: labelColor,
            backgroundColor: 'transparent',
            lineHeight: undefined
        },
        ribbon: {
            backgroundColor: style_1.Colors.primary,
            paddingHorizontal: 6,
            paddingVertical: 3
        }
    });
    return styles;
}
exports.default = new_1.asBaseComponent(new_1.forwardRef(Avatar));
