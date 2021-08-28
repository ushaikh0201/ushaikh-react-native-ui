import _pt from "prop-types";
import React from 'react';
import { Platform } from 'react-native';
import { default as KeyboardTrackingViewIOS } from "./KeyboardTrackingView.ios";
import { default as KeyboardTrackingViewAndroid } from "./KeyboardTrackingView.android";
const IsAndroid = Platform.OS === 'android';

const KeyboardTrackingView = ({
  children,
  ...others
}) => {
  const KeyboardTrackingViewContainer = IsAndroid ? KeyboardTrackingViewAndroid : KeyboardTrackingViewIOS;
  return <KeyboardTrackingViewContainer {...others}>
      {children}
    </KeyboardTrackingViewContainer>;
};

KeyboardTrackingView.propTypes = {
  /**
       * Enables tracking of the keyboard when it's dismissed interactively (false by default).
       * Why? When using an external keyboard (BT),
       * you still get the keyboard events and the view just hovers when you focus the input.
       * Also, if you're not using interactive style of dismissing the keyboard
       * (or if you don't have an input inside this view) it doesn't make sense to track it anyway.
       * (This is caused because of the usage of inputAccessory to be able to track the
       * keyboard interactive change and it introduces this bug)
       */
  trackInteractive: _pt.bool,

  /**
      * Allow control safe area
      */
  useSafeArea: _pt.bool,
  scrollToFocusedInput: _pt.bool,
  scrollBehavior: _pt.number,
  revealKeyboardInteractive: _pt.bool,
  manageScrollView: _pt.bool,
  requiresSameParentToManageScrollView: _pt.bool,
  addBottomView: _pt.bool,
  allowHitsOutsideBounds: _pt.bool,

  /* Can't figure out what it's supposed to be*/
  ref: _pt.any
};
export default KeyboardTrackingView;