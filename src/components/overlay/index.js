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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var style_1 = require("../../style");
var view_1 = __importDefault(require("../view"));
var gradientImage = require('./assets/GradientOverlay.png');
var OVERLY_TYPES = {
    VERTICAL: 'vertical',
    TOP: 'top',
    BOTTOM: 'bottom',
    SOLID: 'solid'
};
/**
 * @description: Overlay view with types (default, top, bottom, solid)
 * @extends: Image
 * @extendsLink: https://reactnative.dev/docs/image
 */
var Overlay = /** @class */ (function (_super) {
    __extends(Overlay, _super);
    function Overlay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderCustomContent = function () {
            var customContent = _this.props.customContent;
            return (<view_1.default pointerEvents="box-none" style={styles.customContent}>
        {customContent}
      </view_1.default>);
        };
        _this.renderImage = function (style, source) {
            return <react_native_1.Image style={[styles.container, style]} resizeMode={'stretch'} source={source}/>;
        };
        return _this;
    }
    Overlay.prototype.getStyleByType = function (type) {
        if (type === void 0) { type = this.props.type; }
        var color = this.props.color;
        switch (type) {
            case OVERLY_TYPES.TOP:
                return [styles.top, color && { tintColor: color }];
            case OVERLY_TYPES.BOTTOM:
                return [styles.bottom, color && { tintColor: color }];
            case OVERLY_TYPES.SOLID:
                return [styles.solid, color && { backgroundColor: color }];
            default:
                break;
        }
    };
    Overlay.prototype.render = function () {
        var _a = this.props, type = _a.type, customContent = _a.customContent;
        var image = type !== OVERLY_TYPES.SOLID ? gradientImage : undefined;
        if (type === OVERLY_TYPES.VERTICAL) {
            return (<>
          {this.renderImage([this.getStyleByType(OVERLY_TYPES.TOP), styles.vertical], image)}
          {this.renderImage([this.getStyleByType(OVERLY_TYPES.BOTTOM), styles.vertical], image)}
          {customContent && this.renderCustomContent()}
        </>);
        }
        return (<>
        {type && this.renderImage(this.getStyleByType(), image)}
        {customContent && this.renderCustomContent()}
      </>);
    };
    Overlay.displayName = 'Overlay';
    Overlay.overlayTypes = OVERLY_TYPES;
    return Overlay;
}(react_1.PureComponent));
var styles = react_native_1.StyleSheet.create({
    container: __assign(__assign({}, react_native_1.StyleSheet.absoluteFillObject), { width: undefined }),
    top: {
        bottom: undefined,
        top: 0,
        height: '75%'
    },
    bottom: {
        bottom: 0,
        top: undefined,
        height: '75%',
        transform: [{ scaleY: -1 }]
    },
    vertical: {
        height: '40%'
    },
    solid: {
        backgroundColor: style_1.Colors.rgba(style_1.Colors.dark10, 0.4)
    },
    customContent: __assign({}, react_native_1.StyleSheet.absoluteFillObject)
});
exports.default = Overlay;
