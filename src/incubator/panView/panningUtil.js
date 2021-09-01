"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDismissVelocity = exports.DEFAULT_THRESHOLD = exports.getTranslation = exports.getTranslationDirectionClamp = exports.PanViewDirections = void 0;
var helpers_1 = require("../../helpers");
var PanViewDirections;
(function (PanViewDirections) {
    PanViewDirections["UP"] = "up";
    PanViewDirections["DOWN"] = "down";
    PanViewDirections["LEFT"] = "left";
    PanViewDirections["RIGHT"] = "right";
})(PanViewDirections = exports.PanViewDirections || (exports.PanViewDirections = {}));
function getTranslationDirectionClamp(translation, options) {
    'worklet';
    var result = translation;
    if (options.directionLock) {
        if (options.currentTranslation.x !== 0) {
            result = { x: translation.x, y: 0 };
        }
        else if (options.currentTranslation.y !== 0) {
            result = { x: 0, y: translation.y };
        }
        else if (Math.abs(translation.x) > Math.abs(translation.y)) {
            result = { x: translation.x, y: 0 };
        }
        else {
            result = { x: 0, y: translation.y };
        }
    }
    return result;
}
exports.getTranslationDirectionClamp = getTranslationDirectionClamp;
function getTranslation(event, initialTranslation, directions, options) {
    'worklet';
    var result = { x: 0, y: 0 };
    if ((directions === null || directions === void 0 ? void 0 : directions.includes(PanViewDirections.LEFT)) && (directions === null || directions === void 0 ? void 0 : directions.includes(PanViewDirections.RIGHT))) {
        result.x = initialTranslation.x + event.translationX;
    }
    else if (directions === null || directions === void 0 ? void 0 : directions.includes(PanViewDirections.LEFT)) {
        result.x = Math.min(0, initialTranslation.x + event.translationX);
    }
    else if (directions === null || directions === void 0 ? void 0 : directions.includes(PanViewDirections.RIGHT)) {
        result.x = Math.max(0, initialTranslation.x + event.translationX);
    }
    if ((directions === null || directions === void 0 ? void 0 : directions.includes(PanViewDirections.UP)) && (directions === null || directions === void 0 ? void 0 : directions.includes(PanViewDirections.DOWN))) {
        result.y = initialTranslation.y + event.translationY;
    }
    else if (directions === null || directions === void 0 ? void 0 : directions.includes(PanViewDirections.UP)) {
        result.y = Math.min(0, initialTranslation.y + event.translationY);
    }
    else if (directions === null || directions === void 0 ? void 0 : directions.includes(PanViewDirections.DOWN)) {
        result.y = Math.max(0, initialTranslation.y + event.translationY);
    }
    return getTranslationDirectionClamp(result, options);
}
exports.getTranslation = getTranslation;
exports.DEFAULT_THRESHOLD = {
    velocity: 750,
    x: helpers_1.Constants.screenWidth / 4,
    y: helpers_1.Constants.screenHeight / 4
};
function getVelocityDirectionClamp(event, directions) {
    'worklet';
    var x = 0, y = 0;
    if ((directions.includes(PanViewDirections.LEFT) && event.velocityX < 0) ||
        (directions.includes(PanViewDirections.RIGHT) && event.velocityX > 0)) {
        x = event.velocityX;
    }
    if ((directions.includes(PanViewDirections.UP) && event.velocityY < 0) ||
        (directions.includes(PanViewDirections.DOWN) && event.velocityY > 0)) {
        y = event.velocityY;
    }
    return { x: x, y: y };
}
function checkThresholds(directions, velocity, threshold, options) {
    'worklet';
    var velocityPassedThreshold = velocity > threshold.velocity;
    var xPassedThreshold = (directions.includes(PanViewDirections.RIGHT) && options.currentTranslation.x > threshold.x) ||
        (directions.includes(PanViewDirections.LEFT) && -options.currentTranslation.x > threshold.x);
    var yPassedThreshold = (directions.includes(PanViewDirections.DOWN) && options.currentTranslation.y > threshold.y) ||
        (directions.includes(PanViewDirections.UP) && -options.currentTranslation.y > threshold.y);
    return { velocityPassedThreshold: velocityPassedThreshold, xPassedThreshold: xPassedThreshold, yPassedThreshold: yPassedThreshold };
}
/**
 * Will return undefined if should not dismiss
 */
function getDismissVelocity(event, directions, options, threshold) {
    'worklet';
    var _threshold = Object.assign({}, exports.DEFAULT_THRESHOLD, threshold);
    var clampedVelocity = getVelocityDirectionClamp(event, directions);
    var velocity = Math.sqrt(Math.pow(clampedVelocity.x, 2) + Math.pow(clampedVelocity.y, 2));
    var _a = checkThresholds(directions, velocity, _threshold, options), velocityPassedThreshold = _a.velocityPassedThreshold, xPassedThreshold = _a.xPassedThreshold, yPassedThreshold = _a.yPassedThreshold;
    if (velocityPassedThreshold || xPassedThreshold || yPassedThreshold) {
        var velocity_1 = {};
        if (velocityPassedThreshold) {
            velocity_1 = { x: event.velocityX, y: event.velocityY };
        }
        else if (event.translationX && event.translationY) {
            if (Math.abs(event.translationX) > Math.abs(event.translationY)) {
                velocity_1.x = Math.sign(event.translationX) * _threshold.velocity;
                velocity_1.y = (_threshold.velocity * event.translationY) / Math.abs(event.translationX);
            }
            else {
                velocity_1.y = Math.sign(event.translationY) * _threshold.velocity;
                velocity_1.x = (_threshold.velocity * event.translationX) / Math.abs(event.translationY);
            }
        }
        else if (event.translationX) {
            velocity_1.x = Math.sign(event.translationX) * _threshold.velocity;
        }
        else {
            velocity_1.y = Math.sign(event.translationY) * _threshold.velocity;
        }
        if (options.directionLock) {
            if (options.currentTranslation.x !== 0) {
                velocity_1.y = 0;
            }
            else if (options.currentTranslation.y !== 0) {
                velocity_1.x = 0;
            }
        }
        return velocity_1;
    }
}
exports.getDismissVelocity = getDismissVelocity;
