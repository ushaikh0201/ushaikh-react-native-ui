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
var forwardRef_1 = __importDefault(require("./forwardRef"));
var hoist_non_react_statics_1 = __importDefault(require("hoist-non-react-statics"));
var helpers_1 = require("../helpers");
var DEFAULT_THRESHOLD = helpers_1.Constants.isAndroid ? 1 : 0;
/**
 * @description: Add scroll reached which notifies on reaching start \ end of ScrollView \ FlatList
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/WithScrollReachedScreen.tsx
 * @notes: Send `props.scrollReachedProps.onScroll` to your onScroll and receive via props.scrollReachedProps.isScrollAtStart props.scrollReachedProps.isScrollAtEnd
 */
function withScrollReached(WrappedComponent, options) {
    if (options === void 0) { options = {}; }
    var ScrollReachedDetector = function (props) {
        // The scroll starts at the start, from what I've tested this works fine
        var _a = react_1.useState(true), isScrollAtStart = _a[0], setScrollAtStart = _a[1];
        var _b = react_1.useState(false), isScrollAtEnd = _b[0], setScrollAtEnd = _b[1];
        var onScroll = react_1.useCallback(function (event) {
            var _a = event.nativeEvent, _b = _a.layoutMeasurement, layoutWidth = _b.width, layoutHeight = _b.height, _c = _a.contentOffset, offsetX = _c.x, offsetY = _c.y, _d = _a.contentSize, contentWidth = _d.width, contentHeight = _d.height;
            var horizontal = options.horizontal;
            var threshold = options.threshold || DEFAULT_THRESHOLD;
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
        }, [isScrollAtStart, isScrollAtEnd]);
        return (<WrappedComponent {...props} scrollReachedProps={{ onScroll: onScroll, isScrollAtStart: isScrollAtStart, isScrollAtEnd: isScrollAtEnd }} ref={props.forwardedRef}/>);
    };
    hoist_non_react_statics_1.default(ScrollReachedDetector, WrappedComponent);
    ScrollReachedDetector.displayName = WrappedComponent.displayName;
    //@ts-ignore
    ScrollReachedDetector.propTypes = WrappedComponent.propTypes;
    //@ts-ignore
    ScrollReachedDetector.defaultProps = WrappedComponent.defaultProps;
    return forwardRef_1.default(ScrollReachedDetector);
}
exports.default = withScrollReached;
