"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBorderRadiusStyle = exports.extractPositionValues = void 0;
var lodash_1 = __importDefault(require("lodash"));
function extractPositionValues(position) {
    var top = lodash_1.default.includes(position, 'top');
    var left = lodash_1.default.includes(position, 'left');
    var right = lodash_1.default.includes(position, 'right');
    var bottom = lodash_1.default.includes(position, 'bottom');
    return { top: top, left: left, right: right, bottom: bottom };
}
exports.extractPositionValues = extractPositionValues;
function generateBorderRadiusStyle(_a) {
    var position = _a.position, borderRadius = _a.borderRadius;
    var borderRadiusStyle = {};
    var _b = extractPositionValues(position), top = _b.top, left = _b.left, right = _b.right, bottom = _b.bottom;
    borderRadiusStyle.borderTopLeftRadius = top || left ? borderRadius : undefined;
    borderRadiusStyle.borderTopRightRadius = top || right ? borderRadius : undefined;
    borderRadiusStyle.borderBottomLeftRadius = bottom || left ? borderRadius : undefined;
    borderRadiusStyle.borderBottomRightRadius = bottom || right ? borderRadius : undefined;
    return borderRadiusStyle;
}
exports.generateBorderRadiusStyle = generateBorderRadiusStyle;
