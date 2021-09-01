"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importDefault(require("react"));
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../view"));
var incubator_1 = require("../../incubator");
/**
 * @description: SectionsWheelPicker component for presenting set of wheelPickers
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SectionsWheelPickerScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/SectionsWheelPicker/SectionsWheelPicker.gif?raw=true
 */
var SectionsWheelPicker = function (props) {
    var sections = props.sections, itemHeight = props.itemHeight, numberOfVisibleRows = props.numberOfVisibleRows, activeTextColor = props.activeTextColor, inactiveTextColor = props.inactiveTextColor, textStyle = props.textStyle, testID = props.testID;
    var wheelPickerProps = {
        itemHeight: itemHeight,
        numberOfVisibleRows: numberOfVisibleRows,
        activeTextColor: activeTextColor,
        inactiveTextColor: inactiveTextColor,
        textStyle: textStyle
    };
    var renderSections = function () {
        return lodash_1.default.map(sections, function (section, index) {
            return <incubator_1.WheelPicker key={index} testID={testID + "." + index} {...wheelPickerProps} {...section}/>;
        });
    };
    return (<view_1.default row centerH testID={testID}>
      {renderSections()}
    </view_1.default>);
};
SectionsWheelPicker.displayName = 'SectionsWheelPicker';
exports.default = new_1.asBaseComponent(SectionsWheelPicker);
