"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var colors_1 = __importDefault(require("./colors"));
var Shadows = {
    sh10: {
        top: {
            shadowColor: colors_1.default.grey40,
            shadowOpacity: 0.18,
            shadowRadius: 5,
            shadowOffset: { height: -1, width: 0 },
            elevation: 2
        },
        bottom: {
            shadowColor: colors_1.default.grey40,
            shadowOpacity: 0.18,
            shadowRadius: 5,
            shadowOffset: { height: 1, width: 0 },
            elevation: 2
        }
    },
    sh20: {
        top: {
            shadowColor: colors_1.default.grey30,
            shadowOpacity: 0.2,
            shadowRadius: 10,
            shadowOffset: { height: -2, width: 0 },
            elevation: 3
        },
        bottom: {
            shadowColor: colors_1.default.grey30,
            shadowOpacity: 0.2,
            shadowRadius: 10,
            shadowOffset: { height: 2, width: 0 },
            elevation: 3
        }
    },
    sh30: {
        top: {
            shadowColor: colors_1.default.grey30,
            shadowOpacity: 0.2,
            shadowRadius: 12,
            shadowOffset: { height: -5, width: 0 },
            elevation: 4
        },
        bottom: {
            shadowColor: colors_1.default.grey30,
            shadowOpacity: 0.2,
            shadowRadius: 12,
            shadowOffset: { height: 5, width: 0 },
            elevation: 4
        }
    },
    /* Old Presets */
    white10: {
        top: { shadowColor: colors_1.default.dark20, shadowOpacity: 0.04, shadowRadius: 13.5 },
        bottom: { shadowColor: colors_1.default.dark10, shadowOpacity: 0.09, shadowRadius: 2, shadowOffset: { height: 2, width: 0 } }
    },
    white20: {
        top: { shadowColor: colors_1.default.dark20, shadowOpacity: 0.06, shadowRadius: 15 },
        bottom: { shadowColor: colors_1.default.dark10, shadowOpacity: 0.04, shadowRadius: 3, shadowOffset: { height: 3, width: 0 } }
    },
    white30: {
        top: { shadowColor: colors_1.default.dark20, shadowOpacity: 0.05, shadowRadius: 12 },
        bottom: { shadowColor: colors_1.default.dark10, shadowOpacity: 0.06, shadowRadius: 4.5, shadowOffset: { height: 4, width: 0 } }
    },
    white40: {
        top: { shadowColor: colors_1.default.dark20, shadowOpacity: 0.06, shadowRadius: 18.5 },
        bottom: { shadowColor: colors_1.default.dark10, shadowOpacity: 0.07, shadowRadius: 8.5, shadowOffset: { height: 5, width: 0 } }
    },
    dark10: {
        top: { shadowColor: colors_1.default.dark20, shadowOpacity: 0.02, shadowRadius: 13.5 },
        bottom: { shadowColor: colors_1.default.dark10, shadowOpacity: 0.03, shadowRadius: 2, shadowOffset: { height: 2, width: 0 } }
    },
    dark20: {
        top: { shadowColor: colors_1.default.dark20, shadowOpacity: 0.03, shadowRadius: 15 },
        bottom: { shadowColor: colors_1.default.dark10, shadowOpacity: 0.02, shadowRadius: 3, shadowOffset: { height: 2.5, width: 0 } }
    },
    dark30: {
        top: { shadowColor: colors_1.default.dark10, shadowOpacity: 0.04, shadowRadius: 3.5, shadowOffset: { height: 3, width: 0 } },
        bottom: { shadowColor: colors_1.default.dark20, shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { height: 7, width: 0 } }
    },
    dark40: {
        top: { shadowColor: colors_1.default.dark10, shadowOpacity: 0.04, shadowRadius: 4.5, shadowOffset: { height: 5, width: 0 } },
        bottom: { shadowColor: colors_1.default.dark20, shadowOpacity: 0.04, shadowRadius: 9, shadowOffset: { height: 10, width: 0 } }
    },
    /**
     * Load custom set of shadows
     * arguments:
     * shadows - map of keys and values
     * e.g
     * dark40: {
     *   top: {shadowColor: Colors.dark10, shadowOpacity: 0.04, shadowRadius: 4.5, shadowOffset: {height: 5, width: 0}},
     *   bottom: {shadowColor: Colors.dark20, shadowOpacity: 0.04, shadowRadius: 9, shadowOffset: {height: 10, width: 0}},
     * }
     */
    loadShadows: function (shadows) {
        var _this = this;
        lodash_1.default.forEach(shadows, function (value, key) {
            //@ts-ignore
            _this[key] = value;
        });
    }
};
exports.default = Shadows;
