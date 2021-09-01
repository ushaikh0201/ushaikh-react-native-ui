"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchGravatarUrl = exports.isBlankGravatarUrl = exports.isGravatarUrl = exports.getBackgroundColor = exports.getInitials = exports.getColorById = exports.getAvatarColors = exports.hashStringToNumber = void 0;
var lodash_1 = __importDefault(require("lodash"));
var url_parse_1 = __importDefault(require("url-parse"));
var colors_1 = __importDefault(require("../style/colors"));
function hashStringToNumber(str) {
    var hash = 5381;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) + hash) + char; /* hash * 33 + c */ // eslint-disable-line
    }
    return hash;
}
exports.hashStringToNumber = hashStringToNumber;
function getAvatarColors() {
    return [colors_1.default.blue20, colors_1.default.cyan20, colors_1.default.green20, colors_1.default.yellow20,
        colors_1.default.orange20, colors_1.default.red20, colors_1.default.purple20, colors_1.default.violet20];
}
exports.getAvatarColors = getAvatarColors;
function getColorById(id, avatarColors) {
    if (avatarColors === void 0) { avatarColors = getAvatarColors(); }
    if (!id) {
        return avatarColors[0];
    }
    var hashedId = hashStringToNumber(id);
    var colorIndex = Math.abs(hashedId % avatarColors.length);
    return avatarColors[colorIndex];
}
exports.getColorById = getColorById;
function getInitials(name, limit) {
    if (limit === void 0) { limit = 2; }
    var initials = '';
    if (name && lodash_1.default.isString(name)) {
        var nameSplitted = lodash_1.default.chain(name)
            .split(/\s+/g)
            .filter(function (word) { return word.length > 0; })
            .take(limit)
            .value();
        lodash_1.default.each(nameSplitted, function (str) {
            initials += str[0];
        });
    }
    return lodash_1.default.toUpper(initials);
}
exports.getInitials = getInitials;
function getBackgroundColor(name, avatarColors, hashFunction, defaultColor) {
    if (!name || !avatarColors || !hashFunction) {
        return defaultColor;
    }
    var hash = hashFunction(name);
    var index = Math.abs(hash % avatarColors.length);
    return avatarColors[index];
}
exports.getBackgroundColor = getBackgroundColor;
function isGravatarUrl(url) {
    var _a = new url_parse_1.default(url), hostname = _a.hostname, pathname = _a.pathname;
    return lodash_1.default.split(hostname, '.').includes('gravatar') && pathname.startsWith('/avatar/');
}
exports.isGravatarUrl = isGravatarUrl;
function isBlankGravatarUrl(url) {
    return isGravatarUrl(url) && lodash_1.default.endsWith(url, '?d=blank');
}
exports.isBlankGravatarUrl = isBlankGravatarUrl;
function patchGravatarUrl(gravatarUrl) {
    var url = new url_parse_1.default(gravatarUrl, true);
    var query = url.query;
    query.d = '404';
    delete query.default;
    url.set('query', query);
    return url.toString();
}
exports.patchGravatarUrl = patchGravatarUrl;
