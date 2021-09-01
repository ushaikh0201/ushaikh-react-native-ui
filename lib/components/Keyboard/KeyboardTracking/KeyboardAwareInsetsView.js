"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var KeyboardTrackingView_1 = __importDefault(require("./KeyboardTrackingView"));
/**
 * @description: Used to add an inset when a keyboard is used and might hide part of the screen.
 *
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TextFieldScreen/InputsScreen.js
 * @notes: This view is useful only for iOS.
 */
var KeyboardAwareInsetsView = function (props) { return (<KeyboardTrackingView_1.default {...props} pointerEvents={'none'} style={styles.insetsView} scrollToFocusedInput/>); };
var ScreenSize = react_native_1.Dimensions.get('window');
var styles = react_native_1.StyleSheet.create({
    insetsView: {
        width: ScreenSize.width,
        height: 0.5,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'transparent'
    }
});
KeyboardAwareInsetsView.displayName = 'KeyboardAwareInsetsView';
exports.default = KeyboardAwareInsetsView;
