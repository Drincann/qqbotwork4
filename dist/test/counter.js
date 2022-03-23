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
exports.qpsCalculatorGenerator = exports.currQpsCalculatorGenerator = void 0;
function currQpsCalculatorGenerator(middlewares) {
    let totalReq = 0;
    let currqps = 0;
    let currQpsStartTimeStamp = Date.now();
    let maxqps = 0;
    let avgqps = 0;
    let avgqpsStartTimeStamp = Date.now();
    return (data) => __awaiter(this, void 0, void 0, function* () {
        if (data.type != 'GroupMessage') {
            return;
        }
        yield middlewares(data);
        console.clear();
        totalReq++;
        maxqps = currqps++ > maxqps ? currqps : maxqps;
        avgqps = totalReq / ((Date.now() - avgqpsStartTimeStamp) / 1000);
        if (Date.now() - currQpsStartTimeStamp > 1000) {
            currqps = 0;
            currQpsStartTimeStamp = Date.now();
        }
        console.log(`currqps:  ${currqps} req/s`);
        console.log(`maxqps:   ${maxqps} req/s`);
        console.log(`avgqps:   ${avgqps.toFixed(3)} req/s`);
        console.log(`totalReq: ${totalReq} times`);
        console.log(`timePassed: ${(Date.now() - avgqpsStartTimeStamp) / 1000} s`);
    });
}
exports.currQpsCalculatorGenerator = currQpsCalculatorGenerator;
// qps 测试的中间件生成器
// 以下功能用于测试机器人的 qps
// 只需把它替换掉 index.ts 中 workflow 所在的位置即可
function qpsCalculatorGenerator() {
    let totalReq = 0;
    let currqps = 0;
    let currQpsStartTimeStamp = Date.now();
    let maxqps = 0;
    let avgqps = 0;
    let avgqpsStartTimeStamp = Date.now();
    return (data) => __awaiter(this, void 0, void 0, function* () {
        if (data.type != 'GroupMessage') {
            return;
        }
        console.clear();
        totalReq++;
        maxqps = currqps++ > maxqps ? currqps : maxqps;
        avgqps = totalReq / ((Date.now() - avgqpsStartTimeStamp) / 1000);
        if (Date.now() - currQpsStartTimeStamp > 1000) {
            currqps = 0;
            currQpsStartTimeStamp = Date.now();
        }
        console.log(`currqps:  ${currqps} req/s`);
        console.log(`maxqps:   ${maxqps} req/s`);
        console.log(`avgqps:   ${avgqps.toFixed(3)} req/s`);
        console.log(`totalReq: ${totalReq} times`);
        console.log(`timePassed: ${(Date.now() - avgqpsStartTimeStamp) / 1000} s`);
    });
}
exports.qpsCalculatorGenerator = qpsCalculatorGenerator;
