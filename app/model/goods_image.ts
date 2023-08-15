
import { Application } from 'egg';
import { Model, Optional } from 'sequelize';


type UserAttributes = GoodsImageTableType;

// Some fields are optional when calling UserModel.create() or UserModel.build()
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface ModelTypeInstances extends Model<UserAttributes, UserCreationAttributes>, UserAttributes { }

export default (app: Application) => {
    const { STRING, INTEGER } = app.Sequelize;


    const table = app.model.define<ModelTypeInstances>('goods_image', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '主键id' },
        goods_id: {
            type: INTEGER,
            allowNull: false,
            comment: '商品id',
        },
        url: {
            type: STRING(1000),
            comment: '图片地址',
        },
        sort: {
            type: INTEGER,
            defaultValue: 0,
            comment: '排序',
        },
    }, {
        comment: '商品图片表', // 数据库表描述
    });


    // table.sync({ alter: true }); // 修改表结构或创建表
    return table;
};
