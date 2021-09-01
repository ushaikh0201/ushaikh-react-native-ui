"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var CustomKeyboardView_ios_1 = __importDefault(require("./CustomKeyboardView.ios"));
var CustomKeyboardView_android_1 = __importDefault(require("./CustomKeyboardView.android"));
var IsAndroid = react_native_1.Platform.OS === 'android';
var CustomKeyboardView = function (props) {
    var Container = IsAndroid ? CustomKeyboardView_android_1.default : CustomKeyboardView_ios_1.default;
    return (<Container {...props}/>);
};
exports.default = CustomKeyboardView;
