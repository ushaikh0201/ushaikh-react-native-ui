"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityPickerPackage = exports.PickerPackage = void 0;
var PickerPackage, CommunityPickerPackage;
exports.PickerPackage = PickerPackage;
exports.CommunityPickerPackage = CommunityPickerPackage;
try {
    exports.PickerPackage = PickerPackage = require('@react-native-picker/picker'); // New package
}
catch (error) {
    try {
        exports.CommunityPickerPackage = CommunityPickerPackage = require('@react-native-community/picker'); // Deprecated package
    }
    catch (error) { }
}
