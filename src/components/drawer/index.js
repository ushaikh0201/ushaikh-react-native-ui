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
var memoize_one_1 = __importDefault(require("memoize-one"));
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var new_1 = require("../../commons/new");
var modifiers_1 = require("../../commons/modifiers");
var helpers_1 = require("../../helpers");
var style_1 = require("../../style");
var view_1 = __importDefault(require("../view"));
var Swipeable_1 = __importDefault(require("./Swipeable"));
var services_1 = require("../../services");
var DEFAULT_BG = style_1.Colors.primary;
var DEFAULT_BOUNCINESS = 0;
/**
 * @description: Drawer Component
 * @important: If your app works with RNN, your screen must be wrapped
 * with gestureHandlerRootHOC from 'react-native-gesture-handler'. see
 * @importantLink: https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html#with-wix-react-native-navigation-https-githubcom-wix-react-native-navigation
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Drawer/Drawer.gif?raw=true
 */
var Drawer = /** @class */ (function (_super) {
    __extends(Drawer, _super);
    function Drawer(props) {
        var _this = _super.call(this, props) || this;
        _this._swipeableRow = react_1.default.createRef();
        _this.animationOptions = { bounciness: _this.props.bounciness || DEFAULT_BOUNCINESS };
        _this.leftActionX = new react_native_1.Animated.Value(0);
        _this.getLeftActionsContainerStyle = memoize_one_1.default(function (leftItem, rightItems) {
            return _this.getActionsContainerStyle(helpers_1.Constants.isRTL ? rightItems : [leftItem]);
        });
        _this.getRightActionsContainerStyle = memoize_one_1.default(function (rightItems, leftItem) {
            return _this.getActionsContainerStyle(helpers_1.Constants.isRTL ? [leftItem] : rightItems);
        });
        /** Actions */
        _this.closeDrawer = function () {
            var _a;
            (_a = _this._swipeableRow.current) === null || _a === void 0 ? void 0 : _a.close();
        };
        _this.openLeft = function () {
            var _a;
            (_a = _this._swipeableRow.current) === null || _a === void 0 ? void 0 : _a.openLeft();
        };
        _this.openLeftFull = function () {
            var _a;
            (_a = _this._swipeableRow.current) === null || _a === void 0 ? void 0 : _a.openLeftFull();
        };
        _this.toggleLeft = function () {
            var _a;
            (_a = _this._swipeableRow.current) === null || _a === void 0 ? void 0 : _a.toggleLeft();
        };
        _this.openRight = function () {
            var _a;
            (_a = _this._swipeableRow.current) === null || _a === void 0 ? void 0 : _a.openRight();
        };
        _this.openRightFull = function () {
            var _a;
            (_a = _this._swipeableRow.current) === null || _a === void 0 ? void 0 : _a.openRightFull();
        };
        /** Events */
        _this.onActionPress = function (item) {
            var _a;
            if (!item.keepOpen) {
                _this.closeDrawer();
            }
            (_a = item.onPress) === null || _a === void 0 ? void 0 : _a.call(item, _this.props);
        };
        _this.onSwipeableWillOpen = function () {
            var _a, _b;
            (_b = (_a = _this.props).onSwipeableWillOpen) === null || _b === void 0 ? void 0 : _b.call(_a, _this.props);
        };
        _this.onSwipeableWillClose = function () {
            var _a, _b;
            (_b = (_a = _this.props).onSwipeableWillClose) === null || _b === void 0 ? void 0 : _b.call(_a, _this.props);
        };
        _this.onToggleSwipeLeft = function (options) {
            if (_this.props.onToggleSwipeLeft) {
                _this.animateItem(options);
            }
        };
        _this.onAccessibilityAction = function (event) {
            var _a;
            var actions = _this.getAccessibilityActions(true);
            var action = lodash_1.default.find(actions, function (o) {
                // return o.text === event.nativeEvent.action;
                return o.name === event.nativeEvent.actionName;
            });
            (_a = action.onPress) === null || _a === void 0 ? void 0 : _a.call(action);
        };
        /** Renders */
        // TODO: enable support for rendering more than one left item
        _this.renderLeftActions = function (progress /* , dragX: Animated.Value */) {
            var leftItem = _this.props.leftItem;
            var leftItems = leftItem ? [leftItem] : undefined;
            return _this.renderActions(leftItems, progress /* , dragX */);
        };
        _this.renderRightActions = function (progress /* , dragX: Animated.Value */) {
            var rightItems = _this.props.rightItems;
            return _this.renderActions(rightItems, progress /* , dragX */);
        };
        _this.renderAction = function (_a) {
            var item = _a.item, index = _a.index, progress = _a.progress, itemsCount = _a.itemsCount;
            var _b = _this.props, itemsTintColor = _b.itemsTintColor, itemsIconSize = _b.itemsIconSize, itemsTextStyle = _b.itemsTextStyle, itemsMinWidth = _b.itemsMinWidth;
            var inputRange = [index / itemsCount, (index + 1) / itemsCount];
            var outputRange = [0.2, 1];
            var scale = progress.interpolate({
                inputRange: inputRange,
                outputRange: outputRange,
                extrapolate: 'clamp'
            });
            var opacity = progress.interpolate({
                inputRange: inputRange,
                outputRange: outputRange,
                extrapolate: 'clamp'
            });
            return (<react_native_gesture_handler_1.RectButton key={index} testID={item.testID} style={[
                    styles.action,
                    item.style,
                    {
                        backgroundColor: item.background || DEFAULT_BG,
                        width: item.width,
                        minWidth: itemsMinWidth
                    }
                ]} onPress={function () { return _this.onActionPress(item); }}>
        {item.customElement}
        {!item.customElement && item.icon && (<react_native_1.Animated.Image source={item.icon} style={[
                        styles.actionIcon,
                        {
                            width: itemsIconSize,
                            height: itemsIconSize,
                            tintColor: itemsTintColor,
                            opacity: opacity,
                            transform: [{ scale: scale }]
                        }
                    ]}/>)}
        {!item.customElement && item.text && (<react_native_1.Animated.Text style={[
                        styles.actionText,
                        {
                            color: itemsTintColor,
                            opacity: opacity,
                            transform: [{ scale: scale }]
                        },
                        itemsTextStyle
                    ]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" accessible={false}>
            {item.text}
          </react_native_1.Animated.Text>)}
      </react_native_gesture_handler_1.RectButton>);
        };
        _this.leftRender = helpers_1.Constants.isRTL
            ? props.rightItems && _this.renderRightActions
            : props.leftItem && _this.renderLeftActions;
        _this.rightRender = helpers_1.Constants.isRTL
            ? props.leftItem && _this.renderLeftActions
            : props.rightItems && _this.renderRightActions;
        return _this;
    }
    Drawer.prototype.getActionsContainerStyle = function (items) {
        return { backgroundColor: lodash_1.default.get(lodash_1.default.first(items), 'background', DEFAULT_BG) };
    };
    Drawer.prototype.animateItem = function (_a) {
        var _this = this;
        var rowWidth = _a.rowWidth, leftWidth = _a.leftWidth, dragX = _a.dragX, released = _a.released, resetItemPosition = _a.resetItemPosition;
        var toValue = resetItemPosition ? 0 : dragX ? dragX - leftWidth : rowWidth * 0.6 - leftWidth;
        react_native_1.Animated.timing(this.leftActionX, {
            toValue: toValue,
            easing: react_native_1.Easing.bezier(0.25, 1, 0.5, 1),
            duration: 200,
            delay: 100,
            useNativeDriver: true
        }).start(function () {
            if (released) {
                // reset Drawer
                _this.animateItem({ released: false, resetItemPosition: true });
                _this.closeDrawer();
                setTimeout(function () {
                    var _a, _b;
                    (_b = (_a = _this.props).onToggleSwipeLeft) === null || _b === void 0 ? void 0 : _b.call(_a, _this.props);
                }, 150);
            }
        });
    };
    /** Accessability */
    Drawer.prototype.getAccessibilityActions = function (withOnPress) {
        if (withOnPress === void 0) { withOnPress = false; }
        var _a = this.props, rightItems = _a.rightItems, leftItem = _a.leftItem;
        var actions = [];
        if ((leftItem === null || leftItem === void 0 ? void 0 : leftItem.onPress) && leftItem.text) {
            var action = { name: leftItem.text, label: leftItem.text };
            if (withOnPress) {
                action.onPress = leftItem.onPress;
            }
            actions.push(action);
        }
        if (rightItems) {
            rightItems.forEach(function (item) {
                if (item.onPress && item.text) {
                    var action = { name: item.text, label: item.text };
                    if (withOnPress) {
                        action.onPress = item.onPress;
                    }
                    actions.push(action);
                }
            });
        }
        return actions;
    };
    Drawer.prototype.renderActions = function (items, progress /* , dragX: Animated.Value */) {
        var _this = this;
        if (items) {
            return (
            // @ts-ignore
            <view_1.default animated row style={{ transform: [{ translateX: this.leftActionX }] }}>
          {lodash_1.default.map(items, function (item, index) {
                    return _this.renderAction({
                        item: item,
                        index: items.length - index - 1,
                        progress: progress,
                        // dragX,
                        itemsCount: items.length
                    });
                })}
        </view_1.default>);
        }
    };
    Drawer.prototype.render = function () {
        var _a = this.props, children = _a.children, style = _a.style, leftItem = _a.leftItem, rightItems = _a.rightItems, onToggleSwipeLeft = _a.onToggleSwipeLeft, leftToggleHapticTrigger = _a.leftToggleHapticTrigger, others = __rest(_a, ["children", "style", "leftItem", "rightItems", "onToggleSwipeLeft", "leftToggleHapticTrigger"]);
        leftToggleHapticTrigger && services_1.LogService.deprecationWarn({ component: 'Drawer', oldProp: 'leftToggleHapticTrigger' });
        return (<Swipeable_1.default {...others} ref={this._swipeableRow} friction={1} containerStyle={style} animationOptions={this.animationOptions} renderLeftActions={this.leftRender} renderRightActions={this.rightRender} rightActionsContainerStyle={this.getRightActionsContainerStyle(rightItems, leftItem)} leftActionsContainerStyle={this.getLeftActionsContainerStyle(leftItem, rightItems)} onSwipeableWillOpen={this.onSwipeableWillOpen} onSwipeableWillClose={this.onSwipeableWillClose} onToggleSwipeLeft={onToggleSwipeLeft && this.onToggleSwipeLeft}>
        <view_1.default accessible accessibilityActions={this.getAccessibilityActions()} onAccessibilityAction={this.onAccessibilityAction} {...modifiers_1.extractAccessibilityProps(this.props)}>
          {children}
        </view_1.default>
      </Swipeable_1.default>);
    };
    Drawer.displayName = 'Drawer';
    Drawer.defaultProps = {
        itemsTintColor: style_1.Colors.white,
        itemsIconSize: 24
    };
    return Drawer;
}(react_1.PureComponent));
exports.default = new_1.asBaseComponent(Drawer);
var styles = react_native_1.StyleSheet.create({
    leftAction: {
        flex: 1,
        justifyContent: 'center',
        alignItems: /* Constants.isRTL ? 'flex-end' :  */ 'flex-start',
        backgroundColor: '#388e3c'
    },
    actionIcon: {
        width: 30,
        marginHorizontal: 10
    },
    actionText: {
        color: '#ffffff'
    },
    action: {
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dd2c00'
    }
});
