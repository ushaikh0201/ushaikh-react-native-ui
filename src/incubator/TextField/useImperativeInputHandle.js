"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var FieldContext_1 = __importDefault(require("./FieldContext"));
var useImperativeInputHandle = function (ref) {
    var inputRef = react_1.useRef();
    var context = react_1.useContext(FieldContext_1.default);
    react_1.useImperativeHandle(ref, function () {
        return {
            focus: function () { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); },
            blur: function () { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur(); },
            clear: function () { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.clear(); },
            validate: function () {
                context.validateField();
            }
        };
    });
    return inputRef;
};
exports.default = useImperativeInputHandle;
