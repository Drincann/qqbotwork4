"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const config_1 = require("../config");
const colors_1 = __importDefault(require("colors"));
// 日志的行为取决于 config.enableLogger
// 当该配置为 false 时，即便调用 logger.error() 也不会输出任何日志
// 这里与配置文件强耦合
function log(...args) {
    if (config_1.config.enableLogger) {
        console.log(config_1.config.enableColorLogger ?
            colors_1.default.underline.bold.bgGreen.black(`[${new Date().toLocaleString()}]`)
            : `[${new Date().toLocaleString()}]`, ...args, '\n');
    }
}
function error(...args) {
    if (config_1.config.enableLogger) {
        console.log(config_1.config.enableColorLogger ?
            colors_1.default.underline.bold.bgRed.white(`[${new Date().toLocaleString()}]`)
            : `[${new Date().toLocaleString()}]`, ...args, '\n');
    }
}
exports.logger = {
    log,
    error,
};
