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
var style_1 = require("../../style");
var Constants_1 = __importDefault(require("../../helpers/Constants"));
var modifiers_1 = require("../../commons/modifiers");
var new_1 = require("../../commons/new");
var services_1 = require("../../services");
var modal_1 = __importDefault(require("../modal"));
var view_1 = __importDefault(require("../view"));
var panListenerView_1 = __importDefault(require("../panningViews/panListenerView"));
var DialogDismissibleView_1 = __importDefault(require("./DialogDismissibleView"));
var OverlayFadingBackground_1 = __importDefault(require("./OverlayFadingBackground"));
var panningProvider_1 = __importDefault(require("../panningViews/panningProvider"));
var DEFAULT_OVERLAY_BACKGROUND_COLOR = style_1.Colors.rgba(style_1.Colors.dark10, 0.6);
/**
 * @description: Dialog component for displaying custom content inside a popup dialog
 * @notes: Use alignment modifiers to control the dialog position
 * (top, bottom, centerV, centerH, etc... by default the dialog is aligned to center)
 * @modifiers: alignment
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DialogScreen.js
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Dialog/Dialog.gif?raw=true
 */
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog(props) {
        var _this = _super.call(this, props) || this;
        _this.onOrientationChange = function () {
            var orientationKey = Constants_1.default.orientation;
            if (_this.state.orientationKey !== orientationKey) {
                _this.setState({ orientationKey: orientationKey });
            }
        };
        // TODO: revert adding this workaround once RN fixes https://github.com/facebook/react-native/issues/29455
        _this.onFadeDone = function () {
            if (!_this.state.modalVisibility) {
                setTimeout(function () {
                    var _a, _b, _c, _d;
                    (_b = (_a = _this.props).onDialogDismissed) === null || _b === void 0 ? void 0 : _b.call(_a, _this.props);
                    (_d = (_c = _this.props).onModalDismissed) === null || _d === void 0 ? void 0 : _d.call(_c, _this.props);
                }, 100);
            }
        };
        _this._onDismiss = function () {
            _this.setState({ modalVisibility: false, fadeOut: false }, function () {
                var _a, _b;
                var props = _this.props;
                if (props.visible) {
                    (_a = props.onDismiss) === null || _a === void 0 ? void 0 : _a.call(props, props);
                }
                // Parity with iOS Modal's onDismiss
                if (Constants_1.default.isAndroid) {
                    (_b = props.onDialogDismissed) === null || _b === void 0 ? void 0 : _b.call(props, props);
                }
            });
        };
        _this.onDismiss = function () {
            var fadeOut = Constants_1.default.isIOS && _this.props.visible;
            if (fadeOut) {
                _this.setState({ fadeOut: fadeOut }, _this._onDismiss);
            }
            else {
                _this._onDismiss();
            }
        };
        _this.onModalDismissed = function () {
            var _a, _b, _c, _d;
            (_b = (_a = _this.props).onDialogDismissed) === null || _b === void 0 ? void 0 : _b.call(_a, _this.props);
            (_d = (_c = _this.props).onModalDismissed) === null || _d === void 0 ? void 0 : _d.call(_c, _this.props);
        };
        _this.hideDialogView = function () {
            _this.setState({ dialogVisibility: false });
        };
        _this.renderPannableHeader = function (directions) {
            var _a = _this.props, renderPannableHeader = _a.renderPannableHeader, pannableHeaderProps = _a.pannableHeaderProps;
            if (renderPannableHeader) {
                return <panListenerView_1.default directions={directions}>{renderPannableHeader(pannableHeaderProps)}</panListenerView_1.default>;
            }
        };
        _this.getContainerType = function () {
            var _a = _this.props, panDirection = _a.panDirection, renderPannableHeader = _a.renderPannableHeader;
            if (!panDirection || renderPannableHeader) {
                return view_1.default;
            }
            return panListenerView_1.default;
        };
        _this.renderDialogView = function () {
            var _a = _this.props, children = _a.children, _b = _a.panDirection, panDirection = _b === void 0 ? panningProvider_1.default.Directions.DOWN : _b, containerStyle = _a.containerStyle, testID = _a.testID;
            var dialogVisibility = _this.state.dialogVisibility;
            var Container = _this.getContainerType();
            return (<view_1.default testID={testID} style={[_this.styles.dialogViewSize]} pointerEvents="box-none">
        <panningProvider_1.default>
          <DialogDismissibleView_1.default direction={panDirection} visible={dialogVisibility} onDismiss={_this.onDismiss} containerStyle={_this.styles.flexType} style={_this.styles.flexType}>
            <Container directions={[panDirection]} style={[_this.styles.overflow, _this.styles.flexType, containerStyle]}>
              {_this.renderPannableHeader([panDirection])}
              {children}
            </Container>
          </DialogDismissibleView_1.default>
        </panningProvider_1.default>
      </view_1.default>);
        };
        // TODO: renderOverlay {_.invoke(this.props, 'renderOverlay')}
        _this.renderDialogContainer = function () {
            var _a = _this.state, modalVisibility = _a.modalVisibility, dialogVisibility = _a.dialogVisibility, fadeOut = _a.fadeOut;
            var _b = _this.props, useSafeArea = _b.useSafeArea, bottom = _b.bottom, overlayBackgroundColor = _b.overlayBackgroundColor, testID = _b.testID;
            var addBottomSafeArea = Constants_1.default.isIphoneX && (useSafeArea && bottom);
            var bottomInsets = Constants_1.default.getSafeAreaInsets().bottom - 8; // TODO: should this be here or in the input style?
            var onFadeDone = Constants_1.default.isIOS ? _this.onFadeDone : undefined;
            return (<view_1.default useSafeArea={useSafeArea} style={[_this.styles.centerHorizontal, _this.styles.alignments, _this.styles.container]} pointerEvents="box-none">
        <OverlayFadingBackground_1.default testID={testID + ".overlayFadingBackground"} modalVisibility={modalVisibility} dialogVisibility={dialogVisibility} overlayBackgroundColor={overlayBackgroundColor} onFadeDone={onFadeDone} fadeOut={fadeOut}/>
        {_this.renderDialogView()}
        {addBottomSafeArea && <view_1.default style={{ marginTop: bottomInsets }}/>}
      </view_1.default>);
        };
        _this.render = function () {
            var _a = _this.state, orientationKey = _a.orientationKey, modalVisibility = _a.modalVisibility;
            var _b = _this.props, testID = _b.testID, supportedOrientations = _b.supportedOrientations, accessibilityLabel = _b.accessibilityLabel, ignoreBackgroundPress = _b.ignoreBackgroundPress;
            var onBackgroundPress = !ignoreBackgroundPress ? _this.hideDialogView : undefined;
            return (<modal_1.default key={orientationKey} testID={testID + ".modal"} transparent visible={modalVisibility} animationType={'none'} onBackgroundPress={onBackgroundPress} onRequestClose={onBackgroundPress} 
            // onDismiss={this.onModalDismissed}
            supportedOrientations={supportedOrientations} accessibilityLabel={accessibilityLabel}>
        {_this.renderDialogContainer()}
      </modal_1.default>);
        };
        _this.state = {
            alignments: modifiers_1.extractAlignmentsValues(props),
            orientationKey: Constants_1.default.orientation,
            modalVisibility: props.visible,
            dialogVisibility: props.visible
        };
        _this.styles = createStyles(_this.props);
        _this.setAlignment();
        if (!lodash_1.default.isUndefined(props.onModalDismissed)) {
            services_1.LogService.deprecationWarn({ component: 'Dialog', oldProp: 'onModalDismissed', newProp: 'onDialogDismissed' });
        }
        return _this;
    }
    Dialog.prototype.componentDidMount = function () {
        Constants_1.default.addDimensionsEventListener(this.onOrientationChange);
    };
    Dialog.prototype.componentWillUnmount = function () {
        Constants_1.default.removeDimensionsEventListener(this.onOrientationChange);
    };
    Dialog.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        var nexVisible = nextProps.visible;
        var visible = this.props.visible;
        if (nexVisible && !visible) {
            this.setState({ modalVisibility: true, dialogVisibility: true });
        }
        else if (visible && !nexVisible) {
            this.hideDialogView();
        }
    };
    Dialog.prototype.setAlignment = function () {
        var alignments = this.state.alignments;
        if (lodash_1.default.isEmpty(alignments)) {
            this.styles.alignments = this.styles.centerContent;
        }
        else {
            this.styles.alignments = alignments;
        }
    };
    Dialog.displayName = 'Dialog';
    Dialog.defaultProps = {
        overlayBackgroundColor: DEFAULT_OVERLAY_BACKGROUND_COLOR
    };
    return Dialog;
}(react_1.Component));
function createStyles(props) {
    var _a = props.width, width = _a === void 0 ? '90%' : _a, height = props.height;
    var flexType = height ? { flex: 1 } : { flex: 0 };
    return react_native_1.StyleSheet.create({
        dialogViewSize: { width: width, height: height },
        flexType: flexType,
        container: {
            flex: 1
        },
        centerHorizontal: {
            alignItems: 'center'
        },
        centerContent: {
            justifyContent: 'center'
        },
        overflow: {
            overflow: 'hidden'
        }
    });
}
exports.default = new_1.asBaseComponent(Dialog);
