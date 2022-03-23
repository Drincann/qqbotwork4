"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const connection_1 = require("./connection");
const operation_1 = require("./operation");
exports.db = {
    connection: connection_1.connection,
    insert: operation_1.insert,
    isMD5Exist: operation_1.isMD5Exist
};
