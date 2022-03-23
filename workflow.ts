import { Middleware } from 'mirai-js'
import { Mirai, MySQLSchema } from './types'
import { cleanQQGroupMsg } from './util'
import { db } from './db'
import { config } from './config'
import { sendMail } from './mailer'
import { logger } from './logger'

let startTime: number = Date.now()
export const workflow = new Middleware()
    // parse the text of the messagechain then assign into the context
    .textProcessor()
    // return if 
    // the message is not a group message
    // the message is empty
    // or the text md5 is already in the database
    .use(async (data: Mirai.GroupMessageData, next) => {
        try {
            if (data.type != 'GroupMessage') return
            startTime = Date.now()
            data.mysqlObj = await cleanQQGroupMsg(data)
            if (data.mysqlObj?.message?.trim() == ''
                || data.mysqlObj?.hash_md5 == undefined
                || await db.isMD5Exist(data.mysqlObj.hash_md5)) {
                logger.log(`message already exists -> "${data.mysqlObj?.message?.replace('\n', '').slice(0, 20)}..."`)
                return
            }
            await next()
            logger.log(`insert into database ${Date.now() - startTime} ms -> ${JSON.stringify(data.mysqlObj)}`)
        } catch (error: any) {
            logger.error(error)
            if (config.enableMailer) {
                try {
                    await sendMail({
                        subject: 'mirai-js error',
                        html: `${error.message}\n\n${error.stack}`
                    })
                    logger.log('send mail success')

                } catch (error) {
                    logger.error(error)
                }
            }
        }
    })
    // insert the message into the database
    .done(async (data: Mirai.GroupMessageData) => {
        await db.insert(data.mysqlObj as MySQLSchema.QQGroupMsgTableSchema)
    })