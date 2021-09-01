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
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var style_1 = require("../../style");
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../view"));
var button_1 = __importDefault(require("../button"));
/**
 * @description: Quick actions bar, each action support Button component props
 * @modifiers: margin, padding
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ActionBar/ActionBar.gif?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ActionBarScreen.tsx
 */
var ActionBar = /** @class */ (function (_super) {
    __extends(ActionBar, _super);
    function ActionBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.styles = createStyles(_this.props);
        return _this;
    }
    ActionBar.prototype.getAlignment = function (actionIndex) {
        var _a = this.props, actions = _a.actions, centered = _a.centered;
        var first = actionIndex === 0;
        var last = actionIndex === actions.length - 1;
        return {
            left: centered ? false : first,
            center: centered || (!first && !last) || (first && last),
            right: centered ? false : last
        };
    };
    ActionBar.prototype.render = function () {
        var _this = this;
        var _a = this.props, actions = _a.actions, centered = _a.centered, style = _a.style, useSafeArea = _a.useSafeArea, keepRelative = _a.keepRelative, others = __rest(_a, ["actions", "centered", "style", "useSafeArea", "keepRelative"]);
        return (<view_1.default useSafeArea={useSafeArea} style={[!keepRelative && this.styles.absoluteContainer]}>
        <view_1.default row centerV paddingH-20={!centered} style={[this.styles.container, style]} {...others}>
          {lodash_1.default.map(actions, function (action, i) { return (<view_1.default key={i} flex {..._this.getAlignment(i)}>
              <button_1.default link size={button_1.default.sizes.medium} primary {...action}/>
            </view_1.default>); })}
        </view_1.default>
      </view_1.default>);
    };
    ActionBar.displayName = 'ActionBar';
    ActionBar.defaultProps = {
        height: 48,
        backgroundColor: style_1.Colors.white,
        useSafeArea: true
    };
    return ActionBar;
}(react_1.Component));
exports.default = new_1.asBaseComponent(ActionBar);
function createStyles(_a) {
    var height = _a.height, backgroundColor = _a.backgroundColor;
    return react_native_1.StyleSheet.create({
        container: {
            height: height
        },
        absoluteContainer: __assign(__assign(__assign({}, react_native_1.StyleSheet.absoluteFillObject), { top: undefined, backgroundColor: backgroundColor }), style_1.Shadows.white40.top)
    });
}
