import _pt from "prop-types";
import React, { PureComponent } from 'react';
import _ from 'lodash';
import { asBaseComponent } from "../../commons/new";
import GradientSlider from "./GradientSlider";
import SliderGroup from "./context/SliderGroup";
import Text from "../text";

/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorSliderGroup/ColorSliderGroup.gif?raw=true
 */
class ColorSliderGroup extends PureComponent {
  static propTypes = {
    /**
         * The gradient color
         */
    initialColor: _pt.string.isRequired,

    /**
         * Callback for onValueChange returns the new hex color
         */
    onValueChange: _pt.func,

    /**
         * Show the sliders labels (defaults are: Hue, Lightness, Saturation)
         */
    showLabels: _pt.bool,

    /**
         * In case you would like to change the default labels (translations etc.), you can provide
         * this prop with a map to the relevant labels ({hue: ..., lightness: ..., saturation: ...}).
         */
    labels: _pt.objectOf(_pt.string),

    /**
         * If true the component will have accessibility features enabled
         */
    accessible: _pt.bool
  };
  static displayName = 'ColorSliderGroup';
  static defaultProps = {
    labels: {
      hue: 'Hue',
      lightness: 'Lightness',
      saturation: 'Saturation'
    }
  };
  state = {
    initialColor: this.props.initialColor
  };
  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (prevState.initialColor !== nextProps.initialColor) {
      return {
        initialColor: nextProps.initialColor
      };
    }

    return null;
  };
  onValueChange = value => {
    _.invoke(this.props, 'onValueChange', value);
  };
  renderSlider = type => {
    const {
      sliderContainerStyle,
      showLabels,
      labelsStyle,
      accessible,
      labels
    } = this.props;
    return <>
        {showLabels && labels && <Text dark30 text80 style={labelsStyle} accessible={accessible}>
            {labels[type]}
          </Text>}
        <GradientSlider type={type} containerStyle={sliderContainerStyle} accessible={accessible} />
      </>;
  };

  render() {
    const {
      containerStyle
    } = this.props;
    const {
      initialColor
    } = this.state;
    return <SliderGroup style={containerStyle} color={initialColor} onValueChange={this.onValueChange}>
        {this.renderSlider(GradientSlider.types.HUE)}
        {this.renderSlider(GradientSlider.types.LIGHTNESS)}
        {this.renderSlider(GradientSlider.types.SATURATION)}
      </SliderGroup>;
  }

}

export default asBaseComponent(ColorSliderGroup);