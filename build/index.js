"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var file_1 = require("./file");
var argv = yargs_1.default.options({
    c: { type: 'string', alias: 'config' },
}).argv;
var configPath = file_1.getConfigLocation(argv);
console.log(file_1.readConfig(configPath));
