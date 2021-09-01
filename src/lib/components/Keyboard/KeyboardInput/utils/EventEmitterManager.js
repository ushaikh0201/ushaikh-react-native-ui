"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var EventEmitterManager = /** @class */ (function () {
    function EventEmitterManager() {
        this.handlerCallbacks = {};
        this.handlerCallbacks = {};
    }
    EventEmitterManager.prototype.listenOn = function (eventName, handlerCallback) {
        if (!this.handlerCallbacks[eventName]) {
            this.handlerCallbacks[eventName] = [];
        }
        if (lodash_1.default.indexOf(this.handlerCallbacks[eventName], handlerCallback) === -1) {
            this.handlerCallbacks[eventName].push(handlerCallback);
        }
    };
    EventEmitterManager.prototype.emitEvent = function (eventName, params) {
        if (params === void 0) { params = {}; }
        if (this.handlerCallbacks[eventName]) {
            this.handlerCallbacks[eventName].forEach(function (callback) { return callback(params); });
        }
    };
    EventEmitterManager.prototype.removeListeners = function (eventName) {
        delete this.handlerCallbacks[eventName];
    };
    EventEmitterManager.prototype.removeListener = function (eventName, listener) {
        var handlers = this.handlerCallbacks[eventName];
        if (handlers) {
            handlers.forEach(function (handler, index) {
                if (handler === listener) {
                    handlers.splice(index, 1);
                }
            });
        }
    };
    return EventEmitterManager;
}());
exports.default = EventEmitterManager;
