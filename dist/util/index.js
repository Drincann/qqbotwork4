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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanQQGroupMsg = exports.filterAllPhoneNumber = void 0;
const md5_1 = __importDefault(require("md5"));
const logger_1 = require("../logger");
const config_1 = require("../config");
function filterAllPhoneNumber(text) {
    var _a, _b, _c;
    const result = [
        ...(_a = text.match(/1[3|4|5|6|7|8|9]\d{9}/g)) !== null && _a !== void 0 ? _a : [],
        ...(_b = text.match(/\d{3}-?\d{7,8}|\d{4}-?\d{7,8}/g)) !== null && _b !== void 0 ? _b : []
    ].filter(v => v != null);
    return (_c = Array.from(new Set(result))) !== null && _c !== void 0 ? _c : null;
}
exports.filterAllPhoneNumber = filterAllPhoneNumber;
// 缓存电话号码以避免程序在 getUserProfile 调用处过大的时间开销
const globalPhoneNumberCache = new Map();
// 这个工具用来解析 GroupMessage 以生成可以直接将插入数据库的 mysqlObj
function cleanQQGroupMsg(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
    return __awaiter(this, void 0, void 0, function* () {
        let user_phone_number = 'unknown';
        if (globalPhoneNumberCache.has((_a = data.sender) === null || _a === void 0 ? void 0 : _a.id)) {
            logger_1.logger.log(`hit the cache of the phone number -> "${globalPhoneNumberCache.get((_b = data.sender) === null || _b === void 0 ? void 0 : _b.id)}"`);
            user_phone_number = globalPhoneNumberCache.get((_c = data.sender) === null || _c === void 0 ? void 0 : _c.id);
        }
        else {
            const profile = yield data.bot.getUserProfile({ qq: (_d = data.sender) === null || _d === void 0 ? void 0 : _d.id });
            user_phone_number = (_g = (_f = filterAllPhoneNumber((_e = profile.sign) !== null && _e !== void 0 ? _e : 'unknown')) === null || _f === void 0 ? void 0 : _f.join('/')) !== null && _g !== void 0 ? _g : 'unknown';
            globalPhoneNumberCache.set((_h = data.sender) === null || _h === void 0 ? void 0 : _h.id, user_phone_number);
            // logger.error('miss cache')
            // 在 config.cacheExpireTime 后清除缓存
            setTimeout(() => {
                var _a;
                globalPhoneNumberCache.delete((_a = data.sender) === null || _a === void 0 ? void 0 : _a.id);
            }, config_1.config.phoneNumberCacheExpireTime);
        }
        return {
            user_group_name: (_k = (_j = data.sender) === null || _j === void 0 ? void 0 : _j.memberName) !== null && _k !== void 0 ? _k : 'unknown',
            user_number: (_o = (_m = (_l = data.sender) === null || _l === void 0 ? void 0 : _l.id) === null || _m === void 0 ? void 0 : _m.toString()) !== null && _o !== void 0 ? _o : 'unknown',
            send_time: ((_p = data.sender) === null || _p === void 0 ? void 0 : _p.lastSpeakTimestamp) == undefined ? new Date() : new Date(((_q = data.sender) === null || _q === void 0 ? void 0 : _q.lastSpeakTimestamp) * 1000),
            message: (_r = data.text) !== null && _r !== void 0 ? _r : 'unknown',
            create_time: new Date(),
            group_name: (_u = (_t = (_s = data.sender) === null || _s === void 0 ? void 0 : _s.group) === null || _t === void 0 ? void 0 : _t.name) !== null && _u !== void 0 ? _u : 'unknown',
            group_number: (_y = (_x = (_w = (_v = data.sender) === null || _v === void 0 ? void 0 : _v.group) === null || _w === void 0 ? void 0 : _w.id) === null || _x === void 0 ? void 0 : _x.toString()) !== null && _y !== void 0 ? _y : 'unknown',
            hash_md5: (0, md5_1.default)((_z = data.text) !== null && _z !== void 0 ? _z : 'unknown'),
            user_phone_number,
        };
    });
}
exports.cleanQQGroupMsg = cleanQQGroupMsg;
