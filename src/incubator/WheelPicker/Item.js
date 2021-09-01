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
var react_native_1 = require("react-native");
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var text_1 = __importDefault(require("../../components/text"));
var touchableOpacity_1 = __importDefault(require("../../components/touchableOpacity"));
var style_1 = require("../../../src/style");
var AnimatedTouchableOpacity = react_native_reanimated_1.default.createAnimatedComponent(touchableOpacity_1.default);
var AnimatedText = react_native_reanimated_1.default.createAnimatedComponent(text_1.default);
exports.default = react_1.memo(function (_a) {
    var index = _a.index, label = _a.label, fakeLabel = _a.fakeLabel, fakeLabelStyle = _a.fakeLabelStyle, fakeLabelProps = _a.fakeLabelProps, itemHeight = _a.itemHeight, onSelect = _a.onSelect, offset = _a.offset, _b = _a.activeColor, activeColor = _b === void 0 ? style_1.Colors.primary : _b, _c = _a.inactiveColor, inactiveColor = _c === void 0 ? style_1.Colors.grey20 : _c, style = _a.style, testID = _a.testID, _d = _a.centerH, centerH = _d === void 0 ? true : _d;
    var selectItem = react_1.useCallback(function () { return onSelect(index); }, [index]);
    var itemOffset = index * itemHeight;
    var animatedColorStyle = react_native_reanimated_1.useAnimatedStyle(function () {
        var color = react_native_reanimated_1.interpolateColor(offset.value, [itemOffset - itemHeight, itemOffset, itemOffset + itemHeight], [inactiveColor, activeColor, inactiveColor]);
        return { color: color };
    }, [itemHeight]);
    var containerStyle = react_1.useMemo(function () {
        return [{ height: itemHeight }, styles.container];
    }, [itemHeight]);
    return (<AnimatedTouchableOpacity activeOpacity={1} style={containerStyle} key={index} centerV centerH={centerH} right={!centerH} onPress={selectItem} 
    // @ts-ignore reanimated2
    index={index} testID={testID} row>
      <AnimatedText text60R style={[animatedColorStyle, style, fakeLabel ? styles.textWithLabelPadding : styles.textPadding]}>
        {label}
      </AnimatedText>
      {fakeLabel && (<text_1.default marginL-s2 marginR-s5 text80M color={'white'} {...fakeLabelProps} style={fakeLabelStyle}>
          {fakeLabel}
        </text_1.default>)}
    </AnimatedTouchableOpacity>);
});
var styles = react_native_1.StyleSheet.create({
    container: {
        minWidth: style_1.Spacings.s10
    },
    textPadding: {
        paddingHorizontal: style_1.Spacings.s5
    },
    textWithLabelPadding: {
        paddingLeft: style_1.Spacings.s5
    }
});
