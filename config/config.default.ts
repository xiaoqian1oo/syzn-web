import { EggAppConfig, PowerPartial } from 'egg';
import * as fs from 'fs';
import * as path from 'path';

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>;

// app special config scheme
export interface BizConfig {
    env: string;
    news: {
        pageSize: number;
        serverUrl: string;
    };
}

export default (appInfo: EggAppConfig) => {
    const config = {} as PowerPartial<EggAppConfig> & BizConfig;

    config.env = 'local';

    // app special config
    config.news = {
        pageSize: 30,
        serverUrl: 'https://hacker-news.firebaseio.com/v0',
    };

    // 分页参数

    config.common = {
        is_paging: 0,
        page: 1,
        pageSize: 10,
        menu: [
            { id: 1, name: '首页', href: '/' },
            { id: 2, name: '商品页', href: '/product' },
            { id: 3, name: '视频页', href: '/video' },
            { id: 4, name: '案例页', href: '/case' },
        ],
    };

    // override config from framework / plugin
    config.keys = appInfo.name + '123456';

    config.cluster = {
        listen: {
            path: '',
            port: 7001,
            hostname: '127.0.0.1',
        },
    };

    // 文件主机
    config.imgDomain = 'http://127.0.0.1:7001';
    // 文件上传目录
    config.uploadDir = 'app/public/upload';

    // 上传文件大小
    config.multipart = {
        mode: 'stream',
        fileSize: '200mb',
        fileExtensions: ['.rar', '.zip', '.doc', '.docx', '.ppt', '.txt', '.xlsx', '.xls', '.pdf'], // 扩展允许接收的文件后缀
    };

    // config.mysql = {
    //     // 单数据库信息配置
    //     client: {
    //         // host
    //         host: 'localhost',
    //         // 端口号
    //         port: '3306',
    //         // 数据库名
    //         database: 'syzn',
    //         // 用户名
    //         user: 'root',
    //         // 密码
    //         password: 'root',
    //     },
    //     // 是否加载到 app 上，默认开启
    //     app: true,
    //     // 是否加载到 agent 上，默认关闭
    //     agent: false,
    // };

    // 数据库配置
    config.sequelize = {
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        database: 'syzn-se',
        // 用户名
        username: 'root',
        // 密码
        password: '123456',
        define: { // model的全局配置
            // timestamps: true, // 添加create,update,delete时间戳
            // 不想要 createdAt
            createdAt: 'created_at', // 创建时间字段改为created_at
            updatedAt: 'updated_at', // 更新时间字段改为updated_at
            // paranoid: true, // 添加软删除
            freezeTableName: true, // 防止修改表名为复数
            // underscored: false, // 防止驼峰式字段被默认转为下划线
        },
        // 由于orm用的UTC时间，这里必须加上东八区，否则设置的时间相差8小时
        timezone: '+08:00',
        // 打印日志
        logging: true,
        dialectOptions: { // 默认情况下查询的日期格式2022-01-02T09:14:03.102Z，转2022-01-04 10:39:56
            dateStrings: true,
            typeCast: true,
        },
    };

    // config.sequelize = {
    //     dialect: 'mysql',
    //     host: '123.45.67.890',
    //     port: 3306,
    //     database: 'test',
    //     username: 'root',
    //     password: '123456',
    //     // 配置数据库时间为东八区北京时间
    //     timezone: '+08:00',
    //     define: { // model的全局配置
    //         timestamps: true, // 添加create,update,delete时间戳
    //         paranoid: true, // 添加软删除
    //         freezeTableName: true, // 防止修改表名为复数
    //         underscored: false, // 防止驼峰式字段被默认转为下划线
    //     },
    //     // 打印日志
    //     logging: true,
    //     // 时间格式化
    //     dialectOptions: { dateStrings: true, typeCast: true },
    // };


    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.nj': 'nunjucks',
        },
    };

    // config.validate = {
    //     locale: 'zh-cn',
    //     // convert: false,
    //     // validateRoot: false,
    // };

    // token秘钥
    config.jwt = {
        secret: '48d160d9-9fe8-479c-adf1-7ecf0f7d0539',
        // enable: true, // 默认是关闭，如果开启，这会对所有请求进行自动校验；限定请求，请设置match做路径匹配
        // match: /^\/api/, // 匹配的请求，会走jwt校验，否则忽略；例如登录接口需要被忽略；
        // sign: {	// jwt.sign(***,***,[options,***])方法中，options的默认设置可以在这里配置；
        //     expiresIn: '1d', // 多少s后过期。actionToken.js中,jwt.sing(plyload,secret,{expiresIn:number})会被合并，调用时设置优先级更高;
        // },
    };

    // config/config.default.js
    // 配置安全验证
    config.security = {
        csrf: {
            enable: false,
        },
        // csrf: {
        //     ignore: ctx => {
        //         // 对指定接口地址忽略验证
        //         if (ctx.request.url === '/admin/goods/goodsUploadImage') {
        //             return true;
        //         }
        //         return false;

        //     },
        // },
        // 将域名加入白名单
        domainWhiteList: ['http://localhost:8082/', 'http://localhost:3008/'],
    };
    // 配置允许跨域
    config.cors = {
        // 任何地址都可以访问
        origin: '*',
        // 指定地址才可以访问
        // origin: 'http://localhost:8080',
        allowMethods: 'GET,PUT,POST,DELETE',
        // cookie跨域配置
        credentials: true,
    };


    config.siteFile = {
        '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/favicon.png')),
    };

    return config;
};
