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
exports.Text = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var lodash_1 = __importDefault(require("lodash"));
var new_1 = require("../../commons/new");
var style_1 = require("style");
/**
 * @description: A wrapper for Text component with extra functionality like modifiers support
 * @extends: Text
 * @extendsLink: https://reactnative.dev/docs/text
 * @modifiers: margins, color, typography
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TextScreen.js
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Modifiers.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Transformation.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Highlights.png?raw=true
 */
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TextContainer = _this.props.animated
            ? react_native_1.Animated.createAnimatedComponent(react_native_1.Text)
            : react_native_1.Text;
        return _this;
    }
    // setNativeProps(nativeProps) {
    //   this._root.setNativeProps(nativeProps); // eslint-disable-line
    // }
    Text.prototype.getTextPartsByHighlight = function (targetString, highlightString) {
        if (targetString === void 0) { targetString = ''; }
        if (highlightString === void 0) { highlightString = ''; }
        if (lodash_1.default.isEmpty(highlightString.trim())) {
            return [targetString];
        }
        var textParts = [];
        var highlightIndex;
        do {
            highlightIndex = targetString.toLowerCase().indexOf(highlightString.toLowerCase());
            if (highlightIndex !== -1) {
                if (highlightIndex > 0) {
                    textParts.push(targetString.substring(0, highlightIndex));
                }
                textParts.push(targetString.substr(highlightIndex, highlightString.length));
                targetString = targetString.substr(highlightIndex + highlightString.length);
            }
            else {
                textParts.push(targetString);
            }
        } while (highlightIndex !== -1);
        return textParts;
    };
    Text.prototype.renderText = function (children) {
        var _this = this;
        var _a = this.props, highlightString = _a.highlightString, highlightStyle = _a.highlightStyle;
        if (!lodash_1.default.isEmpty(highlightString)) {
            if (lodash_1.default.isArray(children)) {
                return lodash_1.default.map(children, function (child) {
                    return _this.renderText(child);
                });
            }
            if (lodash_1.default.isString(children)) {
                var textParts = this.getTextPartsByHighlight(children, highlightString);
                return lodash_1.default.map(textParts, function (text, index) {
                    var shouldHighlight = lodash_1.default.lowerCase(text) === lodash_1.default.lowerCase(highlightString);
                    return (<react_native_1.Text key={index} style={shouldHighlight ? [styles.highlight, highlightStyle] : styles.notHighlight}>
              {text}
            </react_native_1.Text>);
                });
            }
        }
        return children;
    };
    Text.prototype.render = function () {
        var _a = this.props, modifiers = _a.modifiers, style = _a.style, center = _a.center, uppercase = _a.uppercase, children = _a.children, forwardedRef = _a.forwardedRef, others = __rest(_a, ["modifiers", "style", "center", "uppercase", "children", "forwardedRef"]);
        var color = this.props.color || modifiers.color;
        var margins = modifiers.margins, typography = modifiers.typography, backgroundColor = modifiers.backgroundColor, flexStyle = modifiers.flexStyle;
        var textStyle = [
            styles.container,
            typography,
            color && { color: color },
            backgroundColor && { backgroundColor: backgroundColor },
            flexStyle,
            margins,
            center && styles.centered,
            uppercase && styles.uppercase,
            style
        ];
        var TextContainer = this.TextContainer;
        return (<TextContainer {...others} style={textStyle} ref={forwardedRef}>
        {this.renderText(children)}
      </TextContainer>);
    };
    Text.displayName = 'Text';
    return Text;
}(react_1.PureComponent));
exports.Text = Text;
var styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        textAlign: 'left'
    },
    centered: {
        textAlign: 'center'
    },
    uppercase: {
        textTransform: 'uppercase'
    },
    highlight: {
        color: style_1.Colors.grey30
    },
    notHighlight: {
        color: undefined
    }
});
exports.default = new_1.asBaseComponent(new_1.forwardRef(Text));
