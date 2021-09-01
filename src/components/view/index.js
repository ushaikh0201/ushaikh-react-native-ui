"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var react_native_reanimated_1 = __importDefault(require("react-native-reanimated"));
var new_1 = require("../../commons/new");
var helpers_1 = require("helpers");
/**
 * @description: An enhanced View component
 * @extends: View
 * @extendsLink: https://reactnative.dev/docs/view
 * @modifiers: margins, paddings, alignments, background, borderRadius
 */
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View(props) {
        var _this = _super.call(this, props) || this;
        _this.Container = props.useSafeArea && helpers_1.Constants.isIOS ? react_native_1.SafeAreaView : react_native_1.View;
        if (props.reanimated) {
            _this.Container = react_native_reanimated_1.default.createAnimatedComponent(_this.Container);
        }
        else if (props.animated) {
            _this.Container = react_native_1.Animated.createAnimatedComponent(_this.Container);
        }
        _this.state = {
            ready: !props.renderDelay
        };
        return _this;
    }
    View.prototype.componentDidMount = function () {
        var _this = this;
        var renderDelay = this.props.renderDelay;
        if (renderDelay) {
            setTimeout(function () {
                _this.setState({ ready: true });
            }, renderDelay);
        }
    };
    // TODO: do we need this?
    View.prototype.setNativeProps = function (nativeProps) {
        //@ts-ignore
        this._root.setNativeProps(nativeProps); // eslint-disable-line
    };
    View.prototype.render = function () {
        if (!this.state.ready) {
            return null;
        }
        // (!) extract left, top, bottom... props to avoid passing them on Android
        // eslint-disable-next-line
        var _a = this.props, modifiers = _a.modifiers, style = _a.style, 
        /* eslint-disable */
        left = _a.left, top = _a.top, right = _a.right, bottom = _a.bottom, propsFlex = _a.flex, 
        /* eslint-enable */
        forwardedRef = _a.forwardedRef, inaccessible = _a.inaccessible, others = __rest(_a, ["modifiers", "style", "left", "top", "right", "bottom", "flex", "forwardedRef", "inaccessible"]);
        var backgroundColor = modifiers.backgroundColor, borderRadius = modifiers.borderRadius, paddings = modifiers.paddings, margins = modifiers.margins, alignments = modifiers.alignments, flexStyle = modifiers.flexStyle, positionStyle = modifiers.positionStyle;
        var Element = this.Container;
        return (<Element accessibilityElementsHidden={inaccessible} importantForAccessibility={inaccessible ? 'no-hide-descendants' : undefined} {...others} style={[
                backgroundColor && { backgroundColor: backgroundColor },
                borderRadius && { borderRadius: borderRadius },
                flexStyle,
                positionStyle,
                paddings,
                margins,
                alignments,
                style
            ]} ref={forwardedRef}>
        {this.props.children}
      </Element>);
    };
    View.displayName = 'View';
    return View;
}(react_1.PureComponent));
exports.default = new_1.asBaseComponent(new_1.forwardRef(View));
