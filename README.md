# Bot

## 概要

### Mirai-js

该应用使用 Mirai-js 框架开发，运行在 Node.js 下。

mirai 是一个开源的 JVM 技术栈的 QQ 协议库，封装了 QQ 协议的实现。

mirai-console 是 mirai 的一个可扩展（插件化）前端，mirai-api-http 是 mirai-console 的一个插件，可以对外提供 mirai QQ 协议实现的 HTTP/WebSocket 接口。

Mirai-js 是一个 QQ 机器人开发框架，它通过包装 mirai-api-http 服务提供的 HTTP/WebSocket API 提供 QQ 机器人的 JavaScript/TypeScript API。

### 应用目录

- `types.ts` mysql 表结构和 mirai-js GroupMessage 数据结构的类型声明
- `workflow.ts` 用来处理群消息的主要控制流
- `index.ts` 程序入口
- `config.ts` 配置文件，下文详细展开
- `db/`
  - `connection.ts` 暴露一个 mysql connection 的 Promise 包装
  - `operation.ts` 所有需要用到的数据库操作的 Promise 封装

- `dist/` typescript 编译后的输出，即生产环境的 js 代码
- `logger/` 日志工具的封装，使用该 logger 会自动换行，行首会加上时间，可以在 config.ts 中配置是否开启
- `mailer/` 发送 email 的工具封装，当主程序流抛出异常时将会根据 config.ts 发送异常信息到指定邮箱，可以配置开启或关闭
- `test/`
- `counter.ts` 提供测试当前 bot 所需的 qps，以及测试当前应用的 qps 的中间件封装，在 index.ts 中给出了测试方法
- `util/` 封装了一些处理群消息的工具

## 准备工作

### 启动和配置 mirai-api-http 服务

通过下面这个教程来启动 mirai-console 以及 mirai-api-http 插件：

[https://mirai-js.vercel.app/#/v2.x/Preparation](https://mirai-js.vercel.app/#/v2.x/Preparation)

### 配置该应用

在 `config.ts` 中：

- config.mysql 用来配置要连接的数据库相关信息
- config.bot 用来配置连接到 mirai-api-http 服务的配置
- config.bot.qq qq 号
- config.bot.verifyKey mirai-api-http 服务的认证 key，请看上节的配置方法
- config.bot.baseUrl mirai-api-http 接口的 url
- config.mailer 发生异常时的发信服务器配置
- config.mailer.to 发送到的邮箱
- enableLogger boolean 是否开启日志
- enableLogger boolean 是否在日志的时间部分加上显著的颜色
- enableMailer boolern 是否开启异常发信功能
- phoneNumberCacheExpireTime boolean 电话号码 cache 的失效时间，单位 ms

## 构建

TypeScript 是 JavaScript 的一个超集，他可以被编译到 JavaScript。

TypeScript 不可以直接跑在 Node.js 中。

我们可以使用 ts-node 来运行 TypeScript，它 hook 了 Node.js，在运行时编译和执行。

在生产环境中，我们应该先编译它。

执行这一行代码，将会把 TypeScript 编译到 dist/ 文件夹下。

```shell
npm run build
```

## 使用/运行

在开发环境中，我们可以使用 ts-node 来 hack 式地启动 TypeScript 的运行时：

```shell
npm run start:dev  # ts-node
```

在生产环境，我们应该使用：

```shell
npm run start:pord
```
