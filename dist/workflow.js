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
exports.workflow = void 0;
const mirai_js_1 = require("mirai-js");
const util_1 = require("./util");
const db_1 = require("./db");
const config_1 = require("./config");
const mailer_1 = require("./mailer");
const logger_1 = require("./logger");
let startTime = Date.now();
exports.workflow = new mirai_js_1.Middleware()
    // parse the text of the messagechain then assign into the context
    .textProcessor()
    // return if 
    // the message is not a group message
    // the message is empty
    // or the text md5 is already in the database
    .use((data, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        if (data.type != 'GroupMessage')
            return;
        startTime = Date.now();
        data.mysqlObj = yield (0, util_1.cleanQQGroupMsg)(data);
        if (((_b = (_a = data.mysqlObj) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.trim()) == ''
            || ((_c = data.mysqlObj) === null || _c === void 0 ? void 0 : _c.hash_md5) == undefined
            || (yield db_1.db.isMD5Exist(data.mysqlObj.hash_md5))) {
            logger_1.logger.log(`message already exists -> "${(_e = (_d = data.mysqlObj) === null || _d === void 0 ? void 0 : _d.message) === null || _e === void 0 ? void 0 : _e.replace('\n', '').slice(0, 20)}..."`);
            return;
        }
        yield next();
        logger_1.logger.log(`insert into database ${Date.now() - startTime} ms -> ${JSON.stringify(data.mysqlObj)}`);
    }
    catch (error) {
        logger_1.logger.error(error);
        if (config_1.config.enableMailer) {
            try {
                yield (0, mailer_1.sendMail)({
                    subject: 'mirai-js error',
                    html: `${error.message}\n\n${error.stack}`
                });
                logger_1.logger.log('send mail success');
            }
            catch (error) {
                logger_1.logger.error(error);
            }
        }
    }
}))
    // insert the message into the database
    .done((data) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.db.insert(data.mysqlObj);
}));
