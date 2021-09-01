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
var SliderContext_1 = __importDefault(require("./SliderContext"));
var getConsumer = function (WrappedComponent) { return (/** @class */ (function (_super) {
    __extends(SliderContextConsumer, _super);
    function SliderContextConsumer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SliderContextConsumer.prototype.render = function () {
        var _this = this;
        return (<SliderContext_1.default.Consumer>
          {function (context) { return (<WrappedComponent ref={function (r) { return (_this.contentRef = r); }} sliderContext={context} {..._this.props}/>); }}
        </SliderContext_1.default.Consumer>);
    };
    return SliderContextConsumer;
}(react_1.Component))); };
function asSliderGroupChild(WrappedComponent) {
    var SliderContextConsumer = getConsumer(WrappedComponent);
    hoist_non_react_statics_1.default(SliderContextConsumer, WrappedComponent);
    return SliderContextConsumer;
}
exports.default = asSliderGroupChild;
