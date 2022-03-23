import { MySQLSchema } from '../types'
import { connection } from './connection'
import { config } from '../config'

export async function isMD5Exist(md5: string): Promise<boolean> {
    const result = await (await connection).execute(`SELECT * FROM ${config.mysql.table} WHERE hash_md5 = ?`, [md5])
    return (result[0] as Array<Object>).length > 0
}

export async function insert(obj: MySQLSchema.QQGroupMsgTableSchema) {
    const sql = `
        INSERT INTO ${config.mysql.table}
        (user_group_name, user_number, send_time, message, create_time, group_name, group_number, hash_md5, user_phone_number)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
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
    ]

    return (await (await connection).execute(sql, params))
}