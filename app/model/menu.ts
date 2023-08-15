
import { Application } from 'egg';
import { Model, Optional } from 'sequelize';


type UserAttributes = MenuTableType;

// Some fields are optional when calling UserModel.create() or UserModel.build()
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface ModelTypeInstances extends Model<UserAttributes, UserCreationAttributes>, UserAttributes { }

export default (app: Application) => {
    const { STRING, INTEGER } = app.Sequelize;


    const Menu = app.model.define<ModelTypeInstances>('menu', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '主键id' },
        parent_id: {
            type: INTEGER,
            defaultValue: 0,
            comment: '上级id',
        },
        title: {
            type: STRING(80),
            comment: '标题',
        },
        title_en: {
            type: STRING(80),
            comment: '英文标题',
        },
        href: {
            type: STRING(255),
            comment: '链接',
        },
        img: {
            type: STRING(1000),
            comment: '图片',
        },
        is_show: {
            type: INTEGER,
            defaultValue: 1,
            comment: '是否显示，1:是,2:否',
        },
        sort: {
            type: INTEGER,
            defaultValue: 0,
            comment: '排序',
        },
    }, {
        comment: '菜单表', // 数据库表描述
    });


    // Menu.sync({ alter: true }); // 修改表结构或创建表
    return Menu;
};
