"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("./logger"));
exports.isString = function (value) {
    return typeof value === 'string' || value instanceof String;
};
function isFieldObject(maybeFieldObject) {
    if (typeof maybeFieldObject !== 'object' || maybeFieldObject === null) {
        return false;
    }
    return Object.keys(maybeFieldObject).every(function (key) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return isField(maybeFieldObject[key]);
    });
}
exports.isFieldObject = isFieldObject;
function isMetaObject(maybeMetaObject) {
    if (typeof maybeMetaObject !== 'object' || maybeMetaObject === null) {
        return false;
    }
    return Object.keys(maybeMetaObject).every(function (key) {
        return exports.isString(maybeMetaObject[key]);
    });
}
exports.isMetaObject = isMetaObject;
function isField(maybeField) {
    if (!maybeField.type) {
        logger_1.default.warn('Invalid field: missing "type"');
        return false;
    }
    if (!exports.isString(maybeField.type)) {
        logger_1.default.warn('Invalid field: "type" must be a string');
        return false;
    }
    if (typeof maybeField.value === 'undefined') {
        logger_1.default.warn('Invalid field: "value" is not defined');
        return false;
    }
    if (typeof maybeField.value !== 'boolean' &&
        typeof maybeField.value !== 'number' &&
        maybeField !== null &&
        !exports.isString(maybeField.value) &&
        !isFieldObject(maybeField.value)) {
        logger_1.default.warn('Invalid field: "value" can be a boolean, number, string, null or array of fields');
        return false;
    }
    return true;
}
exports.isField = isField;
function isSiteNode(maybeNode) {
    if (!exports.isString(maybeNode.slug)) {
        logger_1.default.warn('Invalid site node: "slug" must be a string');
        return false;
    }
    if (!maybeNode.template) {
        logger_1.default.warn('Invalid site node: missing "template"');
        return false;
    }
    if (!exports.isString(maybeNode.template)) {
        logger_1.default.warn('Invalid site node: "template" must be a string');
        return false;
    }
    if (typeof maybeNode.meta !== 'undefined' &&
        typeof maybeNode.visible !== 'boolean') {
        logger_1.default.warn('Invalid site node: "visible" may only be boolean or undefined');
        return false;
    }
    if (typeof maybeNode.meta !== 'undefined' && !isMetaObject(maybeNode.meta)) {
        logger_1.default.warn('Invalid site node: "meta" may only be an object where the values are strings');
        return false;
    }
    if (typeof maybeNode.fields !== 'undefined' &&
        !isMetaObject(maybeNode.fields)) {
        logger_1.default.warn('Invalid site node: "fields" may only be an object where the values are Fields');
        return false;
    }
    if (typeof maybeNode.children !== 'undefined' &&
        !Array.isArray(maybeNode.children)) {
        logger_1.default.warn('Invalid site node: "children" may only be an array of site nodes');
        return false;
    }
    if (typeof maybeNode.children !== 'undefined' &&
        Array.isArray(maybeNode.children) &&
        !maybeNode.children.every(isSiteNode)) {
        logger_1.default.warn('Invalid site node: "children" may only be an array of site nodes');
        return false;
    }
    return true;
}
exports.isSiteNode = isSiteNode;
