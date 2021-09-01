"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var lodash_1 = __importDefault(require("lodash"));
var text_1 = __importDefault(require("../../components/text"));
var FieldContext_1 = __importDefault(require("./FieldContext"));
var CharCounter = function (_a) {
    var maxLength = _a.maxLength, charCounterStyle = _a.charCounterStyle;
    var value = react_1.useContext(FieldContext_1.default).value;
    if (lodash_1.default.isUndefined(maxLength)) {
        return null;
    }
    return (<text_1.default grey30 style={[styles.container, charCounterStyle]}>
      {lodash_1.default.size(value) + "/" + maxLength}
    </text_1.default>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        textAlign: 'right'
    }
});
CharCounter.displayName = 'Incubator.TextField';
exports.default = CharCounter;
