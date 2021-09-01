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
var react_1 = __importStar(require("react"));
var touchableOpacity_1 = __importDefault(require("../../components/touchableOpacity"));
var view_1 = __importDefault(require("../../components/view"));
var modal_1 = __importDefault(require("../../components/modal"));
var dialog_1 = __importDefault(require("../../components/dialog"));
var ExpandableOverlay = function (props, ref) {
    var children = props.children, expandableContent = props.expandableContent, useDialog = props.useDialog, modalProps = props.modalProps, dialogProps = props.dialogProps, showTopBar = props.showTopBar, topBarProps = props.topBarProps, others = __rest(props, ["children", "expandableContent", "useDialog", "modalProps", "dialogProps", "showTopBar", "topBarProps"]);
    var _a = react_1.useState(false), expandableVisible = _a[0], setExpandableVisible = _a[1];
    var showExpandable = react_1.useCallback(function () { return setExpandableVisible(true); }, []);
    var hideExpandable = react_1.useCallback(function () { return setExpandableVisible(false); }, []);
    react_1.useImperativeHandle(ref, function () { return ({
        openExpandable: function () {
            showExpandable();
        },
        closeExpandable: function () {
            hideExpandable();
        }
    }); });
    var renderModal = function () {
        return (<modal_1.default {...modalProps} visible={expandableVisible} onDismiss={hideExpandable}>
        {showTopBar && <modal_1.default.TopBar onDone={hideExpandable} {...topBarProps}/>}
        {expandableContent}
      </modal_1.default>);
    };
    var renderDialog = function () {
        return (<dialog_1.default {...dialogProps} visible={expandableVisible} onDismiss={hideExpandable}>
        {expandableContent}
      </dialog_1.default>);
    };
    return (<touchableOpacity_1.default {...others} onPress={showExpandable}>
      <view_1.default pointerEvents="none">{children}</view_1.default>
      {useDialog ? renderDialog() : renderModal()}
    </touchableOpacity_1.default>);
};
exports.default = react_1.forwardRef(ExpandableOverlay);
