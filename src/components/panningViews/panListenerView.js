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
var asPanViewConsumer_1 = __importDefault(require("./asPanViewConsumer"));
var panningProvider_1 = __importDefault(require("./panningProvider"));
var view_1 = __importDefault(require("../view"));
var DEFAULT_DIRECTIONS = [
    panningProvider_1.default.Directions.UP,
    panningProvider_1.default.Directions.DOWN,
    panningProvider_1.default.Directions.LEFT,
    panningProvider_1.default.Directions.RIGHT
];
var DEFAULT_PAN_SENSITIVITY = 5;
var DEFAULT_SWIPE_VELOCITY = 1.8;
/**
 * @description: PanListenerView component created to making listening to swipe and drag events easier
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PanListenerScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/PanListenerView/PanListenerView.gif?raw=true
 */
var PanListenerView = /** @class */ (function (_super) {
    __extends(PanListenerView, _super);
    function PanListenerView(props) {
        var _this = _super.call(this, props) || this;
        _this.yes = function () {
            return true;
        };
        _this.no = function () {
            return false;
        };
        _this.shouldPan = function (_e, gestureState) {
            // return true if user is swiping, return false if it's a single click
            var dy = gestureState.dy, dx = gestureState.dx;
            var _a = _this.props, directions = _a.directions, _b = _a.panSensitivity, panSensitivity = _b === void 0 ? DEFAULT_PAN_SENSITIVITY : _b;
            return Boolean(directions &&
                ((directions.includes(panningProvider_1.default.Directions.UP) && dy < -panSensitivity) ||
                    (directions.includes(panningProvider_1.default.Directions.DOWN) && dy > panSensitivity) ||
                    (directions.includes(panningProvider_1.default.Directions.LEFT) && dx < -panSensitivity) ||
                    (directions.includes(panningProvider_1.default.Directions.RIGHT) && dx > panSensitivity)));
        };
        _this.handlePanStart = function () {
            var _a, _b, _c, _d;
            (_b = (_a = _this.props).onPanStart) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_d = (_c = _this.props.context) === null || _c === void 0 ? void 0 : _c.onPanStart) === null || _d === void 0 ? void 0 : _d.call(_c);
        };
        _this.getSwipeDirection = function (_a) {
            var vx = _a.vx, vy = _a.vy;
            var _b = _this.props.swipeVelocitySensitivity, swipeVelocitySensitivity = _b === void 0 ? DEFAULT_SWIPE_VELOCITY : _b;
            return _this.getDirectionsOverSensitivity(vx, vy, swipeVelocitySensitivity);
        };
        _this.getDragDirection = function (_a) {
            var dx = _a.dx, dy = _a.dy;
            return _this.getDirectionsOverSensitivity(dx, dy, 0);
        };
        _this.getDirectionsOverSensitivity = function (x, y, sensitivity) {
            var _a = _this.props.directions, directions = _a === void 0 ? DEFAULT_DIRECTIONS : _a;
            var selectedDirections = {};
            var selectedAmounts = {};
            if (directions.includes(panningProvider_1.default.Directions.LEFT) && x < -sensitivity) {
                selectedDirections.x = panningProvider_1.default.Directions.LEFT;
                selectedAmounts.x = x;
            }
            else if (directions.includes(panningProvider_1.default.Directions.RIGHT) && x > sensitivity) {
                selectedDirections.x = panningProvider_1.default.Directions.RIGHT;
                selectedAmounts.x = x;
            }
            if (directions.includes(panningProvider_1.default.Directions.UP) && y < -sensitivity) {
                selectedDirections.y = panningProvider_1.default.Directions.UP;
                selectedAmounts.y = y;
            }
            else if (directions.includes(panningProvider_1.default.Directions.DOWN) && y > sensitivity) {
                selectedDirections.y = panningProvider_1.default.Directions.DOWN;
                selectedAmounts.y = y;
            }
            return { selectedDirections: selectedDirections, selectedAmounts: selectedAmounts };
        };
        _this.panResultHasValue = function (panResult) {
            return Boolean(panResult && (panResult.selectedDirections.x || panResult.selectedDirections.y));
        };
        _this.handlePanMove = function (_e, gestureState) {
            var _a, _b, _c, _d, _f, _g;
            var _h = _this.props, onSwipe = _h.onSwipe, onDrag = _h.onDrag, context = _h.context;
            var hasSwipe = !lodash_1.default.isUndefined(onSwipe);
            var hasDrag = !lodash_1.default.isUndefined(onDrag);
            var hasContext = !lodash_1.default.isUndefined(context);
            var panResult;
            if (hasSwipe || hasContext) {
                panResult = _this.getSwipeDirection(gestureState);
            }
            if (_this.panResultHasValue(panResult)) {
                // @ts-ignore
                var data = { directions: panResult.selectedDirections, velocities: panResult.selectedAmounts };
                (_b = (_a = _this.props).onSwipe) === null || _b === void 0 ? void 0 : _b.call(_a, data);
                (_c = context === null || context === void 0 ? void 0 : context.onSwipe) === null || _c === void 0 ? void 0 : _c.call(context, data);
            }
            else if (hasDrag || hasContext) {
                panResult = _this.getDragDirection(gestureState);
                if (_this.panResultHasValue(panResult)) {
                    var data = { directions: panResult.selectedDirections, deltas: panResult.selectedAmounts };
                    (_f = (_d = _this.props).onDrag) === null || _f === void 0 ? void 0 : _f.call(_d, data);
                    (_g = context === null || context === void 0 ? void 0 : context.onDrag) === null || _g === void 0 ? void 0 : _g.call(context, data);
                }
            }
        };
        _this.handlePanRelease = function () {
            var _a, _b, _c, _d;
            (_b = (_a = _this.props).onPanRelease) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_d = (_c = _this.props.context) === null || _c === void 0 ? void 0 : _c.onPanRelease) === null || _d === void 0 ? void 0 : _d.call(_c);
        };
        _this.handlePanTerminate = function () {
            var _a, _b, _c, _d;
            (_b = (_a = _this.props).onPanTerminated) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_d = (_c = _this.props.context) === null || _c === void 0 ? void 0 : _c.onPanTerminated) === null || _d === void 0 ? void 0 : _d.call(_c);
        };
        var isClickable = props.isClickable;
        _this.panResponder = react_native_1.PanResponder.create({
            onStartShouldSetPanResponder: isClickable ? _this.shouldPan : _this.yes,
            onMoveShouldSetPanResponder: _this.shouldPan,
            onStartShouldSetPanResponderCapture: _this.no,
            onMoveShouldSetPanResponderCapture: _this.no,
            onPanResponderGrant: _this.handlePanStart,
            onPanResponderMove: _this.handlePanMove,
            onPanResponderRelease: _this.handlePanRelease,
            onPanResponderTerminate: _this.handlePanTerminate
        });
        return _this;
    }
    PanListenerView.prototype.render = function () {
        var _a = this.props, children = _a.children, others = __rest(_a, ["children"]);
        return (<view_1.default {...others} {...this.panResponder.panHandlers}>
        {children}
      </view_1.default>);
    };
    PanListenerView.displayName = 'PanListenerView';
    PanListenerView.defaultProps = {
        directions: DEFAULT_DIRECTIONS,
        panSensitivity: DEFAULT_PAN_SENSITIVITY,
        swipeVelocitySensitivity: DEFAULT_SWIPE_VELOCITY
    };
    return PanListenerView;
}(react_1.PureComponent));
exports.default = asPanViewConsumer_1.default(PanListenerView);
