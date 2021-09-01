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
var optionalDeps_1 = require("optionalDeps");
var helpers_1 = require("helpers");
var view_1 = __importDefault(require("../view"));
var new_1 = require("../../commons/new");
var modifiers_1 = require("../../commons/modifiers");
var LinearGradient = optionalDeps_1.LinearGradientPackage === null || optionalDeps_1.LinearGradientPackage === void 0 ? void 0 : optionalDeps_1.LinearGradientPackage.default;
var ShimmerPlaceholder;
var ANIMATION_DURATION = 400;
var Template;
(function (Template) {
    Template["LIST_ITEM"] = "listItem";
    Template["TEXT_CONTENT"] = "content";
})(Template || (Template = {}));
var Size;
(function (Size) {
    Size["SMALL"] = "small";
    Size["LARGE"] = "large";
})(Size || (Size = {}));
var ContentType;
(function (ContentType) {
    ContentType["AVATAR"] = "avatar";
    ContentType["THUMBNAIL"] = "thumbnail";
})(ContentType || (ContentType = {}));
/**
 * @description: Allows showing a temporary skeleton view while your real view is loading.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SkeletonViewScreen.tsx
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Skeleton/Skeleton.gif?raw=true
 * @notes: View requires installing the 'react-native-shimmer-placeholder' and 'react-native-linear-gradient' library
 */
var SkeletonView = /** @class */ (function (_super) {
    __extends(SkeletonView, _super);
    function SkeletonView(props) {
        var _this = _super.call(this, props) || this;
        _this.showChildren = function () {
            _this.setState({ isAnimating: false });
        };
        _this.getAccessibilityProps = function (accessibilityLabel) {
            return __assign({ accessible: true, accessibilityLabel: accessibilityLabel }, modifiers_1.extractAccessibilityProps(_this.props));
        };
        _this.getDefaultSkeletonProps = function (input) {
            var _a = input || {}, circleOverride = _a.circleOverride, style = _a.style;
            var _b = _this.props, circle = _b.circle, _c = _b.width, width = _c === void 0 ? 0 : _c, _d = _b.height, height = _d === void 0 ? 0 : _d;
            var borderRadius = _this.props.borderRadius;
            var size;
            if (circle || circleOverride) {
                borderRadius = style_1.BorderRadiuses.br100;
                size = Math.max(width, height);
            }
            return {
                shimmerColors: [style_1.Colors.grey70, style_1.Colors.grey60, style_1.Colors.grey70],
                isReversed: helpers_1.Constants.isRTL,
                style: [{ borderRadius: borderRadius }, style],
                width: size || width,
                height: size || height
            };
        };
        _this.getContentSize = function () {
            var size = _this.props.size;
            return size === Size.LARGE ? 48 : 40;
        };
        _this.renderListItemLeftContent = function () {
            var _a = _this.props, contentType = _a.contentType, size = _a.size;
            if (contentType) {
                var contentSize = _this.getContentSize();
                var circleOverride = contentType === ContentType.AVATAR;
                var style = { marginRight: size === Size.LARGE ? 16 : 14 };
                return (<ShimmerPlaceholder {..._this.getDefaultSkeletonProps({ circleOverride: circleOverride, style: style })} width={contentSize} height={contentSize}/>);
            }
        };
        _this.renderStrip = function (isMain, length, marginTop) {
            return (<ShimmerPlaceholder {..._this.getDefaultSkeletonProps()} width={length} height={isMain ? 12 : 8} style={[{ marginTop: marginTop }]}/>);
        };
        _this.renderListItemContentStrips = function () {
            var _a = _this.props, contentType = _a.contentType, size = _a.size, hideSeparator = _a.hideSeparator;
            var customLengths = contentType === ContentType.AVATAR ? [undefined, 50] : undefined;
            var height = size === Size.LARGE ? 95 : 75;
            var lengths = lodash_1.default.merge([90, 180, 160], customLengths);
            var topMargins = [0, size === Size.LARGE ? 16 : 8, 8];
            return (<view_1.default width={'100%'} height={height} centerV style={!hideSeparator && style_1.Dividers.d10}>
        {_this.renderStrip(true, lengths[0], topMargins[0])}
        {_this.renderStrip(false, lengths[1], topMargins[1])}
        {size === Size.LARGE && _this.renderStrip(false, lengths[2], topMargins[2])}
      </view_1.default>);
        };
        _this.renderListItemTemplate = function () {
            var _a = _this.props, style = _a.style, others = __rest(_a, ["style"]);
            return (<view_1.default style={[styles.listItem, style]} {..._this.getAccessibilityProps('Loading list item')} {...others}>
        {_this.renderListItemLeftContent()}
        {_this.renderListItemContentStrips()}
      </view_1.default>);
        };
        _this.renderTextContentTemplate = function () {
            return (<view_1.default {..._this.getAccessibilityProps('Loading content')} {..._this.props}>
        {_this.renderStrip(true, 235, 0)}
        {_this.renderStrip(true, 260, 12)}
        {_this.renderStrip(true, 190, 12)}
      </view_1.default>);
        };
        _this.renderTemplate = function () {
            var template = _this.props.template;
            switch (template) {
                case Template.LIST_ITEM:
                    return _this.renderListItemTemplate();
                case Template.TEXT_CONTENT:
                    return _this.renderTextContentTemplate();
                default:
                    // just so we won't crash
                    return _this.renderAdvanced();
            }
        };
        _this.renderAdvanced = function () {
            var _a = _this.props, children = _a.children, renderContent = _a.renderContent, showContent = _a.showContent, style = _a.style, others = __rest(_a, ["children", "renderContent", "showContent", "style"]);
            var data = showContent && lodash_1.default.isFunction(renderContent) ? renderContent(_this.props) : children;
            return (<view_1.default style={style} {..._this.getAccessibilityProps('Loading content')}>
        <ShimmerPlaceholder {..._this.getDefaultSkeletonProps()} {...others}>
          {showContent && data}
        </ShimmerPlaceholder>
      </view_1.default>);
        };
        _this.renderWithFading = function (skeleton) {
            var _a;
            var isAnimating = _this.state.isAnimating;
            var _b = _this.props, children = _b.children, renderContent = _b.renderContent;
            if (isAnimating) {
                return (<react_native_1.Animated.View style={{
                        opacity: _this.state.opacity
                    }} pointerEvents="none">
          {skeleton}
        </react_native_1.Animated.View>);
            }
            else if (lodash_1.default.isFunction(renderContent)) {
                return renderContent((_a = _this.props) === null || _a === void 0 ? void 0 : _a.contentData);
            }
            else {
                return children;
            }
        };
        _this.renderNothing = function () { return null; };
        _this.state = {
            isAnimating: !lodash_1.default.isUndefined(props.showContent),
            opacity: new react_native_1.Animated.Value(0)
        };
        if (lodash_1.default.isUndefined(optionalDeps_1.LinearGradientPackage === null || optionalDeps_1.LinearGradientPackage === void 0 ? void 0 : optionalDeps_1.LinearGradientPackage.default)) {
            console.error("RNUILib SkeletonView's requires installing \"react-native-linear-gradient\" dependency");
        }
        else if (lodash_1.default.isUndefined(optionalDeps_1.createShimmerPlaceholder)) {
            console.error("RNUILib SkeletonView's requires installing \"react-native-shimmer-placeholder\" dependency");
        }
        else {
            ShimmerPlaceholder = optionalDeps_1.createShimmerPlaceholder(LinearGradient);
        }
        return _this;
    }
    SkeletonView.prototype.componentDidMount = function () {
        if (this.state.isAnimating) {
            this.fadeInAnimation = this.fade(true);
        }
    };
    SkeletonView.prototype.componentDidUpdate = function (prevProps) {
        var _a;
        if (this.props.showContent && !prevProps.showContent) {
            (_a = this.fadeInAnimation) === null || _a === void 0 ? void 0 : _a.stop();
            this.fade(false, this.showChildren);
        }
    };
    SkeletonView.prototype.fade = function (isFadeIn, onAnimationEnd) {
        var animation = react_native_1.Animated.timing(this.state.opacity, {
            toValue: isFadeIn ? 1 : 0,
            easing: react_native_1.Easing.ease,
            duration: ANIMATION_DURATION,
            useNativeDriver: true
        });
        animation.start(onAnimationEnd);
        return animation;
    };
    SkeletonView.prototype.renderSkeleton = function () {
        var _a = this.props, template = _a.template, showContent = _a.showContent, children = _a.children, renderContent = _a.renderContent;
        var skeleton;
        if (template) {
            skeleton = this.renderTemplate();
        }
        else {
            skeleton = this.renderAdvanced();
        }
        if (lodash_1.default.isUndefined(showContent) || (lodash_1.default.isUndefined(children) && lodash_1.default.isUndefined(renderContent))) {
            return skeleton;
        }
        else {
            return this.renderWithFading(skeleton);
        }
    };
    SkeletonView.prototype.render = function () {
        var _this = this;
        if (lodash_1.default.isUndefined(optionalDeps_1.LinearGradientPackage === null || optionalDeps_1.LinearGradientPackage === void 0 ? void 0 : optionalDeps_1.LinearGradientPackage.default) || lodash_1.default.isUndefined(optionalDeps_1.createShimmerPlaceholder)) {
            return null;
        }
        var _a = this.props, times = _a.times, timesKey = _a.timesKey, showLastSeparator = _a.showLastSeparator, hideSeparator = _a.hideSeparator, renderContent = _a.renderContent, testID = _a.testID;
        if (times) {
            return lodash_1.default.times(times, function (index) {
                var key = timesKey ? timesKey + "-" + index : "" + index;
                return (<SkeletonView {..._this.props} key={key} testID={testID + "-" + index} renderContent={index === 0 ? renderContent : _this.renderNothing} hideSeparator={hideSeparator || (!showLastSeparator && index === times - 1)} times={undefined}/>);
            });
        }
        else {
            return this.renderSkeleton();
        }
    };
    SkeletonView.defaultProps = {
        size: Size.SMALL,
        borderRadius: style_1.BorderRadiuses.br10
    };
    SkeletonView.templates = Template;
    SkeletonView.sizes = Size;
    SkeletonView.contentTypes = ContentType;
    return SkeletonView;
}(react_1.Component));
exports.default = new_1.asBaseComponent(SkeletonView);
var styles = react_native_1.StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: style_1.Spacings.s5
    }
});
