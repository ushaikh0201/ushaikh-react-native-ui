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
// TODO: Support style customization
var lodash_1 = require("lodash");
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var style_1 = require("style");
var view_1 = __importDefault(require("../../components/view"));
var fader_1 = __importStar(require("../../components/fader"));
var helpers_1 = require("helpers");
var Item_1 = __importDefault(require("./Item"));
var usePresenter_1 = __importDefault(require("./usePresenter"));
var text_1 = __importDefault(require("../../components/text"));
var AnimatedFlatList = react_native_reanimated_1.default.createAnimatedComponent(react_native_1.FlatList);
var WheelPickerAlign;
(function (WheelPickerAlign) {
    WheelPickerAlign["CENTER"] = "center";
    WheelPickerAlign["RIGHT"] = "right";
    WheelPickerAlign["LEFT"] = "left";
})(WheelPickerAlign || (WheelPickerAlign = {}));
var WheelPicker = function (_a) {
    var propItems = _a.items, _b = _a.itemHeight, itemHeight = _b === void 0 ? 44 : _b, _c = _a.numberOfVisibleRows, numberOfVisibleRows = _c === void 0 ? 5 : _c, _d = _a.activeTextColor, activeTextColor = _d === void 0 ? style_1.Colors.primary : _d, inactiveTextColor = _a.inactiveTextColor, textStyle = _a.textStyle, label = _a.label, labelStyle = _a.labelStyle, labelProps = _a.labelProps, onChange = _a.onChange, align = _a.align, style = _a.style, children = _a.children, initialValue = _a.initialValue, selectedValue = _a.selectedValue, testID = _a.testID;
    var scrollView = react_1.useRef();
    var offset = react_native_reanimated_1.useSharedValue(0);
    var scrollHandler = react_native_reanimated_1.useAnimatedScrollHandler(function (e) {
        offset.value = e.contentOffset.y;
    });
    var _e = usePresenter_1.default({
        initialValue: initialValue,
        selectedValue: selectedValue,
        items: propItems,
        children: children,
        itemHeight: itemHeight,
        preferredNumVisibleRows: numberOfVisibleRows
    }), height = _e.height, items = _e.items, shouldControlComponent = _e.shouldControlComponent, currentIndex = _e.index, getRowItemAtOffset = _e.getRowItemAtOffset;
    var prevIndex = react_1.useRef(currentIndex);
    var _f = react_1.useState(currentIndex * itemHeight), scrollOffset = _f[0], setScrollOffset = _f[1];
    var _g = react_1.useState(0), flatListWidth = _g[0], setFlatListWidth = _g[1];
    var keyExtractor = react_1.useCallback(function (item, index) { return item + "." + index; }, []);
    /* This effect enforce the index to be controlled by selectedValue passed by the user */
    react_1.useEffect(function () {
        if (shouldControlComponent(scrollOffset)) {
            scrollToIndex(currentIndex, true);
        }
    });
    /* This effect making sure to reset index if initialValue has changed */
    react_1.useEffect(function () {
        scrollToIndex(currentIndex, true);
    }, [currentIndex]);
    var scrollToPassedIndex = react_1.useCallback(function () {
        scrollToIndex(currentIndex, false);
    }, []);
    var scrollToOffset = function (index, animated) {
        var _a, _b, _c, _d;
        // TODO: we should remove this split (the getNode section) in V6 and remove support for reanimated 1
        //@ts-expect-error for some reason scrollToOffset isn't recognized
        if (lodash_1.isFunction((_a = scrollView.current) === null || _a === void 0 ? void 0 : _a.scrollToOffset)) {
            //@ts-expect-error
            (_b = scrollView.current) === null || _b === void 0 ? void 0 : _b.scrollToOffset({ offset: index * itemHeight, animated: animated });
        }
        else {
            //@ts-expect-error
            (_d = (_c = scrollView.current) === null || _c === void 0 ? void 0 : _c.getNode()) === null || _d === void 0 ? void 0 : _d.scrollToOffset({ offset: index * itemHeight, animated: animated });
        }
    };
    var scrollToIndex = function (index, animated) {
        var _a;
        // this is done to handle onMomentumScrollEnd not being called in Android:
        // https://github.com/facebook/react-native/issues/26661
        if (helpers_1.Constants.isAndroid && prevIndex.current !== index) {
            prevIndex.current = index;
            onChange === null || onChange === void 0 ? void 0 : onChange((_a = items === null || items === void 0 ? void 0 : items[index]) === null || _a === void 0 ? void 0 : _a.value, index);
        }
        setTimeout(function () { return scrollToOffset(index, animated); }, 100);
    };
    var selectItem = react_1.useCallback(function (index) {
        scrollToIndex(index, true);
    }, [itemHeight]);
    var onValueChange = react_1.useCallback(function (event) {
        setScrollOffset(event.nativeEvent.contentOffset.y);
        var _a = getRowItemAtOffset(event.nativeEvent.contentOffset.y), index = _a.index, value = _a.value;
        onChange === null || onChange === void 0 ? void 0 : onChange(value, index);
    }, [onChange]);
    var alignmentStyle = react_1.useMemo(function () {
        return align === WheelPickerAlign.RIGHT
            ? { alignSelf: 'flex-end' }
            : align === WheelPickerAlign.LEFT
                ? { alignSelf: 'flex-start' }
                : { alignSelf: 'center' };
    }, [align]);
    var renderItem = react_1.useCallback(function (_a) {
        var item = _a.item, index = _a.index;
        return (<Item_1.default index={index} itemHeight={itemHeight} offset={offset} activeColor={activeTextColor} inactiveColor={inactiveTextColor} style={textStyle} {...item} fakeLabel={label} fakeLabelStyle={labelStyle} fakeLabelProps={labelProps} centerH={!label} onSelect={selectItem} testID={testID + ".item_" + index}/>);
    }, [itemHeight]);
    var separators = react_1.useMemo(function () {
        return (<view_1.default absF centerV pointerEvents="none">
        <view_1.default style={styles.separators}/>
      </view_1.default>);
    }, []);
    var labelContainerStyle = react_1.useMemo(function () {
        return [{ position: 'absolute', top: 0, bottom: 0 }, alignmentStyle];
    }, [alignmentStyle]);
    var labelContainer = react_1.useMemo(function () {
        return (
        // @ts-expect-error
        <view_1.default style={labelContainerStyle} width={flatListWidth} pointerEvents="none">
        <view_1.default style={styles.label} centerV pointerEvents="none">
          <text_1.default marginL-s2 marginR-s5 text80M {...labelProps} color={activeTextColor} style={labelStyle}>
            {label}
          </text_1.default>
        </view_1.default>
      </view_1.default>);
    }, [flatListWidth, labelContainerStyle, label, labelProps, activeTextColor, labelStyle]);
    var fader = react_1.useMemo(function () { return function (position) {
        return <fader_1.default visible position={position} size={60}/>;
    }; }, []);
    var getItemLayout = react_1.useCallback(function (_data, index) {
        return { length: itemHeight, offset: itemHeight * index, index: index };
    }, [itemHeight]);
    var updateFlatListWidth = react_1.useCallback(function (width) {
        setFlatListWidth(width);
    }, []);
    var contentContainerStyle = react_1.useMemo(function () {
        return [
            {
                paddingVertical: height / 2 - itemHeight / 2
            },
            alignmentStyle
        ];
    }, [height, itemHeight, alignmentStyle]);
    return (<view_1.default testID={testID} bg-white style={style}>
      <view_1.default row centerH>
        <view_1.default flexG>
          <AnimatedFlatList testID={testID + ".list"} height={height} data={items} 
    // @ts-ignore reanimated2
    keyExtractor={keyExtractor} scrollEventThrottle={100} onScroll={scrollHandler} onMomentumScrollEnd={onValueChange} showsVerticalScrollIndicator={false} onLayout={scrollToPassedIndex} 
    // @ts-ignore
    ref={scrollView} 
    // @ts-expect-error
    contentContainerStyle={contentContainerStyle} snapToInterval={itemHeight} decelerationRate={helpers_1.Constants.isAndroid ? 0.98 : 'normal'} renderItem={renderItem} getItemLayout={getItemLayout} initialScrollIndex={currentIndex} onContentSizeChange={updateFlatListWidth}/>
        </view_1.default>
      </view_1.default>
      {label && labelContainer}
      {fader(fader_1.FaderPosition.BOTTOM)}
      {fader(fader_1.FaderPosition.TOP)}
      {separators}
    </view_1.default>);
};
WheelPicker.alignments = WheelPickerAlign;
exports.default = WheelPicker;
var styles = react_native_1.StyleSheet.create({
    separators: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: style_1.Spacings.s9,
        borderColor: style_1.Colors.grey60
    },
    label: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0
    }
});
