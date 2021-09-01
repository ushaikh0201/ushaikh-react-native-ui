"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var view_1 = __importDefault(require("../view"));
var text_1 = __importDefault(require("../text"));
var image_1 = __importDefault(require("../image"));
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var new_1 = require("../../commons/new");
var colors_1 = __importDefault(require("../../style/colors"));
var borderRadiuses_1 = __importDefault(require("../../style/borderRadiuses"));
var spacings_1 = __importDefault(require("../../style/spacings"));
var WizardStates_1 = require("./WizardStates");
/**
 * @description: WizardStep Component: a wizard presents a series of steps in  prescribed order
 * that the user needs to complete in order to accomplish a goal (e.g. purchase a product).
 *
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/WizardScreen.tsx
 * @notes: Use Wizard with nested Wizard.Step(s) to achieve the desired result.
 */
var WizardStep = /** @class */ (function (_super) {
    __extends(WizardStep, _super);
    function WizardStep() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WizardStep.prototype.getProps = function () {
        var props = this.props;
        var state = props.state, propsActiveConfig = props.activeConfig, index = props.index, activeIndex = props.activeIndex;
        var config = WizardStates_1.StatesConfig[state];
        var activeConfig = index === activeIndex ? propsActiveConfig : {};
        return __assign(__assign(__assign({}, config), props), activeConfig);
    };
    WizardStep.prototype.getAccessibilityLabel = function () {
        var _a = this.props, index = _a.index, label = _a.label, state = _a.state;
        var config = WizardStates_1.StatesConfig[state];
        var extraInfo = (config === null || config === void 0 ? void 0 : config.accessibilityInfo) || '';
        return "Step " + (index + 1) + ", " + label + ", " + extraInfo;
    };
    WizardStep.prototype.renderCircle = function (props) {
        var testID = props.testID, index = props.index, activeIndex = props.activeIndex, onPress = props.onPress, indexLabelStyle = props.indexLabelStyle, circleSize = props.circleSize, color = props.color, _a = props.circleColor, circleColor = _a === void 0 ? color : _a, circleBackgroundColor = props.circleBackgroundColor, icon = props.icon, enabled = props.enabled;
        var hitSlopSize = spacings_1.default.s2;
        return (<touchableOpacity_1.default testID={testID + ".circle"} style={[
                styles.circle,
                !!circleSize && { width: circleSize, height: circleSize },
                { borderColor: circleColor, backgroundColor: circleBackgroundColor }
            ]} onPress={enabled ? onPress : undefined} hitSlop={{ top: hitSlopSize, bottom: hitSlopSize, left: hitSlopSize, right: hitSlopSize }} disabled={!enabled} accessibilityLabel={this.getAccessibilityLabel()}>
        {index === activeIndex || lodash_1.default.isUndefined(icon) ? (<text_1.default text80 testID={testID + ".index"} style={[{ color: color }, indexLabelStyle]}>
            {index + 1}
          </text_1.default>) : (<image_1.default testID={testID + ".image"} source={icon} tintColor={color}/>)}
      </touchableOpacity_1.default>);
    };
    WizardStep.prototype.render = function () {
        var props = this.getProps();
        var testID = props.testID, label = props.label, labelStyle = props.labelStyle, index = props.index, activeIndex = props.activeIndex, maxWidth = props.maxWidth, connectorStyle = props.connectorStyle;
        return (<view_1.default testID={testID} row center flex={index !== activeIndex}>
        {index > activeIndex && <view_1.default flex style={[styles.connector, connectorStyle]}/>}
        {this.renderCircle(props)}
        {index === activeIndex && (<text_1.default text80 testID={testID + ".label"} numberOfLines={1} style={[styles.label, { maxWidth: maxWidth }, labelStyle]} accessible={false}>
            {label}
          </text_1.default>)}
        {index < activeIndex && <view_1.default flex style={[styles.connector, connectorStyle]}/>}
      </view_1.default>);
    };
    WizardStep.displayName = 'Wizard.Step';
    return WizardStep;
}(react_1.Component));
exports.default = new_1.asBaseComponent(WizardStep);
var styles = react_native_1.StyleSheet.create({
    connector: {
        borderWidth: 0.5,
        borderColor: colors_1.default.dark60
    },
    circle: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadiuses_1.default.br100,
        borderWidth: 1
    },
    label: {
        marginHorizontal: 8,
        color: colors_1.default.dark20
    }
});
