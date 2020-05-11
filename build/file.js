"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var fs_1 = require("fs");
var relativeToAbsolute = function (filePath) {
    return path.resolve(process.cwd(), filePath);
};
function getConfigLocation(args) {
    var _a;
    if (args.config) {
        return relativeToAbsolute((_a = args.config) !== null && _a !== void 0 ? _a : args.c);
    }
    throw new Error('No config file specified. Please include a config file with "--config ./path/to/config.json"');
}
exports.getConfigLocation = getConfigLocation;
function readConfig(configPath) {
    var contentsBuffer = fs_1.readFileSync(configPath);
    var _a = JSON.parse(contentsBuffer.toString()), templateDir = _a.templateDir, outputDir = _a.outputDir, site = _a.site;
    if (!templateDir || !outputDir || !site) {
        throw new Error('Invalid config file.');
    }
    return {
        templateDir: relativeToAbsolute(templateDir),
        outputDir: relativeToAbsolute(templateDir),
        sitePath: relativeToAbsolute(site),
    };
}
exports.readConfig = readConfig;
