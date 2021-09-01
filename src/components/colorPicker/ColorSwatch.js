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
exports.SWATCH_SIZE = exports.SWATCH_MARGIN = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var assets_1 = __importDefault(require("../../assets"));
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../view"));
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var image_1 = __importDefault(require("../image"));
var style_1 = require("../../style");
var helpers_1 = require("../../helpers");
var transparentImage = require('./assets/transparentSwatch/TransparentSwatch.png');
var DEFAULT_SIZE = helpers_1.Constants.isTablet ? 44 : 36;
exports.SWATCH_MARGIN = 12;
exports.SWATCH_SIZE = DEFAULT_SIZE;
/**
 * @description: A color swatch component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorPalette/ColorPalette.gif?raw=true
 */
var ColorSwatch = /** @class */ (function (_super) {
    __extends(ColorSwatch, _super);
    function ColorSwatch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isSelected: new react_native_1.Animated.Value(0),
            animatedOpacity: new react_native_1.Animated.Value(0.3),
            animatedScale: new react_native_1.Animated.Value(0.5)
        };
        _this.styles = createStyles(_this.props);
        _this.layout = { x: 0, y: 0 };
        _this.onPress = function () {
            var _a, _b;
            var _c = _this.props, _d = _c.color, color = _d === void 0 ? '' : _d, value = _c.value, index = _c.index;
            var tintColor = _this.getTintColor(value);
            (_b = (_a = _this.props).onPress) === null || _b === void 0 ? void 0 : _b.call(_a, value || color, { tintColor: tintColor, index: index });
        };
        _this.onLayout = function (event) {
            _this.layout = event.nativeEvent.layout;
        };
        _this.renderSwatch = function () {
            var animated = _this.props.animated;
            var _a = _this.state, animatedOpacity = _a.animatedOpacity, animatedScale = _a.animatedScale;
            if (animated) {
                return (<react_native_1.Animated.View style={{
                        opacity: animatedOpacity,
                        transform: [{ scaleX: animatedScale }, { scaleY: animatedScale }]
                    }}>
          {_this.renderContent()}
        </react_native_1.Animated.View>);
            }
            return _this.renderContent();
        };
        return _this;
    }
    ColorSwatch.prototype.componentDidMount = function () {
        this.animateCheckmark(this.props.selected);
        this.animateSwatch(1);
    };
    ColorSwatch.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.selected !== this.props.selected) {
            this.animateCheckmark(this.props.selected);
        }
    };
    ColorSwatch.prototype.animateSwatch = function (newValue) {
        var _a = this.state, animatedOpacity = _a.animatedOpacity, animatedScale = _a.animatedScale;
        react_native_1.Animated.parallel([
            react_native_1.Animated.timing(animatedOpacity, {
                duration: 250,
                toValue: newValue,
                useNativeDriver: true
            }),
            react_native_1.Animated.spring(animatedScale, {
                toValue: newValue,
                // easing: Easing.bezier(0, 0, 0.58, 1), // => easeOut
                bounciness: 18,
                speed: 12,
                delay: 170,
                useNativeDriver: true
            })
        ]).start();
    };
    ColorSwatch.prototype.animateCheckmark = function (newValue) {
        if (newValue === void 0) { newValue = false; }
        var isSelected = this.state.isSelected;
        react_native_1.Animated.timing(isSelected, {
            duration: 150,
            easing: react_native_1.Easing.bezier(0.165, 0.84, 0.44, 1.0),
            toValue: Number(newValue),
            delay: 50,
            useNativeDriver: true
        }).start();
    };
    ColorSwatch.prototype.getTintColor = function (color) {
        if (color) {
            if (style_1.Colors.isTransparent(color)) {
                return style_1.Colors.black;
            }
            return style_1.Colors.isDark(color) ? style_1.Colors.white : style_1.Colors.black;
        }
    };
    ColorSwatch.prototype.getAccessibilityInfo = function () {
        var color = this.props.color;
        return {
            accessibilityLabel: color && style_1.Colors.getColorName(color),
            accessibilityStates: this.props.selected ? ['selected'] : []
        };
    };
    ColorSwatch.prototype.getLayout = function () {
        return this.layout;
    };
    ColorSwatch.prototype.renderContent = function () {
        var _a = this.props, style = _a.style, color = _a.color, onPress = _a.onPress, others = __rest(_a, ["style", "color", "onPress"]);
        var isSelected = this.state.isSelected;
        var Container = onPress ? touchableOpacity_1.default : view_1.default;
        var tintColor = this.getTintColor(color);
        return (<Container {...others} center activeOpacity={1} throttleTime={0} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={this.onPress} style={[this.styles.container, style]} onLayout={this.onLayout} {...this.getAccessibilityInfo()}>
        {style_1.Colors.isTransparent(color) && (<image_1.default source={transparentImage} style={this.styles.transparentImage} resizeMode={'cover'}/>)}
        <react_native_1.Animated.Image source={assets_1.default.icons.check} style={{
                tintColor: tintColor,
                opacity: isSelected,
                transform: [{ scaleX: isSelected }, { scaleY: isSelected }]
            }}/>
      </Container>);
    };
    ColorSwatch.prototype.render = function () {
        return this.renderSwatch();
    };
    ColorSwatch.displayName = 'ColorSwatch';
    return ColorSwatch;
}(react_1.PureComponent));
exports.default = new_1.asBaseComponent(ColorSwatch);
function createStyles(_a) {
    var _b = _a.color, color = _b === void 0 ? style_1.Colors.dark30 : _b;
    return react_native_1.StyleSheet.create({
        container: {
            backgroundColor: color,
            width: DEFAULT_SIZE,
            height: DEFAULT_SIZE,
            borderRadius: DEFAULT_SIZE / 2,
            margin: exports.SWATCH_MARGIN,
            borderWidth: color === 'transparent' ? undefined : 1,
            borderColor: style_1.Colors.rgba(style_1.Colors.dark30, 0.2)
        },
        transparentImage: __assign(__assign({}, react_native_1.StyleSheet.absoluteFillObject), { width: DEFAULT_SIZE, height: DEFAULT_SIZE })
    });
}
