"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spacings = exports.SpacingLiterals = void 0;
var lodash_1 = __importDefault(require("lodash"));
exports.SpacingLiterals = {
    s1: 4,
    s2: 8,
    s3: 12,
    s4: 16,
    s5: 20,
    s6: 24,
    s7: 28,
    s8: 32,
    s9: 36,
    s10: 40
};
var Spacings = /** @class */ (function () {
    function Spacings() {
        this.keysPattern = this.generateKeysPattern();
    }
    Spacings.prototype.loadSpacings = function (spacings) {
        var _this = this;
        lodash_1.default.forEach(spacings, function (value, key) {
            //@ts-ignore
            _this[key] = value;
        });
        this.keysPattern = this.generateKeysPattern();
    };
    Spacings.prototype.getKeysPattern = function () {
        return this.keysPattern;
    };
    Spacings.prototype.generateKeysPattern = function () {
        return new RegExp(lodash_1.default.chain(this)
            .keys()
            .join('|')
            .value());
    };
    return Spacings;
}());
exports.Spacings = Spacings;
var TypedSpacings = Spacings;
var spacingInstance = new TypedSpacings();
spacingInstance.loadSpacings(exports.SpacingLiterals);
exports.default = spacingInstance;
