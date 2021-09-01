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
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var style_1 = require("../../style");
//@ts-ignore
var assets_1 = __importDefault(require("../../assets"));
var new_1 = require("../../commons/new");
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var text_1 = __importDefault(require("../text"));
var view_1 = __importDefault(require("../view"));
var DEFAULT_SIZE = 24;
var DEFAULT_COLOR = style_1.Colors.primary;
var DEFAULT_ICON_COLOR = style_1.Colors.white;
var DEFAULT_DISABLED_COLOR = style_1.Colors.grey50;
var DEFAULT_BORDER_WIDTH = 2;
var DEFAULT_BORDER_RADIUS = 8;
/**
 * @description: Checkbox component for toggling boolean value related to some context
 * @extends: TouchableOpacity
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CheckboxScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Checkbox/Checkbox.gif?raw=true
 */
var Checkbox = /** @class */ (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox(props) {
        var _this = _super.call(this, props) || this;
        _this.onPress = function () {
            var _a, _b;
            var disabled = _this.props.disabled;
            if (!disabled) {
                (_b = (_a = _this.props).onValueChange) === null || _b === void 0 ? void 0 : _b.call(_a, !_this.props.value);
            }
        };
        _this.getColor = function () { return (_this.props.disabled ? DEFAULT_DISABLED_COLOR : _this.props.color || DEFAULT_COLOR); };
        _this.getBackgroundColor = function () { return (_this.props.outline ? 'transparent' : _this.getColor()); };
        _this.getTintColor = function () {
            var _a = _this.props, outline = _a.outline, disabled = _a.disabled, iconColor = _a.iconColor;
            if (outline) {
                if (disabled) {
                    return DEFAULT_DISABLED_COLOR;
                }
                else {
                    return iconColor || DEFAULT_COLOR;
                }
            }
            else if (disabled) {
                return style_1.Colors.white;
            }
            else {
                return iconColor || style_1.Colors.white;
            }
        };
        _this.state = {
            isChecked: new react_native_1.Animated.Value(_this.props.value ? 1 : 0)
        };
        _this.styles = createStyles(props);
        _this.animationStyle = {
            opacity: _this.state.isChecked,
            transform: [
                {
                    scaleX: _this.state.isChecked
                },
                {
                    scaleY: _this.state.isChecked
                }
            ]
        };
        return _this;
    }
    Checkbox.prototype.componentDidUpdate = function (prevProps) {
        var value = this.props.value;
        if (prevProps.value !== value) {
            this.animateCheckbox(value);
        }
    };
    Checkbox.prototype.getAccessibilityProps = function () {
        var _a = this.props, accessibilityLabel = _a.accessibilityLabel, disabled = _a.disabled, value = _a.value;
        var checkedState = value ? 'checked' : 'unchecked';
        return {
            accessible: true,
            accessibilityLabel: accessibilityLabel ? accessibilityLabel + " " + checkedState : "" + checkedState,
            accessibilityRole: 'checkbox',
            accessibilityStates: disabled ? ['disabled'] : undefined
        };
    };
    Checkbox.prototype.animateCheckbox = function (value) {
        var isChecked = this.state.isChecked;
        react_native_1.Animated.timing(isChecked, {
            duration: 170,
            easing: react_native_1.Easing.bezier(0.77, 0.0, 0.175, 1.0),
            toValue: Number(value),
            useNativeDriver: true
        }).start();
    };
    Checkbox.prototype.getBorderStyle = function () {
        var borderColor = { borderColor: this.getColor() };
        var borderStyle = [this.styles.container, { borderWidth: DEFAULT_BORDER_WIDTH }, borderColor];
        return borderStyle;
    };
    Checkbox.prototype.renderCheckbox = function () {
        var _a = this.props, selectedIcon = _a.selectedIcon, label = _a.label, testID = _a.testID, style = _a.style, containerStyle = _a.containerStyle, others = __rest(_a, ["selectedIcon", "label", "testID", "style", "containerStyle"]);
        return (
        //@ts-ignore
        <touchableOpacity_1.default {...this.getAccessibilityProps()} activeOpacity={1} testID={testID} {...others} style={[this.getBorderStyle(), style, !label && containerStyle]} onPress={this.onPress}>
        {<react_native_1.Animated.View style={[
                    this.styles.container,
                    { opacity: this.animationStyle.opacity },
                    { backgroundColor: this.getBackgroundColor() }
                ]}>
            <react_native_1.Animated.Image style={[
                    this.styles.selectedIcon,
                    { transform: this.animationStyle.transform },
                    { tintColor: this.getTintColor() }
                ]} source={selectedIcon || assets_1.default.icons.checkSmall} testID={testID + ".selected"}/>
          </react_native_1.Animated.View>}
      </touchableOpacity_1.default>);
    };
    Checkbox.prototype.render = function () {
        var _a = this.props, label = _a.label, labelStyle = _a.labelStyle, containerStyle = _a.containerStyle, labelProps = _a.labelProps;
        return label ? (<view_1.default row centerV style={[containerStyle]}>
        {this.renderCheckbox()}
        <text_1.default style={[this.styles.checkboxLabel, labelStyle]} {...labelProps} onPress={this.onPress}>
          {label}
        </text_1.default>
      </view_1.default>) : (this.renderCheckbox());
    };
    Checkbox.displayName = 'Checkbox';
    return Checkbox;
}(react_1.Component));
function createStyles(props) {
    var _a = props.color, color = _a === void 0 ? DEFAULT_COLOR : _a, _b = props.iconColor, iconColor = _b === void 0 ? DEFAULT_ICON_COLOR : _b, _c = props.size, size = _c === void 0 ? DEFAULT_SIZE : _c, _d = props.borderRadius, borderRadius = _d === void 0 ? DEFAULT_BORDER_RADIUS : _d;
    return react_native_1.StyleSheet.create({
        container: {
            width: size,
            height: size,
            borderRadius: borderRadius,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: color
        },
        selectedIcon: {
            tintColor: iconColor,
            alignItems: 'center',
            justifyContent: 'center'
        },
        checkboxLabel: {
            marginLeft: style_1.Spacings.s3,
            alignSelf: 'center'
        }
    });
}
exports.default = new_1.asBaseComponent(Checkbox);
