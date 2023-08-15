export default {
    nunjucks: {
        enable: true,
        package: 'egg-view-nunjucks',
    },
    // mysql: {
    //     enable: true,
    //     package: 'egg-mysql',
    // },
    // 连接数据库
    sequelize: {
        enable: true,
        package: 'egg-sequelize',
    },
    // 参数校验
    validate: {
        enable: true,
        convert: true,
        package: 'egg-validate',
    },

    // 解决跨域
    cors: {
        enable: true,
        package: 'egg-cors',
    },
    // 用户登录权鉴
    jwt: {
        enable: true,
        package: 'egg-jwt',
    },
};
