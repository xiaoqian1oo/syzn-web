
import { Application } from 'egg';
import { Model, Optional } from 'sequelize';

// interface ModelTypeInstances extends Model<UserTableType> { }


// interface UserAttributes extends UserTableType {
//     id: number;
//     // name: string;
// }

// // Some fields are optional when calling UserModel.create() or UserModel.build()
// interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

// // We need to declare an interface for our model that is basically what our class would be
// interface ModelTypeInstances
//     extends Model<UserAttributes, UserCreationAttributes>,
//     UserAttributes { }


type UserAttributes = UserTableType;

// Some fields are optional when calling UserModel.create() or UserModel.build()
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface ModelTypeInstances extends Model<UserAttributes, UserCreationAttributes>, UserAttributes { }

export default (app: Application) => {
    const { STRING, INTEGER } = app.Sequelize;


    const User = app.model.define<ModelTypeInstances>('user', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '主键id' },
        username: {
            type: STRING(30),
            comment: '用户名',
        },
        account: {
            type: STRING(50),
            comment: '登录账号',
        },
        password: {
            type: STRING(255),
            comment: '密码',
        },
        avatar: {
            type: STRING(255),
            comment: '头像',
        },
        status: {
            type: INTEGER,
            defaultValue: 1,
            comment: '状态:1正常，2禁用',
        },
    }, {
        comment: '用户表', // 数据库表描述
    });


    // User.sync({ alter: true }); // 修改表结构或创建表
    return User;
};
