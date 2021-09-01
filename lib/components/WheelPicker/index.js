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
var WheelPickerItem_1 = __importDefault(require("./WheelPickerItem"));
var helpers_1 = require("../../../src/helpers");
var style_1 = require("../../../src/style");
var optionalDependencies_1 = require("../../../src/optionalDependencies");
var Picker = (optionalDependencies_1.PickerPackage === null || optionalDependencies_1.PickerPackage === void 0 ? void 0 : optionalDependencies_1.PickerPackage.Picker) || (optionalDependencies_1.CommunityPickerPackage === null || optionalDependencies_1.CommunityPickerPackage === void 0 ? void 0 : optionalDependencies_1.CommunityPickerPackage.Picker) || (function () { return null; });
if (!optionalDependencies_1.PickerPackage) {
    if (optionalDependencies_1.CommunityPickerPackage) {
        console.warn("RNUILib Picker will soon migrate to use \"@react-native-picker/picker\" package instead of '@react-native-community/picker'");
    }
    else {
        console.error("RNUILib Picker requires installing \"@react-native-picker/picker\" dependency");
    }
}
var WheelPickerNative = react_native_1.requireNativeComponent('WheelPicker');
var WheelPicker = /** @class */ (function (_super) {
    __extends(WheelPicker, _super);
    function WheelPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            items: _this.getItems()
        };
        _this.onLogReceived = function (event) {
            // @ts-expect-error
            console[event.LogType](event.TAG, event.text);
        };
        _this.onValueChange = _this.onValueChange.bind(_this); //eslint-disable-line
        _this.getItems();
        react_native_1.DeviceEventEmitter.addListener('log', _this.onLogReceived); // TODO: consider moving to a more generic place (base class?)
        return _this;
    }
    WheelPicker.prototype.onValueChange = function (event) {
        var index = event.nativeEvent.itemIndex;
        var onValueChange = this.props.onValueChange;
        if (onValueChange) {
            var items = this.state.items;
            onValueChange(items[index].value, index);
        }
    };
    WheelPicker.prototype.getItems = function () {
        var children = this.props.children;
        var items = lodash_1.default.map(react_1.default.Children.toArray(children), function (child) { return ({
            //@ts-expect-error
            value: child.props.value,
            //@ts-expect-error
            label: child.props.label
        }); });
        return items;
    };
    WheelPicker.prototype.getInitialIndex = function () {
        var items = this.state.items;
        var selectedValue = this.props.selectedValue;
        return lodash_1.default.findIndex(items, { value: selectedValue });
    };
    WheelPicker.prototype.extractLabelsFromItems = function () {
        return lodash_1.default.map(this.state.items, 'label');
    };
    WheelPicker.prototype.render = function () {
        var _a = this.props, style = _a.style, color = _a.color, labelStyle = _a.labelStyle, itemHeight = _a.itemHeight;
        return (<react_native_1.View collapsable={false} style={styles.container}>
        <WheelPickerNative 
        // @ts-expect-error
        data={this.extractLabelsFromItems()} initialIndex={this.getInitialIndex()} onChange={this.onValueChange} style={[styles.wheelPicker, style]} color={color} labelColor={(labelStyle === null || labelStyle === void 0 ? void 0 : labelStyle.color) || color} fontSize={labelStyle === null || labelStyle === void 0 ? void 0 : labelStyle.fontSize} itemHeight={itemHeight} fontFamily={labelStyle === null || labelStyle === void 0 ? void 0 : labelStyle.fontFamily}/>
      </react_native_1.View>);
    };
    var _a, _b;
    WheelPicker.displayName = 'WheelPicker';
    WheelPicker.defaultProps = {
        labelStyle: { fontSize: (_a = style_1.Typography.text70) === null || _a === void 0 ? void 0 : _a.fontSize, fontFamily: (_b = style_1.Typography.text70) === null || _b === void 0 ? void 0 : _b.fontFamily },
        color: style_1.Colors.primary
    };
    return WheelPicker;
}(react_1.Component));
WheelPicker.Item = WheelPickerItem_1.default;
var styles = react_native_1.StyleSheet.create({
    container: {
        overflow: 'hidden'
    },
    wheelPicker: {
        width: 200,
        height: 200
    }
});
exports.default = helpers_1.Constants.isAndroid ? WheelPicker : Picker;
