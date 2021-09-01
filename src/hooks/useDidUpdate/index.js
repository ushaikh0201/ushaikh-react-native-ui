"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * This hook avoid calling useEffect on the initial value of his dependency array
 */
var useDidUpdate = function (callback, dep) {
    var isMounted = react_1.useRef(false);
    react_1.useEffect(function () {
        if (isMounted.current) {
            callback();
        }
        else {
            isMounted.current = true;
        }
    }, dep);
};
exports.default = useDidUpdate;
