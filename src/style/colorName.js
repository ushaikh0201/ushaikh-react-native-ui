"use strict";
// adopted from: ntc js (Name that Color JavaScript)
// http://chir.ag/projects/ntc
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorName = void 0;
var names = require('./colorNameMap').colorNameMap;
// ColorName.name(hex_color) will return array for nearest color: ['hex color', 'color name', isMapped]
var ColorName = /** @class */ (function () {
    function ColorName() {
    }
    ColorName.prototype._init = function () {
        var color;
        var rgb;
        var hsl;
        for (var i = 0; i < names.length; i++) {
            color = '#' + names[i][0];
            rgb = this._rgb(color);
            hsl = this._hsl(color);
            names[i].push(rgb[0], rgb[1], rgb[2], hsl[0], hsl[1], hsl[2]);
        }
    };
    ColorName.prototype.name = function (color) {
        if (color === void 0) { color = ''; }
        color = color.toUpperCase();
        if (color.length < 3 || color.length > 7) {
            return ['#000000', 'Invalid Color: ' + color, false];
        }
        if (color.length % 3 === 0) {
            color = '#' + color;
        }
        if (color.length === 4) {
            color = '#' + color.substr(1, 1) + color.substr(1, 1) + color.substr(2, 1) + color.substr(2, 1) + color.substr(3, 1) + color.substr(3, 1);
        }
        var rgb = this._rgb(color);
        var r = rgb[0];
        var g = rgb[1];
        var b = rgb[2];
        var hsl = this._hsl(color);
        var h = hsl[0];
        var s = hsl[1];
        var l = hsl[2];
        var ndf1 = 0;
        var ndf2 = 0;
        var ndf = 0;
        var cl = -1;
        var df = -1;
        for (var i = 0; i < names.length; i++) {
            if (color === '#' + names[i][0]) {
                return ['#' + names[i][0], names[i][1], true];
            }
            ndf1 = Math.pow(r - names[i][2], 2) + Math.pow(g - names[i][3], 2) + Math.pow(b - names[i][4], 2);
            ndf2 = Math.pow(h - names[i][5], 2) + Math.pow(s - names[i][6], 2) + Math.pow(l - names[i][7], 2);
            ndf = ndf1 + ndf2 * 2;
            if (df < 0 || df > ndf) {
                df = ndf;
                cl = i;
            }
        }
        return (cl < 0 ? ['#000000', 'Invalid Color: ' + color, false] : ['#' + names[cl][0], names[cl][1], false]);
    };
    // adopted from: Farbtastic 1.2
    // http://acko.net/dev/farbtastic
    ColorName.prototype._hsl = function (color) {
        var rgb = [
            parseInt('0x' + color.substring(1, 3)) / 255,
            parseInt('0x' + color.substring(3, 5)) / 255,
            parseInt('0x' + color.substring(5, 7)) / 255
        ];
        var r = rgb[0];
        var g = rgb[1];
        var b = rgb[2];
        var min = Math.min(r, Math.min(g, b));
        var max = Math.max(r, Math.max(g, b));
        var delta = max - min;
        var l = (min + max) / 2;
        var s = 0;
        if (l > 0 && l < 1) {
            s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));
        }
        var h = 0;
        if (delta > 0) {
            if (max === r && max !== g) {
                h += (g - b) / delta;
            }
            if (max === g && max !== b) {
                h += (2 + (b - r) / delta);
            }
            if (max === b && max !== r) {
                h += (4 + (r - g) / delta);
            }
            h /= 6;
        }
        return [
            //@ts-ignore
            parseInt(h * 255),
            //@ts-ignore
            parseInt(s * 255),
            //@ts-ignore
            parseInt(l * 255)
        ];
    };
    // adopted from: Farbtastic 1.2
    // http://acko.net/dev/farbtastic
    ColorName.prototype._rgb = function (color) {
        return [
            parseInt('0x' + color.substring(1, 3)),
            parseInt('0x' + color.substring(3, 5)),
            parseInt('0x' + color.substring(5, 7))
        ];
    };
    return ColorName;
}());
exports.ColorName = ColorName;
var object = new ColorName();
object._init();
exports.default = object;
