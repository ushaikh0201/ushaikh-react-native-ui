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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlteredModifiersOptions = exports.generateModifiersStyle = exports.getThemeProps = exports.extractComponentProps = exports.extractOwnProps = exports.extractModifierProps = exports.extractBorderRadiusValue = exports.extractAnimationProps = exports.extractAccessibilityProps = exports.extractFlexStyle = exports.extractPositionStyle = exports.extractAlignmentsValues = exports.extractMarginValues = exports.extractPaddingValues = exports.extractTypographyValue = exports.extractBackgroundColorValue = exports.extractColorValue = exports.POSITION_KEY_PATTERN = exports.ALIGNMENT_KEY_PATTERN = exports.MARGIN_KEY_PATTERN = exports.PADDING_KEY_PATTERN = exports.FLEX_KEY_PATTERN = void 0;
var lodash_1 = __importDefault(require("lodash"));
var react_native_1 = require("react-native");
var style_1 = require("../style");
exports.FLEX_KEY_PATTERN = /^flex(G|S)?(-\d*)?$/;
exports.PADDING_KEY_PATTERN = new RegExp("padding[LTRBHV]?-([0-9]*|" + style_1.Spacings.getKeysPattern() + ")");
exports.MARGIN_KEY_PATTERN = new RegExp("margin[LTRBHV]?-([0-9]*|" + style_1.Spacings.getKeysPattern() + ")");
exports.ALIGNMENT_KEY_PATTERN = /(left|top|right|bottom|center|centerV|centerH|spread)/;
exports.POSITION_KEY_PATTERN = /^abs([F|L|R|T|B|V|H])?$/;
var PADDING_VARIATIONS = {
    padding: 'padding',
    paddingL: 'paddingLeft',
    paddingT: 'paddingTop',
    paddingR: 'paddingRight',
    paddingB: 'paddingBottom',
    paddingH: 'paddingHorizontal',
    paddingV: 'paddingVertical'
};
var MARGIN_VARIATIONS = {
    margin: 'margin',
    marginL: 'marginLeft',
    marginT: 'marginTop',
    marginR: 'marginRight',
    marginB: 'marginBottom',
    marginH: 'marginHorizontal',
    marginV: 'marginVertical'
};
var STYLE_KEY_CONVERTERS = {
    flex: 'flex',
    flexG: 'flexGrow',
    flexS: 'flexShrink'
};
function extractColorValue(props) {
    var scheme = style_1.Colors.getScheme();
    var schemeColors = style_1.Colors.schemes[scheme];
    var allColorsKeys = __spreadArray(__spreadArray([], lodash_1.default.keys(style_1.Colors)), lodash_1.default.keys(schemeColors));
    var colorPropsKeys = lodash_1.default.chain(props)
        .keys()
        .filter(function (key) { return lodash_1.default.includes(allColorsKeys, key); })
        .value();
    var colorKey = lodash_1.default.findLast(colorPropsKeys, function (colorKey) { return props[colorKey] === true; });
    return schemeColors[colorKey] || style_1.Colors[colorKey];
}
exports.extractColorValue = extractColorValue;
function extractBackgroundColorValue(props) {
    var backgroundColor;
    var scheme = style_1.Colors.getScheme();
    var schemeColors = style_1.Colors.schemes[scheme];
    var keys = Object.keys(props);
    var bgProp = lodash_1.default.findLast(keys, function (prop) { return style_1.Colors.getBackgroundKeysPattern().test(prop) && !!props[prop]; });
    if (props[bgProp]) {
        var key = bgProp.replace(style_1.Colors.getBackgroundKeysPattern(), '');
        backgroundColor = schemeColors[key] || style_1.Colors[key];
    }
    return backgroundColor;
}
exports.extractBackgroundColorValue = extractBackgroundColorValue;
function extractTypographyValue(props) {
    var typographyPropsKeys = lodash_1.default.chain(props)
        .keys()
        .filter(function (key) { return style_1.Typography.getKeysPattern().test(key); })
        .value();
    var typography;
    lodash_1.default.forEach(typographyPropsKeys, function (key) {
        if (props[key] === true) {
            typography = __assign(__assign({}, typography), style_1.Typography[key]);
        }
    });
    return typography;
}
exports.extractTypographyValue = extractTypographyValue;
function extractPaddingValues(props) {
    var paddings = {};
    var paddingPropsKeys = lodash_1.default.chain(props)
        .keys()
        .filter(function (key) { return exports.PADDING_KEY_PATTERN.test(key); })
        .value();
    lodash_1.default.forEach(paddingPropsKeys, function (key) {
        if (props[key] === true) {
            var _a = key.split('-'), paddingKey = _a[0], paddingValue = _a[1];
            var paddingVariation = PADDING_VARIATIONS[paddingKey];
            if (!isNaN(Number(paddingValue))) {
                paddings[paddingVariation] = Number(paddingValue);
            }
            else if (style_1.Spacings.getKeysPattern().test(paddingValue)) {
                paddings[paddingVariation] = style_1.Spacings[paddingValue];
            }
        }
    });
    return paddings;
}
exports.extractPaddingValues = extractPaddingValues;
function extractMarginValues(props) {
    var margins = {};
    var marginPropsKeys = lodash_1.default.chain(props)
        .keys()
        .filter(function (key) { return exports.MARGIN_KEY_PATTERN.test(key); })
        .value();
    lodash_1.default.forEach(marginPropsKeys, function (key) {
        if (props[key] === true) {
            var _a = key.split('-'), marginKey = _a[0], marginValue = _a[1];
            var paddingVariation = MARGIN_VARIATIONS[marginKey];
            if (!isNaN(Number(marginValue))) {
                margins[paddingVariation] = Number(marginValue);
            }
            else if (style_1.Spacings.getKeysPattern().test(marginValue)) {
                margins[paddingVariation] = style_1.Spacings[marginValue];
            }
        }
    });
    return margins;
}
exports.extractMarginValues = extractMarginValues;
function extractAlignmentsValues(props) {
    var row = props.row, center = props.center;
    var alignments = {};
    var alignmentRules = {};
    if (row) {
        alignments.flexDirection = 'row';
        alignmentRules.justifyContent = ['left', 'right', 'centerH', 'spread'];
        alignmentRules.alignItems = ['top', 'bottom', 'centerV'];
    }
    else {
        alignmentRules.justifyContent = ['top', 'bottom', 'centerV', 'spread'];
        alignmentRules.alignItems = ['left', 'right', 'centerH'];
    }
    lodash_1.default.forEach(alignmentRules, function (positions, attribute) {
        lodash_1.default.forEach(positions, function (position) {
            if (props[position]) {
                if (lodash_1.default.includes(['top', 'left'], position)) {
                    alignments[attribute] = 'flex-start';
                }
                else if (lodash_1.default.includes(['bottom', 'right'], position)) {
                    alignments[attribute] = 'flex-end';
                }
                else if (lodash_1.default.includes(['centerH', 'centerV'], position)) {
                    alignments[attribute] = 'center';
                }
                else if (position === 'spread') {
                    alignments[attribute] = 'space-between';
                }
            }
        });
    });
    if (center) {
        alignments.justifyContent = 'center';
        alignments.alignItems = 'center';
    }
    return alignments;
}
exports.extractAlignmentsValues = extractAlignmentsValues;
function extractPositionStyle(props) {
    var POSITION_CONVERSIONS = {
        F: 'Fill',
        T: 'Top',
        B: 'Bottom',
        L: 'Left',
        R: 'Right',
        H: 'Horizontal',
        V: 'Vertical'
    };
    var keys = Object.keys(props);
    var positionProp = lodash_1.default.findLast(keys, function (prop) { return exports.POSITION_KEY_PATTERN.test(prop) && !!props[prop]; });
    if (positionProp) {
        var positionVariationKey = lodash_1.default.split(positionProp, 'abs')[1];
        if (positionVariationKey) {
            var positionVariation = POSITION_CONVERSIONS[positionVariationKey];
            var styleKey = "absolute" + positionVariation;
            return styles[styleKey];
        }
        return styles.absolute;
    }
}
exports.extractPositionStyle = extractPositionStyle;
function extractFlexStyle(props) {
    var _a;
    var keys = Object.keys(props);
    var flexProp = keys.find(function (item) { return exports.FLEX_KEY_PATTERN.test(item); });
    if (flexProp && props[flexProp] === true) {
        var _b = flexProp.split('-'), flexKey = _b[0], flexValue = _b[1];
        var convertedFlexKey = STYLE_KEY_CONVERTERS[flexKey];
        var flexValueAsNumber = lodash_1.default.isEmpty(flexValue) ? 1 : Number(flexValue);
        return _a = {}, _a[convertedFlexKey] = flexValueAsNumber, _a;
    }
}
exports.extractFlexStyle = extractFlexStyle;
//@ts-ignore
function extractAccessibilityProps(props) {
    if (props === void 0) { props = this.props; }
    return lodash_1.default.pickBy(props, function (_value, key) {
        return /.*ccessib.*/.test(key);
    });
}
exports.extractAccessibilityProps = extractAccessibilityProps;
//@ts-ignore
function extractAnimationProps(props) {
    if (props === void 0) { props = this.props; }
    return lodash_1.default.pick(props, [
        'animation',
        'duration',
        'delay',
        'direction',
        'easing',
        'iterationCount',
        'transition',
        'onAnimationBegin',
        'onAnimationEnd',
        'useNativeDriver'
    ]);
}
exports.extractAnimationProps = extractAnimationProps;
function extractBorderRadiusValue(props) {
    var borderRadius;
    var keys = Object.keys(props);
    var radiusProp = keys.find(function (prop) { return style_1.BorderRadiuses.getKeysPattern().test(prop) && props[prop]; });
    if (radiusProp) {
        borderRadius = style_1.BorderRadiuses[radiusProp];
    }
    return borderRadius;
}
exports.extractBorderRadiusValue = extractBorderRadiusValue;
function extractModifierProps(props) {
    var patterns = [
        exports.FLEX_KEY_PATTERN,
        exports.PADDING_KEY_PATTERN,
        exports.MARGIN_KEY_PATTERN,
        exports.ALIGNMENT_KEY_PATTERN,
        style_1.Colors.getBackgroundKeysPattern()
    ];
    var modifierProps = lodash_1.default.pickBy(props, function (_value, key) {
        var isModifier = lodash_1.default.find(patterns, function (pattern) { return pattern.test(key); });
        return !!isModifier;
    });
    return modifierProps;
}
exports.extractModifierProps = extractModifierProps;
/**
 * TODO:
 * @deprecated switch to Modifiers#extractComponentProps
 */
function extractOwnProps(props, ignoreProps) {
    //@ts-ignore
    var ownPropTypes = this.propTypes;
    var ownProps = lodash_1.default.chain(props)
        .pickBy(function (_value, key) { return lodash_1.default.includes(Object.keys(ownPropTypes), key); })
        .omit(ignoreProps)
        .value();
    return ownProps;
}
exports.extractOwnProps = extractOwnProps;
function extractComponentProps(component, props, ignoreProps) {
    if (ignoreProps === void 0) { ignoreProps = []; }
    var componentPropTypes = component.propTypes;
    var componentProps = lodash_1.default.chain(props)
        .pickBy(function (_value, key) { return lodash_1.default.includes(Object.keys(componentPropTypes), key); })
        .omit(ignoreProps)
        .value();
    return componentProps;
}
exports.extractComponentProps = extractComponentProps;
//@ts-ignore
function getThemeProps(props, context) {
    if (props === void 0) { props = this.props; }
    if (context === void 0) { context = this.context; }
    //@ts-ignore
    var componentName = this.displayName || this.constructor.displayName || this.constructor.name;
    var themeProps;
    if (lodash_1.default.isFunction(style_1.ThemeManager.components[componentName])) {
        themeProps = style_1.ThemeManager.components[componentName](props, context);
    }
    else {
        themeProps = style_1.ThemeManager.components[componentName];
    }
    var forcedThemeProps;
    if (lodash_1.default.isFunction(style_1.ThemeManager.forcedThemeComponents[componentName])) {
        forcedThemeProps = style_1.ThemeManager.forcedThemeComponents[componentName](props, context);
    }
    else {
        forcedThemeProps = style_1.ThemeManager.forcedThemeComponents[componentName];
    }
    return __assign(__assign(__assign({}, themeProps), props), forcedThemeProps);
}
exports.getThemeProps = getThemeProps;
function generateModifiersStyle(options, props) {
    if (options === void 0) { options = {
        color: true,
        typography: true,
        backgroundColor: true,
        borderRadius: true,
        paddings: true,
        margins: true,
        alignments: true,
        flex: true,
        position: true
    }; }
    //@ts-ignore
    var boundProps = props || this.props;
    var style = {};
    if (options.color) {
        style.color = extractColorValue(boundProps);
    }
    if (options.typography) {
        style.typography = extractTypographyValue(boundProps);
    }
    if (options.backgroundColor) {
        style.backgroundColor = extractBackgroundColorValue(boundProps);
    }
    if (options.borderRadius) {
        style.borderRadius = extractBorderRadiusValue(boundProps);
    }
    if (options.paddings) {
        style.paddings = extractPaddingValues(boundProps);
    }
    if (options.margins) {
        style.margins = extractMarginValues(boundProps);
    }
    if (options.alignments) {
        style.alignments = extractAlignmentsValues(boundProps);
    }
    if (options.flex) {
        style.flexStyle = extractFlexStyle(boundProps);
    }
    if (options.position) {
        style.positionStyle = extractPositionStyle(boundProps);
    }
    return style;
    // clean empty objects and undefined
    // (!) This change is currently breaking UI layout for some reason - worth investigating
    // return _.omitBy(style, value => _.isUndefined(value) || (_.isPlainObject(value) && _.isEmpty(value)));
}
exports.generateModifiersStyle = generateModifiersStyle;
function getAlteredModifiersOptions(currentProps, nextProps) {
    var ignoredKeys = ['children', 'forwardedRef', 'style', 'testID'];
    var allKeys = lodash_1.default.union(__spreadArray(__spreadArray([], lodash_1.default.keys(currentProps)), lodash_1.default.keys(nextProps))).filter(function (key) { return !ignoredKeys.includes(key); });
    var changedKeys = lodash_1.default.filter(allKeys, function (key) { return !lodash_1.default.isEqual(currentProps[key], nextProps[key]); });
    var options = {};
    if (lodash_1.default.find(changedKeys, function (key) { return exports.FLEX_KEY_PATTERN.test(key); })) {
        options.flex = true;
    }
    if (lodash_1.default.find(changedKeys, function (key) { return exports.PADDING_KEY_PATTERN.test(key); })) {
        options.paddings = true;
    }
    if (lodash_1.default.find(changedKeys, function (key) { return exports.MARGIN_KEY_PATTERN.test(key); })) {
        options.margins = true;
    }
    if (lodash_1.default.find(changedKeys, function (key) { return exports.ALIGNMENT_KEY_PATTERN.test(key); })) {
        options.alignments = true;
    }
    if (lodash_1.default.find(changedKeys, function (key) { return style_1.Colors.getBackgroundKeysPattern().test(key); })) {
        options.backgroundColor = true;
    }
    if (lodash_1.default.find(changedKeys, function (key) { return exports.POSITION_KEY_PATTERN.test(key); })) {
        options.position = true;
    }
    return options;
}
exports.getAlteredModifiersOptions = getAlteredModifiersOptions;
var styles = react_native_1.StyleSheet.create({
    absolute: { position: 'absolute' },
    absoluteFill: react_native_1.StyleSheet.absoluteFillObject,
    absoluteTop: { position: 'absolute', top: 0 },
    absoluteBottom: { position: 'absolute', bottom: 0 },
    absoluteLeft: { position: 'absolute', left: 0 },
    absoluteRight: { position: 'absolute', right: 0 },
    absoluteVertical: { position: 'absolute', top: 0, bottom: 0 },
    absoluteHorizontal: { position: 'absolute', left: 0, right: 0 }
});
