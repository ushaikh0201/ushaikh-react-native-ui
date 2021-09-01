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
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var helpers_1 = require("../../helpers");
var style_1 = require("../../style");
var view_1 = __importDefault(require("../view"));
var touchableOpacity_1 = __importDefault(require("../touchableOpacity"));
var button_1 = __importStar(require("../button"));
var card_1 = __importDefault(require("../card"));
var new_1 = require("../../commons/new");
var PEEP = 8;
var DURATION = 300;
var MARGIN_BOTTOM = 24;
var buttonStartValue = 0.8;
var icon = require('./assets/arrow-down.png');
/**
 * @description: Stack aggregator component
 * @modifiers: margin, padding
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/StackAggregatorScreen.tsx
 */
var StackAggregator = /** @class */ (function (_super) {
    __extends(StackAggregator, _super);
    function StackAggregator(props) {
        var _this = _super.call(this, props) || this;
        _this.itemsCount = react_1.default.Children.count(_this.props.children);
        _this.easeOut = react_native_1.Easing.bezier(0, 0, 0.58, 1);
        _this.getAnimatedScales = function () {
            return react_1.default.Children.map(_this.props.children, function (_item, index) {
                return new react_native_1.Animated.Value(_this.getItemScale(index));
            });
        };
        _this.getItemScale = function (index) {
            if (_this.state.collapsed) {
                if (index === _this.itemsCount - 2) {
                    return 0.95;
                }
                if (index === _this.itemsCount - 1) {
                    return 0.9;
                }
            }
            return 1;
        };
        _this.animate = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all([this.animateValues(), this.animateCards()])];
            });
        }); };
        _this.close = function () {
            _this.setState({ collapsed: true }, function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            (_b = (_a = this.props).onCollapseWillChange) === null || _b === void 0 ? void 0 : _b.call(_a, true);
                            if (!this.props.onCollapseChanged) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.animate()];
                        case 1:
                            _c.sent();
                            this.props.onCollapseChanged(true);
                            return [3 /*break*/, 3];
                        case 2:
                            this.animate();
                            _c.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        };
        _this.open = function () {
            _this.setState({ collapsed: false }, function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            (_b = (_a = this.props).onCollapseWillChange) === null || _b === void 0 ? void 0 : _b.call(_a, false);
                            if (!this.props.onCollapseChanged) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.animate()];
                        case 1:
                            _c.sent();
                            this.props.onCollapseChanged(false);
                            return [3 /*break*/, 3];
                        case 2:
                            this.animate();
                            _c.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        };
        _this.onLayout = function (event) {
            var height = event.nativeEvent.layout.height;
            if (height) {
                _this.setState({ firstItemHeight: height });
            }
        };
        _this.onItemPress = function (index) {
            var _a, _b;
            (_b = (_a = _this.props).onItemPress) === null || _b === void 0 ? void 0 : _b.call(_a, index);
        };
        _this.renderItem = function (item, index) {
            var _a = _this.props, contentContainerStyle = _a.contentContainerStyle, itemBorderRadius = _a.itemBorderRadius;
            var _b = _this.state, firstItemHeight = _b.firstItemHeight, collapsed = _b.collapsed;
            return (<react_native_1.Animated.View key={index} onLayout={index === 0 ? _this.onLayout : undefined} style={[
                    helpers_1.Constants.isIOS && styles.containerShadow,
                    _this.getStyle(index),
                    {
                        borderRadius: helpers_1.Constants.isIOS ? itemBorderRadius : undefined,
                        alignSelf: 'center',
                        zIndex: _this.itemsCount - index,
                        transform: [{ scaleX: _this.animatedScaleArray[index] }],
                        width: helpers_1.Constants.screenWidth - 40,
                        height: collapsed ? firstItemHeight : undefined
                    }
                ]} collapsable={false}>
        <card_1.default style={[contentContainerStyle, styles.card]} onPress={function () { return _this.props.disablePresses && _this.onItemPress(index); }} borderRadius={itemBorderRadius} elevation={5}>
          <react_native_1.Animated.View style={index !== 0 ? { opacity: _this.animatedContentOpacity } : undefined} collapsable={false}>
            {item}
          </react_native_1.Animated.View>
        </card_1.default>
      </react_native_1.Animated.View>);
        };
        _this.state = {
            collapsed: props.collapsed,
            firstItemHeight: undefined
        };
        _this.animatedScale = new react_native_1.Animated.Value(_this.state.collapsed ? buttonStartValue : 1);
        _this.animatedOpacity = new react_native_1.Animated.Value(_this.state.collapsed ? buttonStartValue : 1);
        _this.animatedContentOpacity = new react_native_1.Animated.Value(_this.state.collapsed ? 0 : 1);
        _this.animatedScaleArray = _this.getAnimatedScales();
        return _this;
    }
    StackAggregator.prototype.componentDidUpdate = function (_prevProps, prevState) {
        var _a;
        if (prevState.collapsed !== ((_a = this.state) === null || _a === void 0 ? void 0 : _a.collapsed)) {
            react_native_1.LayoutAnimation.configureNext(react_native_1.LayoutAnimation.Presets.easeInEaseOut);
        }
    };
    StackAggregator.prototype.animateValues = function () {
        var _this = this;
        var collapsed = this.state.collapsed;
        var newValue = collapsed ? buttonStartValue : 1;
        return new Promise(function (resolve) {
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(_this.animatedOpacity, {
                    duration: DURATION,
                    toValue: Number(newValue),
                    useNativeDriver: true
                }),
                react_native_1.Animated.timing(_this.animatedScale, {
                    toValue: Number(newValue),
                    easing: _this.easeOut,
                    duration: DURATION,
                    useNativeDriver: true
                }),
                react_native_1.Animated.timing(_this.animatedContentOpacity, {
                    toValue: Number(collapsed ? 0 : 1),
                    easing: _this.easeOut,
                    duration: DURATION,
                    useNativeDriver: true
                })
            ]).start(resolve);
        });
    };
    StackAggregator.prototype.animateCards = function () {
        var _this = this;
        var promises = [];
        var _loop_1 = function (index) {
            var newScale = this_1.getItemScale(index);
            promises.push(new Promise(function (resolve) {
                react_native_1.Animated.timing(_this.animatedScaleArray[index], {
                    toValue: Number(newScale),
                    easing: _this.easeOut,
                    duration: DURATION,
                    useNativeDriver: true
                }).start(resolve);
            }));
        };
        var this_1 = this;
        for (var index = 0; index < this.itemsCount; index++) {
            _loop_1(index);
        }
        return Promise.all(promises);
    };
    StackAggregator.prototype.getTop = function (index) {
        var start = 0;
        if (index === this.itemsCount - 2) {
            start += PEEP;
        }
        if (index === this.itemsCount - 1) {
            start += PEEP * 2;
        }
        return start;
    };
    StackAggregator.prototype.getStyle = function (index) {
        var collapsed = this.state.collapsed;
        var top = this.getTop(index);
        if (collapsed) {
            return {
                position: index !== 0 ? 'absolute' : undefined,
                top: top
            };
        }
        return {
            marginBottom: MARGIN_BOTTOM,
            marginTop: index === 0 ? 40 : undefined
        };
    };
    StackAggregator.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, containerStyle = _a.containerStyle, buttonProps = _a.buttonProps;
        var _b = this.state, collapsed = _b.collapsed, firstItemHeight = _b.firstItemHeight;
        return (<view_1.default style={containerStyle}>
        <view_1.default style={{ marginBottom: PEEP * 3 }}>
          <react_native_1.Animated.View style={{
                position: 'absolute',
                right: 0,
                opacity: this.animatedOpacity,
                transform: [{ scale: this.animatedScale }]
            }}>
            <button_1.default label={'Show less'} iconSource={icon} link size={button_1.ButtonSize.small} {...buttonProps} marginH-24 marginB-20 onPress={this.close}/>
          </react_native_1.Animated.View>

          {react_1.default.Children.map(children, function (item, index) {
                return _this.renderItem(item, index);
            })}

          {collapsed && (<touchableOpacity_1.default onPress={this.open} activeOpacity={1} style={[
                    styles.touchable,
                    {
                        height: firstItemHeight ? firstItemHeight + PEEP * 2 : undefined,
                        zIndex: this.itemsCount
                    }
                ]}/>)}
        </view_1.default>
      </view_1.default>);
    };
    StackAggregator.displayName = 'StackAggregator';
    StackAggregator.defaultProps = {
        disablePresses: false,
        collapsed: true,
        itemBorderRadius: 0
    };
    return StackAggregator;
}(react_1.PureComponent));
var styles = react_native_1.StyleSheet.create({
    touchable: {
        position: 'absolute',
        width: '100%'
    },
    containerShadow: {
        backgroundColor: style_1.Colors.white,
        shadowColor: style_1.Colors.dark40,
        shadowOpacity: 0.25,
        shadowRadius: 12,
        shadowOffset: { height: 5, width: 0 }
    },
    card: {
        overflow: 'hidden',
        flexShrink: 1
    }
});
exports.default = new_1.asBaseComponent(StackAggregator);
