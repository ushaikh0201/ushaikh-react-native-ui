"use strict";
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
// TODO: support commented props
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var lodash_1 = __importDefault(require("lodash"));
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var style_1 = require("../../style");
var badge_1 = __importStar(require("../badge"));
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var TabBarContext_1 = __importDefault(require("./TabBarContext"));
var TouchableOpacity = react_native_reanimated_1.default.createAnimatedComponent(touchableOpacity_1.default);
var DEFAULT_LABEL_COLOR = style_1.Colors.black;
var DEFAULT_SELECTED_LABEL_COLOR = style_1.Colors.primary;
/**
 * @description: TabController's TabBarItem
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: Must be rendered as a direct child of TabController.TabBar.
 */
function TabBarItem(_a) {
    var index = _a.index, label = _a.label, labelColor = _a.labelColor, selectedLabelColor = _a.selectedLabelColor, labelStyle = _a.labelStyle, selectedLabelStyle = _a.selectedLabelStyle, icon = _a.icon, badge = _a.badge, leadingAccessory = _a.leadingAccessory, trailingAccessory = _a.trailingAccessory, uppercase = _a.uppercase, _b = _a.activeOpacity, activeOpacity = _b === void 0 ? 0.9 : _b, activeBackgroundColor = _a.activeBackgroundColor, testID = _a.testID, ignore = _a.ignore, style = _a.style, props = __rest(_a, ["index", "label", "labelColor", "selectedLabelColor", "labelStyle", "selectedLabelStyle", "icon", "badge", "leadingAccessory", "trailingAccessory", "uppercase", "activeOpacity", "activeBackgroundColor", "testID", "ignore", "style"]);
    var currentPage = react_1.useContext(TabBarContext_1.default).currentPage;
    var itemRef = react_1.useRef();
    var itemWidth = react_1.useRef(props.width);
    // JSON.parse(JSON.stringify is due to an issue with reanimated
    var sharedLabelStyle = react_native_reanimated_1.useSharedValue(JSON.parse(JSON.stringify(labelStyle)));
    var sharedSelectedLabelStyle = react_native_reanimated_1.useSharedValue(JSON.parse(JSON.stringify(selectedLabelStyle)));
    react_1.useEffect(function () {
        var _a;
        if (itemWidth.current) {
            (_a = props.onLayout) === null || _a === void 0 ? void 0 : _a.call(props, { nativeEvent: { layout: { x: 0, y: 0, width: itemWidth.current, height: 0 } } }, index);
        }
    }, []);
    var onPress = react_1.useCallback(function () {
        var _a;
        if (!ignore) {
            currentPage.value = index;
        }
        (_a = props.onPress) === null || _a === void 0 ? void 0 : _a.call(props, index);
    }, [index, props.onPress, ignore]);
    var onLayout = react_1.useCallback(function (event) {
        var _a, _b;
        var width = event.nativeEvent.layout.width;
        if (!itemWidth.current && (itemRef === null || itemRef === void 0 ? void 0 : itemRef.current)) {
            itemWidth.current = width;
            // @ts-ignore
            (_a = itemRef.current) === null || _a === void 0 ? void 0 : _a.setNativeProps({ style: { width: width, paddingHorizontal: null, flex: null } });
            (_b = props.onLayout) === null || _b === void 0 ? void 0 : _b.call(props, event, index);
        }
    }, [index, props.onLayout]);
    var animatedLabelStyle = react_native_reanimated_1.useAnimatedStyle(function () {
        var isActive = currentPage.value === index;
        return isActive ? sharedSelectedLabelStyle.value : sharedLabelStyle.value;
    }, [currentPage]);
    var animatedLabelColorStyle = react_native_reanimated_1.useAnimatedStyle(function () {
        var isActive = currentPage.value === index;
        var inactiveColor = labelColor || DEFAULT_LABEL_COLOR;
        var activeColor = !ignore ? selectedLabelColor || DEFAULT_SELECTED_LABEL_COLOR : inactiveColor;
        return {
            color: isActive ? activeColor : inactiveColor
        };
    });
    var animatedIconStyle = react_native_reanimated_1.useAnimatedStyle(function () {
        var isActive = currentPage.value === index;
        var inactiveColor = labelColor || DEFAULT_LABEL_COLOR;
        var activeColor = !ignore ? selectedLabelColor || DEFAULT_SELECTED_LABEL_COLOR : inactiveColor;
        return {
            tintColor: isActive ? activeColor : inactiveColor
        };
    });
    return (<TouchableOpacity 
    // @ts-expect-error
    ref={itemRef} style={[styles.tabItem, style]} onLayout={onLayout} activeBackgroundColor={activeBackgroundColor} activeOpacity={activeOpacity} onPress={onPress} testID={testID}>
      {leadingAccessory}
      {icon && (<react_native_reanimated_1.default.Image source={icon} style={[!lodash_1.default.isUndefined(label) && styles.tabItemIconWithLabel, animatedIconStyle]}/>)}
      {!lodash_1.default.isEmpty(label) && (<react_native_reanimated_1.default.Text style={[styles.tabItemLabel, labelStyle, animatedLabelStyle, animatedLabelColorStyle]}>
          {uppercase ? lodash_1.default.toUpper(label) : label}
        </react_native_reanimated_1.default.Text>)}
      {badge && (<badge_1.default backgroundColor={style_1.Colors.red30} size={badge_1.BADGE_SIZES.default} {...badge} containerStyle={styles.badge}/>)}
      {trailingAccessory}
    </TouchableOpacity>);
}
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
