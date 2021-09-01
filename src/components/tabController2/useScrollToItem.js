"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffsetType = void 0;
var lodash_1 = __importDefault(require("lodash"));
var react_1 = require("react");
var react_native_reanimated_1 = require("react-native-reanimated");
var hooks_1 = require("hooks");
var helpers_1 = require("helpers");
var OffsetType;
(function (OffsetType) {
    OffsetType["CENTER"] = "CENTER";
    OffsetType["DYNAMIC"] = "DYNAMIC";
    OffsetType["LEFT"] = "LEFT";
    OffsetType["RIGHT"] = "RIGHT";
})(OffsetType = exports.OffsetType || (exports.OffsetType = {}));
var useScrollToItem = function (props) {
    var propsScrollViewRef = props.scrollViewRef, itemsCount = props.itemsCount, selectedIndex = props.selectedIndex, _a = props.offsetType, offsetType = _a === void 0 ? OffsetType.CENTER : _a, _b = props.addOffsetMargin, addOffsetMargin = _b === void 0 ? true : _b, _c = props.outerSpacing, outerSpacing = _c === void 0 ? 0 : _c, _d = props.innerSpacing, innerSpacing = _d === void 0 ? 0 : _d;
    var itemsWidths = react_1.useRef(lodash_1.default.times(itemsCount, function () { return null; }));
    var itemsWidthsAnimated = react_native_reanimated_1.useSharedValue(lodash_1.default.times(itemsCount, function () { return 0; }));
    var itemsOffsetsAnimated = react_native_reanimated_1.useSharedValue(lodash_1.default.times(itemsCount, function () { return 0; }));
    var currentIndex = react_1.useRef(selectedIndex || 0);
    var _e = react_1.useState({ CENTER: [], LEFT: [], RIGHT: [] }), offsets = _e[0], setOffsets = _e[1];
    var _f = hooks_1.useScrollTo({ scrollViewRef: propsScrollViewRef }), scrollViewRef = _f.scrollViewRef, scrollTo = _f.scrollTo, onContentSizeChange = _f.onContentSizeChange, onLayout = _f.onLayout;
    // TODO: reset?
    //   useEffect(() => {
    //     itemsWidths.current = _.times(itemsCount, () => null);
    //   }, [itemsCount]);
    // const contentWidth = _.sum(itemsWidths);
    // TODO: const scrollEnabled = contentWidth.current > containerWidth;
    var setSnapBreakpoints = react_1.useCallback(function (widths) {
        if (lodash_1.default.isEmpty(widths)) {
            return;
        }
        var screenCenter = helpers_1.Constants.screenWidth / 2; // TODO: change to something more dynamic?
        var index = 0;
        var centeredOffsets = [];
        var currentCenterOffset = outerSpacing;
        var leftOffsets = [];
        leftOffsets.push(outerSpacing - innerSpacing);
        var rightOffsets = [];
        rightOffsets.push(-helpers_1.Constants.screenWidth + widths[0] + outerSpacing + innerSpacing);
        while (index < itemsCount) {
            /* map animated widths and offsets */
            itemsWidthsAnimated.value[index] = widths[index];
            if (index > 0) {
                itemsOffsetsAnimated.value[index] =
                    itemsOffsetsAnimated.value[index - 1] + itemsWidthsAnimated.value[index - 1];
            }
            /* calc center, left and right offsets */
            centeredOffsets[index] = currentCenterOffset - screenCenter + widths[index] / 2;
            ++index;
            currentCenterOffset += widths[index - 1] + innerSpacing;
            leftOffsets[index] = leftOffsets[index - 1] + widths[index - 1] + innerSpacing;
            rightOffsets[index] = rightOffsets[index - 1] + widths[index] + innerSpacing;
        }
        if (addOffsetMargin) {
            index = 1;
            while (index < itemsCount - 1) {
                leftOffsets[index] -= widths[index - 1];
                rightOffsets[index] += widths[index + 1] + innerSpacing;
                ++index;
            }
        }
        setOffsets({ CENTER: centeredOffsets, LEFT: leftOffsets, RIGHT: rightOffsets }); // default for DYNAMIC is CENTER
        // trigger value change
        itemsWidthsAnimated.value = __spreadArray([], itemsWidthsAnimated.value);
        itemsOffsetsAnimated.value = __spreadArray([], itemsOffsetsAnimated.value);
    }, [itemsCount, outerSpacing, innerSpacing, addOffsetMargin]);
    var onItemLayout = react_1.useCallback(function (event, index) {
        var width = event.nativeEvent.layout.width;
        itemsWidths.current[index] = width;
        if (!lodash_1.default.includes(itemsWidths.current, null)) {
            setSnapBreakpoints(itemsWidths.current);
        }
    }, [setSnapBreakpoints]);
    var focusIndex = react_1.useCallback(function (index, animated) {
        if (animated === void 0) { animated = true; }
        if (index >= 0 && offsets.CENTER.length > index) {
            if (offsetType !== OffsetType.DYNAMIC) {
                scrollTo(offsets[offsetType][index], animated);
            }
            else {
                var movingLeft = index < currentIndex.current;
                currentIndex.current = index;
                scrollTo(movingLeft ? offsets[OffsetType.RIGHT][index] : offsets[OffsetType.LEFT][index], animated);
            }
        }
    }, [offsets, offsetType, scrollTo]);
    react_1.useEffect(function () {
        if (!lodash_1.default.isUndefined(selectedIndex)) {
            focusIndex(selectedIndex);
        }
    }, [selectedIndex, focusIndex]);
    return {
        scrollViewRef: scrollViewRef,
        onItemLayout: onItemLayout,
        itemsWidthsAnimated: itemsWidthsAnimated,
        itemsOffsetsAnimated: itemsOffsetsAnimated,
        focusIndex: focusIndex,
        onContentSizeChange: onContentSizeChange,
        onLayout: onLayout
    };
};
useScrollToItem.offsetType = OffsetType;
exports.default = useScrollToItem;
