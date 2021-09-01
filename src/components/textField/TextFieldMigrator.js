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
var lodash_1 = require("lodash");
var hoist_non_react_statics_1 = __importDefault(require("hoist-non-react-statics"));
// @ts-ignore
var index_1 = __importDefault(require("./index"));
var TextField_1 = __importDefault(require("../../incubator/TextField"));
var services_1 = require("../../services");
var propsMigrationMap = {
    /* LABEL */
    helperText: 'hint',
    title: 'label',
    titleColor: 'labelColor',
    titleStyle: 'labelStyle',
    /* CHAR COUNTER */
    showCharacterCounter: 'showCharCounter'
};
var specialMigrationMap = {
    prefix: 'leadingAccessory',
    prefixStyle: 'leadingAccessory',
    rightIconSource: 'trailingAccessory',
    rightIconStyle: 'trailingAccessory',
    rightButtonProps: 'trailingAccessory',
    leadingIcon: 'leadingAccessory',
    useTopErrors: 'validationMessagePosition'
};
var customMessageMap = {
    centered: "Pass textAlign to 'style' prop instead.",
    error: "Use 'validationMessage' with 'validate' props",
    expandable: 'This prop will not be supported anymore',
    renderExpandableInput: 'This prop will not be supported anymore',
    renderExpandable: 'This prop will not be supported anymore',
    onToggleExpandableModal: 'This prop will not be supported anymore',
    topBarProps: 'This prop will not be supported anymore',
    transformer: 'This prop will not be supported anymore'
};
function migrateProps(props) {
    var fixedProps = lodash_1.mapKeys(props, function (_value, key) {
        if (propsMigrationMap[key]) {
            services_1.LogService.deprecationWarn({ component: 'TextField', oldProp: key, newProp: propsMigrationMap[key] });
            return propsMigrationMap[key];
        }
        else if (specialMigrationMap[key]) {
            services_1.LogService.warn("The new TextField implementation does not support the '" + key + "' prop. Please use the '" + specialMigrationMap[key] + "' instead");
        }
        else if (customMessageMap[key]) {
            services_1.LogService.warn("The new TextField implementation does not support the '" + key + "' prop. " + customMessageMap[key]);
        }
        return key;
    });
    return fixedProps;
}
var TextFieldMigrator = react_1.forwardRef(function (_a, ref) {
    var _b = _a.migrate, migrate = _b === void 0 ? false : _b, props = __rest(_a, ["migrate"]);
    react_1.useEffect(function () {
        if (!migrate) {
            services_1.LogService.warn("RNUILib TextField component will soon be replaced with a new implementation, in order to start the migration - please pass the 'migrate' prop");
        }
    }, []);
    if (migrate) {
        var migratedProps = migrateProps(props);
        // @ts-ignore
        return <TextField_1.default {...migratedProps} ref={ref}/>;
    }
    else {
        return <index_1.default {...props} ref={ref}/>;
    }
});
hoist_non_react_statics_1.default(TextFieldMigrator, TextField_1.default);
TextFieldMigrator.displayName = 'TextField';
exports.default = TextFieldMigrator;
