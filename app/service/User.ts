import { Service } from 'egg';
import { WhereOptions } from 'sequelize';
type TableOptionType = UserTableType;
export class UserService extends Service {
    // 获取user表
    get Table() {
        return this.ctx.model.User;
    }


    /**
     * list 列表
     */
    public async getList(body: any) {
        const { Op } = this.app.Sequelize;
        const page = Number.parseInt(body.page || this.config.common.page);
        const pageSize = Number.parseInt(body.pageSize || this.config.common.pageSize);


        const where: WhereOptions<TableOptionType> = {
            // parent_id: { [Op.eq]: 0 },
        };
        if (body.username) where.username = { [Op.like]: body.username };
        if (body.account) where.account = { [Op.like]: body.account };
        if (body.status) where.status = { [Op.eq]: body.status };

        const { rows, count } = await this.Table.findAndCountAll({
            where,
            offset: (page - 1) * pageSize,
            limit: pageSize,
            // order: [
            //     ['sort', 'DESC'],
            // ],
        });

        return { list: rows, total: count };
    }


    // 查找用户名
    public async findByUsername(data: { account: string }) {

        return await this.Table.findOne({ where: data });

    }

    // 生成token
    createToken(data: any) {
        const { app } = this;

        const token = app.jwt.sign(data, app.config.jwt.secret,
            // {
            //     expiresIn: app.config.jwt.sign.expiresIn,
            // },
        );
        return token;
    }

    // 解析token
    async verifyToken(token: string) {
        const { app } = this;
        return app.jwt.verify(token, app.config.jwt.secret);
    }

    // 注册
    async register(data: UserTableType) {

        //    const _user=await this.findByUsername({ account: data.account });
        //    if(_user)
        const obj = {
            account: data.account,
            password: this.ctx.helper.md5(data.password),
            username: data.username,
            // create_by: data.create_by,

            avatar: '',
            status: data.status || 1,
            // create_time: this.ctx.helper.formatTime(),
            // update_by: data.create_by,
        };

        return await this.Table.create(obj);

    }

    // 修改用户信息
    async update(body: { id: number, password: string }) {

        const newPassword: string = body.password ? this.ctx.helper.md5(body.password) : '';
        const data: any = {
            ...body,
            password: newPassword,
        };
        if (!data.password) delete data.password;

        return await this.Table.update(data, {
            where: {
                id: body.id,
            },
        });
    }

    // 修改密码
    async updatePassword(body: { id: number, password: string }) {

        const newPassword: string = this.ctx.helper.md5(body.password);

        return await this.Table.update({ password: newPassword }, {
            where: {
                id: body.id,
            },
        });
        // {
        //     where: {
        //         custom_id: 456,
        //     },
        // }
    }
}


export default UserService;
