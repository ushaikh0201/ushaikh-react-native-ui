"use strict";
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
/**
 * Known issues with React Native TextInput component
 * 1. iOS - input inner padding is off in multiline mode
 * 2. Android - input has minHeight that can't be overridden with zero padding (unlike iOS)
 * 3. Passing typography preset that includes lineHeight usually cause alignment issues with
 * other elements (leading/trailing accessories). It usually best to set lineHeight with undefined
 */
var react_1 = __importStar(require("react"));
var lodash_1 = require("lodash");
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../../components/view"));
var types_1 = require("./types");
var Input_1 = __importDefault(require("./Input"));
var ValidationMessage_1 = __importDefault(require("./ValidationMessage"));
var Label_1 = __importDefault(require("./Label"));
var FieldContext_1 = __importDefault(require("./FieldContext"));
var useFieldState_1 = __importDefault(require("./useFieldState"));
var usePreset_1 = __importDefault(require("./usePreset"));
var FloatingPlaceholder_1 = __importDefault(require("./FloatingPlaceholder"));
var CharCounter_1 = __importDefault(require("./CharCounter"));
/**
 * @description: A controlled, customizable TextField with validation support
 * @extends: TextInput
 * @extendsLink: https://reactnative.dev/docs/textinput
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/incubatorScreens/IncubatorTextFieldScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/FloatingPlaceholder.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/Validation.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/ColorByState.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/CharCounter.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/Hint.gif?raw=true
 */
var TextField = function (props) {
    var _a = usePreset_1.default(props), modifiers = _a.modifiers, 
    // General
    fieldStyleProp = _a.fieldStyle, containerStyle = _a.containerStyle, floatingPlaceholder = _a.floatingPlaceholder, floatingPlaceholderColor = _a.floatingPlaceholderColor, floatingPlaceholderStyle = _a.floatingPlaceholderStyle, floatOnFocus = _a.floatOnFocus, hint = _a.hint, 
    // Label
    label = _a.label, labelColor = _a.labelColor, labelStyle = _a.labelStyle, labelProps = _a.labelProps, 
    // Accessory Buttons
    leadingAccessory = _a.leadingAccessory, trailingAccessory = _a.trailingAccessory, 
    // Validation
    enableErrors = _a.enableErrors, // TODO: rename to enableValidation
    validationMessage = _a.validationMessage, validationMessageStyle = _a.validationMessageStyle, _b = _a.validationMessagePosition, validationMessagePosition = _b === void 0 ? types_1.ValidationMessagePosition.BOTTOM : _b, 
    // Char Counter
    showCharCounter = _a.showCharCounter, charCounterStyle = _a.charCounterStyle, 
    // Input
    placeholder = _a.placeholder, others = __rest(_a, ["modifiers", "fieldStyle", "containerStyle", "floatingPlaceholder", "floatingPlaceholderColor", "floatingPlaceholderStyle", "floatOnFocus", "hint", "label", "labelColor", "labelStyle", "labelProps", "leadingAccessory", "trailingAccessory", "enableErrors", "validationMessage", "validationMessageStyle", "validationMessagePosition", "showCharCounter", "charCounterStyle", "placeholder"]);
    var _c = useFieldState_1.default(others), onFocus = _c.onFocus, onBlur = _c.onBlur, onChangeText = _c.onChangeText, fieldState = _c.fieldState, validateField = _c.validateField;
    var context = react_1.useMemo(function () {
        return __assign(__assign({}, fieldState), { disabled: others.editable === false, validateField: validateField });
    }, [fieldState, others.editable, validateField]);
    var margins = modifiers.margins, paddings = modifiers.paddings, typography = modifiers.typography, color = modifiers.color;
    var typographyStyle = react_1.useMemo(function () { return lodash_1.omit(typography, 'lineHeight'); }, [typography]);
    var colorStyle = react_1.useMemo(function () { return color && { color: color }; }, [color]);
    var fieldStyle = lodash_1.isFunction(fieldStyleProp) ? fieldStyleProp(context) : fieldStyleProp;
    return (<FieldContext_1.default.Provider value={context}>
      <view_1.default style={[margins, containerStyle]}>
        <Label_1.default label={label} labelColor={labelColor} labelStyle={labelStyle} labelProps={labelProps} floatingPlaceholder={floatingPlaceholder} validationMessagePosition={validationMessagePosition}/>
        {validationMessagePosition === types_1.ValidationMessagePosition.TOP && (<ValidationMessage_1.default enableErrors={enableErrors} validate={others.validate} validationMessage={validationMessage} validationMessageStyle={validationMessageStyle}/>)}
        <view_1.default style={[paddings, fieldStyle]}>
          <view_1.default row centerV>
            {leadingAccessory}
            <view_1.default flex>
              {floatingPlaceholder && (<FloatingPlaceholder_1.default placeholder={placeholder} floatingPlaceholderStyle={[typographyStyle, floatingPlaceholderStyle]} floatingPlaceholderColor={floatingPlaceholderColor} floatOnFocus={floatOnFocus} validationMessagePosition={validationMessagePosition}/>)}
              <Input_1.default {...others} style={[typographyStyle, colorStyle, others.style]} onFocus={onFocus} onBlur={onBlur} onChangeText={onChangeText} placeholder={floatingPlaceholder ? undefined : placeholder} hint={hint}/>
            </view_1.default>
            {trailingAccessory}
          </view_1.default>
        </view_1.default>
        <view_1.default row spread>
          {validationMessagePosition === types_1.ValidationMessagePosition.BOTTOM && (<ValidationMessage_1.default enableErrors={enableErrors} validate={others.validate} validationMessage={validationMessage} validationMessageStyle={validationMessageStyle} retainSpace/>)}
          {showCharCounter && <CharCounter_1.default maxLength={others.maxLength} charCounterStyle={charCounterStyle}/>}
        </view_1.default>
      </view_1.default>
    </FieldContext_1.default.Provider>);
};
TextField.displayName = 'Incubator.TextField';
TextField.validationMessagePositions = types_1.ValidationMessagePosition;
exports.default = new_1.asBaseComponent(new_1.forwardRef(TextField));
