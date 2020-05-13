"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
function parseSite(contentDir) {
    var siteFile = path_1.default.resolve(contentDir, 'site.json');
    return fs_1.promises.readFile(siteFile, 'utf8').then(JSON.parse);
}
exports.default = parseSite;
