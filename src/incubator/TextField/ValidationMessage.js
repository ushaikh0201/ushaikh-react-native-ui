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
var text_1 = __importDefault(require("../../components/text"));
var FieldContext_1 = __importDefault(require("./FieldContext"));
var Presenter_1 = require("./Presenter");
var ValidationMessage = function (_a) {
    var validationMessage = _a.validationMessage, enableErrors = _a.enableErrors, validationMessageStyle = _a.validationMessageStyle, retainSpace = _a.retainSpace, validate = _a.validate;
    var context = react_1.useContext(FieldContext_1.default);
    if (!enableErrors || (!retainSpace && context.isValid)) {
        return null;
    }
    var relevantValidationMessage = Presenter_1.getRelevantValidationMessage(validationMessage, context.failingValidatorIndex);
    var showValidationMessage = !context.isValid || (!validate && !!validationMessage);
    return (<text_1.default red30 style={[styles.validationMessage, validationMessageStyle]}>
      {showValidationMessage ? relevantValidationMessage : ''}
    </text_1.default>);
};
var styles = react_native_1.StyleSheet.create({
    validationMessage: {
        minHeight: 20
    }
});
ValidationMessage.displayName = 'Incubator.TextField';
exports.default = ValidationMessage;
