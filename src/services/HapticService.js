"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HapticType = void 0;
var optionalDeps_1 = require("optionalDeps");
var options = {
    enableVibrateFallback: false,
    ignoreAndroidSystemSettings: false
};
var HapticType;
(function (HapticType) {
    HapticType["selection"] = "selection";
    HapticType["impactLight"] = "impactLight";
    HapticType["impactMedium"] = "impactMedium";
    HapticType["impactHeavy"] = "impactHeavy";
    HapticType["notificationSuccess"] = "notificationSuccess";
    HapticType["notificationWarning"] = "notificationWarning";
    HapticType["notificationError"] = "notificationError";
})(HapticType = exports.HapticType || (exports.HapticType = {}));
function triggerHaptic(hapticType, componentName) {
    if (optionalDeps_1.HapticFeedbackPackage) {
        optionalDeps_1.HapticFeedbackPackage.trigger(hapticType, options);
    }
    else {
        console.error("RNUILib " + componentName + "'s requires installing \"react-native-haptic-feedback\" dependency");
    }
}
exports.default = {
    HapticType: HapticType,
    triggerHaptic: triggerHaptic
};
