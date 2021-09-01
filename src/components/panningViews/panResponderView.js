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
var react_1 = __importStar(require("react"));
var view_1 = __importDefault(require("../view"));
var asPanViewConsumer_1 = __importDefault(require("./asPanViewConsumer"));
/**
 * @description: panResponderView component created to making listening to swipe and drag events easier.
 * @notes: Has to be used as a child of a PanningProvider that also has a PanListenerView.
 *         The PanListenerView is the one that sends the drag\swipe events.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PanResponderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/PanResponderView/PanResponderView.gif?raw=true
 */
var PanResponderView = /** @class */ (function (_super) {
    __extends(PanResponderView, _super);
    function PanResponderView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.initialLeft = 0;
        _this.initialTop = 0;
        _this.ref = react_1.default.createRef();
        return _this;
    }
    PanResponderView.prototype.componentDidMount = function () {
        this.setNativeProps(this.initialLeft, this.initialTop);
    };
    PanResponderView.prototype.componentDidUpdate = function (prevProps) {
        var ignorePanning = this.props.ignorePanning;
        var _a = this.props.context, isPanning = _a.isPanning, dragDeltas = _a.dragDeltas;
        var _b = prevProps.context, prevIsPanning = _b.isPanning, prevDragDeltas = _b.dragDeltas;
        if (!ignorePanning && !isPanning && prevIsPanning) {
            this.onPanEnd();
        }
        if (!ignorePanning &&
            isPanning &&
            (dragDeltas.x || dragDeltas.y) &&
            (dragDeltas.x !== prevDragDeltas.x || dragDeltas.y !== prevDragDeltas.y)) {
            this.onDrag(dragDeltas);
        }
    };
    PanResponderView.prototype.onPanEnd = function () {
        var _a, _b, _c, _d;
        var location = { left: this.left, top: this.top };
        this.initialLeft = this.left || this.initialLeft;
        this.initialTop = this.top || this.initialTop;
        (_b = (_a = this.props).onPanLocationChanged) === null || _b === void 0 ? void 0 : _b.call(_a, location);
        //@ts-expect-error
        (_d = (_c = this.props.context).onPanLocationChanged) === null || _d === void 0 ? void 0 : _d.call(_c, location);
    };
    PanResponderView.prototype.onDrag = function (deltas) {
        var left = this.initialLeft + (deltas.x ? Math.round(deltas.x) : 0);
        var top = this.initialTop + (deltas.y ? Math.round(deltas.y) : 0);
        this.setNativeProps(left, top);
    };
    PanResponderView.prototype.setNativeProps = function (left, top) {
        if (this.ref.current) {
            this.ref.current.setNativeProps({ style: { left: left, top: top } });
            this.left = left;
            this.top = top;
        }
    };
    PanResponderView.prototype.render = function () {
        var _a = this.props, isAnimated = _a.isAnimated, others = __rest(_a, ["isAnimated"]);
        return (<view_1.default animated={isAnimated} ref={this.ref} pointerEvents={'box-none'} {...others}>
        {this.props.children}
      </view_1.default>);
    };
    PanResponderView.displayName = 'PanResponderView';
    PanResponderView.defaultProps = {
        isAnimated: false
    };
    return PanResponderView;
}(react_1.PureComponent));
exports.default = asPanViewConsumer_1.default(PanResponderView);
