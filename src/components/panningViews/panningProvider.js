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
exports.PanningDirections = void 0;
var react_1 = __importStar(require("react"));
var panningContext_1 = __importDefault(require("./panningContext"));
var PanningDirections;
(function (PanningDirections) {
    PanningDirections["UP"] = "up";
    PanningDirections["DOWN"] = "down";
    PanningDirections["LEFT"] = "left";
    PanningDirections["RIGHT"] = "right";
})(PanningDirections = exports.PanningDirections || (exports.PanningDirections = {}));
/**
 * @description: Wraps the panResponderView and panListenerView to provide a shared context
 */
var PanningProvider = /** @class */ (function (_super) {
    __extends(PanningProvider, _super);
    function PanningProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.getProviderContextValue = function () {
            var _a = _this.state, isPanning = _a.isPanning, wasTerminated = _a.wasTerminated, dragDirections = _a.dragDirections, dragDeltas = _a.dragDeltas, swipeDirections = _a.swipeDirections, swipeVelocities = _a.swipeVelocities, panLocation = _a.panLocation;
            return {
                onPanStart: _this.onPanStart,
                onPanRelease: _this.onPanRelease,
                onPanTerminated: _this.onPanTerminated,
                isPanning: isPanning,
                wasTerminated: wasTerminated,
                onDrag: _this.onDrag,
                dragDirections: dragDirections,
                dragDeltas: dragDeltas,
                onSwipe: _this.onSwipe,
                swipeDirections: swipeDirections,
                swipeVelocities: swipeVelocities,
                onPanLocationChanged: _this.onPanLocationChanged,
                panLocation: panLocation
            };
        };
        _this.onPanStart = function () {
            _this.setState({ isPanning: true, wasTerminated: false });
        };
        _this.onPanRelease = function () {
            _this.setState({ isPanning: false });
        };
        _this.onPanTerminated = function () {
            _this.setState({ isPanning: false, wasTerminated: true });
        };
        _this.onDrag = function (_a) {
            var directions = _a.directions, deltas = _a.deltas;
            _this.setState({ dragDirections: directions, dragDeltas: deltas, swipeDirections: {}, swipeVelocities: {} });
        };
        _this.onSwipe = function (_a) {
            var directions = _a.directions, velocities = _a.velocities;
            _this.setState({ swipeDirections: directions, swipeVelocities: velocities, dragDirections: {}, dragDeltas: {} });
        };
        _this.onPanLocationChanged = function (location) {
            _this.setState({ panLocation: location });
        };
        _this.state = {
            isPanning: false,
            wasTerminated: false,
            dragDirections: {},
            dragDeltas: {},
            swipeDirections: {},
            swipeVelocities: {},
            panLocation: {}
        };
        return _this;
    }
    PanningProvider.prototype.render = function () {
        return (<panningContext_1.default.Provider value={this.getProviderContextValue()}>{this.props.children}</panningContext_1.default.Provider>);
    };
    PanningProvider.displayName = 'IGNORE';
    PanningProvider.Directions = PanningDirections;
    return PanningProvider;
}(react_1.Component));
exports.default = PanningProvider;
