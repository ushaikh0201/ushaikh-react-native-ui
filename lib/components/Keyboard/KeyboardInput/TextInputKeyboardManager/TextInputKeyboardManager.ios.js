"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = __importStar(require("react-native"));
var CustomInputControllerTemp = react_native_1.NativeModules.CustomInputControllerTemp;
var TextInputKeyboardManager = /** @class */ (function () {
    function TextInputKeyboardManager() {
    }
    TextInputKeyboardManager.setInputComponent = function (textInputRef, _a) {
        var component = _a.component, initialProps = _a.initialProps, useSafeArea = _a.useSafeArea;
        if (!textInputRef || !CustomInputControllerTemp) {
            return;
        }
        var reactTag = findNodeHandle(textInputRef);
        if (reactTag) {
            CustomInputControllerTemp.presentCustomInputComponent(reactTag, { component: component, initialProps: initialProps, useSafeArea: useSafeArea });
        }
    };
    TextInputKeyboardManager.removeInputComponent = function (textInputRef) {
        if (!textInputRef || !CustomInputControllerTemp) {
            return;
        }
        var reactTag = findNodeHandle(textInputRef);
        if (reactTag) {
            CustomInputControllerTemp.resetInput(reactTag);
        }
    };
    TextInputKeyboardManager.dismissKeyboard = function () {
        CustomInputControllerTemp.dismissKeyboard();
    };
    TextInputKeyboardManager.toggleExpandKeyboard = function (textInputRef, expand, performLayoutAnimation) {
        if (performLayoutAnimation === void 0) { performLayoutAnimation = false; }
        if (textInputRef) {
            if (performLayoutAnimation) {
                react_native_1.LayoutAnimation.configureNext(springAnimation);
            }
            var reactTag = findNodeHandle(textInputRef);
            if (expand) {
                CustomInputControllerTemp.expandFullScreenForInput(reactTag);
            }
            else {
                CustomInputControllerTemp.resetSizeForInput(reactTag);
            }
        }
    };
    return TextInputKeyboardManager;
}());
exports.default = TextInputKeyboardManager;
function findNodeHandle(ref) {
    return react_native_1.default.findNodeHandle(ref.current || ref);
}
var springAnimation = {
    duration: 400,
    create: {
        type: react_native_1.LayoutAnimation.Types.linear,
        property: react_native_1.LayoutAnimation.Properties.opacity
    },
    update: {
        type: react_native_1.LayoutAnimation.Types.spring,
        springDamping: 1.0
    },
    delete: {
        type: react_native_1.LayoutAnimation.Types.linear,
        property: react_native_1.LayoutAnimation.Properties.opacity
    }
};
