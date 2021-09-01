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
exports.RadioGroup = void 0;
var react_1 = __importStar(require("react"));
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../view"));
var RadioGroupContext_1 = __importDefault(require("./RadioGroupContext"));
/**
 * @description: Wrap a group of Radio Buttons to automatically control their selection
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Default.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Alignment.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Custom.gif?raw=true
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Individual.png?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/RadioButtonScreen.js
 */
var RadioGroup = /** @class */ (function (_super) {
    __extends(RadioGroup, _super);
    function RadioGroup(props) {
        var _this = _super.call(this, props) || this;
        _this.onValueChange = function (value) {
            var _a, _b;
            _this.setState({ value: value });
            (_b = (_a = _this.props).onValueChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
        };
        _this.state = {
            initialValue: props.initialValue,
            value: props.initialValue
        };
        return _this;
    }
    RadioGroup.prototype.getContextProviderValue = function () {
        var value = this.state.value;
        return { value: value, onValueChange: this.onValueChange };
    };
    RadioGroup.prototype.render = function () {
        return (<view_1.default {...this.props}>
        <RadioGroupContext_1.default.Provider value={this.getContextProviderValue()}>
          {this.props.children}
        </RadioGroupContext_1.default.Provider>
      </view_1.default>);
    };
    RadioGroup.displayName = 'RadioGroup';
    RadioGroup.getDerivedStateFromProps = function (props, state) {
        if (state.initialValue !== props.initialValue) {
            return {
                initialValue: props.initialValue,
                value: props.initialValue
            };
        }
        return null;
    };
    return RadioGroup;
}(react_1.PureComponent));
exports.RadioGroup = RadioGroup;
exports.default = new_1.asBaseComponent(new_1.forwardRef(RadioGroup));
