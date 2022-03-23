import mysql from 'mysql2/promise'
import { config } from '../config'

const { mysql: { host, user, database, password } } = config
const connection = mysql.createConnection({
    host, user, database, password
})

// 暴露一个 Promise 包装的 mysql connection 对象
export {
    connection
};