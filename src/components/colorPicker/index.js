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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var ColorPalette_1 = __importDefault(require("./ColorPalette"));
var ColorSwatch_1 = require("./ColorSwatch");
var new_1 = require("../../commons/new");
var assets_1 = __importDefault(require("../../assets"));
var style_1 = require("../../style");
var view_1 = __importDefault(require("../view"));
var button_1 = __importDefault(require("../button"));
var ColorPickerDialog_1 = __importDefault(require("./ColorPickerDialog"));
var ACCESSIBILITY_LABELS = {
    addButton: 'add custom color using hex code',
    dismissButton: 'dismiss',
    doneButton: 'done',
    input: 'custom hex color code'
};
/**
 * @description: A color picker component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.tsx
 * @notes: This is a screen width component
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorPicker/ColorPicker.gif?raw=true
 */
var ColorPicker = /** @class */ (function (_super) {
    __extends(ColorPicker, _super);
    function ColorPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            show: false
        };
        _this.showDialog = function () {
            _this.setState({ show: true });
        };
        _this.hideDialog = function () {
            _this.setState({ show: false });
        };
        // ColorPalette
        _this.onValueChange = function (value, options) {
            var _a, _b;
            (_b = (_a = _this.props).onValueChange) === null || _b === void 0 ? void 0 : _b.call(_a, value, options);
        };
        return _this;
    }
    Object.defineProperty(ColorPicker.prototype, "animatedIndex", {
        get: function () {
            var _a = this.props, animatedIndex = _a.animatedIndex, colors = _a.colors;
            if (animatedIndex === undefined) {
                return colors.length - 1;
            }
            return animatedIndex;
        },
        enumerable: false,
        configurable: true
    });
    ColorPicker.prototype.render = function () {
        var _a = this.props, initialColor = _a.initialColor, colors = _a.colors, value = _a.value, testID = _a.testID, accessibilityLabels = _a.accessibilityLabels;
        var show = this.state.show;
        return (<view_1.default row testID={testID}>
        <ColorPalette_1.default value={value} colors={colors} style={styles.palette} usePagination={false} animatedIndex={this.animatedIndex} onValueChange={this.onValueChange} testID={testID + "-palette"}/>
        <view_1.default style={styles.buttonContainer}>
          <button_1.default color={style_1.Colors.dark10} outlineColor={style_1.Colors.dark10} style={styles.button} round outline iconSource={assets_1.default.icons.plusSmall} onPress={this.showDialog} testID={testID + "-button"} accessibilityLabel={accessibilityLabels === null || accessibilityLabels === void 0 ? void 0 : accessibilityLabels.addButton}/>
        </view_1.default>
        <ColorPickerDialog_1.default {...this.props} key={initialColor} visible={show} onDismiss={this.hideDialog} accessibilityLabels={{
                dismissButton: accessibilityLabels === null || accessibilityLabels === void 0 ? void 0 : accessibilityLabels.dismissButton,
                doneButton: accessibilityLabels === null || accessibilityLabels === void 0 ? void 0 : accessibilityLabels.doneButton,
                input: accessibilityLabels === null || accessibilityLabels === void 0 ? void 0 : accessibilityLabels.input
            }}/>
      </view_1.default>);
    };
    ColorPicker.displayName = 'ColorPicker';
    ColorPicker.defaultProps = {
        accessibilityLabels: ACCESSIBILITY_LABELS
    };
    return ColorPicker;
}(react_1.PureComponent));
exports.default = new_1.asBaseComponent(ColorPicker);
var plusButtonContainerWidth = ColorSwatch_1.SWATCH_SIZE + 20 + 12;
var plusButtonContainerHeight = 92 - 2 * ColorSwatch_1.SWATCH_MARGIN;
var styles = react_native_1.StyleSheet.create({
    palette: {
        paddingLeft: plusButtonContainerWidth
    },
    buttonContainer: {
        position: 'absolute',
        left: 0,
        width: plusButtonContainerWidth,
        height: plusButtonContainerHeight,
        marginTop: ColorSwatch_1.SWATCH_MARGIN,
        marginBottom: ColorSwatch_1.SWATCH_MARGIN,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingTop: 1,
        backgroundColor: style_1.Colors.white
    },
    button: {
        width: ColorSwatch_1.SWATCH_SIZE,
        height: ColorSwatch_1.SWATCH_SIZE,
        marginRight: 12
    }
});
