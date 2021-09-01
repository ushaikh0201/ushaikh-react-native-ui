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
var react_native_1 = require("react-native");
var new_1 = require("../../commons/new");
var helpers_1 = require("../../helpers");
var assets_1 = __importDefault(require("../../assets"));
var style_1 = require("../../style");
var view_1 = __importDefault(require("../../components/view"));
var button_1 = __importDefault(require("../../components/button"));
var text_1 = __importDefault(require("../../components/text"));
var TOP_BAR_HEIGHT = helpers_1.Constants.isIOS ? 44 : 56;
var DEFAULT_BUTTON_PROPS = {
    color: style_1.Colors.primary
};
/**
 * @description: Modal.TopBar, inner component for configuring the Modal component's title, buttons and statusBar
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ModalScreen.tsx
 */
var TopBar = /** @class */ (function (_super) {
    __extends(TopBar, _super);
    function TopBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopBar.prototype.renderTopBarButton = function (_a) {
        var onPress = _a.onPress, label = _a.label, icon = _a.icon, accessibilityLabel = _a.accessibilityLabel, buttonProps = _a.buttonProps;
        if (onPress && (label || icon)) {
            // @ts-ignore
            var iconStyle = buttonProps.iconStyle, labelStyle = buttonProps.labelStyle, otherButtonProps = __rest(buttonProps, ["iconStyle", "labelStyle"]);
            return (<button_1.default link onPress={onPress} label={label} labelStyle={[styles.actionLabel, labelStyle]} iconSource={icon} iconStyle={[styles.icon, iconStyle]} {...DEFAULT_BUTTON_PROPS} accessibilityLabel={accessibilityLabel} {...otherButtonProps} hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}/>);
        }
    };
    TopBar.prototype.renderDone = function () {
        var _a = this.props, doneButtonProps = _a.doneButtonProps, doneLabel = _a.doneLabel, doneIcon = _a.doneIcon, onDone = _a.onDone;
        return this.renderTopBarButton({
            onPress: onDone,
            label: doneLabel,
            icon: doneIcon,
            accessibilityLabel: 'Done',
            buttonProps: doneButtonProps
        });
    };
    TopBar.prototype.renderCancel = function () {
        var _a = this.props, cancelButtonProps = _a.cancelButtonProps, cancelLabel = _a.cancelLabel, cancelIcon = _a.cancelIcon, onCancel = _a.onCancel;
        return this.renderTopBarButton({
            onPress: onCancel,
            label: cancelLabel,
            icon: cancelIcon,
            accessibilityLabel: 'Cancel',
            buttonProps: cancelButtonProps
        });
    };
    TopBar.prototype.render = function () {
        var _a = this.props, title = _a.title, titleStyle = _a.titleStyle, includeStatusBar = _a.includeStatusBar, containerStyle = _a.containerStyle;
        return (<view_1.default style={containerStyle}>
        {includeStatusBar && <view_1.default style={styles.statusBar}/>}
        <view_1.default style={styles.container}>
          <view_1.default row flex bottom paddingL-15 centerV>
            {this.renderCancel()}
          </view_1.default>
          <view_1.default row flex-3 bottom centerH centerV>
            <text_1.default accessible={!!title} numberOfLines={1} text70 style={[styles.title, titleStyle]}>
              {title}
            </text_1.default>
          </view_1.default>
          <view_1.default row flex bottom right paddingR-15 centerV>
            {this.renderDone()}
          </view_1.default>
        </view_1.default>
      </view_1.default>);
    };
    TopBar.displayName = 'Modal.TopBar';
    TopBar.defaultProps = {
        doneLabel: 'Save',
        cancelIcon: assets_1.default.icons.x,
        doneButtonProps: {},
        cancelButtonProps: {},
        includeStatusBar: helpers_1.Constants.isIOS
    };
    return TopBar;
}(react_1.Component));
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: TOP_BAR_HEIGHT
    },
    statusBar: {
        height: helpers_1.Constants.statusBarHeight
    },
    title: {
        fontWeight: '500'
    },
    actionLabel: __assign({}, style_1.Typography.text70),
    icon: {
        // width: 16,
        // height: 16,
        tintColor: style_1.Colors.dark10,
        marginBottom: 2
    }
});
exports.default = new_1.asBaseComponent(TopBar);
