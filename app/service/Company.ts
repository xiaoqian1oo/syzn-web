import { Service } from 'egg';
import { WhereOptions } from 'sequelize';

/**
 * CompanyService Api Service
 */
export class CompanyService extends Service {
    get Table() { // 获取数据表
        return this.ctx.model.Company;
    }
    /**
     * 获取列表
     * @param body body.page 分页
     * @return
     */
    public async getList(body: { [x: string]: string; page?: any; pageSize?: any; title?: any; type?: any; }) {
        // const { Op } = this.app.Sequelize;
        const page = Number.parseInt(body.page || this.config.common.page);
        const pageSize = Number.parseInt(body.pageSize || this.config.common.pageSize);

        const where: WhereOptions<CompanyTableType> = {};
        // if (body.title) where.title = { [Op.like]: body.title };
        // if (body.type) where.type = body.type;

        const { rows, count } = await this.Table.findAndCountAll({
            where,
            offset: (page - 1) * pageSize,
            limit: pageSize,
            order: [
                ['sort', 'DESC'],
            ],
        });
        return { list: rows, total: count };
    }

    /**
     * getInfo  获取公司信息
     */
    public async getInfo(body?: CompanyTableType) {
        const id = (body && body.id) ? body.id : 1;

        const data = await this.Table.findOrCreate({
            where: { id },
            defaults: {
                name: '',
            } as CompanyTableType,
        });
        return data[0];
    }

    /**
     * 添加数据
     * @param body
     * @return
     */
    public async insert(body: CompanyTableType) {
        return await this.Table.create(body);
    }

    // 修改数据
    async update(body: CompanyTableType) {
        if (!body.id) {
            return await this.insert(body);
        }

        const _data = await this.Table.update(body, {
            where: {
                id: body.id!,
            },
        });

        return _data;
    }


    public async delete(id: number) {
        const _data = await this.Table.destroy({
            where: {
                id,
            },
        });

        // // 删除文件
        // await ctx.model.File.deleteOne({ _id: _data._id });

        return _data;

        // const { ctx, service } = this;
        // const _data = await this.File.findById(id);
        // if (!_data) {
        //     ctx.throw('_id不正确！');
        // }
        // _data.remove();
        // // 删除文件
        // await ctx.model.File.deleteOne({ _id: _data._id });
        // service.toolService.deleteDiskFile(_data.link);
        // return {
        //     code: 200,
        //     message: '删除成功',
        // };
    }


}

export default CompanyService;
