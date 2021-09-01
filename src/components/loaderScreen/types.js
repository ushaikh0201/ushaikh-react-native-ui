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
var react_1 = require("react");
/**
 * @description: Component that shows a full screen with an activity indicator
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/LoadingScreen.tsx
 */
// @ts-ignore
var FakeLoaderScreenForDocs = /** @class */ (function (_super) {
    __extends(FakeLoaderScreenForDocs, _super);
    function FakeLoaderScreenForDocs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FakeLoaderScreenForDocs.prototype.render = function () {
        return null;
    };
    FakeLoaderScreenForDocs.displayName = 'LoaderScreen';
    return FakeLoaderScreenForDocs;
}(react_1.PureComponent));
