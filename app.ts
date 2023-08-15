import { Application } from 'egg';
module.exports = (app: Application) => {
    console.log('app.config.env---------', app.config.env);
    if (app.config.env === 'local') {
        app.beforeStart(async () => {
            // await app.model.sync({
            //     // force: true,
            //     alter: true, // 修改表结构或创建表
            // });
        });
    }
};
