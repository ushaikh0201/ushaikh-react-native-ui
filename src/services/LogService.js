"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function warn(message) {
    if (__DEV__) {
        console.warn(message);
    }
}
function deprecationWarn(_a) {
    var component = _a.component, oldProp = _a.oldProp, newProp = _a.newProp;
    var message = newProp
        ? "uilib's " + component + " \"" + oldProp + "\" prop will be deprecated soon, please use the \"" + newProp + "\" prop instead"
        : "uilib's " + component + " \"" + oldProp + "\" prop will be deprecated soon, please stop using it";
    warn(message);
}
exports.default = {
    warn: warn,
    deprecationWarn: deprecationWarn
};
