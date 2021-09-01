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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WizardStepStates = void 0;
var react_1 = __importDefault(require("react"));
var WizardStepStates;
(function (WizardStepStates) {
    WizardStepStates["ENABLED"] = "enabled";
    WizardStepStates["DISABLED"] = "disabled";
    WizardStepStates["ERROR"] = "error";
    WizardStepStates["SKIPPED"] = "skipped";
    WizardStepStates["COMPLETED"] = "completed";
})(WizardStepStates = exports.WizardStepStates || (exports.WizardStepStates = {}));
// @ts-ignore
var WizardTypesForDocs = /** @class */ (function (_super) {
    __extends(WizardTypesForDocs, _super);
    function WizardTypesForDocs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WizardTypesForDocs.prototype.render = function () {
        return null;
    };
    WizardTypesForDocs.displayName = 'Wizard';
    return WizardTypesForDocs;
}(react_1.default.Component));
// @ts-ignore
var WizardStepTypesForDocs = /** @class */ (function (_super) {
    __extends(WizardStepTypesForDocs, _super);
    function WizardStepTypesForDocs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WizardStepTypesForDocs.prototype.render = function () {
        return null;
    };
    WizardStepTypesForDocs.displayName = 'Wizard.Step';
    return WizardStepTypesForDocs;
}(react_1.default.Component));
