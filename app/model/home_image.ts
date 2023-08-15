
import { Application } from 'egg';
import { Model, Optional } from 'sequelize';


type UserAttributes = HomeImageTableType;

// Some fields are optional when calling UserModel.create() or UserModel.build()
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface ModelTypeInstances extends Model<UserAttributes, UserCreationAttributes>, UserAttributes { }

export default (app: Application) => {
    const { STRING, INTEGER } = app.Sequelize;


    const table = app.model.define<ModelTypeInstances>('home_image', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '主键id' },
        title: {
            type: STRING(100),
            comment: '标题',
        },
        title_en: {
            type: STRING(100),
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
        url: {
            type: STRING(1000),
            comment: '链接地址',
        },
        image_url: {
            type: STRING(1000),
            comment: '图片地址',
        },
        screen: {
            type: INTEGER,
            allowNull: false,
            comment: '第几屏',
        },
        type: {
            type: INTEGER,
            allowNull: false,
            comment: '1：按钮链接，2：图片链接，3：首页产品中心推荐产品,4:背景大图',
        },
    }, {
        comment: '首页', // 数据库表描述
    });


    // table.sync({ alter: true }); // 修改表结构或创建表
    return table;
};
