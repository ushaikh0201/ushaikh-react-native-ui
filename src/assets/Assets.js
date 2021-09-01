"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assets = void 0;
var lodash_1 = __importDefault(require("lodash"));
function assignProperties(a, b) {
    if (a) {
        lodash_1.default(b).keys().forEach(function (key) {
            // @ts-ignore
            Object.defineProperty(a, key, Object.getOwnPropertyDescriptor(b, key));
        });
    }
    return a;
}
function ensurePath(obj, path) {
    var pointer = obj;
    var pathArray = path.split('.');
    var n = pathArray.length;
    for (var i = 0; i < n; i++) {
        var segment = pathArray[i];
        if (pointer[segment]) {
            var descriptor = Object.getOwnPropertyDescriptor(pointer, segment);
            if (descriptor === null || descriptor === void 0 ? void 0 : descriptor.get) {
                Object.defineProperty(pointer, segment, descriptor);
            }
        }
        else {
            pointer[segment] = pointer[segment] || {};
        }
        pointer = pointer[segment];
    }
    return pointer;
}
var Assets = /** @class */ (function () {
    function Assets() {
    }
    Assets.prototype.loadAssetsGroup = function (groupName, assets) {
        if (!lodash_1.default.isString(groupName)) {
            throw new Error('group name should be a string');
        }
        if (!lodash_1.default.isPlainObject(assets)) {
            throw new Error('assets should be a hash map or a function (for lazy access)');
        }
        if (groupName === '') {
            assignProperties(this, assets);
        }
        else {
            assignProperties(ensurePath(this, groupName), assets);
        }
        return this;
    };
    return Assets;
}());
exports.Assets = Assets;
