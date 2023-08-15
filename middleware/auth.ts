
import { Context } from 'egg';

// 这里是你自定义的中间件
export default function authMiddleware(options = { required: true }): any {
    return async (ctx: Context, next: () => Promise<any>) => {
        // 你可以获取 config 的配置：
        // const config = ctx.app.config;
        // config.xxx....

        // 1. 获取请求头中的 token 数据
        const token = ctx.headers.authorization;
        // bearer空格token数据
        const user_token = token ? token.split('bearer ')[1] : null;

        if (user_token) {
            try {
                // 3. token 有效，根据 userId 获取用户数据挂载到 ctx 对象中给后续中间件使用
                const data = await ctx.service.user.verifyToken(user_token);
                ctx.user = await ctx.model.User.findByPk(Number(data));
                // ctx.user = await ctx.app.mysql.get('user', { id: data });
            } catch (err) {
                ctx.throw(401);
            }
        } else if (options.required) {
            ctx.throw(401);
        }
        // 4. next 执行后续中间件
        await next();

    };
}

