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
var helpers_1 = require("../../helpers");
var style_1 = require("../../style");
var new_1 = require("../../commons/new");
var dialog_1 = __importDefault(require("../dialog"));
var view_1 = __importDefault(require("../view"));
var text_1 = __importDefault(require("../text"));
var image_1 = __importDefault(require("../image"));
//@ts-ignore
var listItem_1 = __importDefault(require("../listItem"));
var panningProvider_1 = __importDefault(require("../panningViews/panningProvider"));
var VERTICAL_PADDING = 8;
/**
 * @description: Cross platform Action Sheet, with a support for native iOS solution
 * @gif: https://media.giphy.com/media/l0HUpXOR6RqB2ct5S/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ActionSheetScreen.tsx
 */
var ActionSheet = /** @class */ (function (_super) {
    __extends(ActionSheet, _super);
    function ActionSheet(props) {
        var _this = _super.call(this, props) || this;
        _this.handleRenderIcon = function (option) {
            // @ts-ignore
            var source = option.icon;
            if (!source) {
                source = lodash_1.default.isFunction(option.iconSource) ? option.iconSource() : option.iconSource;
            }
            return source && _this.renderIcon(source);
        };
        _this.onOptionPress = _this.onOptionPress.bind(_this);
        _this.renderAction = _this.renderAction.bind(_this);
        return _this;
    }
    ActionSheet.prototype.componentDidUpdate = function (prevProps) {
        var useNativeIOS = this.props.useNativeIOS;
        var wasVisible = prevProps.visible;
        var willBeVisible = this.props.visible;
        if (!wasVisible && willBeVisible && useNativeIOS && helpers_1.Constants.isIOS) {
            var _a = this.props, title = _a.title, message = _a.message, cancelButtonIndex = _a.cancelButtonIndex, destructiveButtonIndex = _a.destructiveButtonIndex, options = _a.options, showCancelButton = _a.showCancelButton;
            var optionsArray = options !== undefined ? options : [];
            var cancelBtnIndex = cancelButtonIndex;
            if (showCancelButton) {
                optionsArray.push({ label: 'Cancel' });
                cancelBtnIndex = optionsArray.length - 1;
            }
            react_native_1.ActionSheetIOS.showActionSheetWithOptions({
                title: title,
                message: message,
                options: optionsArray.map(function (option) { return (option === null || option === void 0 ? void 0 : option.label) || ''; }),
                cancelButtonIndex: cancelBtnIndex,
                destructiveButtonIndex: destructiveButtonIndex
            }, this.onOptionPress);
        }
    };
    ActionSheet.prototype.onOptionPress = function (optionIndex) {
        var _a, _b, _c, _d, _e;
        (_c = (_a = this.props.options) === null || _a === void 0 ? void 0 : (_b = _a[optionIndex]).onPress) === null || _c === void 0 ? void 0 : _c.call(_b);
        (_e = (_d = this.props).onDismiss) === null || _e === void 0 ? void 0 : _e.call(_d);
    };
    ActionSheet.prototype.renderIcon = function (iconSource) {
        return <image_1.default source={iconSource} resizeMode={'contain'} style={{ width: 20, height: 20, marginRight: 16 }}/>;
    };
    ActionSheet.prototype.renderAction = function (option, index) {
        var _this = this;
        return (<listItem_1.default style={{ backgroundColor: 'transparent' }} height={48} key={index} testID={option.testID} onPress={function () { return _this.onOptionPress(index); }} 
        // @ts-expect-error
        activeBackgroundColor={style_1.Colors.dark80}>
        <view_1.default row paddingL-16 flex centerV>
          {this.handleRenderIcon(option)}
          <text_1.default text70 dark10 numberOfLines={1}>
            {option.label}
          </text_1.default>
        </view_1.default>
      </listItem_1.default>);
    };
    ActionSheet.prototype.renderActions = function () {
        var _this = this;
        var _a = this.props, title = _a.title, options = _a.options, cancelButtonIndex = _a.cancelButtonIndex, renderAction = _a.renderAction, optionsStyle = _a.optionsStyle;
        var optionsToRender = lodash_1.default.filter(options, function (_option, index) { return index !== cancelButtonIndex; });
        return (<view_1.default style={[lodash_1.default.isEmpty(title) ? styles.listNoTitle : styles.listWithTitle, optionsStyle]}>
        {lodash_1.default.isFunction(renderAction)
                ? optionsToRender.map(function (option, index) { return renderAction(option, index, _this.onOptionPress); })
                : lodash_1.default.map(optionsToRender, this.renderAction)}
      </view_1.default>);
    };
    ActionSheet.prototype.renderTitle = function () {
        var title = this.props.title;
        if (!lodash_1.default.isEmpty(title)) {
            return (<view_1.default height={56} paddingL-16 centerV>
          <text_1.default dark40 text70 style={{ alignSelf: 'flex-start' }}>
            {title}
          </text_1.default>
        </view_1.default>);
        }
    };
    ActionSheet.prototype.renderSheet = function () {
        var renderTitle = this.props.renderTitle;
        var containerStyle = this.props.containerStyle;
        return (<view_1.default style={[styles.sheet, containerStyle]}>
        {lodash_1.default.isFunction(renderTitle) ? renderTitle() : this.renderTitle()}
        {this.renderActions()}
      </view_1.default>);
    };
    ActionSheet.prototype.render = function () {
        var _a = this.props, useNativeIOS = _a.useNativeIOS, visible = _a.visible, onDismiss = _a.onDismiss, dialogStyle = _a.dialogStyle, onModalDismissed = _a.onModalDismissed, testID = _a.testID, useSafeArea = _a.useSafeArea;
        if (helpers_1.Constants.isIOS && useNativeIOS) {
            return null;
        }
        return (<dialog_1.default useSafeArea={useSafeArea} testID={testID} bottom centerH width="100%" containerStyle={[styles.dialog, dialogStyle]} visible={visible} onDismiss={onDismiss} onModalDismissed={onModalDismissed} panDirection={panningProvider_1.default.Directions.DOWN}>
        {this.renderSheet()}
      </dialog_1.default>);
    };
    ActionSheet.displayName = 'ActionSheet';
    return ActionSheet;
}(react_1.Component));
exports.default = new_1.asBaseComponent(ActionSheet);
var styles = react_native_1.StyleSheet.create({
    sheet: {
        backgroundColor: style_1.Colors.white
    },
    dialog: {
        backgroundColor: style_1.Colors.white
    },
    listWithTitle: {
        paddingBottom: VERTICAL_PADDING
    },
    listNoTitle: {
        paddingTop: VERTICAL_PADDING,
        paddingBottom: VERTICAL_PADDING
    }
});
