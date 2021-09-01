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
exports.WizardStepStates = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var view_1 = __importDefault(require("../view"));
var new_1 = require("../../commons/new");
var Constants_1 = __importDefault(require("../../helpers/Constants"));
var colors_1 = __importDefault(require("../../style/colors"));
var shadows_1 = __importDefault(require("../../style/shadows"));
var WizardStep_1 = __importDefault(require("./WizardStep"));
var WizardStates_1 = require("./WizardStates");
var types_1 = require("./types");
Object.defineProperty(exports, "WizardStepStates", { enumerable: true, get: function () { return types_1.WizardStepStates; } });
/**
 * @description: Wizard Component: a wizard presents a series of steps in  prescribed order
 * that the user needs to complete in order to accomplish a goal (e.g. purchase a product).
 *
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/WizardScreen.tsx
 * @notes: Use Wizard with nested Wizard.Step(s) to achieve the desired result.
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Wizard/Wizard.gif?raw=true
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Wizard/WizardPresets.png?raw=true
 */
var Wizard = /** @class */ (function (_super) {
    __extends(Wizard, _super);
    function Wizard(props) {
        var _this = _super.call(this, props) || this;
        _this.onOrientationChange = function () {
            var maxWidth = _this.getMaxWidth();
            if (_this.state.maxWidth !== maxWidth) {
                _this.setState({ maxWidth: maxWidth });
            }
        };
        _this.state = {
            maxWidth: _this.getMaxWidth()
        };
        return _this;
    }
    Wizard.prototype.componentDidMount = function () {
        Constants_1.default.addDimensionsEventListener(this.onOrientationChange);
    };
    Wizard.prototype.componentWillUnmount = function () {
        Constants_1.default.removeDimensionsEventListener(this.onOrientationChange);
    };
    Wizard.prototype.getMaxWidth = function () {
        if (Constants_1.default.isTablet) {
            if (Constants_1.default.isLandscape) {
                return Constants_1.default.screenWidth * 0.2;
            }
            else {
                return Constants_1.default.screenWidth * 0.26;
            }
        }
        else {
            return Constants_1.default.screenWidth * 0.4;
        }
    };
    Wizard.prototype.renderChildren = function () {
        var _this = this;
        var maxWidth = this.state.maxWidth;
        var _a = this.props, activeIndex = _a.activeIndex, _b = _a.activeConfig, activeConfig = _b === void 0 ? WizardStates_1.StatesConfig.active : _b, testID = _a.testID;
        var children = react_1.default.Children.map(this.props.children, function (child, index) {
            // @ts-expect-error
            return react_1.default.cloneElement(child, {
                testID: testID + ".step" + index,
                maxWidth: maxWidth,
                index: index,
                activeIndex: activeIndex,
                activeConfig: activeConfig,
                onPress: function () {
                    var _a, _b;
                    (_b = (_a = _this.props).onActiveIndexChanged) === null || _b === void 0 ? void 0 : _b.call(_a, index);
                }
            });
        });
        return children;
    };
    Wizard.prototype.render = function () {
        var _a = this.props, testID = _a.testID, containerStyle = _a.containerStyle;
        return (<view_1.default testID={testID} style={[styles.container, containerStyle]}>
        {this.renderChildren()}
      </view_1.default>);
    };
    Wizard.displayName = 'Wizard';
    return Wizard;
}(react_1.Component));
Wizard.Step = WizardStep_1.default;
Wizard.States = types_1.WizardStepStates;
exports.default = new_1.asBaseComponent(Wizard);
var styles = react_native_1.StyleSheet.create({
    container: __assign({ backgroundColor: colors_1.default.white, paddingVertical: 10, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }, react_native_1.Platform.select({
        ios: __assign({}, shadows_1.default.white30.bottom),
        android: {
            elevation: 2
        }
    }))
});
