"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var view_1 = __importDefault(require("../view"));
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
/**
 * @description: ExpandableSection component to render expanded section below or above the sectionHeader
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ExpandableSectionScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ExpandableSection/ExpandableSection.gif?raw=true
 */
function ExpandableSection(props) {
    var expanded = props.expanded, sectionHeader = props.sectionHeader, children = props.children, top = props.top;
    var onPress = function () {
        var _a;
        (_a = props.onPress) === null || _a === void 0 ? void 0 : _a.call(props);
        react_native_1.LayoutAnimation.configureNext(__assign(__assign({}, react_native_1.LayoutAnimation.Presets.easeInEaseOut), { duration: 300 }));
    };
    return (<view_1.default style={styles.container}>
      {top && expanded && children}
      <touchableOpacity_1.default onPress={onPress}>{sectionHeader}</touchableOpacity_1.default>
      {!top && expanded && children}
    </view_1.default>);
}
exports.default = ExpandableSection;
var styles = react_native_1.StyleSheet.create({
    container: {
        overflow: 'hidden'
    }
});
