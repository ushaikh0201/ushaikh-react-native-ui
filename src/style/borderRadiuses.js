"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorderRadiuses = exports.BorderRadiusesLiterals = void 0;
var lodash_1 = __importDefault(require("lodash"));
var Constants_1 = __importDefault(require("../helpers/Constants"));
exports.BorderRadiusesLiterals = {
    br0: Constants_1.default.isIOS ? 0 : 0,
    br10: Constants_1.default.isIOS ? 3 : 2,
    br20: 6,
    br30: Constants_1.default.isIOS ? 9 : 8,
    br40: 12,
    br50: Constants_1.default.isIOS ? 15 : 16,
    br60: 20,
    br100: 999
};
var BorderRadiuses = /** @class */ (function () {
    function BorderRadiuses() {
    }
    BorderRadiuses.prototype.loadBorders = function (borders) {
        var _this = this;
        lodash_1.default.forEach(borders, function (value, key) {
            //@ts-ignore
            _this[key] = value;
        });
    };
    BorderRadiuses.prototype.getKeysPattern = function () {
        return /^(br[0-9]+)/;
    };
    return BorderRadiuses;
}());
exports.BorderRadiuses = BorderRadiuses;
var TypedBorderRadiuses = BorderRadiuses;
var borderRadiusesInstance = new TypedBorderRadiuses();
borderRadiusesInstance.loadBorders(exports.BorderRadiusesLiterals);
exports.default = borderRadiusesInstance;
