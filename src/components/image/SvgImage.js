"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var optionalDependencies_1 = require("../../optionalDependencies");
var SvgXml = optionalDependencies_1.SvgPackage === null || optionalDependencies_1.SvgPackage === void 0 ? void 0 : optionalDependencies_1.SvgPackage.SvgXml;
function SvgImage(props) {
    var data = props.data, others = __rest(props, ["data"]);
    if (!SvgXml) {
        // eslint-disable-next-line max-len
        console.error("RNUILib Image \"svg\" prop requires installing \"react-native-svg\" and \"react-native-svg-transformer\" dependencies");
        return null;
    }
    if (typeof data === 'string') {
        return <SvgXml xml={data} {...others}/>;
    }
    else if (data) {
        var File_1 = data; // Must be with capital letter
        return <File_1 {...others}/>;
    }
    return null;
}
SvgImage.displayName = 'IGNORE';
exports.default = SvgImage;
