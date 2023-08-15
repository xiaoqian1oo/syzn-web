import { Controller } from 'egg';

export default class NewsController extends Controller {

    get serviceFunc() {
        return this.service.news;
    }

    /**
     * @summary 获取列表
     */
    public async list() {
        const { ctx } = this;
        const body = ctx.request.body;

        const data = await this.serviceFunc.getList(body);
        ctx.body = {
            code: 200,
            data,
        };
    }

    /**
     * @summary 添加
     */
    async insert() {
        const { ctx } = this;
        const body = ctx.request.body;

        const data = await this.serviceFunc.insert(body);
        if (!data) {
            ctx.throw(422, '添加失败');
        }
        ctx.body = {
            code: 200,
            message: '添加成功',
        };
    }


    /**
     * @summary 修改
     */
    async update() {
        const { ctx } = this;
        const body = ctx.request.body;
        ctx.validate({
            id: 'number',
        }, body);

        const data = await this.serviceFunc.update(body);

        // ctx.body = data;
        if (!data) {
            ctx.throw(422, 'id不正确！');
        }
        ctx.body = {
            code: 200,
            message: '修改成功',
        };
    }

    /**
     * @summary 删除
     */
    async delete() {
        const { ctx } = this;
        const body = ctx.request.body;

        ctx.validate({
            id: 'number',
        }, body);
        const data = await this.serviceFunc.delete(body.id);

        if (!data) ctx.throw(422, '删除失败');
        ctx.body = {
            code: 200,
            message: '删除成功',
        };
    }


}
