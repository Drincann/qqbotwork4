import { Processor } from "mirai-js/src/BaseType"
import { Mirai } from "../types"

export function currQpsCalculatorGenerator(middlewares: Processor): (data: Mirai.GroupMessageData) => Promise<void> {
    let totalReq = 0
    let currqps = 0
    let currQpsStartTimeStamp = Date.now()
    let maxqps = 0
    let avgqps = 0
    let avgqpsStartTimeStamp = Date.now()
    return async (data: Mirai.GroupMessageData) => {
        if (data.type != 'GroupMessage') {
            return;
        }
        await middlewares(data)
        console.clear()
        totalReq++
        maxqps = currqps++ > maxqps ? currqps : maxqps
        avgqps = totalReq / ((Date.now() - avgqpsStartTimeStamp) / 1000)
        if (Date.now() - currQpsStartTimeStamp > 1000) {
            currqps = 0
            currQpsStartTimeStamp = Date.now()
        }
        console.log(`currqps:  ${currqps} req/s`)
        console.log(`maxqps:   ${maxqps} req/s`)
        console.log(`avgqps:   ${avgqps.toFixed(3)} req/s`)
        console.log(`totalReq: ${totalReq} times`)
        console.log(`timePassed: ${(Date.now() - avgqpsStartTimeStamp) / 1000} s`)
    }
}

// qps 测试的中间件生成器
// 以下功能用于测试机器人的 qps
// 只需把它替换掉 index.ts 中 workflow 所在的位置即可
export function qpsCalculatorGenerator(): (_: Mirai.GroupMessageData) => Promise<void> {
    let totalReq = 0
    let currqps = 0
    let currQpsStartTimeStamp = Date.now()
    let maxqps = 0
    let avgqps = 0
    let avgqpsStartTimeStamp = Date.now()

    return async (data: Mirai.GroupMessageData) => {

        if (data.type != 'GroupMessage') {
            return;
        }
        console.clear()
        totalReq++
        maxqps = currqps++ > maxqps ? currqps : maxqps
        avgqps = totalReq / ((Date.now() - avgqpsStartTimeStamp) / 1000)
        if (Date.now() - currQpsStartTimeStamp > 1000) {
            currqps = 0
            currQpsStartTimeStamp = Date.now()
        }
        console.log(`currqps:  ${currqps} req/s`)
        console.log(`maxqps:   ${maxqps} req/s`)
        console.log(`avgqps:   ${avgqps.toFixed(3)} req/s`)
        console.log(`totalReq: ${totalReq} times`)
        console.log(`timePassed: ${(Date.now() - avgqpsStartTimeStamp) / 1000} s`)
    }

}