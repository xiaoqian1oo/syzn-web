import { Controller } from 'egg';

/**
 * @Controller 产品
 */

export default class MenuController extends Controller {

    get serviceFunc() {
        return this.service.menu;
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
     * @summary 菜单分类
     */
    public async classify() {
        const { ctx } = this;
        const body = ctx.request.body;

        const data = await this.serviceFunc.getList(body);

        const node = this.config.common.menu.find(item => item.id === body.id);

        let list: any[] = [];
        if (node) {
            const child = data.list.find(item => item.href === node.href);
            if (child) list = child.children || [];
        }

        ctx.body = {
            code: 200,
            data: list,
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

