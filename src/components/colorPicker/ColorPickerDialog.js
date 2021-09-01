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
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var helpers_1 = require("../../helpers");
var new_1 = require("../../commons/new");
var assets_1 = __importDefault(require("../../assets"));
var style_1 = require("../../style");
var view_1 = __importDefault(require("../view"));
var text_1 = __importDefault(require("../text"));
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var dialog_1 = __importDefault(require("../dialog"));
var button_1 = __importDefault(require("../button"));
var ColorSliderGroup_1 = __importDefault(require("../slider/ColorSliderGroup"));
var panningProvider_1 = __importDefault(require("../panningViews/panningProvider"));
var KEYBOARD_HEIGHT = 216;
/**
 * @description: A color picker dialog component
 * @extends: Dialog
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.tsx
 */
var ColorPickerDialog = /** @class */ (function (_super) {
    __extends(ColorPickerDialog, _super);
    function ColorPickerDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.textInput = react_1.default.createRef();
        _this.keyboardDidShow = function (e) {
            if (helpers_1.Constants.isIOS && _this.state.keyboardHeight !== e.endCoordinates.height) {
                _this.setState({ keyboardHeight: e.endCoordinates.height });
            }
            // For down arrow button in Android keyboard
            _this.changeHeight(0);
        };
        _this.keyboardDidHide = function () {
            _this.changeHeight(KEYBOARD_HEIGHT);
        };
        _this.onFocus = function () {
            _this.changeHeight(0);
        };
        _this.setFocus = function () {
            var _a, _b;
            (_b = (_a = _this.textInput) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.focus();
        };
        _this.applyColor = function (text) {
            var _a = _this.getValidColorString(text), hex = _a.hex, valid = _a.valid;
            if (hex) {
                _this.setState({ color: style_1.Colors.getHSL(hex), text: text, valid: valid });
            }
            else {
                _this.setState({ text: text, valid: valid });
            }
        };
        _this.onSliderValueChange = function (color) {
            _this.updateColor(color);
        };
        _this.onChangeText = function (value) {
            _this.applyColor(value);
        };
        _this.onDonePressed = function () {
            var _a, _b;
            var text = _this.state.text;
            var hex = _this.getValidColorString(text).hex;
            if (hex) {
                (_b = (_a = _this.props).onSubmit) === null || _b === void 0 ? void 0 : _b.call(_a, hex, _this.getTextColor(hex));
                _this.onDismiss();
            }
        };
        _this.onDismiss = function () {
            var _a, _b;
            _this.resetValues();
            (_b = (_a = _this.props).onDismiss) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        var color = style_1.Colors.getHSL(props.initialColor);
        var text = _this.getColorValue(props.initialColor);
        var valid = _this.getValidColorString(text).valid;
        _this.state = {
            keyboardHeight: KEYBOARD_HEIGHT,
            color: color,
            text: text,
            valid: valid
        };
        return _this;
    }
    ColorPickerDialog.prototype.componentDidMount = function () {
        this.keyboardDidShowListener = react_native_1.Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = react_native_1.Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    };
    ColorPickerDialog.prototype.componentWillUnmount = function () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    };
    ColorPickerDialog.prototype.changeHeight = function (height) {
        if (helpers_1.Constants.isAndroid && this.state.keyboardHeight !== height) {
            react_native_1.LayoutAnimation.configureNext(react_native_1.LayoutAnimation.Presets.easeInEaseOut);
            this.setState({ keyboardHeight: height });
        }
    };
    ColorPickerDialog.prototype.getColorValue = function (color) {
        if (!color) {
            return;
        }
        return color.replace('#', '');
    };
    ColorPickerDialog.prototype.getHexColor = function (text) {
        if (!style_1.Colors.isTransparent(text)) {
            var trimmed = text.replace(/\s+/g, '');
            var hex = "#" + trimmed;
            return hex;
        }
        return text;
    };
    ColorPickerDialog.prototype.getHexString = function (color) {
        return lodash_1.default.toUpper(style_1.Colors.getHexString(color));
    };
    ColorPickerDialog.prototype.getTextColor = function (color) {
        return style_1.Colors.isDark(color) ? style_1.Colors.white : style_1.Colors.dark10;
    };
    ColorPickerDialog.prototype.getValidColorString = function (text) {
        if (text) {
            var hex = this.getHexColor(text);
            if (style_1.Colors.isValidHex(hex)) {
                return { hex: hex, valid: true };
            }
        }
        return { undefined: undefined, valid: false };
    };
    ColorPickerDialog.prototype.updateColor = function (color) {
        var hex = this.getHexString(color);
        var text = this.getColorValue(hex);
        this.setState({ color: color, text: text, valid: true });
    };
    ColorPickerDialog.prototype.resetValues = function () {
        var initialColor = this.props.initialColor;
        var color = style_1.Colors.getHSL(initialColor);
        var text = this.getColorValue(initialColor);
        var valid = this.getValidColorString(text).valid;
        this.setState({
            color: color,
            text: text,
            valid: valid
        });
    };
    ColorPickerDialog.prototype.renderHeader = function () {
        var _a = this.props, doneButtonColor = _a.doneButtonColor, accessibilityLabels = _a.accessibilityLabels;
        var valid = this.state.valid;
        return (<view_1.default row spread bg-white paddingH-20 style={styles.header}>
        <button_1.default link iconSource={assets_1.default.icons.x} iconStyle={{ tintColor: style_1.Colors.dark10 }} onPress={this.onDismiss} accessibilityLabel={lodash_1.default.get(accessibilityLabels, 'dismissButton')}/>
        <button_1.default color={doneButtonColor} disabled={!valid} link iconSource={assets_1.default.icons.check} onPress={this.onDonePressed} accessibilityLabel={lodash_1.default.get(accessibilityLabels, 'doneButton')}/>
      </view_1.default>);
    };
    ColorPickerDialog.prototype.renderSliders = function () {
        var _a = this.state, keyboardHeight = _a.keyboardHeight, color = _a.color;
        var colorValue = color.a === 0 ? style_1.Colors.black : style_1.Colors.getHexString(color);
        return (<ColorSliderGroup_1.default initialColor={colorValue} containerStyle={[styles.sliderGroup, { height: keyboardHeight }]} sliderContainerStyle={styles.slider} showLabels labelsStyle={styles.label} onValueChange={this.onSliderValueChange} accessible={false}/>);
    };
    ColorPickerDialog.prototype.renderPreview = function () {
        var _a = this.props, accessibilityLabels = _a.accessibilityLabels, previewInputStyle = _a.previewInputStyle;
        var _b = this.state, color = _b.color, text = _b.text;
        var hex = this.getHexString(color);
        var textColor = this.getTextColor(hex);
        var fontScale = react_native_1.PixelRatio.getFontScale();
        var value = style_1.Colors.isTransparent(text) ? '000000' : text;
        return (<view_1.default style={[styles.preview, { backgroundColor: hex }]}>
        <touchableOpacity_1.default center onPress={this.setFocus} activeOpacity={1} accessible={false}>
          <view_1.default style={styles.inputContainer}>
            <text_1.default text60 white marginL-13 marginR-5={helpers_1.Constants.isIOS} style={{
                color: textColor,
                transform: [{ scaleX: react_native_1.I18nManager.isRTL ? -1 : 1 }]
            }} accessible={false}>
              #
            </text_1.default>
            <react_native_1.TextInput ref={this.textInput} value={value} maxLength={6} numberOfLines={1} onChangeText={this.onChangeText} style={[
                styles.input,
                {
                    color: textColor,
                    width: value ? (value.length + 1) * 16.5 * fontScale : undefined
                },
                helpers_1.Constants.isAndroid && { padding: 0 },
                previewInputStyle
            ]} selectionColor={textColor} underlineColorAndroid="transparent" autoCorrect={false} autoCompleteType={'off'} autoCapitalize={'characters'} 
        // keyboardType={'numbers-and-punctuation'} // doesn't work with `autoCapitalize`
        returnKeyType={'done'} enablesReturnKeyAutomatically onFocus={this.onFocus} accessibilityLabel={accessibilityLabels === null || accessibilityLabels === void 0 ? void 0 : accessibilityLabels.input}/>
          </view_1.default>
          <view_1.default style={[{ backgroundColor: textColor }, styles.underline]}/>
        </touchableOpacity_1.default>
      </view_1.default>);
    };
    ColorPickerDialog.prototype.renderDialog = function () {
        var _a = this.props, visible = _a.visible, dialogProps = _a.dialogProps, testID = _a.testID;
        return (<dialog_1.default visible={visible} //TODO: pass all Dialog props instead
         width="100%" bottom centerH onDismiss={this.onDismiss} containerStyle={styles.dialog} panDirection={panningProvider_1.default.Directions.DOWN} testID={testID + ".dialog"} supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']} // iOS only
         {...dialogProps}>
        {this.renderHeader()}
        {this.renderPreview()}
        {this.renderSliders()}
      </dialog_1.default>);
    };
    ColorPickerDialog.prototype.render = function () {
        return this.renderDialog();
    };
    ColorPickerDialog.displayName = 'ColorPicker';
    ColorPickerDialog.defaultProps = {
        initialColor: style_1.Colors.dark80
    };
    return ColorPickerDialog;
}(react_1.PureComponent));
exports.default = new_1.asBaseComponent(ColorPickerDialog);
var BORDER_RADIUS = 12;
var styles = react_native_1.StyleSheet.create({
    dialog: {
        backgroundColor: style_1.Colors.white,
        borderTopLeftRadius: BORDER_RADIUS,
        borderTopRightRadius: BORDER_RADIUS
    },
    preview: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        height: 56,
        borderTopLeftRadius: BORDER_RADIUS,
        borderTopRightRadius: BORDER_RADIUS
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: helpers_1.Constants.isAndroid ? 5 : 8,
        transform: [{ scaleX: react_native_1.I18nManager.isRTL ? -1 : 1 }]
    },
    input: __assign(__assign({}, style_1.Typography.text60), { letterSpacing: 3, transform: [{ scaleX: react_native_1.I18nManager.isRTL ? -1 : 1 }] }),
    underline: {
        height: 1.5,
        width: helpers_1.Constants.isAndroid ? 119 : 134,
        marginRight: helpers_1.Constants.isAndroid ? 13 : 8
    },
    sliderGroup: {
        paddingTop: 12,
        marginHorizontal: 20
    },
    slider: {
        marginBottom: 15,
        height: 26
    },
    label: {
        marginBottom: 3
    }
});
