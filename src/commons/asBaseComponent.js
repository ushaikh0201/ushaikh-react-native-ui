import React from 'react';
import { Appearance } from 'react-native';
import hoistStatics from 'hoist-non-react-statics';
import * as Modifiers from "./modifiers";
import forwardRef from "./forwardRef";
import UIComponent from "./UIComponent";

function asBaseComponent(WrappedComponent) {
  class BaseComponent extends UIComponent {
    state = {
      error: false
    };

    componentDidMount() {
      Appearance.addChangeListener(this.appearanceListener);
    }

    componentWillUnmount() {
      Appearance.removeChangeListener(this.appearanceListener);
    }

    appearanceListener = () => {
      // iOS 13 and above will trigger this call with the wrong colorScheme value. So just ignore returned colorScheme for now
      // https://github.com/facebook/react-native/issues/28525
      this.setState({
        colorScheme: Appearance.getColorScheme()
      });
    };
    static getThemeProps = (props, context) => {
      return Modifiers.getThemeProps.call(WrappedComponent, props, context);
    };

    static getDerivedStateFromError(error) {
      UIComponent.defaultProps?.onError?.(error, WrappedComponent.defaultProps);
      return {
        error: true
      };
    }

    render() {
      const themeProps = BaseComponent.getThemeProps(this.props, this.context);
      const modifiers = Modifiers.generateModifiersStyle(undefined, themeProps); // TODO: omit original modifiers props (left, right, flex, etc..)
      // Because they throws an error when being passed to RNView on Android

      const {
        forwardedRef,
        ...others
      } = themeProps;
      return this.state.error && UIComponent.defaultProps?.renderError || <WrappedComponent {...others} modifiers={modifiers} ref={forwardedRef} />;
    }

  } // Statics


  hoistStatics(BaseComponent, WrappedComponent);
  BaseComponent.displayName = WrappedComponent.displayName;
  BaseComponent.propTypes = WrappedComponent.propTypes;
  BaseComponent.defaultProps = WrappedComponent.defaultProps;
  return forwardRef(BaseComponent);
}

export default asBaseComponent;