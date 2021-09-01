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
var style_1 = require("../../style");
var new_1 = require("../../commons/new");
var touchableOpacity_1 = __importDefault(require("../../components/touchableOpacity"));
var view_1 = __importDefault(require("../view"));
var ListItemPart_1 = __importDefault(require("./ListItemPart"));
var ListItem = /** @class */ (function (_super) {
    __extends(ListItem, _super);
    function ListItem(props) {
        var _this = _super.call(this, props) || this;
        _this.styles = createStyles(_this.props.height);
        _this.renderViewContainer = function () {
            var pressed = _this.state.pressed;
            var _a = _this.props, containerStyle = _a.containerStyle, style = _a.style, underlayColor = _a.underlayColor, others = __rest(_a, ["containerStyle", "style", "underlayColor"]);
            var pressedStyle = { backgroundColor: underlayColor };
            return (<view_1.default style={[_this.styles.container, containerStyle]} {...others}>
        <view_1.default style={[_this.styles.innerContainer, style, pressed && pressedStyle]}>{_this.props.children}</view_1.default>
      </view_1.default>);
        };
        _this.renderCustomContainer = function (Container) {
            var others = __rest(_this.props, []);
            return <Container {...others}>{_this.renderChildren()}</Container>;
        };
        _this.renderChildren = function () {
            var pressed = _this.state.pressed;
            var _a = _this.props, underlayColor = _a.underlayColor, style = _a.style, children = _a.children;
            var pressedStyle = { backgroundColor: underlayColor };
            return <view_1.default style={[_this.styles.innerContainer, style, pressed && pressedStyle]}>{children}</view_1.default>;
        };
        _this.state = {
            pressed: false
        };
        return _this;
    }
    ListItem.prototype.onHideUnderlay = function () {
        this.setPressed(false);
    };
    ListItem.prototype.onShowUnderlay = function () {
        this.setPressed(true);
    };
    ListItem.prototype.setPressed = function (isPressed) {
        this.setState({ pressed: isPressed });
    };
    ListItem.prototype.render = function () {
        var containerElement = this.props.containerElement;
        return containerElement ? this.renderCustomContainer(containerElement) : this.renderViewContainer();
    };
    ListItem.displayName = 'ListItem';
    ListItem.defaultProps = {
        height: 63,
        containerElement: touchableOpacity_1.default,
        underlayColor: style_1.Colors.dark70
    };
    ListItem.Part = ListItemPart_1.default;
    return ListItem;
}(react_1.Component));
function createStyles(height) {
    return react_native_1.StyleSheet.create({
        container: {
            backgroundColor: style_1.Colors.white
        },
        innerContainer: {
            flexDirection: 'row',
            height: height
        }
    });
}
exports.default = new_1.asBaseComponent(ListItem);
