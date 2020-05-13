"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function addDirectory(path) {
    return fs_1.promises.mkdir(path, { recursive: true });
}
exports.addDirectory = addDirectory;
