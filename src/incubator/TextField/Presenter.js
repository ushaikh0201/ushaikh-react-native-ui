"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelevantValidationMessage = exports.validate = exports.getColorByState = void 0;
var lodash_1 = __importDefault(require("lodash"));
var style_1 = require("./../../style");
var validators_1 = __importDefault(require("./validators"));
function getColorByState(color, context) {
    var finalColor;
    if (lodash_1.default.isString(color)) {
        finalColor = color;
    }
    else if (lodash_1.default.isPlainObject(color)) {
        if (context === null || context === void 0 ? void 0 : context.disabled) {
            finalColor = color === null || color === void 0 ? void 0 : color.disabled;
        }
        else if (!(context === null || context === void 0 ? void 0 : context.isValid)) {
            finalColor = color === null || color === void 0 ? void 0 : color.error;
        }
        else if (context === null || context === void 0 ? void 0 : context.isFocused) {
            finalColor = color === null || color === void 0 ? void 0 : color.focus;
        }
        finalColor = finalColor || (color === null || color === void 0 ? void 0 : color.default) || style_1.Colors.grey10;
    }
    return finalColor;
}
exports.getColorByState = getColorByState;
function validate(value, validator) {
    if (lodash_1.default.isUndefined(validator)) {
        return [true, undefined];
    }
    var _isValid = true;
    var _failingValidatorIndex;
    var _validators = lodash_1.default.isArray(validator) ? validator : [validator];
    lodash_1.default.forEach(_validators, function (validator, index) {
        var _a;
        if (lodash_1.default.isFunction(validator)) {
            _isValid = validator(value);
        }
        else if (lodash_1.default.isString(validator)) {
            _isValid = (_a = validators_1.default[validator]) === null || _a === void 0 ? void 0 : _a.call(validators_1.default, value || '');
        }
        if (!_isValid) {
            _failingValidatorIndex = index;
            return false;
        }
    });
    return [_isValid, _failingValidatorIndex];
}
exports.validate = validate;
function getRelevantValidationMessage(validationMessage, failingValidatorIndex) {
    if (lodash_1.default.isUndefined(failingValidatorIndex)) {
        return validationMessage;
    }
    else if (lodash_1.default.isUndefined(validationMessage)) {
        return;
    }
    if (lodash_1.default.isString(validationMessage)) {
        return validationMessage;
    }
    else if (lodash_1.default.isArray(validationMessage)) {
        return validationMessage[failingValidatorIndex];
    }
}
exports.getRelevantValidationMessage = getRelevantValidationMessage;
