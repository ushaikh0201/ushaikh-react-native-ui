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
exports.GradientSliderTypes = void 0;
var react_1 = __importStar(require("react"));
var lodash_1 = __importDefault(require("lodash"));
var tinycolor2_1 = __importDefault(require("tinycolor2"));
var react_native_color_1 = require("react-native-color");
var style_1 = require("../../style");
var new_1 = require("../../commons/new");
var index_1 = __importDefault(require("./index"));
var asSliderGroupChild_1 = __importDefault(require("./context/asSliderGroupChild"));
var GradientSliderTypes;
(function (GradientSliderTypes) {
    GradientSliderTypes["DEFAULT"] = "default";
    GradientSliderTypes["HUE"] = "hue";
    GradientSliderTypes["LIGHTNESS"] = "lightness";
    GradientSliderTypes["SATURATION"] = "saturation";
})(GradientSliderTypes = exports.GradientSliderTypes || (exports.GradientSliderTypes = {}));
var defaultProps = {
    type: GradientSliderTypes.DEFAULT,
    gradientSteps: 120,
    color: style_1.Colors.blue30
};
/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/GradientSlider/GradientSlider.gif?raw=true
 */
var GradientSlider = /** @class */ (function (_super) {
    __extends(GradientSlider, _super);
    function GradientSlider(props) {
        var _this = _super.call(this, props) || this;
        _this.getStepColor = function (i) {
            var color = _this.getColor();
            return tinycolor2_1.default(__assign(__assign({}, color), { a: i })).toHslString();
        };
        _this.renderDefaultGradient = function () {
            var gradientSteps = _this.props.gradientSteps;
            return (<react_native_color_1.Gradient gradientSteps={gradientSteps} maximumValue={1} getStepColor={_this.getStepColor}/>);
        };
        _this.renderHueGradient = function () {
            var gradientSteps = _this.props.gradientSteps;
            return (<react_native_color_1.HueGradient gradientSteps={gradientSteps}/>);
        };
        _this.renderLightnessGradient = function () {
            var color = _this.getColor();
            var gradientSteps = _this.props.gradientSteps;
            return (<react_native_color_1.LightnessGradient color={color} gradientSteps={gradientSteps}/>);
        };
        _this.renderSaturationGradient = function () {
            var color = _this.getColor();
            var gradientSteps = _this.props.gradientSteps;
            return (<react_native_color_1.SaturationGradient color={color} gradientSteps={gradientSteps}/>);
        };
        _this.onValueChange = function (value, alpha) {
            // alpha returns for type.DEFAULT
            lodash_1.default.invoke(_this.props, 'onValueChange', value, alpha);
        };
        _this.updateAlpha = function (a) {
            var color = _this.getColor();
            _this.updateColor(__assign(__assign({}, color), { a: a }));
        };
        _this.updateHue = function (h) {
            var color = _this.getColor();
            _this.updateColor(__assign(__assign({}, color), { h: h }));
        };
        _this.updateLightness = function (l) {
            var color = _this.getColor();
            _this.updateColor(__assign(__assign({}, color), { l: l }));
        };
        _this.updateSaturation = function (s) {
            var color = _this.getColor();
            _this.updateColor(__assign(__assign({}, color), { s: s }));
        };
        _this.state = {
            prevColor: props.color,
            initialColor: style_1.Colors.getHSL(props.color),
            color: style_1.Colors.getHSL(props.color)
        };
        return _this;
    }
    GradientSlider.getDerivedStateFromProps = function (nextProps, prevState) {
        if (prevState.prevColor !== nextProps.color) {
            return {
                color: style_1.Colors.getHSL(nextProps.color),
                prevColor: style_1.Colors.getHSL(nextProps.color)
            };
        }
        return null;
    };
    GradientSlider.prototype.getColor = function () {
        var color = this.state.color;
        var value = this.props.sliderContext.value;
        return value || color;
    };
    GradientSlider.prototype.updateColor = function (color) {
        if (!lodash_1.default.isEmpty(this.props.sliderContext)) {
            lodash_1.default.invoke(this.props.sliderContext, 'setValue', color);
        }
        else {
            this.setState({ color: color });
            var hex = style_1.Colors.getHexString(color);
            this.onValueChange(hex, color.a);
        }
    };
    GradientSlider.prototype.render = function () {
        var _a = this.props, type = _a.type, containerStyle = _a.containerStyle, disabled = _a.disabled, accessible = _a.accessible;
        var initialColor = this.state.initialColor;
        var color = this.getColor();
        var thumbTintColor = style_1.Colors.getHexString(color);
        var step = 0.01;
        var maximumValue = 1;
        var value = color.a;
        var renderTrack = this.renderDefaultGradient;
        var onValueChange = this.updateAlpha;
        switch (type) {
            case GradientSliderTypes.HUE:
                step = 1;
                maximumValue = 359;
                value = initialColor.h;
                renderTrack = this.renderHueGradient;
                onValueChange = this.updateHue;
                break;
            case GradientSliderTypes.LIGHTNESS:
                value = initialColor.l;
                renderTrack = this.renderLightnessGradient;
                onValueChange = this.updateLightness;
                break;
            case GradientSliderTypes.SATURATION:
                value = initialColor.s;
                renderTrack = this.renderSaturationGradient;
                onValueChange = this.updateSaturation;
                break;
            default:
                break;
        }
        return (<index_1.default renderTrack={renderTrack} step={step} maximumValue={maximumValue} value={value} thumbTintColor={thumbTintColor} onValueChange={onValueChange} containerStyle={containerStyle} disabled={disabled} accessible={accessible}/>);
    };
    GradientSlider.displayName = 'GradientSlider';
    GradientSlider.defaultProps = defaultProps;
    GradientSlider.types = GradientSliderTypes;
    return GradientSlider;
}(react_1.Component));
exports.default = new_1.asBaseComponent(asSliderGroupChild_1.default(GradientSlider));
