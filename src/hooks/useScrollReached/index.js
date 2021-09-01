"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var helpers_1 = require("../../helpers");
var DEFAULT_THRESHOLD = helpers_1.Constants.isAndroid ? 1 : 0;
var useScrollReached = function (props) {
    if (props === void 0) { props = {}; }
    var _a = props.horizontal, horizontal = _a === void 0 ? false : _a, _b = props.threshold, threshold = _b === void 0 ? DEFAULT_THRESHOLD : _b;
    var _c = react_1.useState(true), isScrollAtStart = _c[0], setScrollAtStart = _c[1];
    var _d = react_1.useState(false), isScrollAtEnd = _d[0], setScrollAtEnd = _d[1];
    var onScroll = react_1.useCallback(function (event) {
        var _a = event.nativeEvent, _b = _a.layoutMeasurement, layoutWidth = _b.width, layoutHeight = _b.height, _c = _a.contentOffset, offsetX = _c.x, offsetY = _c.y, _d = _a.contentSize, contentWidth = _d.width, contentHeight = _d.height;
        var layoutSize = horizontal ? layoutWidth : layoutHeight;
        var offset = horizontal ? offsetX : offsetY;
        var contentSize = horizontal ? contentWidth : contentHeight;
        if (horizontal && helpers_1.Constants.isRTL && helpers_1.Constants.isAndroid) {
            var scrollingWidth = Math.max(0, contentSize - layoutSize);
            offset = scrollingWidth - offset;
        }
        var closeToStart = offset <= threshold;
        if (closeToStart !== isScrollAtStart) {
            setScrollAtStart(closeToStart);
        }
        var closeToEnd = layoutSize + offset >= contentSize - threshold;
        if (closeToEnd !== isScrollAtEnd) {
            setScrollAtEnd(closeToEnd);
        }
    }, [horizontal, threshold, isScrollAtStart, isScrollAtEnd]);
    return { onScroll: onScroll, isScrollAtStart: isScrollAtStart, isScrollAtEnd: isScrollAtEnd };
};
exports.default = useScrollReached;
