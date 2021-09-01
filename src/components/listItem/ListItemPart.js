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
var react_native_1 = require("react-native");
var new_1 = require("../../commons/new");
var view_1 = __importDefault(require("../view"));
var ListItemPart = /** @class */ (function (_super) {
    __extends(ListItemPart, _super);
    function ListItemPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.styles = createStyles(_this.props);
        return _this;
    }
    ListItemPart.prototype.render = function () {
        var _a = this.props, containerStyle = _a.containerStyle, others = __rest(_a, ["containerStyle"]);
        return (<view_1.default style={[this.styles.container, containerStyle]} {...others}>
        {this.props.children}
      </view_1.default>);
    };
    ListItemPart.displayName = 'ListItem.Part';
    return ListItemPart;
}(react_1.Component));
exports.default = new_1.asBaseComponent(ListItemPart);
function createStyles(_a) {
    var left = _a.left, right = _a.right, middle = _a.middle, column = _a.column;
    var justifyContent;
    if (!column) {
        justifyContent = 'space-between';
        if (left) {
            justifyContent = 'flex-start';
        }
        if (right) {
            justifyContent = 'flex-end';
        }
        if (middle) {
            justifyContent = 'space-between';
        }
    }
    else {
        justifyContent = 'center';
    }
    return react_native_1.StyleSheet.create({
        container: {
            flexDirection: column ? undefined : 'row',
            flex: middle ? 1 : 0,
            justifyContent: justifyContent,
            alignItems: column ? undefined : 'center'
        }
    });
}
