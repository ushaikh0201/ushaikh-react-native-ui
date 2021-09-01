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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionStatusBar = void 0;
var react_1 = __importStar(require("react"));
var lodash_1 = __importDefault(require("lodash"));
var react_native_1 = require("react-native");
var optionalDependencies_1 = require("../../optionalDependencies");
var helpers_1 = require("../../helpers");
var style_1 = require("../../style");
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var view_1 = __importDefault(require("../view"));
var new_1 = require("../../commons/new");
var Types_1 = require("./Types");
/**
 * @description: Top bar to show a "no internet" connection status. Note: Run on real device for best results
 * @image: https://user-images.githubusercontent.com/33805983/34683190-f3b1904c-f4a9-11e7-9d46-9a340bd35448.png, https://user-images.githubusercontent.com/33805983/34484206-edc6c6e4-efcb-11e7-88b2-cd394c19dd5e.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ConnectionStatusBarScreen.tsx
 * @notes: The component requires installing the '@react-native-community/netinfo' native library
 */
var ConnectionStatusBar = /** @class */ (function (_super) {
    __extends(ConnectionStatusBar, _super);
    function ConnectionStatusBar(props) {
        var _this = _super.call(this, props) || this;
        _this.onConnectionChange = _this.onConnectionChange.bind(_this);
        _this.state = {
            isConnected: true,
            isCancelled: false
        };
        if (optionalDependencies_1.NetInfoPackage) {
            _this.getInitialConnectionState();
        }
        else {
            console.error("RNUILib ConnectionStatusBar component requires installing \"@react-native-community/netinfo\" dependency");
        }
        return _this;
    }
    ConnectionStatusBar.registerGlobalOnConnectionLost = function (callback) {
        ConnectionStatusBar.onConnectionLost = callback;
    };
    ConnectionStatusBar.unregisterGlobalOnConnectionLost = function () {
        delete ConnectionStatusBar.onConnectionLost;
    };
    ConnectionStatusBar.prototype.generateStyles = function () {
        this.styles = createStyles();
    };
    ConnectionStatusBar.prototype.componentDidMount = function () {
        this.unsubscribe = optionalDependencies_1.NetInfoPackage === null || optionalDependencies_1.NetInfoPackage === void 0 ? void 0 : optionalDependencies_1.NetInfoPackage.addEventListener(this.onConnectionChange);
    };
    ConnectionStatusBar.prototype.componentWillUnmount = function () {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    };
    ConnectionStatusBar.prototype.onConnectionChange = function (state) {
        var _this = this;
        var isConnected = this.isStateConnected(state);
        if (isConnected !== this.state.isConnected) {
            this.setState({
                isConnected: isConnected,
                isCancelled: false
            });
            if (this.props.onConnectionChange) {
                this.props.onConnectionChange(isConnected, false);
            }
            if (!isConnected) {
                setTimeout(function () {
                    _this.getInitialConnectionState();
                }, 3000);
            }
            if (!isConnected && lodash_1.default.isFunction(ConnectionStatusBar.onConnectionLost)) {
                ConnectionStatusBar.onConnectionLost();
            }
        }
    };
    ConnectionStatusBar.prototype.getInitialConnectionState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isConnected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (optionalDependencies_1.NetInfoPackage === null || optionalDependencies_1.NetInfoPackage === void 0 ? void 0 : optionalDependencies_1.NetInfoPackage.fetch())];
                    case 1:
                        isConnected = (_a.sent()).isConnected;
                        this.setState({ isConnected: isConnected });
                        if (this.props.onConnectionChange) {
                            this.props.onConnectionChange(isConnected, true);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ConnectionStatusBar.prototype.isStateConnected = function (state) {
        var lowerCaseState = lodash_1.default.lowerCase(state.type);
        var isConnected = lowerCaseState !== 'none';
        return isConnected;
    };
    ConnectionStatusBar.prototype.render = function () {
        var _this = this;
        if (this.state.isConnected || this.state.isCancelled) {
            return false;
        }
        var containerStyle = [
            this.styles.topContainer,
            this.props.useAbsolutePosition ? this.styles.absolutePosition : null
        ];
        return (<view_1.default useSafeArea style={containerStyle}>
        <view_1.default style={this.styles.container}>
          <view_1.default style={{ flex: 1, flexDirection: 'row' }}>
            <react_native_1.Text style={this.styles.text}>{this.props.label}</react_native_1.Text>
            {this.props.allowDismiss && (<touchableOpacity_1.default style={this.styles.xContainer} onPress={function () { return _this.setState({ isCancelled: true }); }}>
                <react_native_1.Text style={this.styles.x}>✕</react_native_1.Text>
              </touchableOpacity_1.default>)}
          </view_1.default>
        </view_1.default>
      </view_1.default>);
    };
    ConnectionStatusBar.displayName = 'ConnectionStatusBar';
    ConnectionStatusBar.defaultProps = Types_1.DEFAULT_PROPS;
    return ConnectionStatusBar;
}(react_1.PureComponent));
exports.ConnectionStatusBar = ConnectionStatusBar;
function createStyles() {
    var _a;
    var typography = helpers_1.Constants.isSmallScreen ? style_1.Typography.text90 : style_1.Typography.text80;
    return react_native_1.StyleSheet.create({
        topContainer: {
            backgroundColor: style_1.Colors.dark30
        },
        absolutePosition: __assign(__assign({}, react_native_1.StyleSheet.absoluteFillObject), { bottom: undefined }),
        container: {
            flexDirection: 'column',
            justifyContent: 'center'
        },
        text: __assign(__assign({ flex: 1 }, typography), { textAlign: 'center', color: style_1.Colors.dark60, marginTop: 8, marginBottom: 8, alignSelf: 'center' }),
        xContainer: {
            paddingLeft: 10,
            paddingRight: 10,
            alignSelf: 'center'
        },
        x: {
            fontSize: (_a = style_1.Typography.text80) === null || _a === void 0 ? void 0 : _a.fontSize,
            color: style_1.Colors.black
        }
    });
}
exports.default = new_1.asBaseComponent(ConnectionStatusBar);
