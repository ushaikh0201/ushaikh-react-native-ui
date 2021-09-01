"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLastItemLabel = void 0;
var lodash_1 = __importDefault(require("lodash"));
function formatLastItemLabel(label, options) {
    var _a = options || {}, _b = _a.shouldAddPlus, shouldAddPlus = _b === void 0 ? true : _b, maxPlusLimit = _a.maxPlusLimit;
    if (typeof label !== 'number') {
        return label;
    }
    var formattedLabel;
    var roundedNumber = lodash_1.default.toString(Math.round(label));
    if (label < 1000) {
        formattedLabel = "" + label;
    }
    else if (label >= 10000000) {
        formattedLabel = roundedNumber.slice(0, -6) + "m";
    }
    else if (label >= 1000000) {
        formattedLabel = parseInt(roundedNumber.slice(0, -5)) / 10 + "m";
    }
    else {
        formattedLabel = roundedNumber.slice(0, -3) + "k";
    }
    var isInPlusRange = !lodash_1.default.isNil(maxPlusLimit) ? formattedLabel.length <= maxPlusLimit : shouldAddPlus;
    if (shouldAddPlus && isInPlusRange) {
        return "+" + formattedLabel;
    }
    return formattedLabel;
}
exports.formatLastItemLabel = formatLastItemLabel;
