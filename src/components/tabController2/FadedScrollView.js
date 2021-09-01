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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var fader_1 = __importDefault(require("../fader"));
var useScrollEnabler_1 = __importDefault(require("../../hooks/useScrollEnabler"));
var useScrollReached_1 = __importDefault(require("../../hooks/useScrollReached"));
var forwardRef_1 = __importDefault(require("../../commons/forwardRef"));
var FADER_SIZE = 76;
var FadedScrollView = function (props) {
    var children = props.children, propsOnScroll = props.onScroll, propsOnContentSizeChange = props.onContentSizeChange, propsOnLayout = props.onLayout, other = __rest(props, ["children", "onScroll", "onContentSizeChange", "onLayout"]);
    var _a = useScrollEnabler_1.default({ horizontal: true }), onContentSizeChange = _a.onContentSizeChange, onLayout = _a.onLayout, scrollEnabled = _a.scrollEnabled;
    var _b = useScrollReached_1.default({
        horizontal: true,
        threshold: 50
    }), onScrollReached = _b.onScroll, isScrollAtStart = _b.isScrollAtStart, isScrollAtEnd = _b.isScrollAtEnd;
    var showStart = scrollEnabled && !isScrollAtStart;
    var showEnd = scrollEnabled && !isScrollAtEnd;
    var onScroll = react_1.useCallback(function (event) {
        onScrollReached(event);
        propsOnScroll === null || propsOnScroll === void 0 ? void 0 : propsOnScroll(event);
    }, [onScrollReached, propsOnScroll]);
    var _onContentSizeChange = react_1.useCallback(function (w, h) {
        propsOnContentSizeChange === null || propsOnContentSizeChange === void 0 ? void 0 : propsOnContentSizeChange(w, h);
        onContentSizeChange === null || onContentSizeChange === void 0 ? void 0 : onContentSizeChange(w, h);
    }, [propsOnContentSizeChange, onContentSizeChange]);
    var _onLayout = react_1.useCallback(function (event) {
        propsOnLayout === null || propsOnLayout === void 0 ? void 0 : propsOnLayout(event);
        onLayout === null || onLayout === void 0 ? void 0 : onLayout(event);
    }, [propsOnLayout, onLayout]);
    if (children) {
        return (<>
        <react_native_1.ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16} decelerationRate={'fast'} {...other} scrollEnabled={scrollEnabled} onContentSizeChange={_onContentSizeChange} onLayout={_onLayout} onScroll={onScroll} ref={props.forwardedRef}>
          {children}
        </react_native_1.ScrollView>
        <fader_1.default visible={showStart} position={fader_1.default.position.START} size={FADER_SIZE}/>
        <fader_1.default visible={showEnd} position={fader_1.default.position.END} size={FADER_SIZE}/>
      </>);
    }
    return null;
};
FadedScrollView.displayName = 'IGNORE';
exports.default = forwardRef_1.default(FadedScrollView);
