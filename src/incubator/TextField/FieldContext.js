"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var react_1 = require("react");
var FieldContext = react_1.createContext({
    isFocused: false,
    hasValue: false,
    isValid: true,
    failingValidatorIndex: undefined,
    disabled: false,
    validateField: lodash_1.default.noop
});
exports.default = FieldContext;
