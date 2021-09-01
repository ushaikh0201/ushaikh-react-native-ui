"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var commons_validator_js_1 = require("commons-validator-js");
var urlRegEx = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i; //eslint-disable-line
var decimalNumberRegEx = /^-?\d+[.,]?\d+$/;
var integerRegEx = /^-?\d*$/; // allows empty string
var priceRegEx = /^[0-9]{1,9}([.][0-9]{1,2})?$/;
var validators = {
    required: function (value) { return !lodash_1.default.isEmpty(value); },
    email: function (value) { return new commons_validator_js_1.EmailValidator().isValid(value); },
    url: function (value) { return urlRegEx.test(value); },
    number: function (value) { return integerRegEx.test(value) || decimalNumberRegEx.test(value); },
    price: function (value) { return priceRegEx.test(value); }
};
exports.default = validators;
