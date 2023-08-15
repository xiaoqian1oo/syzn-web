
import { Application } from 'egg';
import { Model, Optional } from 'sequelize';


type UserAttributes = FilesTableType;

// Some fields are optional when calling UserModel.create() or UserModel.build()
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface ModelTypeInstances extends Model<UserAttributes, UserCreationAttributes>, UserAttributes { }

export default (app: Application) => {
    const { STRING, INTEGER, TEXT } = app.Sequelize;


    const table = app.model.define<ModelTypeInstances>('file', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '主键id' },
        name: {
            type: STRING(50),
            comment: '名称',
        },
        url: {
            type: STRING(1000),
            // allowNull: false,
            // defaultValue: 0,
            comment: '地址路径',
        },
        type: {
            type: INTEGER,
            allowNull: false,
            // defaultValue: 2,
            comment: ' 1:文件下载，2：合作伙伴',
        },
        content: {
            type: TEXT,
            // allowNull: false,
            // defaultValue: 0,
            comment: '内容',
        },
        sort: {
            type: INTEGER,
            defaultValue: 0,
            comment: '排序',
        },
    }, {
        comment: '文件表', // 数据库表描述
    });


    // table.sync({ alter: true }); // 修改表结构或创建表
    return table;
};
