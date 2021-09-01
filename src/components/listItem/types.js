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
 * @description: List item component to render inside a List component
 * @extends: TouchableOpacity
 * @gif: https://media.giphy.com/media/l1IBjHowyPcOTWAY8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BasicListScreen.tsx
 */
// @ts-ignore
var FakeListItemForDocs = /** @class */ (function (_super) {
    __extends(FakeListItemForDocs, _super);
    function FakeListItemForDocs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FakeListItemForDocs.prototype.render = function () {
        return null;
    };
    FakeListItemForDocs.displayName = 'ListItem';
    return FakeListItemForDocs;
}(react_1.PureComponent));
/**
 * @description: ListItem.Part, a sub ListItem component for layout-ing inside a ListItem
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BasicListScreen.tsx
 */
// @ts-ignore
var FakeListItemPartForDocs = /** @class */ (function (_super) {
    __extends(FakeListItemPartForDocs, _super);
    function FakeListItemPartForDocs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FakeListItemPartForDocs.prototype.render = function () {
        return null;
    };
    FakeListItemPartForDocs.displayName = 'ListItemPart';
    return FakeListItemPartForDocs;
}(react_1.PureComponent));
