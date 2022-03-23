import { Bot } from 'mirai-js'
import { config } from './config'
import { currQpsCalculatorGenerator, qpsCalculatorGenerator } from './test/counter';
import { workflow } from './workflow';

const bot = new Bot()
const { bot: { qq, verifyKey, baseUrl } } = config

    ; (async () => {
        await bot.open({
            qq, verifyKey, baseUrl: baseUrl,
        })
        bot.on('GroupMessage', workflow)

        // 你可以通过取消注释以下行来测试此应用程序应该具有的 qps 要求
        // 注意，qps 中间件将在每次消息到达时清除控制台
        // bot.on('GroupMessage', qpsCalculatorGenerator());

        // 你可以通过取消注释以下行来测试此应用的实时 qps
        // 由于 qps 中间件将在每次消息到达时清除控制台，所以应该在测试这一项时在 config.ts 中关闭 logger
        // bot.on('GroupMessage', currQpsCalculatorGenerator(workflow))
    })()