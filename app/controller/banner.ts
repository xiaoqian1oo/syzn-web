import { Controller } from 'egg';


export default class bannerController extends Controller {

    /**
     * @summary 添加banner
     */
    async insert() {
        const { ctx, service } = this;
        const body = ctx.request.body;

        await service.banner.insert(body);
        ctx.body = {
            code: 200,
            message: '添加成功',
        };
    }

    /**
     * @summary 删除banner
     */
    async delete() {
        const { ctx, service } = this;
        const body = ctx.request.body;
        ctx.validate({
            id: 'string',
        }, body);
        const data = await service.bannerService.delete(body.id);

        ctx.body = data;
    }

    /**
     * @summary 修改banner
     */
    async update() {
        const { ctx, service } = this;
        const body = ctx.request.body;
        ctx.validate({
            id: 'string',
        }, body);

        const data = await service.bannerService.update(body);

        ctx.body = data;
    }

    /**
     * @summary 获取banner列表
     */
    async list() {
        const { ctx, service } = this;
        const body = ctx.request.query;
        const data = await service.banner.getList(body);
        ctx.body = {
            code: 200,
            data,
        };
    }
}
