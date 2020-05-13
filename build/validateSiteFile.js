"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        // throw new Error('Invalid field: missing "type"');
        return false;
    }
    if (!exports.isString(maybeField.type)) {
        // throw new Error('Invalid field: "type" must be a string');
        return false;
    }
    if (typeof maybeField.value === 'undefined') {
        // throw new Error('Invalid field: "value" is not defined');
        return false;
    }
    if (typeof maybeField.value !== 'boolean' &&
        typeof maybeField.value !== 'number' &&
        maybeField !== null &&
        !exports.isString(maybeField.value) &&
        !isFieldObject(maybeField.value)) {
        // throw new Error(
        //   'Invalid field: "value" can be a boolean, number, string, null or array of fields'
        // );
        return false;
    }
    return true;
}
exports.isField = isField;
function isSiteNode(maybeNode) {
    if (!maybeNode.slug) {
        // throw new Error('Invalid site node: missing "slug"');
        return false;
    }
    if (!exports.isString(maybeNode.slug)) {
        // throw new Error('Invalid site node: "slug" must be a string');
        return false;
    }
    if (!maybeNode.template) {
        // throw new Error('Invalid site node: missing "template"');
        return false;
    }
    if (!exports.isString(maybeNode.template)) {
        // throw new Error('Invalid site node: "template" must be a string');
        return false;
    }
    if (typeof maybeNode.meta !== 'undefined' &&
        typeof maybeNode.visible !== 'boolean') {
        throw new Error('Invalid site node: "visible" may only be boolean or undefined');
    }
    if (typeof maybeNode.meta !== 'undefined' && !isMetaObject(maybeNode.meta)) {
        throw new Error('Invalid site node: "meta" may only be an object where the values are strings');
    }
    if (typeof maybeNode.fields !== 'undefined' &&
        !isMetaObject(maybeNode.fields)) {
        throw new Error('Invalid site node: "fields" may only be an object where the values are Fields');
    }
    if (typeof maybeNode.children !== 'undefined' &&
        !Array.isArray(maybeNode.children)) {
        throw new Error('Invalid site node: "children" may only be an array of site nodes');
    }
    if (typeof maybeNode.children !== 'undefined' &&
        Array.isArray(maybeNode.children)) {
        maybeNode.children.forEach(function (maybeSiteNode) {
            if (isSiteNode(maybeSiteNode)) {
                throw new Error('Invalid site node: "children" may only be an array of site nodes');
            }
        });
    }
    return true;
}
exports.isSiteNode = isSiteNode;
var validateSiteFile = function (root, templateDir) {
    return isSiteNode(root);
};
exports.default = validateSiteFile;
