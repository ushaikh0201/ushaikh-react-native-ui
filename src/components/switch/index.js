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
var helpers_1 = require("../../helpers");
var style_1 = require("../../style");
var new_1 = require("../../commons/new");
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var INNER_PADDING = 2;
var DEFAULT_WIDTH = 42;
var DEFAULT_HEIGHT = 24;
var DEFAULT_THUMB_SIZE = 20;
/**
 * @description: Switch component for toggling boolean value related to some context
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SwitchScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Switch/Switch.gif?raw=true
 */
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            thumbPosition: new react_native_1.Animated.Value(_this.props.value ? 1 : 0)
        };
        _this.styles = createStyles(_this.props);
        _this.onPress = function () {
            var _a, _b;
            var disabled = _this.props.disabled;
            if (!disabled) {
                (_b = (_a = _this.props).onValueChange) === null || _b === void 0 ? void 0 : _b.call(_a, !_this.props.value);
            }
        };
        return _this;
    }
    Switch.prototype.componentDidUpdate = function (prevProps) {
        var value = this.props.value;
        if (prevProps.value !== value) {
            this.toggle(value);
        }
    };
    Switch.prototype.getAccessibilityProps = function () {
        var _a = this.props, disabled = _a.disabled, value = _a.value;
        return {
            accessible: true,
            accessibilityRole: 'switch',
            accessibilityStates: disabled ? ['disabled'] : value ? ['checked'] : ['unchecked'],
            accessibilityValue: { text: value ? '1' : '0' }
        };
    };
    Switch.prototype.toggle = function (value) {
        var thumbPosition = this.state.thumbPosition;
        react_native_1.Animated.timing(thumbPosition, {
            toValue: value ? 1 : 0,
            duration: 200,
            easing: react_native_1.Easing.bezier(0.77, 0.0, 0.175, 1.0),
            useNativeDriver: true
        }).start();
    };
    Switch.prototype.calcThumbOnPosition = function () {
        var props = this.props;
        var width = props.width || DEFAULT_WIDTH;
        var thumbSize = props.thumbSize || DEFAULT_THUMB_SIZE;
        var position = width - (2 * INNER_PADDING + thumbSize);
        position *= helpers_1.Constants.isRTL ? -1 : 1;
        return position;
    };
    Switch.prototype.getSwitchStyle = function () {
        var _a = this.props, value = _a.value, onColor = _a.onColor, offColor = _a.offColor, propsStyle = _a.style, disabled = _a.disabled, disabledColor = _a.disabledColor;
        var style = [this.styles.switch];
        if (disabled) {
            style.push(disabledColor ? { backgroundColor: disabledColor } : this.styles.switchDisabled);
        }
        else if (value) {
            style.push(onColor ? { backgroundColor: onColor } : this.styles.switchOn);
        }
        else {
            style.push(offColor ? { backgroundColor: offColor } : this.styles.switchOff);
        }
        style.push(propsStyle);
        return style;
    };
    Switch.prototype.renderThumb = function () {
        var thumbStyle = this.props.thumbStyle;
        var thumbPosition = this.state.thumbPosition;
        var interpolatedTranslateX = thumbPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.calcThumbOnPosition()]
        });
        var thumbPositionStyle = {
            transform: [{ translateX: interpolatedTranslateX }]
        };
        return <react_native_1.Animated.View style={[this.styles.thumb, thumbPositionStyle, thumbStyle]}/>;
    };
    Switch.prototype.render = function () {
        var others = __rest(this.props, []);
        return (
        // @ts-ignore
        <touchableOpacity_1.default {...this.getAccessibilityProps()} activeOpacity={1} {...others} style={this.getSwitchStyle()} onPress={this.onPress}>
        {this.renderThumb()}
      </touchableOpacity_1.default>);
    };
    Switch.displayName = 'Switch';
    return Switch;
}(react_1.Component));
function createStyles(_a) {
    var _b = _a.width, width = _b === void 0 ? DEFAULT_WIDTH : _b, _c = _a.height, height = _c === void 0 ? DEFAULT_HEIGHT : _c, _d = _a.onColor, onColor = _d === void 0 ? style_1.Colors.primary : _d, _e = _a.offColor, offColor = _e === void 0 ? style_1.Colors.getColorTint(style_1.Colors.primary, 60) : _e, _f = _a.disabledColor, disabledColor = _f === void 0 ? style_1.Colors.dark70 : _f, _g = _a.thumbColor, thumbColor = _g === void 0 ? style_1.Colors.white : _g, _h = _a.thumbSize, thumbSize = _h === void 0 ? DEFAULT_THUMB_SIZE : _h;
    return react_native_1.StyleSheet.create({
        switch: {
            width: width,
            height: height,
            borderRadius: style_1.BorderRadiuses.br100,
            justifyContent: 'center',
            padding: INNER_PADDING
        },
        switchOn: {
            backgroundColor: onColor
        },
        switchOff: {
            backgroundColor: offColor
        },
        switchDisabled: {
            backgroundColor: disabledColor
        },
        thumb: {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            backgroundColor: thumbColor
        }
    });
}
exports.default = new_1.asBaseComponent(Switch);
