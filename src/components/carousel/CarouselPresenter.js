"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOutOfBounds = exports.calcPageIndex = exports.calcOffset = exports.getChildrenLength = void 0;
var react_1 = __importDefault(require("react"));
var lodash_1 = __importDefault(require("lodash"));
function getChildrenLength(props) {
    return react_1.default.Children.count(props.children);
}
exports.getChildrenLength = getChildrenLength;
function calcOffset(props, state) {
    var currentPage = state.currentPage, pageWidth = state.pageWidth, pageHeight = state.pageHeight;
    var loop = props.loop, _a = props.containerMarginHorizontal, containerMarginHorizontal = _a === void 0 ? 0 : _a;
    var actualCurrentPage = loop ? currentPage + 1 : currentPage;
    var nonLoopAdjustment = !loop && currentPage > 0 ? containerMarginHorizontal : 0;
    var pageSize = props.horizontal ? pageWidth : pageHeight;
    var offset = pageSize * actualCurrentPage - nonLoopAdjustment;
    var offsetXY = {
        x: props.horizontal ? offset : 0,
        y: props.horizontal ? 0 : offset
    };
    return offsetXY;
}
exports.calcOffset = calcOffset;
function calcPageIndex(offset, props, pageSize) {
    var pagesCount = getChildrenLength(props);
    var loop = props.loop;
    var pageIndexIncludingClonedPages = Math.round(offset / pageSize);
    var actualPageIndex;
    if (loop) {
        actualPageIndex = (pageIndexIncludingClonedPages + (pagesCount - 1)) % pagesCount;
    }
    else {
        actualPageIndex = Math.min(pagesCount - 1, pageIndexIncludingClonedPages);
    }
    return actualPageIndex;
}
exports.calcPageIndex = calcPageIndex;
function isOutOfBounds(offset, props, pageWidth) {
    var length = getChildrenLength(props);
    var minLimit = 1;
    var maxLimit = (length + 1) * pageWidth - 1;
    return !lodash_1.default.inRange(offset, minLimit, maxLimit);
}
exports.isOutOfBounds = isOutOfBounds;
