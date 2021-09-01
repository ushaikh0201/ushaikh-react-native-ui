"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colors = void 0;
var react_native_1 = require("react-native");
var lodash_1 = __importDefault(require("lodash"));
//@ts-ignore
var color_1 = __importDefault(require("color"));
var tinycolor2_1 = __importDefault(require("tinycolor2"));
var colorsPalette_1 = require("./colorsPalette");
//@ts-ignore
var colorName_1 = __importDefault(require("./colorName"));
var Colors = /** @class */ (function () {
    function Colors() {
        var _this = this;
        this.schemes = { light: {}, dark: {} };
        this.currentScheme = 'default';
        this.generateColorPalette = lodash_1.default.memoize(function (color) {
            var hsl = color_1.default(color).hsl();
            var lightness = Math.round(hsl.color[2]);
            var ls = [hsl.color[2]];
            var l = lightness - 10;
            while (l >= 20) {
                ls.unshift(l);
                l -= 10;
            }
            l = lightness + 10;
            while (l < 100) {
                ls.push(l);
                l += 10;
            }
            var tints = [];
            lodash_1.default.forEach(ls, function (e) {
                var tint = generateColorTint(color, e);
                tints.push(tint);
            });
            var sliced = tints.slice(0, 8);
            var adjusted = adjustSaturation(sliced, color);
            return adjusted || sliced;
        });
        var colors = Object.assign(colorsPalette_1.colorsPalette, colorsPalette_1.themeColors);
        Object.assign(this, colors);
        react_native_1.Appearance.addChangeListener(function () {
            var _a;
            if (_this.currentScheme === 'default') {
                Object.assign(_this, _this.schemes[(_a = react_native_1.Appearance.getColorScheme()) !== null && _a !== void 0 ? _a : 'light']);
            }
        });
    }
    /**
     * Load custom set of colors
     * arguments:
     * colors - map of keys and colors values e.g {dark10: '#20303C', dark20: '#43515C'}
     */
    Colors.prototype.loadColors = function (colors) {
        var _this = this;
        lodash_1.default.forEach(colors, function (value, key) {
            _this[key] = value;
        });
    };
    /**
     * Load set of schemes for light/dark mode
     * arguments:
     * schemes - two sets of map of colors e.g {light: {screen: 'white'}, dark: {screen: 'black'}}
     */
    Colors.prototype.loadSchemes = function (schemes) {
        var lightSchemeKeys = Object.keys(schemes.light);
        var darkSchemeKeys = Object.keys(schemes.dark);
        var missingKeys = lodash_1.default.xor(lightSchemeKeys, darkSchemeKeys);
        if (!lodash_1.default.isEmpty(missingKeys)) {
            console.error("There is a mismatch in scheme keys: " + missingKeys.join(', '));
        }
        this.schemes = schemes;
        var colorScheme = this.getScheme();
        Object.assign(this, this.schemes[colorScheme]);
    };
    /**
     * Get app's current color scheme
     */
    Colors.prototype.getScheme = function () {
        var scheme = this.currentScheme === 'default' ? react_native_1.Appearance.getColorScheme() : this.currentScheme;
        return scheme !== null && scheme !== void 0 ? scheme : 'light';
    };
    /**
     * Set color scheme for app
     * arguments:
     * scheme - color scheme e.g light/dark/default
     */
    Colors.prototype.setScheme = function (scheme) {
        if (!['light', 'dark', 'default'].includes(scheme)) {
            throw new Error(scheme + " is invalid colorScheme, please use 'light' | 'dark' | 'default'");
        }
        this.currentScheme = scheme;
        var colorScheme = this.getScheme();
        Object.assign(this, this.schemes[colorScheme]);
    };
    Colors.prototype.rgba = function (p1, p2, p3, p4) {
        var hex;
        var opacity;
        var red;
        var green;
        var blue;
        if (arguments.length === 2 && typeof p1 === 'string') {
            hex = p1;
            opacity = p2;
            hex = validateHex(hex);
            red = parseInt(hex.substring(0, 2), 16);
            green = parseInt(hex.substring(2, 4), 16);
            blue = parseInt(hex.substring(4, 6), 16);
        }
        else if (arguments.length === 4 && typeof p1 === 'number') {
            red = validateRGB(p1);
            green = validateRGB(p2);
            blue = validateRGB(p3);
            opacity = p4;
        }
        else {
            throw new Error('rgba can work with either 2 or 4 arguments');
        }
        return "rgba(" + red + ", " + green + ", " + blue + ", " + opacity + ")";
    };
    Colors.prototype.getBackgroundKeysPattern = function () {
        return /^(bg-|background-)/;
    };
    Colors.prototype.isEmpty = function (color) {
        if (lodash_1.default.isNil(color) || color === 'transparent') {
            return true;
        }
        try {
            color_1.default(color);
            return false;
        }
        catch (error) {
            console.warn('Colors.isEmpty failed:', error);
            return true;
        }
    };
    Colors.prototype.getColorTint = function (color, tintKey) {
        var _this = this;
        if (lodash_1.default.isUndefined(tintKey) || isNaN(tintKey) || lodash_1.default.isUndefined(color)) {
            // console.error('"Colors.getColorTint" must accept a color and tintKey params');
            return color;
        }
        if (color === 'transparent') {
            return color;
        }
        var colorKey = lodash_1.default.findKey(this, function (_value, key) { return _this[key] === color; });
        if (colorKey) {
            var requiredColorKey = "" + colorKey.slice(0, -2) + tintKey;
            var requiredColor = this[requiredColorKey];
            if (lodash_1.default.isUndefined(requiredColor)) {
                return this.getTintedColorForDynamicHex(color, tintKey);
            }
            return requiredColor;
        }
        return this.getTintedColorForDynamicHex(color, tintKey);
    };
    Colors.prototype.getColorName = function (color) {
        return colorName_1.default.name(color)[1];
    };
    Colors.prototype.getTintedColorForDynamicHex = function (color, tintKey) {
        // Handles dynamic colors (non uilib colors)
        var tintLevel = Math.floor(Number(tintKey) / 10);
        tintLevel = Math.max(1, tintLevel);
        tintLevel = Math.min(8, tintLevel);
        var colorsPalette = this.generateColorPalette(color);
        return colorsPalette[tintLevel - 1];
    };
    Colors.prototype.isDark = function (color) {
        var lum = tinycolor2_1.default(color).getLuminance();
        return lum < 0.55;
    };
    Colors.prototype.isValidHex = function (string) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(string);
    };
    Colors.prototype.getHexString = function (color) {
        return tinycolor2_1.default(color).toHexString();
    };
    Colors.prototype.getHSL = function (color) {
        return tinycolor2_1.default(color).toHsl();
    };
    Colors.prototype.isTransparent = function (color) {
        return color && lodash_1.default.toUpper(color) === lodash_1.default.toUpper('transparent');
    };
    Colors.prototype.areEqual = function (colorA, colorB) {
        return lodash_1.default.toLower(colorA) === lodash_1.default.toLower(colorB);
    };
    return Colors;
}());
exports.Colors = Colors;
function adjustSaturation(colors, color) {
    var array;
    var lightnessLevel = 80;
    var saturationLevel = 60;
    var hsl = color_1.default(color).hsl();
    var lightness = Math.round(hsl.color[2]);
    if (lightness > lightnessLevel) {
        var saturation = Math.round(hsl.color[1]);
        if (saturation > saturationLevel) {
            array = lodash_1.default.map(colors, function (e) { return (e !== color ? addSaturation(e, saturationLevel) : e); });
        }
    }
    return array;
}
function addSaturation(color, saturation) {
    var hsl = color_1.default(color).hsl();
    hsl.color[1] = saturation;
    return hsl.hex();
}
function generateColorTint(color, tintLevel) {
    var hsl = color_1.default(color).hsl();
    hsl.color[2] = tintLevel;
    return hsl.hex();
}
function validateRGB(value) {
    if (isNaN(value) || value > 255 || value < 0) {
        throw new Error(value + " is invalid rgb code, please use number between 0-255");
    }
    return value;
}
function validateHex(value) {
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
        throw new Error(value + " is invalid hex color");
    }
    value = value.replace('#', '');
    if (value.length === 3) {
        value = threeDigitHexToSix(value);
    }
    return value;
}
function threeDigitHexToSix(value) {
    return value.replace(/./g, '$&$&');
}
var TypedColors = Colors;
var colorObject = new TypedColors();
colorObject.loadColors(colorsPalette_1.colorsPalette);
exports.default = colorObject;
