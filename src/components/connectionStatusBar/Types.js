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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PROPS = void 0;
var react_1 = require("react");
exports.DEFAULT_PROPS = {
    label: 'No internet. Check your connection.',
    allowDismiss: false,
    useAbsolutePosition: true
};
/**
 * @description: Top bar to show a "no internet" connection status. Note: Run on real device for best results
 * @image: https://user-images.githubusercontent.com/33805983/34683190-f3b1904c-f4a9-11e7-9d46-9a340bd35448.png, https://user-images.githubusercontent.com/33805983/34484206-edc6c6e4-efcb-11e7-88b2-cd394c19dd5e.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ConnectionStatusBarScreen.tsx
 * @notes: The component requires installing the '@react-native-community/netinfo' native library
 */
// @ts-ignore
var FakeConnectionStatusBarForDocs = /** @class */ (function (_super) {
    __extends(FakeConnectionStatusBarForDocs, _super);
    function FakeConnectionStatusBarForDocs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FakeConnectionStatusBarForDocs.prototype.render = function () {
        return null;
    };
    FakeConnectionStatusBarForDocs.displayName = 'ConnectionStatusBar';
    FakeConnectionStatusBarForDocs.defaultProps = exports.DEFAULT_PROPS;
    return FakeConnectionStatusBarForDocs;
}(react_1.PureComponent));
