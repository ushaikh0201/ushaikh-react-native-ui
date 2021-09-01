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
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var services_1 = require("../../services");
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../view"));
var text_1 = __importDefault(require("../text"));
var image_1 = __importDefault(require("../image"));
var asCardChild_1 = __importDefault(require("./asCardChild"));
/**
 * @description: Card.Section for rendering content easily inside a card
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.tsx
 */
var CardSection = /** @class */ (function (_super) {
    __extends(CardSection, _super);
    function CardSection(props) {
        var _this = _super.call(this, props) || this;
        _this.renderContent = function () {
            var _a = _this.props, content = _a.content, leadingIcon = _a.leadingIcon, trailingIcon = _a.trailingIcon, contentStyle = _a.contentStyle, testID = _a.testID;
            if (!leadingIcon && !trailingIcon && lodash_1.default.isEmpty(content)) {
                return;
            }
            return (<>
        {leadingIcon && <image_1.default testID={testID + ".leadingIcon"} {...leadingIcon}/>}
        <view_1.default testID={testID + ".contentContainer"} style={[contentStyle]}>
          {lodash_1.default.map(content, 
                // @ts-ignore
                function (_a, index) {
                    if (_a === void 0) { _a = {}; }
                    var text = _a.text, others = __rest(_a, ["text"]);
                    return (!lodash_1.default.isUndefined(text) && (<text_1.default testID={testID + ".text." + index} key={index} {...others}>
                    {text}
                  </text_1.default>));
                })}
        </view_1.default>
        {trailingIcon && <image_1.default testID={testID + ".trailingIcon"} {...trailingIcon}/>}
      </>);
        };
        _this.renderImage = function () {
            var _a = _this.props, source = _a.source, imageSource = _a.imageSource, imageStyle = _a.imageStyle, imageProps = _a.imageProps, testID = _a.testID;
            var finalSource = imageSource || source;
            // not actually needed, instead of adding ts-ignore
            if (finalSource) {
                return (<image_1.default testID={testID + ".image"} source={finalSource} style={imageStyle} customOverlayContent={_this.renderContent()} {...imageProps}/>);
            }
        };
        if (props.source) {
            services_1.LogService.deprecationWarn({ component: 'CardSection', oldProp: 'source', newProp: 'imageSource' });
        }
        return _this;
    }
    CardSection.prototype.render = function () {
        var _a = this.props, source = _a.source, imageSource = _a.imageSource, borderStyle = _a.context.borderStyle, style = _a.style, others = __rest(_a, ["source", "imageSource", "context", "style"]);
        var finalSource = imageSource || source;
        return (<view_1.default style={[styles.container, borderStyle, style]} {...others}>
        {finalSource && this.renderImage()}
        {!finalSource && this.renderContent()}
      </view_1.default>);
    };
    CardSection.displayName = 'Card.Section';
    return CardSection;
}(react_1.PureComponent));
exports.default = new_1.asBaseComponent(asCardChild_1.default(CardSection));
var styles = react_native_1.StyleSheet.create({
    container: {
        overflow: 'hidden'
    }
});
