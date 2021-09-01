"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var hoist_non_react_statics_1 = __importDefault(require("hoist-non-react-statics"));
function forwardRef(WrappedComponent) {
    function forwardRef(props, ref) {
        return <WrappedComponent {...props} forwardedRef={ref}/>;
    }
    var ForwardedComponent = react_1.default.forwardRef(forwardRef);
    hoist_non_react_statics_1.default(ForwardedComponent, WrappedComponent);
    ForwardedComponent.displayName = WrappedComponent.displayName;
    //@ts-ignore
    ForwardedComponent.propTypes = WrappedComponent.propTypes;
    //@ts-ignore
    ForwardedComponent.defaultProps = WrappedComponent.defaultProps;
    return ForwardedComponent;
}
exports.default = forwardRef;
