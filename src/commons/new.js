"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withScrollReached = exports.withScrollEnabler = exports.forwardRef = exports.asBaseComponent = exports.UIComponent = void 0;
// TODO: this file should replace commons/index.js
var UIComponent_1 = require("./UIComponent");
Object.defineProperty(exports, "UIComponent", { enumerable: true, get: function () { return __importDefault(UIComponent_1).default; } });
var asBaseComponent_1 = require("./asBaseComponent");
Object.defineProperty(exports, "asBaseComponent", { enumerable: true, get: function () { return __importDefault(asBaseComponent_1).default; } });
var forwardRef_1 = require("./forwardRef");
Object.defineProperty(exports, "forwardRef", { enumerable: true, get: function () { return __importDefault(forwardRef_1).default; } });
var withScrollEnabler_1 = require("./withScrollEnabler");
Object.defineProperty(exports, "withScrollEnabler", { enumerable: true, get: function () { return __importDefault(withScrollEnabler_1).default; } });
var withScrollReached_1 = require("./withScrollReached");
Object.defineProperty(exports, "withScrollReached", { enumerable: true, get: function () { return __importDefault(withScrollReached_1).default; } });
