"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Assets_1 = require("./Assets");
exports.default = new Assets_1.Assets().loadAssetsGroup('', {
    get icons() {
        return require('./icons').icons;
    },
    get emojis() {
        return require('./emojis').emojis;
    },
    get images() {
        return require('./images').images;
    }
});
