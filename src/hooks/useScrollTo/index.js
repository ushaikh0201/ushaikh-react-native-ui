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
var lodash_1 = __importDefault(require("lodash"));
var react_1 = require("react");
var helpers_1 = require("../../helpers");
var useScrollTo = function (props) {
    var propsScrollViewRef = props.scrollViewRef, _a = props.horizontal, horizontal = _a === void 0 ? true : _a;
    var newScrollViewRef = react_1.useRef(null);
    var scrollViewRef = propsScrollViewRef || newScrollViewRef;
    var contentSize = react_1.useRef(undefined);
    var containerSize = react_1.useRef(undefined);
    var onContentSizeChange = react_1.useCallback(function (contentWidth, contentHeight) {
        contentSize.current = horizontal ? contentWidth : contentHeight;
    }, [horizontal]);
    var onLayout = react_1.useCallback(function (event) {
        var _a = event.nativeEvent.layout, width = _a.width, height = _a.height;
        containerSize.current = horizontal ? width : height;
    }, [horizontal]);
    var scrollTo = react_1.useCallback(function (offset, animated) {
        var _a, _b;
        if (animated === void 0) { animated = true; }
        if (horizontal &&
            helpers_1.Constants.isRTL &&
            helpers_1.Constants.isAndroid &&
            !lodash_1.default.isUndefined(contentSize.current) &&
            !lodash_1.default.isUndefined(containerSize.current)) {
            var scrollingWidth = Math.max(0, contentSize.current - containerSize.current);
            offset = scrollingWidth - offset;
        }
        // @ts-ignore
        if (lodash_1.default.isFunction((_a = scrollViewRef.current) === null || _a === void 0 ? void 0 : _a.scrollToOffset)) {
            // @ts-ignore
            scrollViewRef.current.scrollToOffset({ offset: offset, animated: animated });
            // @ts-ignore
        }
        else if (lodash_1.default.isFunction((_b = scrollViewRef.current) === null || _b === void 0 ? void 0 : _b.scrollTo)) {
            var scrollToXY = horizontal ? { x: offset } : { y: offset };
            // @ts-ignore
            scrollViewRef.current.scrollTo(__assign(__assign({}, scrollToXY), { animated: animated }));
        }
    }, [scrollViewRef, horizontal]);
    return {
        scrollViewRef: scrollViewRef,
        scrollTo: scrollTo,
        onContentSizeChange: onContentSizeChange,
        onLayout: onLayout
    };
};
exports.default = useScrollTo;
