"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-use-before-define */
var object_path_1 = __importDefault(require("object-path"));
exports.localizeString = function (translationKey, translationTree) {
    return object_path_1.default.get(translationTree, translationKey) || translationKey;
};
function localizeArray(input, translationTree) {
    return input.map(function (item) { return localizeUnknown(item, translationTree); });
}
exports.localizeArray = localizeArray;
function localizeObject(input, translationTree) {
    var output = {};
    Object.keys(input).forEach(function (key) {
        output[key] = localizeUnknown(input[key], translationTree);
    });
    return output;
}
exports.localizeObject = localizeObject;
function localizeUnknown(input, translationTree) {
    if (typeof input === 'string') {
        return exports.localizeString(input, translationTree);
    }
    else if (Array.isArray(input)) {
        return localizeArray(input, translationTree);
    }
    else if (typeof input === 'object') {
        return localizeObject(input, translationTree);
    }
    return input;
}
exports.localizeUnknown = localizeUnknown;
exports.localizeSiteNode = function (siteNode, translationTree) {
    return __assign(__assign({}, siteNode), { slug: exports.localizeString(siteNode.slug, translationTree), meta: localizeObject(siteNode.meta, translationTree), fields: localizeObject(siteNode.fields, translationTree) });
};
