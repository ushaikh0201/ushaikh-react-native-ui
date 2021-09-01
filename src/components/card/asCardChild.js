"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var CardContext_1 = __importDefault(require("./CardContext"));
function asCardChild(WrappedComponent) {
    var cardChild = function (props) {
        return <CardContext_1.default.Consumer>{function (context) { return <WrappedComponent context={context} {...props}/>; }}</CardContext_1.default.Consumer>;
    };
    cardChild.displayName = WrappedComponent.displayName;
    return cardChild;
}
exports.default = asCardChild;
