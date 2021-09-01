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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatableManager = void 0;
var lodash_1 = __importDefault(require("lodash"));
var Animatable = __importStar(require("react-native-animatable"));
/** Animations Definitions */
var definitions = {
    itemEntrance: {
        from: { opacity: 0, translateY: 40 },
        to: { opacity: 1, translateY: 0 }
    },
    itemAddition: {
        from: { opacity: 0, scale: 0.6, translateY: -60 },
        to: { opacity: 1, scale: 1, translateY: 0 }
    },
    itemRemoval: {
        from: { opacity: 1, scale: 1, translateY: 0 },
        to: { opacity: 0, scale: 0.6, translateY: -60 }
    },
    listItemAddition: {
        from: { scaleY: 0.8, translateY: -40 },
        to: { scaleY: 1, translateY: 0 }
    }
};
var PRESETS = {
    slideInUp: {
        animation: 'slideInUp',
        easing: 'ease-out-quint',
        duration: 500,
        useNativeDriver: true
    },
    slideInDown: {
        animation: 'slideInDown',
        easing: 'ease-out-quint',
        duration: 500,
        useNativeDriver: true
    },
    fadeIn: {
        animation: 'fadeIn',
        duration: 300,
        useNativeDriver: true
    },
    fadeOut: {
        animation: 'fadeOut',
        duration: 300,
        useNativeDriver: true
    },
    fadeInRight: {
        animation: 'fadeInRight',
        easing: 'ease-out-expo',
        duration: 500,
        useNativeDriver: true
    }
};
/**
 * @description: Animatable animations and presets
 * @extendsnotes: To have access to uilib's animations, and load your custom animations (optional), call:
 * 'Animatable.initializeRegistryWithDefinitions(AnimatableManager.loadAnimationDefinitions(<OPTIONAL_CUSTOM_ANIMATION>));'
 * in your app entry point
 */
var AnimatableManager = /** @class */ (function () {
    function AnimatableManager() {
        this.presets = PRESETS;
        this.getEntranceByIndex = function (index, options) {
            if (index === void 0) { index = 0; }
            return __assign({ animation: 'itemEntrance', easing: 'ease-out-quint', duration: 600, delay: 10 + (Number(index) % 12) * 100, useNativeDriver: true }, options);
        };
        this.loadAnimationDefinitions(definitions);
    }
    AnimatableManager.prototype.loadAnimationPresets = function (animationPresets) {
        if (animationPresets) {
            this.presets = Object.assign(PRESETS, animationPresets);
        }
    };
    // NOTE: to load globally send as a parameter to Animatable.initializeRegistryWithDefinitions() call
    AnimatableManager.prototype.loadAnimationDefinitions = function (animationDefinitions) {
        if (animationDefinitions) {
            Animatable.initializeRegistryWithDefinitions(animationDefinitions); // Make available globally in uilib
            Object.assign(definitions, animationDefinitions);
            this.animations = getObjectMap(definitions);
        }
        return definitions;
    };
    // NOTE: to load globally send as a parameter to Animatable.initializeRegistryWithDefinitions() call
    AnimatableManager.prototype.loadSlideByHeightDefinitions = function (height, suffix) {
        var definition = {};
        // bottom
        definition["slideInUp_" + suffix] = {
            from: { translateY: height },
            to: { translateY: 0 }
        };
        definition["slideOutDown_" + suffix] = {
            from: { translateY: 0 },
            to: { translateY: height }
        };
        // top
        definition["slideInDown_" + suffix] = {
            from: { translateY: -height },
            to: { translateY: 0 }
        };
        definition["slideOutUp_" + suffix] = {
            from: { translateY: 0 },
            to: { translateY: -height }
        };
        // relative
        definition["slideIn_" + suffix] = {
            from: { height: 0 },
            to: { height: height }
        };
        definition["slideOut_" + suffix] = {
            from: { height: height },
            to: { height: 0 }
        };
        return this.loadAnimationDefinitions(definition);
    };
    /** Tools */
    AnimatableManager.prototype.getRandomDelay = function (delays, options) {
        if (delays === void 0) { delays = [20, 120, 220]; }
        return __assign({ animation: 'fadeInLeft', easing: 'ease-out-expo', duration: 600, delay: lodash_1.default.sample(delays), useNativeDriver: true }, options);
    };
    AnimatableManager.prototype.getZoomInSlideDown = function (index, options, zoomIndex) {
        if (index === void 0) { index = 0; }
        if (zoomIndex === void 0) { zoomIndex = 0; }
        var onAnimationEnd = options.onAnimationEnd, others = __rest(options, ["onAnimationEnd"]);
        if (index === zoomIndex) {
            return {
                animation: 'itemAddition',
                easing: 'ease-out-quart',
                duration: 600,
                useNativeDriver: true,
                onAnimationEnd: onAnimationEnd
            };
        }
        if (index > zoomIndex) {
            return __assign({ animation: 'slideInDown', easing: 'ease-out-quart', duration: 600, useNativeDriver: true }, others);
        }
    };
    AnimatableManager.prototype.getSlideInSlideDown = function (index, options, zoomIndex) {
        if (index === void 0) { index = 0; }
        if (zoomIndex === void 0) { zoomIndex = 0; }
        var onAnimationEnd = options.onAnimationEnd, others = __rest(options, ["onAnimationEnd"]);
        if (index === zoomIndex) {
            return {
                animation: 'listItemAddition',
                easing: 'ease-out-quart',
                duration: 600,
                delay: 150,
                useNativeDriver: true,
                onAnimationEnd: onAnimationEnd
            };
        }
        if (index > zoomIndex) {
            return __assign({ animation: 'slideInDown', easing: 'ease-out-quart', duration: 600, useNativeDriver: true }, others);
        }
    };
    return AnimatableManager;
}());
exports.AnimatableManager = AnimatableManager;
function getObjectMap(object) {
    var map = {};
    lodash_1.default.forEach(Object.keys(object), function (key) {
        map[key] = "" + key;
    });
    return map;
}
exports.default = new AnimatableManager();
