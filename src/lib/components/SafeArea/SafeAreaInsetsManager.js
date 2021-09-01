"use strict";
/* eslint no-underscore-dangle: 0 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var lodash_1 = __importDefault(require("lodash"));
var SafeAreaInsetsCache = null;
var NativeSafeAreaManager = react_native_1.NativeModules.SafeAreaManager;
var SafeAreaInsetsManager = /** @class */ (function () {
    function SafeAreaInsetsManager() {
        this._defaultInsets = { top: 0, left: 0, bottom: 0, right: 0 };
        this._safeAreaInsets = { top: 0, left: 0, bottom: 0, right: 0 };
        this._safeAreaChangedDelegates = [];
        this.addSafeAreaChangedListener();
    }
    SafeAreaInsetsManager.prototype.addSafeAreaChangedListener = function () {
        var _this = this;
        if (!NativeSafeAreaManager) {
            return;
        }
        var NativeSafeAreaEvents = new react_native_1.NativeEventEmitter(NativeSafeAreaManager);
        NativeSafeAreaEvents.addListener('SafeAreaInsetsDidChangeEvent', function (safeAreaInsets) {
            SafeAreaInsetsCache = safeAreaInsets;
            _this._safeAreaInsets = SafeAreaInsetsCache;
            lodash_1.default.forEach(_this._safeAreaChangedDelegates, function (delegate) {
                if (delegate.onSafeAreaInsetsDidChangeEvent) {
                    delegate.onSafeAreaInsetsDidChangeEvent(_this._safeAreaInsets);
                }
                else {
                    console.warn('ERROR', 'SafeAreaInsetsManager', 'safe area changed delegate was added, but it does not implement the onSafeAreaInsetsDidChangeEvent method'); //eslint-disable-line
                }
            });
        });
    };
    SafeAreaInsetsManager.prototype._updateInsets = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(NativeSafeAreaManager && SafeAreaInsetsCache === null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, NativeSafeAreaManager.getSafeAreaInsets()];
                    case 1:
                        SafeAreaInsetsCache = _a.sent();
                        this._safeAreaInsets = SafeAreaInsetsCache;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SafeAreaInsetsManager.prototype.getSafeAreaInsets = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._updateInsets()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this._safeAreaInsets];
                }
            });
        });
    };
    SafeAreaInsetsManager.prototype.addSafeAreaChangedDelegate = function (delegate) {
        this._safeAreaChangedDelegates.push(delegate);
    };
    SafeAreaInsetsManager.prototype.removeSafeAreaChangedDelegate = function (delegateToRemove) {
        lodash_1.default.remove(this._safeAreaChangedDelegates, function (currentDelegate) {
            return currentDelegate === delegateToRemove;
        });
    };
    Object.defineProperty(SafeAreaInsetsManager.prototype, "defaultInsets", {
        get: function () {
            return this._defaultInsets;
        },
        enumerable: false,
        configurable: true
    });
    return SafeAreaInsetsManager;
}());
exports.default = new SafeAreaInsetsManager();
