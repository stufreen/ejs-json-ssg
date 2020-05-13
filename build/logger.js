"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importStar(require("winston"));
var logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
    transports: [new winston_1.transports.Console()],
});
function setLoggerLevel(infoLevel) {
    logger.level = infoLevel;
}
exports.setLoggerLevel = setLoggerLevel;
exports.default = logger;
