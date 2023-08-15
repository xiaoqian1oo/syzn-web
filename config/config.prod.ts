import { DefaultConfig } from './config.default';

export default () => {
    const config: DefaultConfig = {};
    config.env = 'prod';

    config.cluster = {
        listen: {
            path: '',
            port: 7001,
            hostname: '127.0.0.1',
        },
    };

    // 文件主机
    config.imgDomain = 'http://127.0.0.1:7001';

    // 数据库配置
    config.sequelize = {
        dialect: 'mysql',
        host: '120.25.100.147',
        port: 3306,
        database: 'syzn',
        // 用户名
        username: 'root',
        // 密码
        password: '',
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

    return config;
};
