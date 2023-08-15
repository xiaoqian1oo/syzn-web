
import { Application } from 'egg';
import { Model, Optional } from 'sequelize';


type UserAttributes = GoodsTableType;

// Some fields are optional when calling UserModel.create() or UserModel.build()
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface ModelTypeInstances extends Model<UserAttributes, UserCreationAttributes>, UserAttributes { }

export default (app: Application) => {
    const { STRING, INTEGER, TEXT } = app.Sequelize;


    const table = app.model.define<ModelTypeInstances>('goods', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '主键id' },
        title: {
            type: STRING(150),
            comment: '名称',
        },
        title_en: {
            type: STRING(150),
            comment: '英文名称',
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
            // allowNull: false,
            // defaultValue: 0,
            comment: '内容',
        },
        content_en: {
            type: TEXT,
            // allowNull: false,
            // defaultValue: 0,
            comment: '英文内容',
        },
        classify_id: {
            type: INTEGER,
            // allowNull: false,
            defaultValue: 0,
            comment: '上级id',
        },
        video_url: {
            type: STRING(1000),
            comment: '视频地址',
        },
        image_url: {
            type: STRING(1000),
            comment: '图片地址',
        },
        seo_keyword: {
            type: STRING(150),
            comment: 'SEO关键字',
        },
        seo_description: {
            type: STRING(150),
            comment: 'SEO描述',
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
        comment: '商品表', // 数据库表描述
    });


    // table.associate = function () {
    //     // 与Info存在一对多关系，因此是hasOne()
    //     // app.model.Goods.hasOne(app.model.Info, { foreignKey: 'studentId' });
    //     // 与Menu表存在多对一关系，因此使用belongsTo()
    //     app.model.Goods.belongsTo(app.model.Menu, { foreignKey: 'classify_id', targetKey: 'id' });
    // };
    // table.hasMany(app.model.Menu, {
    //     foreignKey: 'classify_id',
    //     // targetKey: 'id',
    // });


    // table.sync({ alter: true }); // 修改表结构或创建表
    return table;
};
