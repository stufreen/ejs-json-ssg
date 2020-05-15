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
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
function findTemplates(dir) {
    return fs_1.readdirSync(dir).reduce(function (accumulator, f) {
        var _a;
        var filePath = path_1.default.join(dir, f);
        console.log(filePath);
        var isDirectory = fs_1.statSync(filePath).isDirectory();
        if (isDirectory) {
            return __assign(__assign({}, accumulator), findTemplates(filePath));
        }
        if (path_1.default.extname(f).toLowerCase() === '.ejs') {
            var fileName = path_1.default.basename(f, '.ejs');
            return __assign(__assign({}, accumulator), (_a = {}, _a[fileName] = path_1.default.join(dir, f), _a));
        }
        return accumulator;
    }, {});
}
exports.default = findTemplates;
