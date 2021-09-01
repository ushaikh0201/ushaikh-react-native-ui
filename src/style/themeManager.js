"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeManager = void 0;
var lodash_1 = __importDefault(require("lodash"));
var colors_1 = __importDefault(require("./colors"));
var ThemeManager = /** @class */ (function () {
    function ThemeManager() {
        this.theme = {
            primaryColor: colors_1.default.primary,
            CTA: {
                textColor: colors_1.default.white,
                disabledColor: colors_1.default.dark60,
                backgroundColor: colors_1.default.primary
            },
            titleColor: colors_1.default.dark10,
            subtitleColor: colors_1.default.dark40,
            dividerColor: colors_1.default.dark70,
            components: {} // leave this key and delete the rest on V6
        };
        this.forcedTheme = {
            components: {}
        };
    }
    //TODO: deprecate on V6
    ThemeManager.prototype.setTheme = function (overrides) {
        console.warn('ThemeManager.setTheme() is deprecated. Please remove usage before next uilib major version update. Consider using ThemeManager.setComponentTheme instead');
        this.theme = lodash_1.default.merge(this.theme, overrides);
    };
    ThemeManager.prototype.getTheme = function () {
        return this.theme;
    };
    ThemeManager.prototype.setItem = function (key, value) {
        if (key === 'components') {
            throw new Error('Overriding the "components" key is not possible.');
        }
        // this.theme[key] = value;
        lodash_1.default.set(this.theme, key, value);
    };
    ThemeManager.prototype.getItem = function (key) {
        // return this.theme[key];
        return lodash_1.default.get(this.theme, key);
    };
    ThemeManager.prototype.setComponentTheme = function (componentName, overrides) {
        if (lodash_1.default.isFunction(overrides)) {
            this.theme.components[componentName] = overrides;
        }
        else {
            this.theme.components[componentName] = lodash_1.default.cloneDeep(overrides);
        }
    };
    ThemeManager.prototype.setComponentForcedTheme = function (componentName, overrides) {
        if (lodash_1.default.isFunction(overrides)) {
            this.forcedTheme.components[componentName] = overrides;
        }
        else {
            this.forcedTheme.components[componentName] = lodash_1.default.cloneDeep(overrides);
        }
    };
    Object.defineProperty(ThemeManager.prototype, "components", {
        get: function () {
            return this.theme.components;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ThemeManager.prototype, "forcedThemeComponents", {
        get: function () {
            return this.forcedTheme.components;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ThemeManager.prototype, "primaryColor", {
        // TODO: remove getters below
        get: function () {
            return this.theme.primaryColor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ThemeManager.prototype, "CTATextColor", {
        get: function () {
            return this.theme.CTA.textColor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ThemeManager.prototype, "CTADisabledColor", {
        get: function () {
            return this.theme.CTA.disabledColor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ThemeManager.prototype, "CTABackgroundColor", {
        get: function () {
            return this.theme.CTA.backgroundColor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ThemeManager.prototype, "titleColor", {
        get: function () {
            return this.theme.titleColor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ThemeManager.prototype, "subtitleColor", {
        get: function () {
            return this.theme.subtitleColor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ThemeManager.prototype, "dividerColor", {
        get: function () {
            return this.theme.dividerColor;
        },
        enumerable: false,
        configurable: true
    });
    return ThemeManager;
}());
exports.ThemeManager = ThemeManager;
exports.default = new ThemeManager();
