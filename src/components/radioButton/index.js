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
var new_1 = require("../../commons/new");
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var view_1 = __importDefault(require("../view"));
var text_1 = __importDefault(require("../text"));
var image_1 = __importDefault(require("../image"));
var asRadioGroupChild_1 = __importDefault(require("../radioGroup/asRadioGroupChild"));
var DEFAULT_SIZE = 24;
var DEFAULT_COLOR = style_1.Colors.primary;
/**
 * @description: A Radio Button component, should be wrapped inside a RadioGroup
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Default.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Alignment.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Custom.gif?raw=true
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Individual.png?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/RadioButtonScreen.js
 */
var RadioButton = /** @class */ (function (_super) {
    __extends(RadioButton, _super);
    function RadioButton(props) {
        var _this = _super.call(this, props) || this;
        _this.onPress = function () {
            var _a, _b, _c, _d;
            var _e = _this.props, disabled = _e.disabled, _f = _e.value, value = _f === void 0 ? false : _f, _g = _e.selected, selected = _g === void 0 ? false : _g;
            if (!disabled) {
                (_b = (_a = _this.props).onValueChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
                (_d = (_c = _this.props).onPress) === null || _d === void 0 ? void 0 : _d.call(_c, selected);
            }
        };
        _this.getAccessibilityProps = function () {
            var _a = _this.props, _b = _a.label, label = _b === void 0 ? '' : _b, selected = _a.selected, disabled = _a.disabled;
            var selectedAccessibilityText = selected ? 'selected' : 'unselected';
            var accessibilityLabel = selectedAccessibilityText + ". " + label;
            return {
                accessible: true,
                accessibilityStates: disabled ? ['disabled'] : undefined,
                accessibilityRole: 'button',
                accessibilityLabel: accessibilityLabel
            };
        };
        _this.styles = createStyles(props);
        _this.state = {
            opacityAnimationValue: new react_native_1.Animated.Value(0),
            scaleAnimationValue: new react_native_1.Animated.Value(0.8)
        };
        return _this;
    }
    RadioButton.prototype.componentDidMount = function () {
        this.animate();
    };
    RadioButton.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.selected !== this.props.selected) {
            this.animate();
        }
    };
    RadioButton.prototype.animate = function () {
        var selected = this.props.selected;
        var _a = this.state, opacityAnimationValue = _a.opacityAnimationValue, scaleAnimationValue = _a.scaleAnimationValue;
        var animationTime = 150;
        var animationDelay = 60;
        if (selected) {
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(opacityAnimationValue, {
                    toValue: 1,
                    duration: animationTime,
                    useNativeDriver: true
                }),
                react_native_1.Animated.timing(scaleAnimationValue, {
                    toValue: 1,
                    delay: animationDelay,
                    duration: animationTime,
                    easing: react_native_1.Easing.bezier(0.165, 0.84, 0.44, 1),
                    useNativeDriver: true
                })
            ]).start();
        }
        else {
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(scaleAnimationValue, {
                    toValue: 0.8,
                    duration: animationTime,
                    useNativeDriver: true
                }),
                react_native_1.Animated.timing(opacityAnimationValue, {
                    toValue: 0,
                    duration: animationTime,
                    useNativeDriver: true
                })
            ]).start();
        }
    };
    RadioButton.prototype.getRadioButtonOutlineStyle = function () {
        var _a = this.props, color = _a.color, size = _a.size, borderRadius = _a.borderRadius, propsStyle = _a.style, disabled = _a.disabled;
        var style = [this.styles.radioButtonOutline];
        if (size) {
            style.push({ width: size, height: size });
        }
        if (borderRadius) {
            style.push({ borderRadius: borderRadius });
        }
        if (color) {
            style.push({ borderColor: disabled ? style_1.Colors.dark70 : color });
        }
        style.push(propsStyle);
        return style;
    };
    RadioButton.prototype.getRadioButtonInnerStyle = function () {
        var _a = this.props, color = _a.color, borderRadius = _a.borderRadius, disabled = _a.disabled;
        var style = [this.styles.radioButtonInner];
        if (borderRadius) {
            style.push({ borderRadius: borderRadius });
        }
        if (color) {
            style.push({ backgroundColor: disabled ? style_1.Colors.dark70 : color });
        }
        return style;
    };
    RadioButton.prototype.renderLabel = function () {
        var _a = this.props, label = _a.label, labelStyle = _a.labelStyle, contentOnRight = _a.contentOnRight;
        return (label && (<text_1.default marginL-10={!contentOnRight} marginR-10={contentOnRight} style={labelStyle}>
          {label}
        </text_1.default>));
    };
    RadioButton.prototype.renderIcon = function () {
        var _a = this.props, iconSource = _a.iconSource, iconStyle = _a.iconStyle;
        var style = [this.styles.image, iconStyle];
        return iconSource && <image_1.default style={style} source={iconSource}/>;
    };
    RadioButton.prototype.renderButton = function () {
        var _a = this.state, opacityAnimationValue = _a.opacityAnimationValue, scaleAnimationValue = _a.scaleAnimationValue;
        return (<view_1.default style={this.getRadioButtonOutlineStyle()}>
        <react_native_1.Animated.View style={[
                this.getRadioButtonInnerStyle(),
                { opacity: opacityAnimationValue },
                { transform: [{ scale: scaleAnimationValue }] }
            ]}/>
      </view_1.default>);
    };
    RadioButton.prototype.render = function () {
        var _a = this.props, onPress = _a.onPress, onValueChange = _a.onValueChange, contentOnRight = _a.contentOnRight, containerStyle = _a.containerStyle, others = __rest(_a, ["onPress", "onValueChange", "contentOnRight", "containerStyle"]);
        var Container = onPress || onValueChange ? touchableOpacity_1.default : view_1.default;
        return (
        // @ts-ignore
        <Container row centerV activeOpacity={1} {...others} style={containerStyle} onPress={this.onPress} {...this.getAccessibilityProps()}>
        {!contentOnRight && this.renderButton()}
        {this.props.iconOnRight ? this.renderLabel() : this.renderIcon()}
        {this.props.iconOnRight ? this.renderIcon() : this.renderLabel()}
        {contentOnRight && this.renderButton()}
      </Container>);
    };
    RadioButton.displayName = 'RadioButton';
    RadioButton.defaultProps = {
        iconOnRight: false
    };
    return RadioButton;
}(react_1.PureComponent));
function createStyles(props) {
    var _a = props.size, size = _a === void 0 ? DEFAULT_SIZE : _a, _b = props.borderRadius, borderRadius = _b === void 0 ? DEFAULT_SIZE / 2 : _b, _c = props.color, color = _c === void 0 ? DEFAULT_COLOR : _c, disabled = props.disabled;
    return react_native_1.StyleSheet.create({
        radioButtonOutline: {
            borderWidth: 2,
            borderColor: disabled ? style_1.Colors.dark70 : color,
            width: size,
            height: size,
            borderRadius: borderRadius,
            padding: 3
        },
        radioButtonInner: {
            backgroundColor: disabled ? style_1.Colors.dark70 : color,
            flex: 1,
            borderRadius: borderRadius
        },
        image: {
            marginLeft: 6
        }
    });
}
exports.default = new_1.asBaseComponent(new_1.forwardRef(asRadioGroupChild_1.default(RadioButton)));
