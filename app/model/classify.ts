
import { Application } from 'egg';
import { Model, Optional } from 'sequelize';


type UserAttributes = ClassifyTableType;

// Some fields are optional when calling UserModel.create() or UserModel.build()
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface ModelTypeInstances extends Model<UserAttributes, UserCreationAttributes>, UserAttributes { }

export default (app: Application) => {
    const { STRING, INTEGER } = app.Sequelize;


    const table = app.model.define<ModelTypeInstances>('classify', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '主键id' },
        name: {
            type: STRING(50),
            comment: '分类名称',
        },
        parent_id: {
            type: INTEGER,
            // allowNull: false,
            defaultValue: 0,
            comment: '上级id',
        },
        type: {
            type: INTEGER,
            allowNull: false,
            // defaultValue: 2,
            comment: '分类类型，1：视频系列',
        },
        sort: {
            type: INTEGER,
            defaultValue: 0,
            comment: '排序',
        },
    }, {
        comment: '分类表', // 数据库表描述
    });


    // table.sync({ alter: true }); // 修改表结构或创建表
    return table;
};
