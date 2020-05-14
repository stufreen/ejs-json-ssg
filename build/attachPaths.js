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
Object.defineProperty(exports, "__esModule", { value: true });
function attachPath(node, parentPath) {
    var nodeWithPath = __assign(__assign({}, node), { path: "" + parentPath + node.slug + "/" });
    if (nodeWithPath.children) {
        nodeWithPath.children = nodeWithPath.children.map(function (childNode) {
            return attachPath(childNode, nodeWithPath.path);
        });
    }
    return nodeWithPath;
}
function attachPaths(siteNode) {
    return attachPath(siteNode, '');
}
exports.default = attachPaths;
