import { connection } from './connection'
import { isMD5Exist, insert } from './operation'
export const db = {
    connection,
    insert,
    isMD5Exist
}