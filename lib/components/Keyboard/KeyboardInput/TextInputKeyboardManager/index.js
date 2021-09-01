"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var TextInputKeyboardManager_ios_1 = __importDefault(require("./TextInputKeyboardManager.ios"));
var TextInputKeyboardManager_android_1 = __importDefault(require("./TextInputKeyboardManager.android"));
var IsAndroid = react_native_1.Platform.OS === 'android';
var TextInputKeyboardManager = IsAndroid ? TextInputKeyboardManager_android_1.default : TextInputKeyboardManager_ios_1.default;
exports.default = TextInputKeyboardManager;
