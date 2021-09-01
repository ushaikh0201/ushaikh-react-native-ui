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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var lodash_1 = __importDefault(require("lodash"));
var new_1 = require("../../commons/new");
var GradientSlider_1 = __importDefault(require("./GradientSlider"));
var SliderGroup_1 = __importDefault(require("./context/SliderGroup"));
var text_1 = __importDefault(require("../text"));
/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorSliderGroup/ColorSliderGroup.gif?raw=true
 */
var ColorSliderGroup = /** @class */ (function (_super) {
    __extends(ColorSliderGroup, _super);
    function ColorSliderGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            initialColor: _this.props.initialColor
        };
        _this.onValueChange = function (value) {
            lodash_1.default.invoke(_this.props, 'onValueChange', value);
        };
        _this.renderSlider = function (type) {
            var _a = _this.props, sliderContainerStyle = _a.sliderContainerStyle, showLabels = _a.showLabels, labelsStyle = _a.labelsStyle, accessible = _a.accessible, labels = _a.labels;
            return (<>
        {showLabels && labels && (<text_1.default dark30 text80 style={labelsStyle} accessible={accessible}>
            {labels[type]}
          </text_1.default>)}
        <GradientSlider_1.default type={type} containerStyle={sliderContainerStyle} accessible={accessible}/>
      </>);
        };
        return _this;
    }
    ColorSliderGroup.prototype.render = function () {
        var containerStyle = this.props.containerStyle;
        var initialColor = this.state.initialColor;
        return (<SliderGroup_1.default style={containerStyle} color={initialColor} onValueChange={this.onValueChange}>
        {this.renderSlider(GradientSlider_1.default.types.HUE)}
        {this.renderSlider(GradientSlider_1.default.types.LIGHTNESS)}
        {this.renderSlider(GradientSlider_1.default.types.SATURATION)}
      </SliderGroup_1.default>);
    };
    ColorSliderGroup.displayName = 'ColorSliderGroup';
    ColorSliderGroup.defaultProps = {
        labels: { hue: 'Hue', lightness: 'Lightness', saturation: 'Saturation' }
    };
    ColorSliderGroup.getDerivedStateFromProps = function (nextProps, prevState) {
        if (prevState.initialColor !== nextProps.initialColor) {
            return {
                initialColor: nextProps.initialColor
            };
        }
        return null;
    };
    return ColorSliderGroup;
}(react_1.PureComponent));
exports.default = new_1.asBaseComponent(ColorSliderGroup);
