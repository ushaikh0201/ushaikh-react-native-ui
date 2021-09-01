"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var lodash_1 = __importDefault(require("lodash"));
var EventEmitterManager_1 = __importDefault(require("./utils/EventEmitterManager"));
/*
 * Tech debt: how to deal with multiple registries in the app?
 */
var getKeyboardsWithIDs = function (keyboardIDs) {
    return keyboardIDs.map(function (keyboardId) {
        return __assign({ id: keyboardId }, KeyboardRegistry.registeredKeyboards[keyboardId].params);
    });
};
/**
 * @description: used for registering keyboards and performing certain actions on the keyboards.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/nativeComponentScreens/keyboardInput/demoKeyboards.js
 */
var KeyboardRegistry = /** @class */ (function () {
    function KeyboardRegistry() {
    }
    KeyboardRegistry.displayName = 'KeyboardRegistry';
    KeyboardRegistry.registeredKeyboards = {};
    KeyboardRegistry.eventEmitter = new EventEmitterManager_1.default();
    /**
     * Register a new keyboard.
     * componentID (string) - the ID of the keyboard.
     * generator (function) - a function for the creation of the keyboard.
     * params (object) - to be returned when using other methods (i.e. getKeyboards and getAllKeyboards).
     */
    KeyboardRegistry.registerKeyboard = function (componentID, generator, params) {
        if (params === void 0) { params = {}; }
        if (!lodash_1.default.isFunction(generator)) {
            console.error("KeyboardRegistry.registerKeyboard: " + componentID + " you must register a generator function");
            return;
        }
        KeyboardRegistry.registeredKeyboards[componentID] = { generator: generator, params: params, componentID: componentID };
        react_native_1.AppRegistry.registerComponent(componentID, generator);
    };
    /**
     * Get a specific keyboard
     * componentID (string) - the ID of the keyboard.
     */
    KeyboardRegistry.getKeyboard = function (componentID) {
        var res = KeyboardRegistry.registeredKeyboards[componentID];
        if (!res || !res.generator) {
            console.error("KeyboardRegistry.getKeyboard: " + componentID + " used but not yet registered");
            return undefined;
        }
        return res.generator();
    };
    /**
     * Get keyboards by IDs
     * componentIDs (string[]) - the ID of the keyboard.
     */
    KeyboardRegistry.getKeyboards = function (componentIDs) {
        if (componentIDs === void 0) { componentIDs = []; }
        var validKeyboardIDs = lodash_1.default.intersection(componentIDs, Object.keys(KeyboardRegistry.registeredKeyboards));
        return getKeyboardsWithIDs(validKeyboardIDs);
    };
    /**
     * Get all keyboards
     */
    KeyboardRegistry.getAllKeyboards = function () {
        return getKeyboardsWithIDs(Object.keys(KeyboardRegistry.registeredKeyboards));
    };
    /**
     * Add a listener for a callback.
     * globalID (string) - ID that includes the componentID and the event name
     *                     (i.e. if componentID='kb1' globalID='kb1.onItemSelected')
     * callback (function) - the callback to be called when the said event happens
     */
    KeyboardRegistry.addListener = function (globalID, callback) {
        KeyboardRegistry.eventEmitter.listenOn(globalID, callback);
    };
    /**
     * Notify that an event has occurred.
     * globalID (string) - ID that includes the componentID and the event name
     *                     (i.e. if componentID='kb1' globalID='kb1.onItemSelected')
     * args (object) - data to be sent to the listener.
     */
    KeyboardRegistry.notifyListeners = function (globalID, args) {
        KeyboardRegistry.eventEmitter.emitEvent(globalID, args);
    };
    /**
     * Remove a listener for a callback.
     * globalID (string) - ID that includes the componentID and the event name
     *                     (i.e. if componentID='kb1' globalID='kb1.onItemSelected')
     */
    KeyboardRegistry.removeListeners = function (globalID) {
        KeyboardRegistry.eventEmitter.removeListeners(globalID);
    };
    /**
     * Default event to be used for when an item on the keyboard has been pressed.
     * componentID (string) - the ID of the keyboard.
     * args (object) - data to be sent to the listener.
     */
    KeyboardRegistry.onItemSelected = function (componentID, args) {
        KeyboardRegistry.notifyListeners(componentID + ".onItemSelected", args);
    };
    /**
     * Request to show the keyboard
     * componentID (string) - the ID of the keyboard.
     */
    KeyboardRegistry.requestShowKeyboard = function (componentID) {
        KeyboardRegistry.notifyListeners('onRequestShowKeyboard', { keyboardId: componentID });
    };
    /**
     * iOS only (experimental)
     * Call to make the keyboard full screen
     * componentID (string) - the ID of the keyboard.
     */
    KeyboardRegistry.toggleExpandedKeyboard = function (componentID) {
        KeyboardRegistry.notifyListeners('onToggleExpandedKeyboard', { keyboardId: componentID });
    };
    return KeyboardRegistry;
}());
exports.default = KeyboardRegistry;
