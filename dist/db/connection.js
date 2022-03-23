"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const config_1 = require("../config");
const { mysql: { host, user, database, password } } = config_1.config;
const connection = promise_1.default.createConnection({
    host, user, database, password
});
exports.connection = connection;
