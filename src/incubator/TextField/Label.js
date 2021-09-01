"use strict";
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
var text_1 = __importDefault(require("../../components/text"));
var types_1 = require("./types");
var Presenter_1 = require("./Presenter");
var FieldContext_1 = __importDefault(require("./FieldContext"));
var Label = function (_a) {
    var label = _a.label, _b = _a.labelColor, labelColor = _b === void 0 ? style_1.Colors.grey10 : _b, labelStyle = _a.labelStyle, labelProps = _a.labelProps, validationMessagePosition = _a.validationMessagePosition, floatingPlaceholder = _a.floatingPlaceholder;
    var context = react_1.useContext(FieldContext_1.default);
    var forceHidingLabel = !context.isValid && validationMessagePosition === types_1.ValidationMessagePosition.TOP;
    if ((label || floatingPlaceholder) && !forceHidingLabel) {
        return (<text_1.default color={Presenter_1.getColorByState(labelColor, context)} style={[styles.label, labelStyle, floatingPlaceholder && styles.dummyPlaceholder]} {...labelProps}>
        {label}
      </text_1.default>);
    }
    return null;
};
var styles = react_native_1.StyleSheet.create({
    label: {
        minHeight: 20
    },
    dummyPlaceholder: {
        opacity: 0
    }
});
Label.displayName = 'Incubator.TextField';
exports.default = Label;
