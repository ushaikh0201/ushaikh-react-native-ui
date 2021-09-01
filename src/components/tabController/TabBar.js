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
// TODO: support commented props
// TODO: disable scroll when content width is shorter than screen width
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_reanimated_1 = __importDefault(require("react-native-reanimated"));
var lodash_1 = __importDefault(require("lodash"));
var TabBarContext_1 = __importDefault(require("./TabBarContext"));
var TabBarItem_1 = __importDefault(require("./TabBarItem"));
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../../components/view"));
var style_1 = require("../../style");
var helpers_1 = require("../../helpers");
var services_1 = require("../../services");
var FadedScrollView_1 = __importDefault(require("./FadedScrollView"));
var hooks_1 = require("../../hooks");
var Code = react_native_reanimated_1.default.Code, Value = react_native_reanimated_1.default.Value, _interpolate = react_native_reanimated_1.default.interpolate, interpolateNode = react_native_reanimated_1.default.interpolateNode, block = react_native_reanimated_1.default.block, set = react_native_reanimated_1.default.set;
var interpolate = interpolateNode || _interpolate;
var DEFAULT_HEIGHT = 48;
var DEFAULT_BACKGROUND_COLOR = style_1.Colors.white;
var DEFAULT_LABEL_STYLE = __assign(__assign({}, style_1.Typography.text80), { fontWeight: '400', letterSpacing: 0 });
var DEFAULT_SELECTED_LABEL_STYLE = __assign(__assign({}, style_1.Typography.text80), { fontWeight: '700', letterSpacing: 0 });
/**
 * @description: TabController's TabBar component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 */
var TabBar = function (props) {
    var propsItems = props.items, spreadItems = props.spreadItems, height = props.height, enableShadow = props.enableShadow, propsShadowStyle = props.shadowStyle, 
    // minTabsForScroll,
    indicatorStyle = props.indicatorStyle, _a = props.indicatorInsets, indicatorInsets = _a === void 0 ? style_1.Spacings.s4 : _a, labelStyle = props.labelStyle, selectedLabelStyle = props.selectedLabelStyle, labelColor = props.labelColor, selectedLabelColor = props.selectedLabelColor, uppercase = props.uppercase, iconColor = props.iconColor, selectedIconColor = props.selectedIconColor, activeBackgroundColor = props.activeBackgroundColor, backgroundColor = props.backgroundColor, propsContainerWidth = props.containerWidth, centerSelected = props.centerSelected, containerStyle = props.containerStyle, scrollViewStyle = props.scrollViewStyle, testID = props.testID, propsChildren = props.children;
    var context = react_1.useContext(TabBarContext_1.default);
    // @ts-ignore // TODO: typescript
    var itemStates = context.itemStates, contextItems = context.items, currentPage = context.currentPage, targetPage = context.targetPage, registerTabItems = context.registerTabItems, selectedIndex = context.selectedIndex;
    var children = react_1.useRef(lodash_1.default.filter(propsChildren, function (child) { return !!child; }));
    var _registerTabItems = function () {
        var ignoredItems = [];
        var itemsCount;
        if (propsItems) {
            itemsCount = lodash_1.default.size(propsItems);
            lodash_1.default.forEach(propsItems, function (item, index) {
                if (item.ignore) {
                    ignoredItems.push(index);
                }
            });
            // TODO: deprecate with props.children
        }
        else {
            itemsCount = react_1.default.Children.count(children.current);
            // @ts-ignore TODO: typescript - not sure if this can be solved
            react_1.default.Children.toArray(children.current).forEach(function (child, index) {
                if (child.props.ignore) {
                    ignoredItems.push(index);
                }
            });
        }
        registerTabItems(itemsCount, ignoredItems);
    };
    react_1.useEffect(function () {
        if (propsChildren) {
            services_1.LogService.warn('uilib: Please pass the "items" prop to TabController.TabBar instead of children');
        }
        if ((propsItems || children.current) && !contextItems) {
            _registerTabItems();
        }
    }, []);
    var containerWidth = react_1.useMemo(function () {
        return propsContainerWidth || helpers_1.Constants.screenWidth;
    }, [propsContainerWidth]);
    var items = react_1.useMemo(function () {
        return contextItems || propsItems;
    }, [contextItems, propsItems]);
    var itemsCount = react_1.useRef(items ? lodash_1.default.size(items) : react_1.default.Children.count(children.current));
    var _b = hooks_1.useScrollToItem({
        itemsCount: itemsCount.current,
        selectedIndex: selectedIndex,
        offsetType: centerSelected ? hooks_1.useScrollToItem.offsetType.CENTER : hooks_1.useScrollToItem.offsetType.DYNAMIC
    }), tabBar = _b.scrollViewRef, onItemLayout = _b.onItemLayout, itemsWidths = _b.itemsWidths, focusIndex = _b.focusIndex, onContentSizeChange = _b.onContentSizeChange, onLayout = _b.onLayout;
    var indicatorOffsets = react_1.useMemo(function () {
        var index = 0;
        var offsets = [];
        offsets.push(0);
        while (index < itemsWidths.length - 1) {
            ++index;
            offsets[index] = offsets[index - 1] + itemsWidths[index - 1];
        }
        return offsets;
    }, [itemsWidths]);
    var _renderTabBarItems = react_1.useMemo(function () {
        return lodash_1.default.map(items, function (item, index) {
            return (<TabBarItem_1.default labelColor={labelColor} selectedLabelColor={selectedLabelColor} labelStyle={labelStyle} selectedLabelStyle={selectedLabelStyle} uppercase={uppercase} iconColor={iconColor} selectedIconColor={selectedIconColor} activeBackgroundColor={activeBackgroundColor} key={item.label} 
            // width={_itemsWidths.current[index]}
            {...item} {...context} index={index} state={itemStates[index]} onLayout={onItemLayout}/>);
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
        itemStates,
        centerSelected,
        onItemLayout
    ]);
    // TODO: Remove once props.children is deprecated
    var _renderTabBarItemsFromChildren = react_1.useMemo(function () {
        return !children.current
            ? null
            : react_1.default.Children.map(children.current, function (child, index) {
                // @ts-ignore TODO: typescript - not sure if this can be easily solved
                return react_1.default.cloneElement(child, __assign(__assign(__assign({ labelColor: labelColor,
                    selectedLabelColor: selectedLabelColor,
                    labelStyle: labelStyle,
                    selectedLabelStyle: selectedLabelStyle,
                    uppercase: uppercase,
                    iconColor: iconColor,
                    selectedIconColor: selectedIconColor,
                    activeBackgroundColor: activeBackgroundColor }, child.props), context), { index: index, state: itemStates[index], onLayout: centerSelected ? onItemLayout : undefined }));
            });
    }, [
        propsChildren,
        labelColor,
        selectedLabelColor,
        labelStyle,
        selectedLabelStyle,
        uppercase,
        iconColor,
        selectedIconColor,
        activeBackgroundColor,
        itemStates,
        centerSelected,
        onItemLayout
    ]);
    var renderTabBarItems = react_1.useMemo(function () {
        return lodash_1.default.isEmpty(itemStates) ? null : items ? _renderTabBarItems : _renderTabBarItemsFromChildren;
    }, [itemStates, items, _renderTabBarItems, _renderTabBarItemsFromChildren]);
    var _indicatorWidth = new Value(0); // TODO: typescript?
    var _indicatorOffset = new Value(0); // TODO: typescript?
    var _indicatorTransitionStyle = {
        // StyleProp<ViewStyle> TODO:
        width: _indicatorWidth,
        left: _indicatorOffset
    };
    var selectedIndicator = itemsWidths && itemsWidths.length > 0 ? (<react_native_reanimated_1.default.View style={[styles.selectedIndicator, { marginHorizontal: indicatorInsets }, indicatorStyle, _indicatorTransitionStyle]}/>) : undefined;
    var renderCodeBlock = lodash_1.default.memoize(function () {
        var nodes = [];
        nodes.push(set(_indicatorOffset, interpolate(currentPage, {
            inputRange: indicatorOffsets.map(function (_v, i) { return i; }),
            outputRange: indicatorOffsets
        })));
        nodes.push(set(_indicatorWidth, interpolate(currentPage, {
            inputRange: itemsWidths.map(function (_v, i) { return i; }),
            outputRange: itemsWidths.map(function (v) { return v - 2 * indicatorInsets; })
        })));
        nodes.push(react_native_reanimated_1.default.onChange(targetPage, react_native_reanimated_1.default.call([targetPage], focusIndex)));
        var temp = <Code>{function () { return block(nodes); }}</Code>;
        return temp;
    });
    var shadowStyle = react_1.useMemo(function () {
        return enableShadow ? propsShadowStyle || styles.containerShadow : undefined;
    }, [enableShadow, propsShadowStyle]);
    var _containerStyle = react_1.useMemo(function () {
        return [styles.container, shadowStyle, { width: containerWidth }, containerStyle];
    }, [shadowStyle, containerWidth, containerStyle]);
    var indicatorContainerStyle = react_1.useMemo(function () {
        return [styles.tabBar, spreadItems && styles.spreadItems, !lodash_1.default.isUndefined(height) && { height: height }, { backgroundColor: backgroundColor }];
    }, [height, backgroundColor]);
    var scrollViewContainerStyle = react_1.useMemo(function () {
        return { minWidth: containerWidth };
    }, [containerWidth]);
    return (<view_1.default style={_containerStyle}>
      <FadedScrollView_1.default 
    /**
     // @ts-ignore TODO: typescript */
    ref={tabBar} horizontal contentContainerStyle={scrollViewContainerStyle} scrollEnabled // TODO:
     testID={testID} onContentSizeChange={onContentSizeChange} onLayout={onLayout} style={scrollViewStyle}>
        <view_1.default style={indicatorContainerStyle}>{renderTabBarItems}</view_1.default>
        {selectedIndicator}
      </FadedScrollView_1.default>
      {lodash_1.default.size(itemsWidths) > 1 && renderCodeBlock()}
    </view_1.default>);
};
TabBar.displayName = 'TabController.TabBar';
TabBar.defaultProps = {
    labelStyle: DEFAULT_LABEL_STYLE,
    selectedLabelStyle: DEFAULT_SELECTED_LABEL_STYLE,
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
    spreadItems: true
    // containerWidth: Constants.screenWidth
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
