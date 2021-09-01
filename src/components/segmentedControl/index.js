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
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var style_1 = require("../../style");
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../view"));
var segment_1 = __importDefault(require("./segment"));
var helpers_1 = require("helpers");
var _interpolate = react_native_reanimated_1.default.interpolate, interpolateNode = react_native_reanimated_1.default.interpolateNode;
var interpolate = interpolateNode || _interpolate;
var Easing = react_native_reanimated_1.EasingNode || react_native_reanimated_1.Easing;
var BORDER_WIDTH = 1;
/**
 * @description: SegmentedControl component for toggling two values or more
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SegmentedControlScreen.tsx
 */
var SegmentedControl = function (props) {
    var onChangeIndex = props.onChangeIndex, _a = props.initialIndex, initialIndex = _a === void 0 ? 0 : _a, containerStyle = props.containerStyle, style = props.style, segments = props.segments, _b = props.activeColor, activeColor = _b === void 0 ? style_1.Colors.primary : _b, _c = props.borderRadius, borderRadius = _c === void 0 ? style_1.BorderRadiuses.br100 : _c, _d = props.backgroundColor, backgroundColor = _d === void 0 ? style_1.Colors.grey80 : _d, _e = props.activeBackgroundColor, activeBackgroundColor = _e === void 0 ? style_1.Colors.white : _e, _f = props.inactiveColor, inactiveColor = _f === void 0 ? style_1.Colors.grey20 : _f, _g = props.outlineColor, outlineColor = _g === void 0 ? activeColor : _g, _h = props.outlineWidth, outlineWidth = _h === void 0 ? BORDER_WIDTH : _h, testID = props.testID;
    var _j = react_1.useState(-1), selectedSegment = _j[0], setSelectedSegment = _j[1];
    var segmentsStyle = react_1.useRef([]);
    var segmentedControlHeight = react_1.useRef(0);
    var indexRef = react_1.useRef(0);
    var segmentsCounter = react_1.useRef(0);
    var animatedValue = react_1.useRef(new react_native_reanimated_1.default.Value(initialIndex));
    var changeIndex = react_1.useCallback(lodash_1.default.throttle(function () {
        onChangeIndex === null || onChangeIndex === void 0 ? void 0 : onChangeIndex(indexRef.current);
    }, 400, { trailing: true, leading: false }), []);
    var onSegmentPress = react_1.useCallback(function (index) {
        if (selectedSegment !== index) {
            setSelectedSegment(index);
            indexRef.current = index;
            react_native_reanimated_1.default.timing(animatedValue.current, {
                toValue: index,
                duration: 300,
                easing: Easing.bezier(0.33, 1, 0.68, 1)
            }).start(changeIndex);
        }
    }, [onChangeIndex, selectedSegment]);
    var onLayout = react_1.useCallback(function (index, event) {
        var _a = event.nativeEvent.layout, x = _a.x, width = _a.width, height = _a.height;
        segmentsStyle.current[index] = { x: x, width: width };
        segmentedControlHeight.current = height - 2 * BORDER_WIDTH;
        segmentsCounter.current++;
        return segmentsCounter.current === (segments === null || segments === void 0 ? void 0 : segments.length) && setSelectedSegment(initialIndex);
    }, [initialIndex, segments === null || segments === void 0 ? void 0 : segments.length]);
    var animatedStyle = react_1.useMemo(function () {
        if (segmentsCounter.current === (segments === null || segments === void 0 ? void 0 : segments.length)) {
            var inset = interpolate(animatedValue.current, {
                inputRange: lodash_1.default.times(segmentsCounter.current),
                outputRange: lodash_1.default.map(segmentsStyle.current, function (segment) { return segment.x; })
            });
            var width = interpolate(animatedValue.current, {
                inputRange: lodash_1.default.times(segmentsCounter.current),
                outputRange: lodash_1.default.map(segmentsStyle.current, function (segment) { return segment.width - 2 * BORDER_WIDTH; })
            });
            return [{ width: width }, helpers_1.Constants.isRTL ? { right: inset } : { left: inset }];
        }
        return undefined;
    }, [segmentsCounter.current, segments === null || segments === void 0 ? void 0 : segments.length]);
    var renderSegments = function () {
        return lodash_1.default.map(segments, function (_value, index) {
            return (<segment_1.default key={index} onLayout={onLayout} index={index} onPress={onSegmentPress} isSelected={selectedSegment === index} activeColor={activeColor} inactiveColor={inactiveColor} {...segments === null || segments === void 0 ? void 0 : segments[index]} testID={testID}/>);
        });
    };
    return (<view_1.default style={containerStyle} testID={testID}>
      <view_1.default row center style={[styles.container, style, { borderRadius: borderRadius, backgroundColor: backgroundColor }]}>
        {animatedStyle && (<react_native_reanimated_1.default.View style={[
                styles.selectedSegment,
                animatedStyle,
                {
                    borderColor: outlineColor,
                    borderRadius: borderRadius,
                    backgroundColor: activeBackgroundColor,
                    borderWidth: outlineWidth,
                    height: segmentedControlHeight.current
                }
            ]}/>)}
        {renderSegments()}
      </view_1.default>
    </view_1.default>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: style_1.Colors.grey80,
        borderColor: style_1.Colors.grey60,
        borderWidth: BORDER_WIDTH
    },
    selectedSegment: {
        position: 'absolute'
    },
    segment: {
        paddingHorizontal: style_1.Spacings.s3
    }
});
SegmentedControl.displayName = 'SegmentedControl';
exports.default = new_1.asBaseComponent(SegmentedControl);
