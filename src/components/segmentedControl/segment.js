"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var style_1 = require("../../style");
var new_1 = require("../../commons/new");
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var text_1 = __importDefault(require("../text"));
var image_1 = __importDefault(require("../image"));
/**
 * Segment sub-component for SegmentedControl component
 */
var Segment = react_1.default.memo(function (props) {
    var _a = props.activeColor, activeColor = _a === void 0 ? style_1.Colors.primary : _a, label = props.label, iconSource = props.iconSource, iconStyle = props.iconStyle, isSelected = props.isSelected, onLayout = props.onLayout, onPress = props.onPress, inactiveColor = props.inactiveColor, index = props.index, iconOnRight = props.iconOnRight, testID = props.testID;
    var segmentedColor = react_1.useMemo(function () { return (isSelected ? activeColor : inactiveColor); }, [isSelected, activeColor, inactiveColor]);
    var segmentStyle = react_1.useMemo(function () { return ({ paddingHorizontal: style_1.Spacings.s3, paddingVertical: style_1.Spacings.s2 }); }, []);
    var renderIcon = react_1.useCallback(function () {
        return iconSource && <image_1.default source={iconSource} style={[{ tintColor: segmentedColor }, iconStyle]}/>;
    }, [iconSource, segmentedColor, iconStyle]);
    var onSegmentPress = react_1.useCallback(function () {
        onPress(index);
    }, [index, onPress]);
    var segmentOnLayout = react_1.useCallback(function (event) {
        onLayout === null || onLayout === void 0 ? void 0 : onLayout(index, event);
    }, [onLayout, index]);
    return (<touchableOpacity_1.default onLayout={segmentOnLayout} style={segmentStyle} onPress={onSegmentPress} row flexG center testID={testID + "." + index}>
      {!iconOnRight && renderIcon()}
      {label && (<text_1.default text90 numberOfLines={1} color={segmentedColor}>
          {label}
        </text_1.default>)}
      {iconOnRight && renderIcon()}
    </touchableOpacity_1.default>);
});
exports.default = new_1.asBaseComponent(Segment);
