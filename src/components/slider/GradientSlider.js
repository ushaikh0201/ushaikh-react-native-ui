import _pt from "prop-types";
import React, { Component } from 'react';
import _ from 'lodash';
import tinycolor from 'tinycolor2';
import { HueGradient, LightnessGradient, SaturationGradient, Gradient } from 'react-native-color';
import { Colors } from "../../style";
import { asBaseComponent } from "../../commons/new";
import Slider from "./index";
import asSliderGroupChild from "./context/asSliderGroupChild";
export let GradientSliderTypes;

(function (GradientSliderTypes) {
  GradientSliderTypes["DEFAULT"] = "default";
  GradientSliderTypes["HUE"] = "hue";
  GradientSliderTypes["LIGHTNESS"] = "lightness";
  GradientSliderTypes["SATURATION"] = "saturation";
})(GradientSliderTypes || (GradientSliderTypes = {}));

const defaultProps = {
  type: GradientSliderTypes.DEFAULT,
  gradientSteps: 120,
  color: Colors.blue30
};
/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/GradientSlider/GradientSlider.gif?raw=true
 */

class GradientSlider extends Component {
  static propTypes = {
    /**
         * The gradient color
         */
    color: _pt.string,

    /**
         * The gradient type (default, hue, lightness, saturation)
         */
    type: _pt.oneOf(["default", "hue", "lightness", "saturation"]),

    /**
         * The gradient steps
         */
    gradientSteps: _pt.number,

    /**
         * Callback for onValueChange, returns the updated color
         */
    onValueChange: _pt.func,

    /**
         * If true the component will have accessibility features enabled
         */
    accessible: _pt.bool,

    /**
         * If true the Slider will be disabled and will appear in disabled color
         */
    disabled: _pt.bool
  };
  static displayName = 'GradientSlider';
  static defaultProps = defaultProps;
  static types = GradientSliderTypes;

  constructor(props) {
    super(props);
    this.state = {
      prevColor: props.color,
      initialColor: Colors.getHSL(props.color),
      color: Colors.getHSL(props.color)
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.prevColor !== nextProps.color) {
      return {
        color: Colors.getHSL(nextProps.color),
        prevColor: Colors.getHSL(nextProps.color)
      };
    }

    return null;
  }

  getColor() {
    const {
      color
    } = this.state;
    const {
      value
    } = this.props.sliderContext;
    return value || color;
  }

  getStepColor = i => {
    const color = this.getColor();
    return tinycolor({ ...color,
      a: i
    }).toHslString();
  };
  renderDefaultGradient = () => {
    const {
      gradientSteps
    } = this.props;
    return <Gradient gradientSteps={gradientSteps} maximumValue={1} getStepColor={this.getStepColor} />;
  };
  renderHueGradient = () => {
    const {
      gradientSteps
    } = this.props;
    return <HueGradient gradientSteps={gradientSteps} />;
  };
  renderLightnessGradient = () => {
    const color = this.getColor();
    const {
      gradientSteps
    } = this.props;
    return <LightnessGradient color={color} gradientSteps={gradientSteps} />;
  };
  renderSaturationGradient = () => {
    const color = this.getColor();
    const {
      gradientSteps
    } = this.props;
    return <SaturationGradient color={color} gradientSteps={gradientSteps} />;
  };
  onValueChange = (value, alpha) => {
    // alpha returns for type.DEFAULT
    _.invoke(this.props, 'onValueChange', value, alpha);
  };

  updateColor(color) {
    if (!_.isEmpty(this.props.sliderContext)) {
      _.invoke(this.props.sliderContext, 'setValue', color);
    } else {
      this.setState({
        color
      });
      const hex = Colors.getHexString(color);
      this.onValueChange(hex, color.a);
    }
  }

  updateAlpha = a => {
    const color = this.getColor();
    this.updateColor({ ...color,
      a
    });
  };
  updateHue = h => {
    const color = this.getColor();
    this.updateColor({ ...color,
      h
    });
  };
  updateLightness = l => {
    const color = this.getColor();
    this.updateColor({ ...color,
      l
    });
  };
  updateSaturation = s => {
    const color = this.getColor();
    this.updateColor({ ...color,
      s
    });
  };

  render() {
    const {
      type,
      containerStyle,
      disabled,
      accessible
    } = this.props;
    const initialColor = this.state.initialColor;
    const color = this.getColor();
    const thumbTintColor = Colors.getHexString(color);
    let step = 0.01;
    let maximumValue = 1;
    let value = color.a;
    let renderTrack = this.renderDefaultGradient;
    let onValueChange = this.updateAlpha;

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

    return <Slider renderTrack={renderTrack} step={step} maximumValue={maximumValue} value={value} thumbTintColor={thumbTintColor} onValueChange={onValueChange} containerStyle={containerStyle} disabled={disabled} accessible={accessible} />;
  }

}

export default asBaseComponent(asSliderGroupChild(GradientSlider));