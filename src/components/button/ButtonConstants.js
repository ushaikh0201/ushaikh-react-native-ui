"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DISABLED_COLOR = exports.DEFAULT_SIZE = exports.MIN_WIDTH = exports.HORIZONTAL_PADDINGS = exports.PADDINGS = void 0;
var style_1 = require("../../style");
var ButtonTypes_1 = require("./ButtonTypes");
exports.PADDINGS = {
    XSMALL: 3,
    SMALL: 4.5,
    MEDIUM: 6.5,
    LARGE: 9.5
};
exports.HORIZONTAL_PADDINGS = {
    XSMALL: 11,
    SMALL: 14,
    MEDIUM: 16,
    LARGE: 20
};
exports.MIN_WIDTH = {
    XSMALL: 66,
    SMALL: 70,
    MEDIUM: 77,
    LARGE: 90
};
exports.DEFAULT_SIZE = ButtonTypes_1.ButtonSize.large;
exports.DISABLED_COLOR = style_1.Colors.grey50;
