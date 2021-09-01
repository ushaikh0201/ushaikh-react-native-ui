"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var TextInputKeyboardManager_1 = __importDefault(require("../TextInputKeyboardManager"));
/**
 * @description: util for managing the keyboard.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/nativeComponentScreens/keyboardInput/KeyboardInputViewScreen.js
 */
var KeyboardUtils = /** @class */ (function () {
    function KeyboardUtils() {
    }
    KeyboardUtils.displayName = 'KeyboardUtils';
    /**
     * Used to dismiss (close) the keyboard.
     */
    KeyboardUtils.dismiss = function () {
        react_native_1.Keyboard.dismiss();
        TextInputKeyboardManager_1.default.dismissKeyboard();
    };
    return KeyboardUtils;
}());
exports.default = KeyboardUtils;
