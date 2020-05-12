"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var config_1 = require("./config");
// import parseSite from './parseSite';
// import validateSiteFile from './validateSiteFile';
var argv = yargs_1.default.options({
    c: { type: 'string', alias: 'config' },
}).argv;
// Cet configuration
var config = config_1.getConfig(argv);
console.log(config);
// TO DO: Check for write access to outputDir
// TO DO: Read and parse the site.json file
// const root = parseSite(contentDir);
// TO DO: Validate the site.json file
// 1. Nodes have required fields
// 2. No duplicate slugs
// 3. There's a template ejs file for each type
// validateSiteFile(root, templateDir)
// Attach output paths to each node
// Generate HTML files from EJS tempaltes
