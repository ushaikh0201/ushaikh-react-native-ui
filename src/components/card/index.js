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
var helpers_1 = require("../../helpers");
var style_1 = require("../../style");
// import {PureBaseComponent} from '../../commons';
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../view"));
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var image_1 = __importDefault(require("../image"));
var CardImage_1 = __importDefault(require("./CardImage"));
var CardSection_1 = __importDefault(require("./CardSection"));
var optionalDependencies_1 = require("../../optionalDependencies");
// @ts-ignore
var assets_1 = __importDefault(require("../../assets"));
var CardContext_1 = __importDefault(require("./CardContext"));
var CardPresenter = __importStar(require("./CardPresenter"));
var BlurView = optionalDependencies_1.BlurViewPackage === null || optionalDependencies_1.BlurViewPackage === void 0 ? void 0 : optionalDependencies_1.BlurViewPackage.BlurView;
var DEFAULT_BORDER_RADIUS = style_1.BorderRadiuses.br40;
var DEFAULT_SELECTION_PROPS = {
    borderWidth: 2,
    color: style_1.Colors.primary,
    indicatorSize: 20,
    icon: assets_1.default.icons.checkSmall,
    iconColor: style_1.Colors.white,
    hideIndicator: false
};
/**
 * @description: Card component
 * @extends: TouchableOpacity
 * @modifiers: margin, padding
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Card/Cards_01.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Card/Cards_02.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Card/Cards_03.png?raw=true
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Card/Card_Selecteable.gif, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Card/Cards_activeScale.gif?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.tsx
 * @notes: 'enableBlur' prop requires installing the '@react-native-community/blur' native library
 */
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(props) {
        var _this = _super.call(this, props) || this;
        _this.renderChildren = function () {
            return react_1.default.Children.map(_this.children, function (child, index) {
                var position = _this.calcChildPosition(index);
                var borderStyle = CardPresenter.generateBorderRadiusStyle({
                    position: position,
                    borderRadius: _this.borderRadius
                });
                return (<CardContext_1.default.Provider key={index} value={{ position: position, borderStyle: borderStyle }}>
          {child}
        </CardContext_1.default.Provider>);
            });
        };
        _this.state = {
            animatedSelected: new react_native_1.Animated.Value(Number(_this.props.selected))
        };
        _this.styles = createStyles(_this.props);
        if (props.enableBlur && !BlurView) {
            console.error("RNUILib Card's \"enableBlur\" prop requires installing \"@react-native-community/blur\" dependency");
        }
        return _this;
    }
    Card.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.selected !== this.props.selected) {
            this.animateSelection();
        }
    };
    Card.prototype.animateSelection = function () {
        var animatedSelected = this.state.animatedSelected;
        var selected = this.props.selected;
        react_native_1.Animated.timing(animatedSelected, {
            toValue: Number(selected),
            duration: 120,
            useNativeDriver: true
        }).start();
    };
    Card.prototype.getBlurOptions = function () {
        var blurOptions = this.props.blurOptions;
        return __assign({ blurType: 'light', blurAmount: 5 }, blurOptions);
    };
    // todo: add unit test
    Card.prototype.calcChildPosition = function (childIndex) {
        var row = this.props.row;
        var childrenCount = react_1.default.Children.count(this.children);
        var position = [];
        var childLocation = childIndex;
        if (childLocation === 0) {
            position.push(row ? 'left' : 'top');
        }
        if (childLocation === childrenCount - 1) {
            position.push(row ? 'right' : 'bottom');
        }
        return position;
    };
    Object.defineProperty(Card.prototype, "elevationStyle", {
        get: function () {
            var _a = this.props, elevation = _a.elevation, enableShadow = _a.enableShadow;
            if (enableShadow) {
                return { elevation: elevation || 2 };
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "shadowStyle", {
        get: function () {
            var enableShadow = this.props.enableShadow;
            if (enableShadow) {
                return this.styles.containerShadow;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "backgroundStyle", {
        get: function () {
            var _a = this.props, enableBlur = _a.enableBlur, _b = _a.backgroundColor, backgroundColor = _b === void 0 ? style_1.Colors.white : _b;
            if (helpers_1.Constants.isIOS && enableBlur) {
                return { backgroundColor: style_1.Colors.rgba(backgroundColor, 0.85) };
            }
            else {
                return { backgroundColor: backgroundColor };
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "borderRadius", {
        get: function () {
            var borderRadius = this.props.borderRadius;
            return borderRadius === undefined ? DEFAULT_BORDER_RADIUS : borderRadius;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "children", {
        get: function () {
            var children = this.props.children;
            return react_1.default.Children.toArray(children).filter(function (child) {
                return !lodash_1.default.isNull(child);
            });
        },
        enumerable: false,
        configurable: true
    });
    Card.prototype.renderSelection = function () {
        var _a = this.props, _b = _a.selectionOptions, selectionOptions = _b === void 0 ? {} : _b, selected = _a.selected;
        var animatedSelected = this.state.animatedSelected;
        var selectionColor = lodash_1.default.get(selectionOptions, 'color', DEFAULT_SELECTION_PROPS.color);
        if (lodash_1.default.isUndefined(selected)) {
            return null;
        }
        return (<react_native_1.Animated.View style={[
                this.styles.selectedBorder,
                { borderColor: selectionColor },
                { borderRadius: this.borderRadius },
                { opacity: animatedSelected }
            ]} pointerEvents="none">
        {!selectionOptions.hideIndicator && (<view_1.default style={[
                    this.styles.selectedIndicator,
                    { backgroundColor: selectionColor }
                ]}>
            <image_1.default style={this.styles.selectedIcon} source={lodash_1.default.get(selectionOptions, 'icon', DEFAULT_SELECTION_PROPS.icon)}/>
          </view_1.default>)}
      </react_native_1.Animated.View>);
    };
    Card.prototype.render = function () {
        var _a = this.props, onPress = _a.onPress, onLongPress = _a.onLongPress, style = _a.style, selected = _a.selected, containerStyle = _a.containerStyle, enableBlur = _a.enableBlur, forwardedRef = _a.forwardedRef, others = __rest(_a, ["onPress", "onLongPress", "style", "selected", "containerStyle", "enableBlur", "forwardedRef"]);
        var blurOptions = this.getBlurOptions();
        var Container = onPress || onLongPress ? touchableOpacity_1.default : view_1.default;
        var brRadius = this.borderRadius;
        return (<Container style={[
                this.styles.container,
                { borderRadius: brRadius },
                this.elevationStyle,
                this.shadowStyle,
                this.backgroundStyle,
                containerStyle,
                style
            ]} onPress={onPress} onLongPress={onLongPress} delayPressIn={10} activeOpacity={0.6} accessibilityState={{ selected: selected }} {...others} ref={forwardedRef}>
        {helpers_1.Constants.isIOS && enableBlur && BlurView && (
            // @ts-ignore
            <BlurView style={[this.styles.blurView, { borderRadius: brRadius }]} {...blurOptions}/>)}

        {this.renderChildren()}
        {this.renderSelection()}
      </Container>);
    };
    Card.displayName = 'Card';
    Card.defaultProps = {
        enableShadow: true
    };
    return Card;
}(react_1.PureComponent));
function createStyles(_a) {
    var width = _a.width, height = _a.height, borderRadius = _a.borderRadius, selectionOptions = _a.selectionOptions;
    var selectionOptionsWithDefaults = __assign(__assign({}, DEFAULT_SELECTION_PROPS), selectionOptions);
    var brRadius = borderRadius === undefined ? DEFAULT_BORDER_RADIUS : borderRadius;
    return react_native_1.StyleSheet.create({
        container: {
            width: width,
            height: height,
            overflow: 'visible',
            borderRadius: brRadius
        },
        containerShadow: {
            // sh30 bottom
            shadowColor: style_1.Colors.dark40,
            shadowOpacity: 0.25,
            shadowRadius: 12,
            shadowOffset: { height: 5, width: 0 }
        },
        blurView: __assign(__assign({}, react_native_1.StyleSheet.absoluteFillObject), { borderRadius: brRadius }),
        selectedBorder: __assign(__assign({}, react_native_1.StyleSheet.absoluteFillObject), { borderRadius: DEFAULT_BORDER_RADIUS, borderWidth: selectionOptionsWithDefaults.borderWidth, borderColor: selectionOptionsWithDefaults.color }),
        selectedIndicator: {
            borderRadius: style_1.BorderRadiuses.br100,
            position: 'absolute',
            top: -selectionOptionsWithDefaults.indicatorSize / 2 + 2,
            right: -selectionOptionsWithDefaults.indicatorSize / 2 + 1,
            width: selectionOptionsWithDefaults.indicatorSize,
            height: selectionOptionsWithDefaults.indicatorSize,
            backgroundColor: selectionOptionsWithDefaults.color,
            alignItems: 'center',
            justifyContent: 'center'
        },
        selectedIcon: {
            tintColor: selectionOptionsWithDefaults.iconColor
        }
    });
}
Card.Image = CardImage_1.default;
Card.Section = CardSection_1.default;
exports.default = new_1.asBaseComponent(new_1.forwardRef(Card));
