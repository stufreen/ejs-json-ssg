"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var file_1 = require("./file");
var parseSite_1 = __importDefault(require("./parseSite"));
var argv = yargs_1.default.options({
    c: { type: 'string', alias: 'config' },
}).argv;
// Read the config file
var configPath = file_1.getConfigLocation(argv);
var _a = file_1.readConfig(configPath), templateDir = _a.templateDir, outputDir = _a.outputDir, sitePath = _a.sitePath;
// Read and parse the site.json file
var root = parseSite_1.default(sitePath);
// Validate the site.json file
// 1. Nodes have required fields
// 2. No duplicate slugs
// 3. There's a template ejs file for each type
validateSiteFile(root, templateDir);
// Attach output paths to each node
// Generate HTML files from EJS tempaltes
