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
var services_1 = require("../../services");
var helpers_1 = require("../../helpers");
var style_1 = require("../../style");
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../view"));
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var text_1 = __importDefault(require("../text"));
var image_1 = __importDefault(require("../image"));
var badge_1 = __importDefault(require("../badge"));
var INDICATOR_HEIGHT = 2;
var INDICATOR_BG_COLOR = style_1.Colors.primary;
var HORIZONTAL_PADDING = helpers_1.Constants.isTablet ? style_1.Spacings.s7 : style_1.Spacings.s5;
/**
 * @description: TabBar.Item, inner component of TabBar for configuring the tabs
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabBarScreen.tsx
 * @extends: TouchableOpacity
 * @extendsLink: https://reactnative.dev/docs/touchableopacity
 */
var TabBarItem = /** @class */ (function (_super) {
    __extends(TabBarItem, _super);
    function TabBarItem(props) {
        var _this = _super.call(this, props) || this;
        _this.onAnimateCompleted = function () {
            _this.setState({ selected: _this.props.selected });
        };
        _this.onLayout = function (event) {
            _this.layout = event.nativeEvent.layout;
        };
        _this.state = {
            indicatorOpacity: props.selected ? new react_native_1.Animated.Value(1) : new react_native_1.Animated.Value(0),
            selected: props.selected
        };
        if (!lodash_1.default.isEmpty(props.badge)) {
            services_1.LogService.deprecationWarn({ component: 'TabBarItem', oldProp: 'badge', newProp: 'badgeProps' });
        }
        return _this;
    }
    TabBarItem.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.selected !== this.props.selected) {
            this.animate(this.props.selected);
        }
    };
    TabBarItem.prototype.animate = function (newValue) {
        react_native_1.Animated.timing(this.state.indicatorOpacity, {
            toValue: newValue ? 1 : 0,
            easing: react_native_1.Easing.ease,
            duration: 150,
            useNativeDriver: true
        }).start(this.onAnimateCompleted);
    };
    TabBarItem.prototype.getFlattenStyle = function (style) {
        return react_native_1.StyleSheet.flatten(style);
    };
    TabBarItem.prototype.getStylePropValue = function (flattenStyle, propName) {
        var prop;
        if (flattenStyle) {
            var propObject = lodash_1.default.pick(flattenStyle, [propName]);
            prop = propObject[propName];
        }
        return prop;
    };
    TabBarItem.prototype.getColorFromStyle = function (style) {
        var flattenStyle = this.getFlattenStyle(style);
        return this.getStylePropValue(flattenStyle, 'color');
    };
    TabBarItem.prototype.getLayout = function () {
        return this.layout;
    };
    TabBarItem.prototype.render = function () {
        var _a = this.state, indicatorOpacity = _a.indicatorOpacity, selected = _a.selected;
        var _b = this.props, children = _b.children, indicatorStyle = _b.indicatorStyle, icon = _b.icon, iconColor = _b.iconColor, iconSelectedColor = _b.iconSelectedColor, label = _b.label, labelStyle = _b.labelStyle, badgeProps = _b.badgeProps, badge = _b.badge, leadingAccessory = _b.leadingAccessory, trailingAccessory = _b.trailingAccessory, uppercase = _b.uppercase, maxLines = _b.maxLines, selectedLabelStyle = _b.selectedLabelStyle, showDivider = _b.showDivider, width = _b.width, onPress = _b.onPress, activeBackgroundColor = _b.activeBackgroundColor, backgroundColor = _b.backgroundColor, testID = _b.testID, accessibilityLabel = _b.accessibilityLabel, style = _b.style;
        var iconTint = iconColor || this.getColorFromStyle(labelStyle) || this.getColorFromStyle(styles.label);
        var iconSelectedTint = iconSelectedColor || this.getColorFromStyle(selectedLabelStyle) || this.getColorFromStyle(styles.selectedLabel);
        var badgeFinalProps = badgeProps || badge;
        var badgeSize = lodash_1.default.get(badgeFinalProps, 'size', 'small');
        return (<touchableOpacity_1.default activeOpacity={1} onPress={onPress} style={[width ? { width: width } : { flex: 1 }, style]} testID={testID} backgroundColor={backgroundColor} activeBackgroundColor={activeBackgroundColor} onLayout={this.onLayout} accessibilityState={selected ? { selected: true } : undefined} accessibilityRole={'tab'} accessibilityLabel={accessibilityLabel}>
        <view_1.default row flex center style={[showDivider && styles.divider, styles.contentContainer]}>
          {leadingAccessory}
          {icon && (<image_1.default style={!lodash_1.default.isEmpty(label) && styles.icon} source={icon} tintColor={selected ? iconSelectedTint : iconTint}/>)}
          {!lodash_1.default.isEmpty(label) && (<text_1.default numberOfLines={maxLines} uppercase={uppercase} style={[labelStyle || styles.label, selected && (selectedLabelStyle || styles.selectedLabel)]}>
              {label}
            </text_1.default>)}
          {children}
          {!lodash_1.default.isNil(badgeFinalProps) && (<badge_1.default backgroundColor={style_1.Colors.red30} {...badgeFinalProps} size={badgeSize} containerStyle={[styles.badge, badgeFinalProps.containerStyle]}/>)}
          {trailingAccessory}
        </view_1.default>
        <react_native_1.Animated.View style={[{ opacity: indicatorOpacity }, styles.indicator, indicatorStyle]}/>
      </touchableOpacity_1.default>);
    };
    TabBarItem.displayName = 'TabBar.Item';
    TabBarItem.defaultProps = {
        maxLines: 1
    };
    return TabBarItem;
}(react_1.PureComponent));
exports.default = new_1.asBaseComponent(TabBarItem);
var styles = react_native_1.StyleSheet.create({
    contentContainer: {
        paddingHorizontal: HORIZONTAL_PADDING
    },
    label: __assign({ color: style_1.Colors.primary }, style_1.Typography.text80),
    selectedLabel: __assign(__assign({ color: style_1.Colors.primary }, style_1.Typography.text80), { fontWeight: 'bold' }),
    divider: {
        borderRightWidth: 1,
        borderRightColor: style_1.Colors.dark70,
        marginVertical: 14 // NOTE: will not cut long text at the top and bottom in iOS if TabBar not high enough
    },
    indicator: {
        backgroundColor: INDICATOR_BG_COLOR,
        height: INDICATOR_HEIGHT,
        marginHorizontal: HORIZONTAL_PADDING
    },
    badge: {
        marginLeft: style_1.Spacings.s1
    },
    icon: {
        marginRight: 6
    }
});
