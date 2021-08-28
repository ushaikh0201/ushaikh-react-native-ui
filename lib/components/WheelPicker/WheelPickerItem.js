import _pt from "prop-types";
import React, { Component } from 'react';
export default class WheelPickerItem extends Component {
  static propTypes = {
    /**
       * the picker item value
       */
    value: _pt.oneOfType([_pt.string, _pt.number]).isRequired,

    /**
       * the picker item display label
       */
    label: _pt.string.isRequired
  };
  static displayName = 'WheelPicker.Item';

  render() {
    // These items don't get rendered directly.
    return null;
  }

}