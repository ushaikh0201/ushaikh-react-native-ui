"use strict";
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
exports.FaderPosition = void 0;
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var view_1 = __importDefault(require("../view"));
var image_1 = __importDefault(require("../image"));
var FaderPosition;
(function (FaderPosition) {
    /**
     * @deprecated please use START instead
     */
    FaderPosition["LEFT"] = "LEFT";
    FaderPosition["START"] = "START";
    /**
     * @deprecated please use END instead
     */
    FaderPosition["RIGHT"] = "RIGHT";
    FaderPosition["END"] = "END";
    FaderPosition["TOP"] = "TOP";
    FaderPosition["BOTTOM"] = "BOTTOM";
})(FaderPosition = exports.FaderPosition || (exports.FaderPosition = {}));
var DEFAULT_FADE_SIZE = 50;
/**
 * @description: A gradient fading overlay to render on top of overflowing content (like scroll component)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FaderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Fader/Fader.gif?raw=true
 */
function Fader(props) {
    var getFadeSize = react_1.useCallback(function () {
        return props.size || DEFAULT_FADE_SIZE;
    }, [props.size]);
    var fadeSize = getFadeSize();
    var getStyles = react_1.useCallback(function () {
        var position = props.position || FaderPosition.END;
        var containerStyle, imageStyle, imageSource;
        switch (position) {
            case FaderPosition.LEFT:
            case FaderPosition.START:
                containerStyle = __assign(__assign({}, staticStyles.containerLeft), { width: fadeSize });
                imageStyle = { height: '100%', width: fadeSize };
                imageSource = require('./gradientLeft.png');
                break;
            case FaderPosition.RIGHT:
            case FaderPosition.END:
                containerStyle = __assign(__assign({}, staticStyles.containerRight), { width: fadeSize });
                imageStyle = { height: '100%', width: fadeSize };
                imageSource = require('./gradientRight.png');
                break;
            case FaderPosition.TOP:
                containerStyle = __assign(__assign({}, staticStyles.containerTop), { height: fadeSize });
                imageStyle = { height: fadeSize, width: '100%' };
                imageSource = require('./gradientTop.png');
                break;
            case FaderPosition.BOTTOM:
                containerStyle = __assign(__assign({}, staticStyles.containerBottom), { height: fadeSize });
                imageStyle = { height: fadeSize, width: '100%' };
                imageSource = require('./gradientBottom.png');
                break;
        }
        return {
            containerStyle: containerStyle,
            imageStyle: imageStyle,
            imageSource: imageSource
        };
    }, [fadeSize, props.position]);
    var styles = getStyles();
    return (<view_1.default pointerEvents={'none'} style={styles.containerStyle}>
      {(props.visible || lodash_1.default.isUndefined(props.visible)) && (<image_1.default supportRTL source={styles.imageSource} tintColor={props.tintColor} style={styles.imageStyle} resizeMode={'stretch'}/>)}
    </view_1.default>);
}
Fader.displayName = 'Fader';
Fader.position = FaderPosition;
exports.default = Fader;
var staticStyles = react_native_1.StyleSheet.create({
    containerTop: {
        position: 'absolute',
        top: 0,
        width: '100%'
    },
    containerBottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    containerLeft: {
        position: 'absolute',
        left: 0,
        height: '100%'
    },
    containerRight: {
        position: 'absolute',
        right: 0,
        height: '100%'
    }
});
