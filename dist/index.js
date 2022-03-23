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
Object.defineProperty(exports, "__esModule", { value: true });
const mirai_js_1 = require("mirai-js");
const config_1 = require("./config");
const workflow_1 = require("./workflow");
const bot = new mirai_js_1.Bot();
const { bot: { qq, verifyKey, baseUrl } } = config_1.config;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield bot.open({
        qq, verifyKey, baseUrl: baseUrl,
    });
    bot.on('GroupMessage', workflow_1.workflow);
    // 你可以通过取消注释以下行来测试此应用程序应该具有的 qps 要求
    // 注意，qps 中间件将在每次消息到达时清除控制台
    // bot.on('GroupMessage', qpsCalculatorGenerator());
    // 您可以通过取消注释以下行来测试此应用的实时 qps
    // 由于 qps 中间件将在每次消息到达时清除控制台，所以应该在测试这一项时在 config.ts 中关闭 logger
    // bot.on('GroupMessage', currQpsCalculatorGenerator(workflow))
}))();
