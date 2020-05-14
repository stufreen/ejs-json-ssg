"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var ejs = __importStar(require("ejs"));
var fs_1 = require("fs");
var logger_1 = __importDefault(require("./logger"));
var path_1 = __importDefault(require("path"));
function safeMkDir(path) {
    return new Promise(function (resolve) {
        fs_1.access(path, fs_1.constants.F_OK, function (err) {
            if (err) {
                fs_1.mkdir(path, { recursive: true }, function (err) {
                    if (err)
                        throw err;
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    });
}
function processTemplate(templatePath, siteNode, root) {
    return new Promise(function (resolve) {
        var data = __assign(__assign({}, siteNode), { root: root });
        ejs.renderFile(templatePath, data, {}, function (err, str) {
            if (err) {
                logger_1.default.error(err);
                throw new Error("Could not render template for \"" + siteNode.slug + "\"");
            }
            resolve(str);
        });
    });
}
function compilePage(_a) {
    var siteNode = _a.siteNode, rootNode = _a.rootNode, templateDir = _a.templateDir, outputDir = _a.outputDir, contentDir = _a.contentDir;
    return __awaiter(this, void 0, void 0, function () {
        var templatePath, renderedHtml, subCompileJobs;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    templatePath = path_1.default.resolve(templateDir, siteNode.template + ".ejs");
                    return [4 /*yield*/, processTemplate(templatePath, siteNode, rootNode)];
                case 1:
                    renderedHtml = _b.sent();
                    subCompileJobs = siteNode.children.map(function (child) {
                        return compilePage({
                            siteNode: child,
                            rootNode: rootNode,
                            templateDir: templateDir,
                            outputDir: outputDir,
                            contentDir: contentDir,
                        });
                    });
                    return [4 /*yield*/, safeMkDir(outputDir + siteNode.path)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, fs_1.promises.writeFile("" + outputDir + siteNode.path + "index.html", renderedHtml, 'utf8')];
                case 3:
                    _b.sent();
                    logger_1.default.info(siteNode.path + "index.html");
                    return [4 /*yield*/, Promise.all(subCompileJobs)];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function generateTemplates(_a) {
    var rootNode = _a.rootNode, templateDir = _a.templateDir, outputDir = _a.outputDir, contentDir = _a.contentDir;
    return compilePage({
        rootNode: rootNode,
        siteNode: rootNode,
        templateDir: templateDir,
        outputDir: outputDir,
        contentDir: contentDir,
    });
}
exports.default = generateTemplates;
