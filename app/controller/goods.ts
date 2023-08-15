import { Controller } from 'egg';

/**
 * @Controller GoodsController 产品
 */

export default class GoodsController extends Controller {

    get serviceFunc() {
        return this.service.goods;
    }

    /**
     * @summary 获取banner列表
     */
    async list() {
        const { ctx } = this;
        const body = ctx.request.body;
        const data = await this.serviceFunc.getList(body);

        const list = await Promise.all(data.list.map(async item => {
            const node = await this.service.menu.info(Number(item.classify_id));
            return {
                ...item.dataValues,
                classify_name: node?.title || '',
            };
        }));

        ctx.body = {
            code: 200,
            data: {
                list,
                total: data.total,
            },
        };
    }

    /**
     * @summary 添加banner
     */
    async insert() {
        const { ctx } = this;
        const body = ctx.request.body;

        const res = await this.serviceFunc.insert(body);
        if (!res) ctx.throw(422, '添加失败');
        ctx.body = {
            code: 200,
            message: '添加成功',
        };
    }

    /**
     * @summary 删除banner
     */
    async delete() {
        const { ctx } = this;
        const body = ctx.request.body;
        ctx.validate({
            id: 'number',
        }, body);
        const data = await this.serviceFunc.delete(body.id);

        // ctx.body = data;
        if (!data) ctx.throw(422, '删除失败');
        ctx.body = {
            code: 200,
            message: '删除成功',
        };
    }

    /**
     * @summary 修改banner
     */
    async update() {
        const { ctx } = this;
        const body = ctx.request.body;
        ctx.validate({
            id: 'number',
        }, body);

        const data = await this.serviceFunc.update(body);

        if (!data) ctx.throw(422, '修改失败');
        ctx.body = {
            code: 200,
            message: '修改成功',
        };
        // ctx.body = data;
    }


}

