export const config = {
    // mysql
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        database: 'qqwork',
        password: 'root',
        table: 'qq_group_msg',
    },
    // bot
    bot: {
        qq: 3070539027,// 3070539027 48120725,
        verifyKey: '123456',
        baseUrl: 'http://127.0.0.1:8080',
    },
    // 当主控制流抛出异常时，程序将自动发送邮件到指定邮箱
    mailer: {
        host: 'smtp.qq.com',
        port: 465,
        secure: true,
        auth: {
            user: "1019933576@qq.com",
            pass: "***",
        },
        // 发送至
        to: '3070539027@qq.com',
    },
    // 开启日志
    enableLogger: true,
    // 启用日志时间部分的颜色
    // 如果要将日志保存到文件中，可以禁用这一项，因为颜色相关文本会混淆日志
    enableColorLogger: true,
    // 启用发信功能，当抛出异常时将发送到指定邮箱
    enableMailer: true,
    // 手机号 cache 的失效时间
    phoneNumberCacheExpireTime: 60 * 60 * 48 * 1000,
}