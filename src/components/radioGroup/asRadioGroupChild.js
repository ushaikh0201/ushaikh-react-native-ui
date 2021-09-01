"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var hoist_non_react_statics_1 = __importDefault(require("hoist-non-react-statics"));
var RadioGroupContext_1 = __importDefault(require("./RadioGroupContext"));
function asRadioGroupChild(WrappedComponent) {
    var RadioGroupChild = /** @class */ (function (_super) {
        __extends(RadioGroupChild, _super);
        function RadioGroupChild() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RadioGroupChild.prototype.render = function () {
            var _this = this;
            var _a = this.props, buttonValue = _a.value, selected = _a.selected;
            return (<RadioGroupContext_1.default.Consumer>
          {function (_a) {
                    var value = _a.value, onValueChange = _a.onValueChange;
                    return (<WrappedComponent {..._this.props} selectedValue={value} selected={buttonValue !== undefined ? value === buttonValue : selected} onValueChange={onValueChange}/>);
                }}
        </RadioGroupContext_1.default.Consumer>);
        };
        return RadioGroupChild;
    }(react_1.Component));
    hoist_non_react_statics_1.default(RadioGroupChild, WrappedComponent);
    RadioGroupChild.displayName = WrappedComponent.displayName;
    return RadioGroupChild;
}
exports.default = asRadioGroupChild;
