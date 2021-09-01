"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var colors_1 = __importDefault(require("./colors"));
var Components = react_native_1.StyleSheet.create({
    accessoryIndicator: {
        width: 10,
        height: 10,
        marginLeft: 10,
        backgroundColor: 'transparent',
        borderTopWidth: 3 / react_native_1.PixelRatio.get(),
        borderRightWidth: 3 / react_native_1.PixelRatio.get(),
        borderColor: colors_1.default.dark60,
        transform: [
            {
                rotate: '45deg'
            }
        ]
    }
});
exports.default = Components;
