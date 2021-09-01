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
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var hoist_non_react_statics_1 = __importDefault(require("hoist-non-react-statics"));
var Modifiers = __importStar(require("./modifiers"));
var forwardRef_1 = __importDefault(require("./forwardRef"));
var UIComponent_1 = __importDefault(require("./UIComponent"));
function asBaseComponent(WrappedComponent) {
    var BaseComponent = /** @class */ (function (_super) {
        __extends(BaseComponent, _super);
        function BaseComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                error: false
            };
            _this.appearanceListener = function () {
                // iOS 13 and above will trigger this call with the wrong colorScheme value. So just ignore returned colorScheme for now
                // https://github.com/facebook/react-native/issues/28525
                _this.setState({ colorScheme: react_native_1.Appearance.getColorScheme() });
            };
            return _this;
        }
        BaseComponent.prototype.componentDidMount = function () {
            react_native_1.Appearance.addChangeListener(this.appearanceListener);
        };
        BaseComponent.prototype.componentWillUnmount = function () {
            react_native_1.Appearance.removeChangeListener(this.appearanceListener);
        };
        BaseComponent.getDerivedStateFromError = function (error) {
            var _a, _b;
            (_b = (_a = UIComponent_1.default.defaultProps) === null || _a === void 0 ? void 0 : _a.onError) === null || _b === void 0 ? void 0 : _b.call(_a, error, WrappedComponent.defaultProps);
            return { error: true };
        };
        BaseComponent.prototype.render = function () {
            var _a;
            var themeProps = BaseComponent.getThemeProps(this.props, this.context);
            var modifiers = Modifiers.generateModifiersStyle(undefined, themeProps);
            // TODO: omit original modifiers props (left, right, flex, etc..)
            // Because they throws an error when being passed to RNView on Android
            var forwardedRef = themeProps.forwardedRef, others = __rest(themeProps, ["forwardedRef"]);
            return ((this.state.error && ((_a = UIComponent_1.default.defaultProps) === null || _a === void 0 ? void 0 : _a.renderError)) || (<WrappedComponent {...others} modifiers={modifiers} ref={forwardedRef}/>));
        };
        BaseComponent.getThemeProps = function (props, context) {
            return Modifiers.getThemeProps.call(WrappedComponent, props, context);
        };
        return BaseComponent;
    }(UIComponent_1.default));
    // Statics
    hoist_non_react_statics_1.default(BaseComponent, WrappedComponent);
    BaseComponent.displayName = WrappedComponent.displayName;
    BaseComponent.propTypes = WrappedComponent.propTypes;
    BaseComponent.defaultProps = WrappedComponent.defaultProps;
    return forwardRef_1.default(BaseComponent);
}
exports.default = asBaseComponent;
