"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = __importDefault(require("./colors"));
var Dividers = {
    d10: {
        borderBottomWidth: 1,
        borderColor: colors_1.default.grey60
    },
    d20: {
        borderBottomWidth: 8,
        borderColor: colors_1.default.grey70
    }
};
exports.default = Dividers;
