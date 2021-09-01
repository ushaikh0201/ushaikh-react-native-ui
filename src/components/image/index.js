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
exports.Image = void 0;
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var hoist_non_react_statics_1 = __importDefault(require("hoist-non-react-statics"));
var react_native_1 = require("react-native");
var Constants_1 = __importDefault(require("../../helpers/Constants"));
var new_1 = require("../../commons/new");
// @ts-ignore
var assets_1 = __importDefault(require("../../assets"));
var overlay_1 = __importDefault(require("../overlay"));
var SvgImage_1 = __importDefault(require("./SvgImage"));
/**
 * @description: Image wrapper with extra functionality like source transform and assets support
 * @extends: Image
 * @extendsLink: https://reactnative.dev/docs/image
 * @notes: please note that for SVG support you need to add both
 * `react-native-svg` and `react-native-svg-transformer`,
 * and also configure them (see `metro.config.js`)
 */
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image(props) {
        var _this = _super.call(this, props) || this;
        _this.onError = function (event) {
            var _a, _b;
            if (event.nativeEvent.error) {
                _this.setState({ error: true });
                (_b = (_a = _this.props).onError) === null || _b === void 0 ? void 0 : _b.call(_a, event);
            }
        };
        _this.renderSvg = function () {
            var _a = _this.props, source = _a.source, others = __rest(_a, ["source"]);
            return <SvgImage_1.default data={source} {...others}/>;
        };
        _this.sourceTransformer = _this.props.sourceTransformer;
        _this.state = {
            error: false,
            prevSource: props.source
        };
        return _this;
    }
    Image.getDerivedStateFromProps = function (nextProps, prevState) {
        if (nextProps.source !== prevState.prevSource) {
            return {
                error: false,
                prevSource: nextProps.source
            };
        }
        return null;
    };
    Image.prototype.isGif = function () {
        if (Constants_1.default.isAndroid) {
            var source = this.props.source;
            var url = lodash_1.default.get(source, 'uri');
            var isGif = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(url);
            return isGif;
        }
    };
    Image.prototype.shouldUseImageBackground = function () {
        var _a = this.props, overlayType = _a.overlayType, customOverlayContent = _a.customOverlayContent;
        return !!overlayType || this.isGif() || !lodash_1.default.isUndefined(customOverlayContent);
    };
    Image.prototype.getVerifiedSource = function (source) {
        if (lodash_1.default.get(source, 'uri') === null || lodash_1.default.get(source, 'uri') === '') {
            // @ts-ignore
            return __assign(__assign({}, source), { uri: undefined });
        }
        return source;
    };
    Image.prototype.getImageSource = function () {
        var _a = this.props, assetName = _a.assetName, assetGroup = _a.assetGroup, source = _a.source;
        if (!lodash_1.default.isUndefined(assetName)) {
            return lodash_1.default.get(assets_1.default, assetGroup + "." + assetName);
        }
        if (this.sourceTransformer) {
            return this.sourceTransformer(this.props);
        }
        return this.getVerifiedSource(source);
    };
    Image.prototype.renderRegularImage = function () {
        var error = this.state.error;
        var source = error ? this.getVerifiedSource(this.props.errorSource) : this.getImageSource();
        var _a = this.props, tintColor = _a.tintColor, style = _a.style, supportRTL = _a.supportRTL, cover = _a.cover, aspectRatio = _a.aspectRatio, overlayType = _a.overlayType, overlayColor = _a.overlayColor, customOverlayContent = _a.customOverlayContent, modifiers = _a.modifiers, others = __rest(_a, ["tintColor", "style", "supportRTL", "cover", "aspectRatio", "overlayType", "overlayColor", "customOverlayContent", "modifiers"]);
        var shouldFlipRTL = supportRTL && Constants_1.default.isRTL;
        var ImageView = this.shouldUseImageBackground() ? react_native_1.ImageBackground : react_native_1.Image;
        var margins = modifiers.margins;
        return (
        // @ts-ignore
        <ImageView style={[
                tintColor && { tintColor: tintColor },
                shouldFlipRTL && styles.rtlFlipped,
                cover && styles.coverImage,
                this.isGif() && styles.gifImage,
                aspectRatio && { aspectRatio: aspectRatio },
                margins,
                style
            ]} accessible={false} accessibilityRole={'image'} {...others} onError={this.onError} source={source}>
        {(overlayType || customOverlayContent) && (<overlay_1.default type={overlayType} color={overlayColor} customContent={customOverlayContent}/>)}
      </ImageView>);
    };
    Image.prototype.render = function () {
        var source = this.props.source;
        var isSvg = typeof source === 'string' || typeof source === 'function';
        if (isSvg) {
            return this.renderSvg();
        }
        else {
            return this.renderRegularImage();
        }
    };
    Image.displayName = 'Image';
    Image.defaultProps = {
        assetGroup: 'icons'
    };
    Image.overlayTypes = overlay_1.default.overlayTypes;
    return Image;
}(react_1.PureComponent));
exports.Image = Image;
var styles = react_native_1.StyleSheet.create({
    rtlFlipped: {
        transform: [{ scaleX: -1 }]
    },
    coverImage: {
        width: '100%',
        aspectRatio: 16 / 8
    },
    gifImage: {
        overflow: 'hidden'
    }
});
hoist_non_react_statics_1.default(Image, react_native_1.Image);
exports.default = new_1.asBaseComponent(Image);
