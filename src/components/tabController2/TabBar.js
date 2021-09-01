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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var lodash_1 = __importDefault(require("lodash"));
var TabBarContext_1 = __importDefault(require("./TabBarContext"));
var TabBarItem_1 = __importDefault(require("./TabBarItem"));
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../view"));
var style_1 = require("../../style");
var helpers_1 = require("../../helpers");
var FadedScrollView_1 = __importDefault(require("./FadedScrollView"));
var useScrollToItem_1 = __importDefault(require("./useScrollToItem"));
var DEFAULT_HEIGHT = 48;
var DEFAULT_BACKGROUND_COLOR = style_1.Colors.white;
var DEFAULT_LABEL_STYLE = __assign(__assign({}, style_1.Typography.text80M), { letterSpacing: 0 });
var DEFAULT_SELECTED_LABEL_STYLE = __assign(__assign({}, style_1.Typography.text80M), { letterSpacing: 0 });
/**
 * @description: TabController's TabBar component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 */
var TabBar = function (props) {
    var propsItems = props.items, height = props.height, enableShadow = props.enableShadow, propsShadowStyle = props.shadowStyle, indicatorStyle = props.indicatorStyle, labelStyle = props.labelStyle, selectedLabelStyle = props.selectedLabelStyle, labelColor = props.labelColor, selectedLabelColor = props.selectedLabelColor, uppercase = props.uppercase, iconColor = props.iconColor, selectedIconColor = props.selectedIconColor, activeBackgroundColor = props.activeBackgroundColor, backgroundColor = props.backgroundColor, propsContainerWidth = props.containerWidth, centerSelected = props.centerSelected, spreadItems = props.spreadItems, _a = props.indicatorInsets, indicatorInsets = _a === void 0 ? style_1.Spacings.s4 : _a, containerStyle = props.containerStyle, testID = props.testID;
    var context = react_1.useContext(TabBarContext_1.default);
    var contextItems = context.items, currentPage = context.currentPage, targetPage = context.targetPage, selectedIndex = context.selectedIndex;
    var containerWidth = react_1.useMemo(function () {
        return propsContainerWidth || helpers_1.Constants.screenWidth;
    }, [propsContainerWidth]);
    var items = react_1.useMemo(function () {
        return contextItems || propsItems;
    }, [contextItems, propsItems]);
    var _b = useScrollToItem_1.default({
        itemsCount: (items === null || items === void 0 ? void 0 : items.length) || 0,
        selectedIndex: selectedIndex,
        offsetType: centerSelected ? useScrollToItem_1.default.offsetType.CENTER : useScrollToItem_1.default.offsetType.DYNAMIC
    }), tabBar = _b.scrollViewRef, onItemLayout = _b.onItemLayout, itemsWidthsAnimated = _b.itemsWidthsAnimated, itemsOffsetsAnimated = _b.itemsOffsetsAnimated, 
    // itemsWidths,
    // itemsOffsets,
    focusIndex = _b.focusIndex, onContentSizeChange = _b.onContentSizeChange, onLayout = _b.onLayout;
    react_native_reanimated_1.useAnimatedReaction(function () {
        return Math.round(currentPage.value);
    }, function (currIndex, prevIndex) {
        if (currIndex !== prevIndex) {
            react_native_reanimated_1.runOnJS(focusIndex)(currIndex);
        }
    });
    var tabBarItems = react_1.useMemo(function () {
        return lodash_1.default.map(items, function (item, index) {
            return (<TabBarItem_1.default labelColor={labelColor} selectedLabelColor={selectedLabelColor} labelStyle={labelStyle} selectedLabelStyle={selectedLabelStyle} uppercase={uppercase} iconColor={iconColor} selectedIconColor={selectedIconColor} activeBackgroundColor={activeBackgroundColor} key={item.label} {...item} {...context} index={index} onLayout={onItemLayout}/>);
        });
    }, [
        items,
        labelColor,
        selectedLabelColor,
        labelStyle,
        selectedLabelStyle,
        uppercase,
        iconColor,
        selectedIconColor,
        activeBackgroundColor,
        centerSelected,
        onItemLayout
    ]);
    var _indicatorTransitionStyle = react_native_reanimated_1.useAnimatedStyle(function () {
        var value = targetPage.value;
        var width = react_native_reanimated_1.interpolate(value, itemsWidthsAnimated.value.map(function (_v, i) { return i; }), itemsWidthsAnimated.value.map(function (v) { return v - 2 * indicatorInsets; }));
        var left = react_native_reanimated_1.interpolate(value, itemsOffsetsAnimated.value.map(function (_v, i) { return i; }), itemsOffsetsAnimated.value);
        return {
            marginHorizontal: indicatorInsets,
            width: width,
            left: left
        };
    });
    var shadowStyle = react_1.useMemo(function () {
        return enableShadow ? propsShadowStyle || styles.containerShadow : undefined;
    }, [enableShadow, propsShadowStyle]);
    var _containerStyle = react_1.useMemo(function () {
        return [styles.container, shadowStyle, { width: containerWidth }, containerStyle];
    }, [shadowStyle, containerWidth, containerStyle]);
    var tabBarContainerStyle = react_1.useMemo(function () {
        return [styles.tabBar, spreadItems && styles.spreadItems, !lodash_1.default.isUndefined(height) && { height: height }, { backgroundColor: backgroundColor }];
    }, [height, backgroundColor]);
    var scrollViewContainerStyle = react_1.useMemo(function () {
        return { minWidth: containerWidth };
    }, [containerWidth]);
    return (<view_1.default style={_containerStyle}>
      <FadedScrollView_1.default 
    // @ts-expect-error
    ref={tabBar} horizontal contentContainerStyle={scrollViewContainerStyle} scrollEnabled // TODO:
     testID={testID} onContentSizeChange={onContentSizeChange} onLayout={onLayout}>
        <view_1.default style={tabBarContainerStyle}>{tabBarItems}</view_1.default>
        <react_native_reanimated_1.default.View style={[styles.selectedIndicator, indicatorStyle, _indicatorTransitionStyle]}/>
      </FadedScrollView_1.default>
    </view_1.default>);
};
TabBar.displayName = 'TabController.TabBar';
TabBar.defaultProps = {
    labelStyle: DEFAULT_LABEL_STYLE,
    selectedLabelStyle: DEFAULT_SELECTED_LABEL_STYLE,
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
    spreadItems: true
};
var styles = react_native_1.StyleSheet.create({
    container: {
        zIndex: 100
    },
    tabBar: {
        height: DEFAULT_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tabBarScrollContent: {
        minWidth: helpers_1.Constants.screenWidth
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 70,
        height: 2,
        backgroundColor: style_1.Colors.primary
    },
    containerShadow: __assign({}, react_native_1.Platform.select({
        ios: {
            shadowColor: style_1.Colors.dark10,
            shadowOpacity: 0.05,
            shadowRadius: 2,
            shadowOffset: { height: 6, width: 0 }
        },
        android: {
            elevation: 5,
            backgroundColor: style_1.Colors.white
        }
    })),
    spreadItems: {
        flex: 1
    }
});
exports.default = new_1.asBaseComponent(new_1.forwardRef(TabBar));
