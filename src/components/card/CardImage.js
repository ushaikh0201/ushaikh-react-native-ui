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
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var services_1 = require("../../services");
// import {BaseComponent} from '../../commons';
var image_1 = __importDefault(require("../image"));
var CardPresenter = __importStar(require("./CardPresenter"));
var asCardChild_1 = __importDefault(require("./asCardChild"));
/**
 * @description: Card.Image, part of the Card component belongs inside a Card (better be a direct child)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.tsx
 */
var CardImage = /** @class */ (function (_super) {
    __extends(CardImage, _super);
    function CardImage(props) {
        var _this = _super.call(this, props) || this;
        _this.styles = createStyles(props);
        if (props.imageSource) {
            services_1.LogService.deprecationWarn({ component: 'CardImage', oldProp: 'imageSource', newProp: 'source' });
        }
        if (props.borderRadius) {
            services_1.LogService.deprecationWarn({ component: 'CardImage', oldProp: 'borderRadius' });
        }
        return _this;
    }
    CardImage.prototype.render = function () {
        var _a = this.props, imageSource = _a.imageSource, source = _a.source, style = _a.style, testID = _a.testID, overlayType = _a.overlayType, borderStyle = _a.context.borderStyle;
        var finalSource = source || imageSource;
        if (finalSource) {
            return (<react_native_1.View style={[this.styles.container, borderStyle, style]}>
          <image_1.default testID={testID} source={finalSource} style={[this.styles.image]} overlayType={overlayType}/>
        </react_native_1.View>);
        }
        return null;
    };
    CardImage.displayName = 'Card.Image';
    return CardImage;
}(react_1.PureComponent));
function createStyles(_a) {
    var width = _a.width, height = _a.height, position = _a.context.position;
    var _b = CardPresenter.extractPositionValues(position), top = _b.top, left = _b.left, right = _b.right, bottom = _b.bottom;
    return react_native_1.StyleSheet.create({
        container: {
            height: left || right ? undefined : height,
            width: top || bottom ? undefined : width,
            overflow: 'hidden'
        },
        image: {
            width: undefined,
            height: undefined,
            flex: 1,
            resizeMode: 'cover'
        }
    });
}
exports.default = asCardChild_1.default(CardImage);
