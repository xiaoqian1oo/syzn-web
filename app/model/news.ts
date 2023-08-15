
import { Application } from 'egg';
import { Model } from 'sequelize';

interface ModelTypeInstances extends Model<NewsTableType> { }


export default (app: Application) => {
    const { STRING, INTEGER, TEXT } = app.Sequelize;


    const table = app.model.define<ModelTypeInstances>('news', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '主键id' },
        title: {
            type: STRING(80),
            comment: '标题',
        },
        title_en: {
            type: STRING(80),
            comment: '英文标题',
        },
        description: {
            type: STRING(255),
            comment: '描述',
        },
        description_en: {
            type: STRING(255),
            comment: '英文描述',
        },
        content: {
            type: TEXT,
            comment: '内容',
        },
        content_en: {
            type: TEXT,
            comment: '英文内容',
        },
        img: {
            type: STRING(255),
            comment: '图片地址',
        },
        type: {
            type: INTEGER,
            comment: '模块 1:公司新闻 2:行业资讯，3:使用案例',
        },
        home_recommend: {
            type: INTEGER,
            defaultValue: 2,
            comment: '是否首页推荐 1:是，2：否',
        },

        sort: {
            type: INTEGER,
            defaultValue: 0,
            comment: '排序',
        },
    }, {
        comment: '新闻表', // 数据库表描述
    });


    // table.sync({ alter: true }); // 修改表结构或创建表
    return table;
};
