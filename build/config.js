"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var fs_1 = require("fs");
var logger_1 = __importDefault(require("./logger"));
var DEFAULT_CONFIG = {
    templateDir: './templates',
    outputDir: './build',
    contentDir: './content',
    defaultLanguage: 'en',
};
var relativeToAbsolute = function (filePath) {
    return path.resolve(process.cwd(), filePath);
};
function getConfigLocation(args) {
    var _a;
    if (args.config) {
        return relativeToAbsolute((_a = args.config) !== null && _a !== void 0 ? _a : args.c);
    }
    throw new Error('No config file specified.');
}
function getDefaultConfig() {
    return {
        templateDir: relativeToAbsolute(DEFAULT_CONFIG.templateDir),
        outputDir: relativeToAbsolute(DEFAULT_CONFIG.outputDir),
        contentDir: relativeToAbsolute(DEFAULT_CONFIG.contentDir),
        defaultLanguage: DEFAULT_CONFIG.defaultLanguage,
    };
}
function readConfig(configPath) {
    var contentsBuffer = fs_1.readFileSync(configPath);
    var _a = JSON.parse(contentsBuffer.toString()), templateDir = _a.templateDir, outputDir = _a.outputDir, contentDir = _a.contentDir, defaultLanguage = _a.defaultLanguage;
    return {
        templateDir: relativeToAbsolute(templateDir !== null && templateDir !== void 0 ? templateDir : DEFAULT_CONFIG.templateDir),
        outputDir: relativeToAbsolute(outputDir !== null && outputDir !== void 0 ? outputDir : DEFAULT_CONFIG.outputDir),
        contentDir: relativeToAbsolute(contentDir !== null && contentDir !== void 0 ? contentDir : DEFAULT_CONFIG.contentDir),
        defaultLanguage: defaultLanguage !== null && defaultLanguage !== void 0 ? defaultLanguage : DEFAULT_CONFIG.defaultLanguage,
    };
}
function getConfig(args) {
    try {
        var configPath = getConfigLocation(args);
        return readConfig(configPath);
    }
    catch (error) {
        logger_1.default.info('No config file found. Using defaults.');
        return getDefaultConfig();
    }
}
exports.getConfig = getConfig;
