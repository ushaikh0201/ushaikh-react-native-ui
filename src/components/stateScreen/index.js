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
var services_1 = require("../../services");
var helpers_1 = require("../../helpers");
var style_1 = require("../../style");
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../../components/view"));
var image_1 = __importDefault(require("../../components/image"));
var button_1 = __importDefault(require("../../components/button"));
var text_1 = __importDefault(require("../../components/text"));
var StateScreen = /** @class */ (function (_super) {
    __extends(StateScreen, _super);
    function StateScreen(props) {
        var _this = _super.call(this, props) || this;
        if (props.testId) {
            services_1.LogService.deprecationWarn({ component: 'StateScreen', oldProp: 'testId', newProp: 'testID' });
        }
        if (props.source) {
            services_1.LogService.deprecationWarn({ component: 'StateScreen', oldProp: 'source', newProp: 'imageSource' });
        }
        _this.generateStyles();
        return _this;
    }
    StateScreen.prototype.generateStyles = function () {
        var _a = this.props, source = _a.source, imageSource = _a.imageSource;
        var finalSource = imageSource || source;
        var isRemoteImage = lodash_1.default.isObject(finalSource) && Boolean(finalSource.uri);
        this.styles = createStyles(isRemoteImage);
    };
    StateScreen.prototype.render = function () {
        // TODO: remove testId and source after deprecation
        var _a = this.props, title = _a.title, subtitle = _a.subtitle, source = _a.source, imageSource = _a.imageSource, ctaLabel = _a.ctaLabel, onCtaPress = _a.onCtaPress, testId = _a.testId, testID = _a.testID;
        var finalSource = imageSource || source;
        return (<view_1.default style={this.styles.container} testID={testID || testId}>
        <image_1.default style={this.styles.image} resizeMode={'contain'} source={finalSource}/>
        <text_1.default style={[this.styles.title]}>{title}</text_1.default>
        <text_1.default style={[this.styles.subtitle]}>{subtitle}</text_1.default>
        <button_1.default link marginT-30 onPress={onCtaPress} labelStyle={this.styles.ctaLabel} label={helpers_1.Constants.isAndroid ? lodash_1.default.toUpper(ctaLabel) : ctaLabel}/>
      </view_1.default>);
    };
    StateScreen.displayName = 'StateScreen';
    return StateScreen;
}(react_1.Component));
exports.default = new_1.asBaseComponent(StateScreen);
function createStyles(isRemoteImage) {
    var imageStyle = lodash_1.default.merge({ height: 200 }, isRemoteImage && { width: helpers_1.Constants.screenWidth * 0.9 });
    return react_native_1.StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 80,
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        image: imageStyle,
        title: __assign(__assign({ textAlign: 'center' }, style_1.Typography.text50), { color: style_1.Colors.dark10, fontWeight: '300' }),
        subtitle: __assign(__assign({ textAlign: 'center' }, style_1.Typography.text70), { color: style_1.Colors.dark40, fontWeight: '300', marginTop: 12 }),
        ctaLabel: __assign({ color: style_1.Colors.primary }, style_1.Typography.text70)
    });
}
