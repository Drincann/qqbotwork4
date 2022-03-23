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
exports.insert = exports.isMD5Exist = void 0;
const connection_1 = require("./connection");
const config_1 = require("../config");
function isMD5Exist(md5) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (yield connection_1.connection).execute(`SELECT * FROM ${config_1.config.mysql.table} WHERE hash_md5 = ?`, [md5]);
        return result[0].length > 0;
    });
}
exports.isMD5Exist = isMD5Exist;
function insert(obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `
        INSERT INTO ${config_1.config.mysql.table}
        (user_group_name, user_number, send_time, message, create_time, group_name, group_number, hash_md5, user_phone_number)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
        const params = [
            obj.user_group_name,
            obj.user_number,
            obj.send_time,
            obj.message,
            obj.create_time,
            obj.group_name,
            obj.group_number,
            obj.hash_md5,
            obj.user_phone_number
        ];
        return (yield (yield connection_1.connection).execute(sql, params));
    });
}
exports.insert = insert;
