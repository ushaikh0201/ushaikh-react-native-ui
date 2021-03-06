import _pt from "prop-types";
import _ from 'lodash';
import React, { Component } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Modal as RNModal, TouchableWithoutFeedback } from 'react-native';
import { BlurViewPackage } from "../../optionalDependencies";
import { Constants } from "../../helpers";
import { asBaseComponent } from "../../commons/new";
import TopBar, { ModalTopBarProps } from "./TopBar";
import View from "../../components/view";
const BlurView = BlurViewPackage?.BlurView;
export { ModalTopBarProps };

/**
 * @description: Component that present content on top of the invoking screen
 * @extends: Modal
 * @extendsLink: https://reactnative.dev/docs/modal
 * @gif: https://media.giphy.com/media/3oFzmfSX8KgvctI4Ks/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ModalScreen.tsx
 */
class Modal extends Component {
  static propTypes = {
    /**
       * Blurs the modal background when transparent (iOS only)
       */
    enableModalBlur: _pt.bool,

    /**
       * A custom view to use as a BlueView instead of the default one
       */
    blurView: _pt.element,

    /**
       * allow dismissing a modal when clicking on its background
       */
    onBackgroundPress: _pt.func,

    /**
       * the background color of the overlay
       */
    overlayBackgroundColor: _pt.string,

    /**
       * The modal's end-to-end test identifier
       */
    testID: _pt.string,

    /**
       * Overrides the text that's read by the screen reader when the user interacts with the element. By default, the
       * label is constructed by traversing all the children and accumulating all the Text nodes separated by space.
       */
    accessibilityLabel: _pt.string,

    /**
       * Should add a GestureHandlerRootView (Android only)
       */
    useGestureHandlerRootView: _pt.bool
  };
  static displayName = 'Modal';

  constructor(props) {
    super(props);

    if (props.enableModalBlur && !BlurView) {
      console.error(`RNUILib Modal's "enableModalBlur" prop requires installing "@react-native-community/blur" dependency`);
    }
  }

  renderTouchableOverlay() {
    const {
      testID,
      overlayBackgroundColor,
      onBackgroundPress,
      accessibilityLabel = 'Dismiss'
    } = this.props;

    if (_.isFunction(onBackgroundPress) || !!overlayBackgroundColor) {
      const isScreenReaderEnabled = Constants.accessibility.isScreenReaderEnabled;
      const accessibilityProps = isScreenReaderEnabled ? {
        accessible: true,
        accessibilityLabel,
        accessibilityRole: 'button'
      } : undefined;
      return (// @ts-ignore
        <View useSafeArea={isScreenReaderEnabled} style={!isScreenReaderEnabled && [styles.touchableOverlay, {
          backgroundColor: overlayBackgroundColor
        }]} testID={testID}>
          {
            /*
             // @ts-ignore */
          }
          <TouchableWithoutFeedback {...accessibilityProps} onPress={onBackgroundPress}>
            <View style={isScreenReaderEnabled ? styles.accessibleOverlayView : styles.fill} />
          </TouchableWithoutFeedback>
        </View>
      );
    }
  }

  render() {
    const {
      blurView,
      enableModalBlur,
      visible,
      useGestureHandlerRootView,
      ...others
    } = this.props;
    const defaultContainer = enableModalBlur && Constants.isIOS && BlurView ? BlurView : View;
    const useGestureHandler = useGestureHandlerRootView && Constants.isAndroid;
    const GestureContainer = useGestureHandler ? GestureHandlerRootView : React.Fragment;
    const gestureContainerProps = useGestureHandler ? {
      style: styles.fill
    } : {};
    const Container = blurView ? blurView : defaultContainer;
    return <RNModal visible={Boolean(visible)} {...others}>
        <GestureContainer {...gestureContainerProps}>
          <Container style={styles.fill} blurType="light">
            {this.renderTouchableOverlay()}
            {this.props.children}
          </Container>
        </GestureContainer>
      </RNModal>;
  }

}

const styles = StyleSheet.create({
  touchableOverlay: { ...StyleSheet.absoluteFillObject
  },
  fill: {
    flex: 1
  },
  accessibleOverlayView: {
    height: 50,
    width: '100%'
  }
});
Modal.TopBar = TopBar;
export default asBaseComponent(Modal);