"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var lodash_1 = __importDefault(require("lodash"));
var useToggleValue = function (initial, second) {
    var initialValue = react_1.useRef(initial).current;
    var secondValue = react_1.useRef(second).current;
    var _a = react_1.useState(initial), value = _a[0], setValue = _a[1];
    var toggle = function () {
        if (lodash_1.default.isBoolean(initialValue)) {
            setValue(!initialValue);
        }
        else if (value === initialValue) {
            setValue(secondValue);
        }
        else {
            setValue(initialValue);
        }
    };
    return [value, toggle, setValue];
};
exports.default = useToggleValue;
