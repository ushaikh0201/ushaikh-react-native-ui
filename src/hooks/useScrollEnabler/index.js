"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useScrollEnabler = function (props) {
    if (props === void 0) { props = {}; }
    var _a = props.horizontal, horizontal = _a === void 0 ? false : _a;
    var _b = react_1.useState(true), scrollEnabled = _b[0], setScrollEnabled = _b[1];
    var contentSize = react_1.useRef(0);
    var layoutSize = react_1.useRef(0);
    var checkScroll = react_1.useCallback(function () {
        var isScrollEnabled = contentSize.current > layoutSize.current;
        if (isScrollEnabled !== scrollEnabled) {
            setScrollEnabled(isScrollEnabled);
        }
    }, [scrollEnabled]);
    var onContentSizeChange = react_1.useCallback(function (contentWidth, contentHeight) {
        var size = horizontal ? contentWidth : contentHeight;
        if (size !== contentSize.current) {
            contentSize.current = size;
            if (layoutSize.current > 0) {
                checkScroll();
            }
        }
    }, [horizontal, checkScroll]);
    var onLayout = react_1.useCallback(function (event) {
        var _a = event.nativeEvent.layout, width = _a.width, height = _a.height;
        var size = horizontal ? width : height;
        if (size !== layoutSize.current) {
            layoutSize.current = size;
            if (contentSize.current > 0) {
                checkScroll();
            }
        }
    }, [horizontal, checkScroll]);
    return {
        onContentSizeChange: onContentSizeChange,
        onLayout: onLayout,
        scrollEnabled: scrollEnabled
    };
};
exports.default = useScrollEnabler;
