"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var parseSite = function (sitePath) { return new Promise(function (resolve, reject) {
    fs_1.readFile(sitePath, 'utf8', function (error, data) {
        if (error) {
            reject(error.message);
        }
        resolve(JSON.parse(data));
    });
}); };
exports.default = parseSite;
