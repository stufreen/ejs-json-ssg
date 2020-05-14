"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var parseSite_1 = __importDefault(require("./parseSite"));
var validateSiteFile_1 = require("./validateSiteFile");
var attachPaths_1 = __importDefault(require("./attachPaths"));
var generateTemplates_1 = __importDefault(require("./generateTemplates"));
var argv = yargs_1.default.options({
    c: { type: 'string', alias: 'config' },
    l: { type: 'string', alias: 'logs' },
}).argv;
logger_1.setLoggerLevel((_a = argv.l) !== null && _a !== void 0 ? _a : 'info');
(function main() {
    return __awaiter(this, void 0, void 0, function () {
        var startTime, config, rootNode, rootWithPaths, err_1, endTime, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startTime = process.hrtime.bigint();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, config_1.getConfig(argv)];
                case 2:
                    config = _a.sent();
                    logger_1.default.debug("Config: " + JSON.stringify(config, null, 2));
                    return [4 /*yield*/, parseSite_1.default(config.contentDir)];
                case 3:
                    rootNode = _a.sent();
                    logger_1.default.debug("Site: " + JSON.stringify(rootNode, null, 2));
                    if (!validateSiteFile_1.isSiteNode(rootNode)) return [3 /*break*/, 8];
                    logger_1.default.debug('site.json is valid');
                    rootWithPaths = attachPaths_1.default(rootNode);
                    logger_1.default.debug("Root with paths: " + JSON.stringify(rootWithPaths, null, 2));
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, generateTemplates_1.default({
                            rootNode: rootWithPaths,
                            templateDir: config.templateDir,
                            outputDir: config.outputDir,
                            contentDir: config.contentDir,
                        })];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    throw new Error(err_1);
                case 7:
                    endTime = process.hrtime.bigint();
                    logger_1.default.info("Done in " + Number(endTime - startTime) / 1000000 + " milliseconds.");
                    process.exit(0);
                    _a.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    err_2 = _a.sent();
                    logger_1.default.error(err_2.message);
                    process.exit(1);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
})();
