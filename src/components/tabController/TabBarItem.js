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
// TODO: support commented props
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var lodash_1 = __importDefault(require("lodash"));
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_redash_1 = require("react-native-redash");
var style_1 = require("../../style");
var badge_1 = __importStar(require("../../components/badge"));
var incubator_1 = require("../../incubator");
// Unlike const interpolate = interpolateNode || _interpolate;
// interpolateColors has a different API (outputColorRange instead of outputRange)
var cond = react_native_reanimated_1.default.cond, eq = react_native_reanimated_1.default.eq, call = react_native_reanimated_1.default.call, block = react_native_reanimated_1.default.block, and = react_native_reanimated_1.default.and;
var DEFAULT_LABEL_COLOR = style_1.Colors.black;
var DEFAULT_SELECTED_LABEL_COLOR = style_1.Colors.primary;
/**
 * @description: TabController's TabBarItem
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: Must be rendered as a direct child of TabController.TabBar.
 */
var TabBarItem = /** @class */ (function (_super) {
    __extends(TabBarItem, _super);
    function TabBarItem(props) {
        var _this = _super.call(this, props) || this;
        _this.itemRef = react_1.default.createRef();
        _this.onLayout = function (event) {
            var width = event.nativeEvent.layout.width;
            var _a = _this.props, index = _a.index, onLayout = _a.onLayout;
            if (!_this.itemWidth && _this.itemRef && _this.itemRef.current) {
                _this.itemWidth = width;
                // @ts-ignore
                _this.itemRef.current.setNativeProps({ style: { width: width, paddingHorizontal: null, flex: null } });
                onLayout === null || onLayout === void 0 ? void 0 : onLayout(event, index);
            }
        };
        _this.onPress = function () {
            var _a = _this.props, index = _a.index, onPress = _a.onPress;
            onPress === null || onPress === void 0 ? void 0 : onPress(index);
        };
        _this.itemWidth = _this.props.width;
        if (_this.itemWidth) {
            var _a = _this.props, index = _a.index, onLayout = _a.onLayout;
            onLayout === null || onLayout === void 0 ? void 0 : onLayout({ nativeEvent: { layout: { x: 0, y: 0, width: _this.itemWidth, height: 0 } } }, index);
        }
        return _this;
    }
    TabBarItem.prototype.getItemStyle = function () {
        var _a = this.props, state = _a.state, propsStyle = _a.style, _b = _a.activeOpacity, activeOpacity = _b === void 0 ? TabBarItem.defaultProps.activeOpacity : _b;
        var opacity = block([
            cond(eq(state, react_native_gesture_handler_1.State.END), call([], this.onPress)),
            cond(eq(state, react_native_gesture_handler_1.State.BEGAN), activeOpacity, 1)
        ]);
        var style = {
            opacity: opacity
        };
        if (this.props.width) {
            style.flex = undefined;
            style.width = this.itemWidth;
            style.paddingHorizontal = undefined;
        }
        return [style, propsStyle];
    };
    TabBarItem.prototype.getLabelStyle = function () {
        var _a = this.props, index = _a.index, currentPage = _a.currentPage, targetPage = _a.targetPage, labelColor = _a.labelColor, selectedLabelColor = _a.selectedLabelColor, ignore = _a.ignore, labelStyle = _a.labelStyle, selectedLabelStyle = _a.selectedLabelStyle;
        var fontWeight, letterSpacing, fontFamily;
        if ((labelStyle === null || labelStyle === void 0 ? void 0 : labelStyle.fontWeight) || (selectedLabelStyle === null || selectedLabelStyle === void 0 ? void 0 : selectedLabelStyle.fontWeight)) {
            fontWeight = cond(
            // @ts-ignore TODO: typescript - add or delete and?
            and(eq(targetPage, index) /* , defined(itemWidth) */), (selectedLabelStyle === null || selectedLabelStyle === void 0 ? void 0 : selectedLabelStyle.fontWeight) || 'normal', (labelStyle === null || labelStyle === void 0 ? void 0 : labelStyle.fontWeight) || 'normal');
        }
        if ((labelStyle === null || labelStyle === void 0 ? void 0 : labelStyle.letterSpacing) || (selectedLabelStyle === null || selectedLabelStyle === void 0 ? void 0 : selectedLabelStyle.letterSpacing)) {
            letterSpacing = cond(
            // @ts-ignore TODO: typescript - add or delete and?
            and(eq(targetPage, index) /* , defined(itemWidth) */), (selectedLabelStyle === null || selectedLabelStyle === void 0 ? void 0 : selectedLabelStyle.letterSpacing) || 0, (labelStyle === null || labelStyle === void 0 ? void 0 : labelStyle.letterSpacing) || 0);
        }
        if ((labelStyle === null || labelStyle === void 0 ? void 0 : labelStyle.fontFamily) || (selectedLabelStyle === null || selectedLabelStyle === void 0 ? void 0 : selectedLabelStyle.fontFamily)) {
            fontFamily = cond(
            // @ts-ignore TODO: typescript - add or delete and?
            and(eq(targetPage, index) /* , defined(itemWidth) */), 
            // @ts-ignore
            selectedLabelStyle.fontFamily, labelStyle === null || labelStyle === void 0 ? void 0 : labelStyle.fontFamily);
        }
        var inactiveColor = labelColor || DEFAULT_LABEL_COLOR;
        var activeColor = !ignore ? selectedLabelColor || DEFAULT_SELECTED_LABEL_COLOR : inactiveColor;
        // Animated color
        var color;
        if (react_native_reanimated_1.interpolateColors) {
            color = react_native_reanimated_1.interpolateColors(currentPage, {
                inputRange: [index - 1, index, index + 1],
                outputColorRange: [inactiveColor, activeColor, inactiveColor]
            });
        }
        else {
            color = react_native_redash_1.interpolateColor(currentPage, {
                inputRange: [index - 1, index, index + 1],
                outputRange: [inactiveColor, activeColor, inactiveColor]
            });
        }
        return [
            labelStyle,
            lodash_1.default.omitBy({
                fontFamily: fontFamily,
                fontWeight: fontWeight,
                letterSpacing: letterSpacing,
                color: color
            }, lodash_1.default.isUndefined)
        ];
    };
    TabBarItem.prototype.getIconStyle = function () {
        var _a = this.props, index = _a.index, currentPage = _a.currentPage, iconColor = _a.iconColor, selectedIconColor = _a.selectedIconColor, labelColor = _a.labelColor, selectedLabelColor = _a.selectedLabelColor, ignore = _a.ignore, disableIconTintColor = _a.disableIconTintColor;
        if (disableIconTintColor) {
            return undefined;
        }
        var activeColor = selectedIconColor || selectedLabelColor || DEFAULT_SELECTED_LABEL_COLOR;
        var inactiveColor = iconColor || labelColor || DEFAULT_LABEL_COLOR;
        // TODO: Don't condition this once migrating completely to reanimated v2
        if (react_native_reanimated_1.processColor) {
            // @ts-ignore
            activeColor = react_native_reanimated_1.processColor(activeColor);
            // @ts-ignore
            inactiveColor = react_native_reanimated_1.processColor(inactiveColor);
        }
        var tintColor = cond(eq(currentPage, index), activeColor, ignore ? activeColor : inactiveColor);
        return {
            tintColor: tintColor
        };
    };
    TabBarItem.prototype.render = function () {
        var _a = this.props, label = _a.label, icon = _a.icon, badge = _a.badge, leadingAccessory = _a.leadingAccessory, trailingAccessory = _a.trailingAccessory, state = _a.state, uppercase = _a.uppercase, activeOpacity = _a.activeOpacity, activeBackgroundColor = _a.activeBackgroundColor, testID = _a.testID;
        return (<incubator_1.TouchableOpacity ref={this.itemRef} pressState={state} style={[styles.tabItem, this.getItemStyle()]} onLayout={this.onLayout} feedbackColor={activeBackgroundColor} activeOpacity={activeOpacity} onPress={this.onPress} testID={testID}>
        {leadingAccessory}
        {icon && (<react_native_reanimated_1.default.Image source={icon} 
            // @ts-ignore reanimated2
            style={[!lodash_1.default.isUndefined(label) && styles.tabItemIconWithLabel, this.getIconStyle()]}/>)}
        {!lodash_1.default.isEmpty(label) && (<react_native_reanimated_1.default.Text style={[styles.tabItemLabel, this.getLabelStyle()]}>
            {uppercase ? lodash_1.default.toUpper(label) : label}
          </react_native_reanimated_1.default.Text>)}
        {badge && (
            // @ts-ignore
            <badge_1.default backgroundColor={style_1.Colors.red30} size={badge_1.BADGE_SIZES.default} {...badge} containerStyle={styles.badge}/>)}
        {trailingAccessory}
      </incubator_1.TouchableOpacity>);
    };
    TabBarItem.displayName = 'TabController.TabBarItem';
    TabBarItem.defaultProps = {
        activeOpacity: 1,
        onPress: lodash_1.default.noop
    };
    return TabBarItem;
}(react_1.PureComponent));
exports.default = TabBarItem;
var styles = react_native_1.StyleSheet.create({
    tabItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: style_1.Spacings.s4
    },
    tabItemLabel: __assign({}, style_1.Typography.text80),
    tabItemIconWithLabel: {
        marginRight: 10
    },
    badge: {
        marginLeft: style_1.Spacings.s1
    }
});
