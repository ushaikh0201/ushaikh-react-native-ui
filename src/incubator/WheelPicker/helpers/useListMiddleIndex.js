"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (_a) {
    var itemHeight = _a.itemHeight, listSize = _a.listSize;
    var valueInRange = function (value, min, max) {
        if (value < min || value === -0) {
            return min;
        }
        if (value > max) {
            return max;
        }
        return value;
    };
    var middleIndex = function (offset) {
        var calculatedIndex = Math.round(offset / itemHeight);
        return valueInRange(calculatedIndex, 0, listSize - 1);
    };
    return middleIndex;
});
