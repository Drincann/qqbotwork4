import { Mirai, MySQLSchema } from "../types";
import md5 from 'md5'
import { logger } from "../logger";
import { config } from "../config";
import moment from 'moment'

export function filterAllPhoneNumber(text: string): Array<string> | null {
    const result = [
        ...text.match(/1[3|4|5|6|7|8|9]\d{9}/g) ?? [],
        ...text.match(/\d{3}-?\d{7,8}|\d{4}-?\d{7,8}/g) ?? []
    ].filter(v => v != null)
    return Array.from(new Set<string>(result)) ?? null
}


// 缓存电话号码以避免程序在 getUserProfile 调用处过大的时间开销
const globalPhoneNumberCache = new Map<number, string>()
// 这个工具用来解析 GroupMessage 以生成可以直接将插入数据库的 mysqlObj
export async function cleanQQGroupMsg(data: Mirai.GroupMessageData): Promise<MySQLSchema.QQGroupMsgTableSchema> {
    let user_phone_number: string = 'unknown'
    if (globalPhoneNumberCache.has(data.sender?.id)) {
        logger.log(`hit the cache of the phone number -> "${globalPhoneNumberCache.get(data.sender?.id)}"`)
        user_phone_number = globalPhoneNumberCache.get(data.sender?.id) as string
    } else {
        const profile = await data.bot.getUserProfile({ qq: data.sender?.id })
        user_phone_number = filterAllPhoneNumber(profile.sign ?? 'unknown')?.join('/') ?? 'unknown'
        globalPhoneNumberCache.set(data.sender?.id, user_phone_number)
        // logger.error('miss cache')
        // 在 config.cacheExpireTime 后清除缓存
        setTimeout(() => {
            globalPhoneNumberCache.delete(data.sender?.id)
        }, config.phoneNumberCacheExpireTime);
    }

    return {
        user_group_name: data.sender?.memberName ?? 'unknown',
        user_number: data.sender?.id?.toString() ?? 'unknown',
        send_time: data.sender?.lastSpeakTimestamp == undefined ? moment().format('YYYY-MM-DD HH:mm:ss') : moment(data.sender?.lastSpeakTimestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
        message: data.text ?? 'unknown',
        create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
        group_name: data.sender?.group?.name ?? 'unknown',
        group_number: data.sender?.group?.id?.toString() ?? 'unknown',
        hash_md5: md5(data.text ?? 'unknown'),
        user_phone_number,
    }
}