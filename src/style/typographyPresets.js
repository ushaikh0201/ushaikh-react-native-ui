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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEIGHT_TYPES = void 0;
var react_native_1 = require("react-native");
var lodash_1 = __importDefault(require("lodash"));
var Constants_1 = __importDefault(require("../helpers/Constants"));
exports.WEIGHT_TYPES = {
    THIN: '200',
    LIGHT: '300',
    REGULAR: '400',
    MEDIUM: parseFloat(react_native_1.Platform.Version) >= 11.2
        ? '600'
        : '500',
    BOLD: '700',
    HEAVY: '800',
    BLACK: '900'
};
// text10
var text10 = {
    fontSize: 64,
    fontWeight: Constants_1.default.isIOS ? exports.WEIGHT_TYPES.THIN : undefined,
    lineHeight: 76,
    fontFamily: 'System'
};
// text20
var text20 = {
    fontSize: 48,
    fontWeight: Constants_1.default.isIOS ? exports.WEIGHT_TYPES.REGULAR : undefined,
    lineHeight: Constants_1.default.isIOS ? 60 : 62,
    fontFamily: 'System'
};
// text30
var text30 = {
    fontSize: 36,
    fontWeight: Constants_1.default.isIOS ? exports.WEIGHT_TYPES.REGULAR : undefined,
    lineHeight: Constants_1.default.isIOS ? 43 : 46,
    fontFamily: 'System'
};
// text40
var text40 = {
    fontSize: 28,
    fontWeight: Constants_1.default.isIOS ? exports.WEIGHT_TYPES.HEAVY : 'bold',
    lineHeight: 32,
    fontFamily: 'System'
};
// text50
var text50 = {
    fontSize: 24,
    fontWeight: Constants_1.default.isIOS ? exports.WEIGHT_TYPES.HEAVY : 'bold',
    lineHeight: 28,
    fontFamily: 'System'
};
// text60
var text60 = {
    fontSize: 20,
    fontWeight: Constants_1.default.isIOS ? exports.WEIGHT_TYPES.HEAVY : 'bold',
    lineHeight: 24,
    fontFamily: 'System'
};
// text65
var text65 = {
    fontSize: 18,
    fontWeight: Constants_1.default.isIOS ? exports.WEIGHT_TYPES.MEDIUM : undefined,
    lineHeight: 24,
    fontFamily: 'System'
};
// text70
var text70 = {
    fontSize: 16,
    fontWeight: Constants_1.default.isIOS ? exports.WEIGHT_TYPES.REGULAR : undefined,
    lineHeight: 24,
    fontFamily: 'System'
};
// text80
var text80 = {
    fontSize: 14,
    fontWeight: Constants_1.default.isIOS ? exports.WEIGHT_TYPES.REGULAR : undefined,
    lineHeight: 20,
    fontFamily: 'System'
};
// text90
var text90 = {
    fontSize: 12,
    fontWeight: Constants_1.default.isIOS ? exports.WEIGHT_TYPES.BOLD : 'bold',
    lineHeight: 16,
    fontFamily: 'System'
};
// text100
var text100 = {
    fontSize: 10,
    fontWeight: Constants_1.default.isIOS ? exports.WEIGHT_TYPES.BOLD : 'bold',
    lineHeight: 16,
    fontFamily: 'System'
};
var Typography = {
    text10: text10,
    text20: text20,
    text30: text30,
    text40: text40,
    text50: text50,
    text60: text60,
    text65: text65,
    text70: text70,
    text80: text80,
    text90: text90,
    text100: text100
};
var keys = [10, 20, 30, 40, 50, 60, 65, 70, 80, 90, 100];
var weightsMap = {
    THIN: 'T',
    LIGHT: 'L',
    REGULAR: 'R',
    MEDIUM: 'M',
    BOLD: 'BO',
    HEAVY: 'H',
    BLACK: 'BL'
};
lodash_1.default.forEach(keys, function (key) {
    lodash_1.default.forEach(weightsMap, function (weightValue, weightKey) {
        var fontKey = "text" + key;
        var fontWeightKey = "" + fontKey + weightValue;
        Typography[fontWeightKey] = __assign(__assign({}, Typography[fontKey]), { fontWeight: Constants_1.default.isIOS ? exports.WEIGHT_TYPES[weightKey] : ['BO', 'H', 'BL'].includes(weightKey) ? 'bold' : undefined });
    });
});
exports.default = Typography;
