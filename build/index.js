"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var logger_1 = __importStar(require("./logger"));
var config_1 = require("./config");
var file_1 = require("./file");
// import parseSite from './parseSite';
// import validateSiteFile from './validateSiteFile';
var argv = yargs_1.default.options({
    c: { type: 'string', alias: 'config' },
    l: { type: 'string', alias: 'logs' },
}).argv;
logger_1.setLoggerLevel((_a = argv.l) !== null && _a !== void 0 ? _a : 'info');
// Cet configuration
var config = config_1.getConfig(argv);
// Add build directory
file_1.addDirectory(config.outputDir)
    .then(function () {
    logger_1.default.debug("Successfully created outputDir at " + config.outputDir + ".");
})
    .catch(function () {
    logger_1.default.error("No permission to write to " + config.outputDir);
});
// TO DO: Read and parse the site.json file
// const root = parseSite(contentDir);
// TO DO: Validate the site.json file
// 1. Nodes have required fields
// 2. No duplicate slugs
// 3. There's a template ejs file for each type
// validateSiteFile(root, templateDir)
// Attach output paths to each node
// Generate HTML files from EJS tempaltes
