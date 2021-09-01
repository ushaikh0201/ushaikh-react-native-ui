"use strict";
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
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var assets_1 = __importDefault(require("../../assets"));
var new_1 = require("../../commons/new");
var style_1 = require("style");
var avatar_1 = __importDefault(require("../avatar"));
var badge_1 = __importStar(require("../badge"));
var image_1 = __importDefault(require("../image"));
var text_1 = __importDefault(require("../text"));
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var view_1 = __importDefault(require("../view"));
var DEFAULT_SIZE = 26;
/**
 * @description: Chip component
 * @extends: TouchableOpacity
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ChipScreen.tsx
 * @image: https://user-images.githubusercontent.com/1780255/119636022-e9743180-be1c-11eb-8f02-22eeab6558cd.png
 */
var Chip = function (_a) {
    var avatarProps = _a.avatarProps, backgroundColor = _a.backgroundColor, badgeProps = _a.badgeProps, useCounter = _a.useCounter, _b = _a.borderRadius, borderRadius = _b === void 0 ? style_1.BorderRadiuses.br100 : _b, containerStyle = _a.containerStyle, onDismiss = _a.onDismiss, dismissColor = _a.dismissColor, _c = _a.dismissIcon, dismissIcon = _c === void 0 ? assets_1.default.icons.x : _c, dismissIconStyle = _a.dismissIconStyle, dismissContainerStyle = _a.dismissContainerStyle, iconProps = _a.iconProps, iconSource = _a.iconSource, iconStyle = _a.iconStyle, rightIconSource = _a.rightIconSource, leftElement = _a.leftElement, rightElement = _a.rightElement, label = _a.label, labelStyle = _a.labelStyle, onPress = _a.onPress, resetSpacings = _a.resetSpacings, _d = _a.size, size = _d === void 0 ? DEFAULT_SIZE : _d, _e = _a.useSizeAsMinimum, useSizeAsMinimum = _e === void 0 ? true : _e, testID = _a.testID, others = __rest(_a, ["avatarProps", "backgroundColor", "badgeProps", "useCounter", "borderRadius", "containerStyle", "onDismiss", "dismissColor", "dismissIcon", "dismissIconStyle", "dismissContainerStyle", "iconProps", "iconSource", "iconStyle", "rightIconSource", "leftElement", "rightElement", "label", "labelStyle", "onPress", "resetSpacings", "size", "useSizeAsMinimum", "testID"]);
    var renderIcon = react_1.useCallback(function (iconPosition) {
        var isLeftIcon = iconPosition === 'left';
        return (<image_1.default 
        // @ts-ignore
        source={isLeftIcon ? iconSource : rightIconSource} testID={testID + ".icon"} {...iconProps} style={[getMargins('iconSource'), iconStyle]}/>);
    }, [iconSource, rightIconSource, iconStyle, iconProps]);
    var renderBadge = react_1.useCallback(function () {
        return (<badge_1.default size={badge_1.BADGE_SIZES.default} testID={testID + ".counter"} backgroundColor={useCounter ? 'transparent' : undefined} {...badgeProps} 
        // @ts-ignore
        containerStyle={[getMargins('badge'), badgeProps.containerStyle]}/>);
    }, [badgeProps]);
    var renderOnDismiss = react_1.useCallback(function () {
        return (<touchableOpacity_1.default style={[getMargins('dismiss'), dismissContainerStyle]} onPress={onDismiss} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} testID={testID + ".dismiss"}>
        <image_1.default 
        // @ts-ignore
        source={dismissIcon} tintColor={dismissColor} style={[dismissIconStyle]} accessibilityLabel="dismiss" testID={testID + ".dismissIcon"}/>
      </touchableOpacity_1.default>);
    }, [dismissContainerStyle, onDismiss, dismissIcon, dismissIconStyle]);
    var renderAvatar = react_1.useCallback(function () {
        return (<avatar_1.default size={20} testID={testID + ".avatar"} {...avatarProps} 
        // @ts-ignore
        containerStyle={[getMargins('avatar'), avatarProps.containerStyle]}/>);
    }, [avatarProps]);
    var renderLabel = react_1.useCallback(function () {
        return (<text_1.default text90M numberOfLines={1} style={[styles.label, getMargins('label'), labelStyle]} testID={testID + ".label"}>
        {!!label && label}
      </text_1.default>);
    }, [label, labelStyle]);
    var getMargins = react_1.useCallback(function (element) {
        if (!resetSpacings) {
            switch (element) {
                case 'label':
                    if (avatarProps) {
                        return {
                            marginRight: style_1.Spacings.s2,
                            marginLeft: style_1.Spacings.s1
                        };
                    }
                    if (badgeProps) {
                        return {
                            marginLeft: style_1.Spacings.s3,
                            marginRight: style_1.Spacings.s1
                        };
                    }
                    if (rightElement && leftElement) {
                        return {
                            marginHorizontally: 2
                        };
                    }
                    if (iconSource || leftElement) {
                        return {
                            marginLeft: 2,
                            marginRight: style_1.Spacings.s3
                        };
                    }
                    if (rightIconSource || rightElement) {
                        return {
                            marginLeft: style_1.Spacings.s3,
                            marginRight: 2
                        };
                    }
                    if (onDismiss) {
                        return {
                            marginLeft: style_1.Spacings.s3,
                            marginRight: style_1.Spacings.s2
                        };
                    }
                    else {
                        return { marginHorizontal: style_1.Spacings.s3 };
                    }
                case 'avatar':
                    return {
                        marginLeft: 2
                    };
                case 'badge':
                    return {
                        marginRight: style_1.Spacings.s1
                    };
                case 'dismiss':
                    return {
                        marginRight: style_1.Spacings.s2
                    };
            }
        }
    }, [avatarProps, badgeProps, iconSource, rightIconSource, onDismiss]);
    var getContainerSize = react_1.useCallback(function () {
        var _a, _b;
        var width = useSizeAsMinimum ? 'minWidth' : 'width';
        var height = useSizeAsMinimum ? 'minHeight' : 'height';
        return typeof size === 'object'
            ? (_a = {}, _a[width] = lodash_1.default.get(size, 'width'), _a[height] = lodash_1.default.get(size, 'height'), _a) : (_b = {}, _b[width] = size, _b[height] = size, _b);
    }, [size]);
    var Container = onPress ? touchableOpacity_1.default : view_1.default;
    return (<Container activeOpacity={1} onPress={onPress} style={[
            styles.container,
            { backgroundColor: backgroundColor },
            { borderRadius: borderRadius },
            containerStyle,
            getContainerSize()
        ]} testID={testID} {...others}>
      {avatarProps && renderAvatar()}
      {iconSource && renderIcon('left')}
      {leftElement}
      {label && renderLabel()}
      {rightElement}
      {rightIconSource && renderIcon('right')}
      {badgeProps && renderBadge()}
      {onDismiss && renderOnDismiss()}
    </Container>);
};
Chip.displayName = 'Chip';
var styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: style_1.BorderRadiuses.br100
    },
    label: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});
exports.default = new_1.asBaseComponent(Chip);
