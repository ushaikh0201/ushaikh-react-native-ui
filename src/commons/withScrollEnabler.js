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
function withScrollEnabler(WrappedComponent) {
    var ScrollEnabler = function (props) {
        var _a = react_1.useState(true), scrollEnabled = _a[0], setScrollEnabled = _a[1];
        var contentSize = react_1.useRef(0);
        var layoutSize = react_1.useRef(0);
        var checkScroll = react_1.useCallback(function () {
            var isScrollEnabled = contentSize.current > layoutSize.current;
            if (isScrollEnabled !== scrollEnabled) {
                setScrollEnabled(isScrollEnabled);
            }
        }, [scrollEnabled]);
        var onContentSizeChange = react_1.useCallback(function (contentWidth, contentHeight) {
            var size = props.horizontal ? contentWidth : contentHeight;
            if (size !== contentSize.current) {
                contentSize.current = size;
                if (layoutSize.current > 0) {
                    checkScroll();
                }
            }
        }, [props.horizontal, checkScroll]);
        var onLayout = react_1.useCallback(function (event) {
            var _a = event.nativeEvent.layout, width = _a.width, height = _a.height;
            var size = props.horizontal ? width : height;
            if (size !== layoutSize.current) {
                layoutSize.current = size;
                if (contentSize.current > 0) {
                    checkScroll();
                }
            }
        }, [props.horizontal, checkScroll]);
        return (<WrappedComponent {...props} scrollEnablerProps={{ onLayout: onLayout, scrollEnabled: scrollEnabled, onContentSizeChange: onContentSizeChange }} ref={props.forwardedRef}/>);
    };
    hoist_non_react_statics_1.default(ScrollEnabler, WrappedComponent);
    ScrollEnabler.displayName = WrappedComponent.displayName;
    //@ts-ignore
    ScrollEnabler.propTypes = WrappedComponent.propTypes;
    //@ts-ignore
    ScrollEnabler.defaultProps = WrappedComponent.defaultProps;
    return forwardRef_1.default(ScrollEnabler);
}
exports.default = withScrollEnabler;
