import { config } from '../config'
import colors from 'colors'

// 日志的行为取决于 config.enableLogger
// 当该配置为 false 时，即便调用 logger.error() 也不会输出任何日志
// 这里与配置文件强耦合
function log(...args: any[]) {
    if (config.enableLogger) {
        console.log(
            config.enableColorLogger ?
                colors.underline.bold.bgGreen.black(`[${new Date().toLocaleString()}]`)
                : `[${new Date().toLocaleString()}]`,
            ...args,
            '\n'
        )
    }
}

function error(...args: any[]) {
    if (config.enableLogger) {
        console.log(
            config.enableColorLogger ?
                colors.underline.bold.bgRed.white(`[${new Date().toLocaleString()}]`)
                : `[${new Date().toLocaleString()}]`,
            ...args,
            '\n'
        )
    }
}
export const logger = {
    log,
    error,
}