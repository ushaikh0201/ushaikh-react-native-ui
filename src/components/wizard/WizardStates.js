"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatesConfig = void 0;
var colors_1 = __importDefault(require("../../style/colors"));
var checkMarkSmall = require('./assets/checkMarkSmall.png');
var exclamationSmall = require('./assets/exclamationSmall.png');
exports.StatesConfig = {
    enabled: { color: colors_1.default.dark30, circleColor: colors_1.default.dark60, enabled: true },
    disabled: { color: colors_1.default.dark50, circleColor: colors_1.default.dark60 },
    error: { color: colors_1.default.red30, icon: exclamationSmall, enabled: true, accessibilityInfo: 'Validation Error' },
    skipped: { color: colors_1.default.red30, enabled: true, accessibilityInfo: 'Not completed' },
    completed: {
        color: colors_1.default.dark30,
        circleColor: colors_1.default.dark60,
        icon: checkMarkSmall,
        enabled: true,
        accessibilityInfo: 'Completed'
    },
    active: { color: colors_1.default.blue10, circleColor: colors_1.default.blue10 }
};
