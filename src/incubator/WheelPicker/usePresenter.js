"use strict";
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
var react_1 = __importStar(require("react"));
var lodash_1 = __importDefault(require("lodash"));
var useListMiddleIndex_1 = __importDefault(require("./helpers/useListMiddleIndex"));
var usePresenter = function (_a) {
    var initialValue = _a.initialValue, selectedValue = _a.selectedValue, children = _a.children, propItems = _a.items, itemHeight = _a.itemHeight, preferredNumVisibleRows = _a.preferredNumVisibleRows;
    var value = !lodash_1.default.isUndefined(selectedValue) ? selectedValue : initialValue;
    var extractItemsFromChildren = function () {
        var items = react_1.default.Children.map(children, function (child) {
            var childAsType = { value: child === null || child === void 0 ? void 0 : child.props.value, label: child === null || child === void 0 ? void 0 : child.props.label };
            return childAsType;
        });
        return items || [];
    };
    var items = react_1.useRef(children ? extractItemsFromChildren() : propItems).current;
    var middleIndex = useListMiddleIndex_1.default({ itemHeight: itemHeight, listSize: items.length });
    var getSelectedValueIndex = function () {
        var _a;
        if (lodash_1.default.isString(value) || lodash_1.default.isNumber(value)) {
            return lodash_1.default.findIndex(items, { value: value });
        }
        return lodash_1.default.findIndex(items, { value: (_a = (value)) === null || _a === void 0 ? void 0 : _a.value });
    };
    var shouldControlComponent = function (offset) {
        if (!lodash_1.default.isUndefined(selectedValue)) {
            return offset >= 0 && selectedValue !== getRowItemAtOffset(offset).value;
        }
        return false;
    };
    var getRowItemAtOffset = function (offset) {
        var index = middleIndex(offset);
        var value = items[index].value;
        return { index: index, value: value };
    };
    return {
        shouldControlComponent: shouldControlComponent,
        index: getSelectedValueIndex(),
        items: items,
        height: itemHeight * preferredNumVisibleRows,
        getRowItemAtOffset: getRowItemAtOffset
    };
};
exports.default = usePresenter;
