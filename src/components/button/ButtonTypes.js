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
exports.DEFAULT_PROPS = exports.ButtonAnimationDirection = exports.ButtonSize = void 0;
var react_1 = require("react");
var ButtonSize;
(function (ButtonSize) {
    ButtonSize["xSmall"] = "xSmall";
    ButtonSize["small"] = "small";
    ButtonSize["medium"] = "medium";
    ButtonSize["large"] = "large";
})(ButtonSize = exports.ButtonSize || (exports.ButtonSize = {}));
var ButtonAnimationDirection;
(function (ButtonAnimationDirection) {
    ButtonAnimationDirection["center"] = "center";
    ButtonAnimationDirection["left"] = "left";
    ButtonAnimationDirection["right"] = "right";
})(ButtonAnimationDirection = exports.ButtonAnimationDirection || (exports.ButtonAnimationDirection = {}));
exports.DEFAULT_PROPS = {
    iconOnRight: false
};
/**
 * @description: Basic button component
 * @extends: TouchableOpacity
 * @modifiers: margin, background
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Sizes.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Typographies.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Outlines.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Corners.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Custom.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Inspirations.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Round.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Full.png?raw=true
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Animated.gif?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ButtonsScreen.tsx
 */
// @ts-ignore 
var FakeButtonForDocs = /** @class */ (function (_super) {
    __extends(FakeButtonForDocs, _super);
    function FakeButtonForDocs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FakeButtonForDocs.prototype.render = function () {
        return null;
    };
    FakeButtonForDocs.displayName = 'Button';
    FakeButtonForDocs.defaultProps = exports.DEFAULT_PROPS;
    return FakeButtonForDocs;
}(react_1.PureComponent));
